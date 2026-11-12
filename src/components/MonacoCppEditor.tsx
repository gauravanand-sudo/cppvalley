"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

/**
 * Monaco is loaded from a version-pinned CDN to avoid altering the application's
 * existing dependency graph in this incremental MVP. If the CDN is unavailable,
 * the user keeps a functioning, accessible plain-text editor.
 *
 * For production hardening: self-host Monaco assets and workers, then apply
 * a strict Content-Security-Policy. The editor never executes user code.
 */
const MONACO_VERSION = "0.52.2";
const MONACO_ROOT = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/" + MONACO_VERSION + "/min";
const MONACO_LOADER_ID = "cppvalley-monaco-amd-loader";

type Position = { lineNumber: number; column: number };
type Disposable = { dispose(): void };
type MonacoEditorInstance = {
  dispose(): void;
  getValue(): string;
  setValue(value: string): void;
  getPosition(): Position | null;
  setPosition(position: Position): void;
  focus(): void;
  addCommand(keybinding: number, handler: () => void): string | null;
  updateOptions(options: Record<string, unknown>): void;
  onDidChangeModelContent(callback: () => void): Disposable;
};
type MonacoApi = {
  editor: {
    create(element: HTMLElement, options: Record<string, unknown>): MonacoEditorInstance;
    setTheme(theme: string): void;
  };
  KeyMod: { CtrlCmd: number; Shift: number };
  KeyCode: { Enter: number; KeyS: number };
};
type AmdRequire = {
  (dependencies: string[], onReady: () => void, onError?: (error: Error) => void): void;
  config(settings: { paths: { vs: string } }): void;
};

declare global {
  interface Window {
    monaco?: MonacoApi;
    require?: AmdRequire;
    MonacoEnvironment?: { getWorkerUrl(_moduleId: string, _label: string): string };
  }
}

let editorLoader: Promise<MonacoApi> | null = null;

function loadMonaco(): Promise<MonacoApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Monaco requires a browser."));
  }
  if (window.monaco) return Promise.resolve(window.monaco);
  if (editorLoader) return editorLoader;

  editorLoader = new Promise<MonacoApi>((resolve, reject) => {
    const startMonaco = () => {
      const amdRequire = window.require;
      if (!amdRequire) {
        reject(new Error("Monaco's loader could not initialize."));
        return;
      }

      // Cross-origin Monaco worker assets need a same-origin blob bootstrap.
      // This does not compile, run or evaluate submitted C++ source.
      if (!window.MonacoEnvironment) {
        const workerUrl = URL.createObjectURL(
          new Blob(
            [
              "self.MonacoEnvironment = { baseUrl: " + JSON.stringify(MONACO_ROOT + "/") + " };",
              "importScripts(" + JSON.stringify(MONACO_ROOT + "/vs/base/worker/workerMain.js") + ");",
            ],
            { type: "text/javascript" },
          ),
        );
        window.MonacoEnvironment = { getWorkerUrl: () => workerUrl };
      }

      amdRequire.config({ paths: { vs: MONACO_ROOT + "/vs" } });
      amdRequire(
        ["vs/editor/editor.main"],
        () => {
          if (window.monaco) resolve(window.monaco);
          else reject(new Error("Monaco did not expose an editor API."));
        },
        reject,
      );
    };

    if (typeof window.require === "function") {
      startMonaco();
      return;
    }

    let script = document.getElementById(MONACO_LOADER_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = MONACO_LOADER_ID;
      script.src = MONACO_ROOT + "/vs/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.addEventListener("load", startMonaco, { once: true });
      script.addEventListener("error", () => reject(new Error("Could not download Monaco assets.")), { once: true });
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", startMonaco, { once: true });
      script.addEventListener("error", () => reject(new Error("Could not download Monaco assets.")), { once: true });
    }
  });
  return editorLoader;
}

export type MonacoCppEditorProps = {
  value: string;
  onChange(value: string): void;
  onRun(): void;
  onSubmit(): void;
  theme: "vs-dark" | "vs";
  fontSize: number;
};

export function MonacoCppEditor({ value, onChange, onRun, onSubmit, theme, fontSize }: MonacoCppEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<MonacoEditorInstance | null>(null);
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  const onSubmitRef = useRef(onSubmit);
  const latestValueRef = useRef(value);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [issue, setIssue] = useState("");

  // Keep shortcuts and editor event handlers up to date without remounting it.
  onChangeRef.current = onChange;
  onRunRef.current = onRun;
  onSubmitRef.current = onSubmit;
  latestValueRef.current = value;

  useEffect(() => {
    let active = true;
    let changedSubscription: Disposable | null = null;
    const host = hostRef.current;
    if (!host) return;

    // Monaco's own browser support excludes some mobile environments. The
    // fallback textarea remains usable on touch devices.
    if (window.matchMedia("(max-width: 720px) and (pointer: coarse)").matches) {
      setStatus("fallback");
      setIssue("Simple editor enabled for touch devices.");
      return;
    }

    loadMonaco()
      .then(monaco => {
        if (!active || !host) return;
        try {
          const instance = monaco.editor.create(host, {
            value: latestValueRef.current,
            language: "cpp",
            theme,
            ariaLabel: "C++ code editor",
            automaticLayout: true,
            fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
            fontSize,
            fontLigatures: true,
            lineHeight: Math.round(fontSize * 1.65),
            lineNumbers: "on",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            tabSize: 4,
            insertSpaces: true,
            detectIndentation: false,
            wordWrap: "off",
            renderWhitespace: "selection",
            bracketPairColorization: { enabled: true },
            guides: { bracketPairs: true, indentation: true },
            stickyScroll: { enabled: false },
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            parameterHints: { enabled: true },
            automaticLayoutDelay: 150,
            padding: { top: 18, bottom: 18 },
            overviewRulerBorder: false,
          });
          editorRef.current = instance;
          changedSubscription = instance.onDidChangeModelContent(() => {
            const nextValue = instance.getValue();
            if (nextValue !== latestValueRef.current) {
              latestValueRef.current = nextValue;
              onChangeRef.current(nextValue);
            }
          });

          instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRunRef.current());
          instance.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
            () => onSubmitRef.current(),
          );
          instance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            // The parent component already persists every change locally.
            instance.focus();
          });

          setStatus("ready");
          setIssue("");
        } catch {
          setStatus("fallback");
          setIssue("Advanced editor is unavailable; plain-text editing still works.");
        }
      })
      .catch(() => {
        if (!active) return;
        setStatus("fallback");
        setIssue("Monaco could not load; plain-text editing still works.");
      });

    return () => {
      active = false;
      changedSubscription?.dispose();
      editorRef.current?.dispose();
      editorRef.current = null;
    };
    // Mount the editor only once; subsequent changes are synchronized below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || editor.getValue() === value) return;
    const cursor = editor.getPosition();
    editor.setValue(value);
    if (cursor) editor.setPosition(cursor);
  }, [value]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !window.monaco) return;
    window.monaco.editor.setTheme(theme);
    editor.updateOptions({ fontSize, lineHeight: Math.round(fontSize * 1.65) });
  }, [theme, fontSize]);

  function onFallbackKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    onChange(value.slice(0, start) + "    " + value.slice(end));
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 4;
    });
  }

  return (
    <div className={"pv-monaco-editor " + (theme === "vs" ? "pv-monaco-light" : "")}>
      <div
        ref={hostRef}
        className="pv-monaco-host"
        aria-hidden={status !== "ready"}
        style={{ visibility: status === "ready" ? "visible" : "hidden" }}
      />
      {status !== "ready" && (
        <div className="pv-editor-fallback">
          {issue && <p className="pv-editor-fallback-note" role="status">{issue}</p>}
          {status === "loading" && <p className="pv-editor-loading">Loading Monaco C++ editor…</p>}
          <textarea
            aria-label="C++ source code"
            value={value}
            onChange={event => onChange(event.target.value)}
            onKeyDown={onFallbackKeyDown}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            wrap="off"
          />
        </div>
      )}
    </div>
  );
}

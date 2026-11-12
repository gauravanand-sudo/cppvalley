"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MonacoCppEditor } from "@/components/MonacoCppEditor";
import type { PracticeProblem } from "@/data/practice";

type CaseResult = {
  index: number;
  passed: boolean;
  status: string;
  stdout?: string;
  stderr?: string;
  expected?: string;
  compileOutput?: string;
  timeMs?: number;
  memoryKb?: number;
};
type JudgeResult = {
  message: string;
  mode?: "run" | "submit";
  accepted?: boolean;
  passed?: number;
  total?: number;
  cases?: CaseResult[];
  code?: string;
};
type PilotStatus = { enabled: boolean; authRequired: boolean; message: string };

export function PracticeWorkspace({ problem }: { problem: PracticeProblem }) {
  const storageKey = "cppvalley-practice-code-" + problem.slug;
  const [source, setSource] = useState(problem.starterCode);
  const [split, setSplit] = useState(48);
  const [activeSample, setActiveSample] = useState(0);
  const [inputMode, setInputMode] = useState<"samples" | "custom">("samples");
  const [customInput, setCustomInput] = useState("");
  const [pilotStatus, setPilotStatus] = useState<PilotStatus | null>(null);
  const [pilotKey, setPilotKey] = useState("");
  const [busy, setBusy] = useState<"run" | "submit" | null>(null);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "vs">("vs-dark");
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    try {
      const draft = window.localStorage.getItem(storageKey);
      if (draft !== null) setSource(draft);
    } catch { /* Browser storage might be blocked. */ }
  }, [storageKey]);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, source); } catch { /* Optional local draft */ }
  }, [source, storageKey]);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("cppvalley-practice-editor-theme");
      const savedSize = Number(window.localStorage.getItem("cppvalley-practice-editor-fontsize"));
      if (savedTheme === "vs" || savedTheme === "vs-dark") setEditorTheme(savedTheme);
      if (Number.isInteger(savedSize) && savedSize >= 12 && savedSize <= 20) setEditorFontSize(savedSize);
    } catch { /* Preferences are optional. */ }
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    try {
      window.localStorage.setItem("cppvalley-practice-editor-theme", editorTheme);
      window.localStorage.setItem("cppvalley-practice-editor-fontsize", String(editorFontSize));
    } catch { /* Preferences are optional. */ }
  }, [editorTheme, editorFontSize, preferencesReady]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/practice/run", { cache: "no-store", signal: controller.signal })
      .then(response => response.json())
      .then((status: PilotStatus) => setPilotStatus(status))
      .catch(() => {
        if (!controller.signal.aborted) {
          setPilotStatus({ enabled: false, authRequired: false, message: "Judge status is unavailable." });
        }
      });
    return () => controller.abort();
  }, []);

  function resetEditor() {
    setSource(problem.starterCode);
    setResult(null);
  }

  async function execute(mode: "run" | "submit") {
    if (busy) return;
    if (!pilotStatus?.enabled) {
      setResult({ message: "Code execution is not configured yet. Your draft is saved locally.", code: "JUDGE_DISABLED" });
      return;
    }
    if (pilotStatus.authRequired && !pilotKey.trim()) {
      setResult({ message: "Enter the private pilot access key before running C++ code.", code: "UNAUTHORIZED" });
      return;
    }
    setBusy(mode);
    setResult(null);
    try {
      const response = await fetch("/api/practice/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(pilotStatus.authRequired ? { Authorization: "Bearer " + pilotKey } : {}),
        },
        body: JSON.stringify({
          slug: problem.slug,
          source,
          mode,
          ...(mode === "run" && inputMode === "custom" ? { customInput } : {}),
        }),
      });
      const body = (await response.json()) as JudgeResult;
      setResult(body);
      if (response.ok && mode === "submit" && body.accepted) {
        try {
          const saved = JSON.parse(window.localStorage.getItem("cppvalley-practice-solved-v1") || "[]");
          const list: string[] = Array.isArray(saved) ? saved.filter(value => typeof value === "string") : [];
          if (!list.includes(problem.slug)) list.push(problem.slug);
          window.localStorage.setItem("cppvalley-practice-solved-v1", JSON.stringify(list));
        } catch { /* Optional local progress */ }
      }
    } catch {
      setResult({ message: "The code judge is unavailable. Your draft remains saved locally." });
    } finally {
      setBusy(null);
    }
  }

  const selectedExample = problem.examples[activeSample] || problem.examples[0];

  return (
    <div className="pv-workspace">
      <div className="pv-workspace-top">
        <div className="pv-breadcrumb"><Link href="/practice">← Problem library</Link><span>/</span><span>{problem.category}</span></div>
        <div className="pv-workspace-actions">
          <label className="pv-split-control">Description width <input type="range" min="30" max="70" value={split} onChange={event => setSplit(Number(event.target.value))} aria-label="Change width of problem description" /></label>
          <span className="pv-draft-indicator">Draft saved on this device</span>
        </div>
      </div>
      <div className="pv-split" style={{ gridTemplateColumns: "minmax(0," + split + "fr) minmax(0," + (100 - split) + "fr)" }}>
        <section className="pv-pane pv-description-pane" aria-label="Problem description">
          <div className="pv-pane-header"><span className="pv-tab-active">▤ Description</span><span className="pv-pane-meta">Original CppValley problem</span></div>
          <div className="pv-description-body">
            <div className="pv-problem-context"><span>{problem.category}</span><span className={"pv-difficulty pv-" + problem.difficulty.toLowerCase()}>{problem.difficulty}</span></div>
            <h1>{problem.title}</h1>
            <p className="pv-problem-summary">{problem.summary}</p>
            <p className="pv-problem-text">{problem.statement}</p>
            <h2>Input format</h2>
            <p>{problem.inputFormat}</p>
            <h2>Output format</h2>
            <p>{problem.outputFormat}</p>
            <h2>Examples</h2>
            {problem.examples.map((example, index) => (
              <div className="pv-example" key={index}>
                <strong>Example {index + 1}</strong>
                <div className="pv-example-grid">
                  <div><span>Input</span><pre>{example.input}</pre></div>
                  <div><span>Expected output</span><pre>{example.output}</pre></div>
                </div>
                {example.explanation && <p className="pv-explanation">{example.explanation}</p>}
              </div>
            ))}
            <h2>Constraints</h2>
            <ul className="pv-constraints">{problem.constraints.map(item => <li key={item}>{item}</li>)}</ul>
            <h2>Related concepts</h2>
            <div className="pv-problem-tags">{problem.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <p className="pv-disclaimer">This early-access exercise uses standard input/output. More advanced concurrency challenges will use specialized class interfaces, instrumentation, and stress tests once the judging infrastructure is ready.</p>
          </div>
        </section>
        <section className="pv-pane pv-editor-pane" aria-label="C++ code editor and tests">
          <div className="pv-pane-header"><span className="pv-tab-active">⌘ Code</span><span className="pv-pane-meta">C++17</span></div>
          <div className="pv-editor-toolbar">
            <span className="pv-language-dot" />
            <span className="pv-editor-language">GNU C++17 · main.cpp</span>
            <label className="pv-editor-setting" htmlFor="pv-editor-font-size">Font
              <select
                id="pv-editor-font-size"
                value={editorFontSize}
                onChange={event => setEditorFontSize(Number(event.target.value))}
              >
                {[12, 13, 14, 16, 18, 20].map(size => <option key={size} value={size}>{size}px</option>)}
              </select>
            </label>
            <button
              type="button"
              className="pv-editor-theme-button"
              onClick={() => setEditorTheme(theme => theme === "vs-dark" ? "vs" : "vs-dark")}
              aria-label={"Switch to " + (editorTheme === "vs-dark" ? "light" : "dark") + " editor theme"}
            >
              {editorTheme === "vs-dark" ? "☀ Light" : "☾ Dark"}
            </button>
            <button type="button" className="pv-editor-reset-button" onClick={resetEditor} aria-label="Reset source to starter code">↺ Reset</button>
          </div>
          <div className="pv-code-shell">
            <MonacoCppEditor
              value={source}
              onChange={setSource}
              onRun={() => execute("run")}
              onSubmit={() => execute("submit")}
              theme={editorTheme}
              fontSize={editorFontSize}
            />
          </div>
          <div className="pv-tests">
            <div className="pv-judge-gate">
              <div>
                <span className={"pv-judge-status " + (pilotStatus?.enabled ? "pv-judge-ready" : "pv-judge-offline")}>
                  <span aria-hidden="true">{pilotStatus?.enabled ? "●" : "○"}</span>
                  {pilotStatus === null ? "Checking judge..." : pilotStatus.enabled ? "Private judge pilot" : "Judge not configured"}
                </span>
                <p>{pilotStatus?.message || "Checking whether the external C++ judge is available."}</p>
              </div>
              {pilotStatus?.enabled && pilotStatus.authRequired && (
                <label className="pv-judge-key">
                  Pilot access key
                  <input
                    type="password"
                    value={pilotKey}
                    onChange={event => setPilotKey(event.target.value)}
                    placeholder="Enter access key"
                    autoComplete="off"
                    aria-label="Private judge pilot access key"
                  />
                </label>
              )}
            </div>
            <div className="pv-tests-head">
              <span>⌁ Test cases & results</span>
              <span>Public samples: {problem.examples.length}</span>
            </div>
            <div className="pv-input-mode" role="group" aria-label="Select sample or custom input">
              <button type="button" className={inputMode === "samples" ? "pv-input-active" : ""} onClick={() => setInputMode("samples")}>Sample cases</button>
              <button type="button" className={inputMode === "custom" ? "pv-input-active" : ""} onClick={() => setInputMode("custom")}>Custom input</button>
            </div>
            {inputMode === "samples" ? (
              <>
                <div className="pv-sample-tabs">
                  {problem.examples.map((_, index) => <button className={activeSample === index ? "pv-sample-selected" : ""} key={index} type="button" onClick={() => setActiveSample(index)}>Case {index + 1}</button>)}
                </div>
                <div className="pv-sample-content">
                  <div><span>Input</span><pre>{selectedExample.input}</pre></div>
                  <div><span>Expected output</span><pre>{selectedExample.output}</pre></div>
                </div>
              </>
            ) : (
              <div className="pv-custom-input">
                <label htmlFor="pv-custom-stdin">Standard input (stdin)</label>
                <textarea
                  id="pv-custom-stdin"
                  value={customInput}
                  onChange={event => setCustomInput(event.target.value)}
                  placeholder="Type custom input here..."
                  maxLength={8000}
                  spellCheck={false}
                />
                <small>Custom input is supported for Run, not Submit.</small>
              </div>
            )}
            {result && (
              <div className={"pv-run-result " + (result.accepted === true ? "pv-result-passed" : "pv-result-info")} role="status">
                <strong>{result.accepted === true ? "✓ Accepted" : result.accepted === false ? "Not accepted" : "Execution status"}</strong>
                <p>{result.message}</p>
                {typeof result.passed === "number" && <p>{result.passed}/{result.total} cases passed or executed</p>}
                {result.cases?.map(item => (
                  <div className="pv-case-result" key={item.index}>
                    <strong className={item.passed ? "pv-case-pass" : "pv-case-fail"}>
                      {item.passed ? "✓" : "×"} Case {item.index}: {item.status}
                    </strong>
                    {(item.timeMs !== undefined || item.memoryKb !== undefined) && (
                      <p className="pv-case-metrics">
                        {item.timeMs !== undefined && <span>CPU time: {item.timeMs} ms</span>}
                        {item.memoryKb !== undefined && <span>Memory: {item.memoryKb} KB</span>}
                      </p>
                    )}
                    {item.compileOutput && <div className="pv-output-field"><span>Compiler output</span><pre>{item.compileOutput}</pre></div>}
                    {item.stderr && <div className="pv-output-field"><span>Standard error</span><pre>{item.stderr}</pre></div>}
                    {item.stdout !== undefined && <div className="pv-output-field"><span>Actual output</span><pre>{item.stdout || "(empty)"}</pre></div>}
                    {item.expected !== undefined && <div className="pv-output-field"><span>Expected output</span><pre>{item.expected}</pre></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pv-submit-bar">
            <span>{pilotStatus?.enabled ? "Ctrl/Cmd + Enter: Run · Ctrl/Cmd + Shift + Enter: Submit" : "Execution requires a secure external judge."}</span>
            <div>
              <button type="button" className="pv-run-button" onClick={() => execute("run")} disabled={busy !== null || !pilotStatus?.enabled}>{busy === "run" ? "Running…" : "▷ Run samples"}</button>
              <button type="button" className="pv-submit-button" onClick={() => execute("submit")} disabled={busy !== null || !pilotStatus?.enabled}>{busy === "submit" ? "Judging…" : "Submit solution →"}</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

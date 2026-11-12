"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MonacoCppEditor } from "@/components/MonacoCppEditor";
import type { PracticeProblem } from "@/data/practice";

type CaseResult = { index: number; passed: boolean; status: string; stdout?: string; expected?: string };
type JudgeResult = { message: string; accepted?: boolean; passed?: number; total?: number; cases?: CaseResult[] };

export function PracticeWorkspace({ problem }: { problem: PracticeProblem }) {
  const storageKey = "cppvalley-practice-code-" + problem.slug;
  const [source, setSource] = useState(problem.starterCode);
  const [split, setSplit] = useState(48);
  const [activeSample, setActiveSample] = useState(0);
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

  function resetEditor() {
    setSource(problem.starterCode);
    setResult(null);
  }

  async function execute(mode: "run" | "submit") {
    if (busy) return;
    setBusy(mode);
    setResult(null);
    try {
      const response = await fetch("/api/practice/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: problem.slug, source, mode }),
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
            <div className="pv-tests-head">
              <span>⌁ Test cases & results</span>
              <span>Public samples: {problem.examples.length}</span>
            </div>
            <div className="pv-sample-tabs">
              {problem.examples.map((_, index) => <button className={activeSample === index ? "pv-sample-selected" : ""} key={index} type="button" onClick={() => setActiveSample(index)}>Case {index + 1}</button>)}
            </div>
            <div className="pv-sample-content">
              <div><span>Input</span><pre>{selectedExample.input}</pre></div>
              <div><span>Expected output</span><pre>{selectedExample.output}</pre></div>
            </div>
            {result && (
              <div className={"pv-run-result " + (result.accepted === true ? "pv-result-passed" : "pv-result-info")} role="status">
                <strong>{result.accepted === true ? "✓ Accepted" : result.accepted === false ? "Tests completed" : "Judge status"}</strong>
                <p>{result.message}</p>
                {typeof result.passed === "number" && <p>{result.passed}/{result.total} cases passed</p>}
                {result.cases?.map(item => (
                  <div className="pv-case-result" key={item.index}><span>{item.passed ? "✓" : "×"} Case {item.index}: {item.status}</span>{item.stdout !== undefined && <pre>Output: {item.stdout || "(empty)"}</pre>}{item.expected !== undefined && <pre>Expected: {item.expected}</pre>}</div>
                ))}
              </div>
            )}
          </div>
          <div className="pv-submit-bar">
            <span>Ctrl/Cmd + Enter: Run · Ctrl/Cmd + Shift + Enter: Submit</span>
            <div>
              <button type="button" className="pv-run-button" onClick={() => execute("run")} disabled={busy !== null}>{busy === "run" ? "Running…" : "▷ Run samples"}</button>
              <button type="button" className="pv-submit-button" onClick={() => execute("submit")} disabled={busy !== null}>{busy === "submit" ? "Judging…" : "Submit solution →"}</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

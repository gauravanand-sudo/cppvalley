"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { practiceCategories, practiceDifficulties, practiceProblems, type PracticeCategory, type PracticeDifficulty } from "@/data/practice";

export function PracticeCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PracticeCategory | "All">("All");
  const [difficulty, setDifficulty] = useState<PracticeDifficulty | "All">("All");
  const [solved, setSolved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("cppvalley-practice-solved-v1") || "[]");
      if (Array.isArray(saved)) setSolved(saved.filter(value => typeof value === "string"));
    } catch { /* Ignore malformed local progress. */ }
  }, []);

  const filtered = useMemo(() => practiceProblems.filter(problem => {
    const searchable = (problem.title + " " + problem.summary + " " + problem.tags.join(" ")).toLowerCase();
    return (category === "All" || problem.category === category)
      && (difficulty === "All" || problem.difficulty === difficulty)
      && searchable.includes(query.trim().toLowerCase());
  }), [category, difficulty, query]);

  const solvedCount = practiceProblems.filter(problem => solved.includes(problem.slug)).length;

  return (
    <div className="pv-container">
      <section className="pv-hero">
        <div className="pv-eyebrow"><span className="pv-live-dot" /> CPPVALLEY PRACTICE · EARLY ACCESS</div>
        <h1>Build the instinct of a <span>systems engineer.</span></h1>
        <p>Original C++ coding challenges across high-frequency trading, concurrency, core C++, and design patterns. Read the problem, write the code, then test your reasoning.</p>
        <div className="pv-hero-meta">
          <span><strong>{practiceProblems.length}</strong> starter problems</span>
          <span><strong>{practiceCategories.length}</strong> technical tracks</span>
          <span><strong>{solvedCount}</strong> solved locally</span>
        </div>
        <p className="pv-hero-footnote">Roadmap: 100+ verified questions in each track, spanning Easy, Medium, and Hard. Only published problems appear below.</p>
      </section>

      <section className="pv-catalog">
        <div className="pv-section-heading">
          <div>
            <span className="pv-kicker">PROBLEM LIBRARY</span>
            <h2>Find your next challenge</h2>
          </div>
          <p>Search by concept, difficulty, or topic.</p>
        </div>
        <div className="pv-filters">
          <label className="pv-search-field">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search problems, tags, or skills…" aria-label="Search coding problems" type="search" />
          </label>
          <label className="pv-select-label">Track
            <select value={category} onChange={event => setCategory(event.target.value as PracticeCategory | "All")}>
              <option value="All">All tracks</option>
              {practiceCategories.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="pv-select-label">Difficulty
            <select value={difficulty} onChange={event => setDifficulty(event.target.value as PracticeDifficulty | "All")}>
              <option value="All">All levels</option>
              {practiceDifficulties.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="pv-library-head">
          <span>{filtered.length} {filtered.length === 1 ? "problem" : "problems"} found</span>
          <span>Choose a problem to open the split-screen editor</span>
        </div>
        <div className="pv-table-wrap">
          <table className="pv-table">
            <thead>
              <tr><th scope="col">Problem</th><th scope="col">Track</th><th scope="col">Difficulty</th><th scope="col">Status</th><th scope="col"><span className="pv-visually-hidden">Open</span></th></tr>
            </thead>
            <tbody>
              {filtered.map((problem, index) => (
                <tr key={problem.slug}>
                  <td>
                    <Link className="pv-problem-title" href={"/practice/" + problem.slug}>{String(practiceProblems.indexOf(problem) + 1).padStart(3,"0")}. {problem.title}</Link>
                    <div className="pv-row-tags">{problem.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                  </td>
                  <td className="pv-muted-cell">{problem.category}</td>
                  <td><span className={"pv-difficulty pv-" + problem.difficulty.toLowerCase()}>{problem.difficulty}</span></td>
                  <td><span className={solved.includes(problem.slug) ? "pv-status-complete" : "pv-status-unsolved"}>{solved.includes(problem.slug) ? "✓ Solved" : "Not solved"}</span></td>
                  <td><Link className="pv-open-problem" href={"/practice/" + problem.slug} aria-label={"Open " + problem.title}>↗</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="pv-empty"><strong>No matching problems.</strong><p>Try another track, difficulty, or keyword.</p><button type="button" onClick={() => {setQuery("");setCategory("All");setDifficulty("All");}}>Clear filters</button></div>}
        </div>
      </section>
      <section className="pv-roadmap">
        <div><span className="pv-kicker">CONTENT ROADMAP</span><h2>Depth first. Scale next.</h2></div>
        <p>We're building toward 100 original, reviewed problems for each Easy, Medium, and Hard level in every track: 1,200 total. Real problems need correct specifications, edge-case tests, and reliable grading—not just generated titles.</p>
      </section>
    </div>
  );
}

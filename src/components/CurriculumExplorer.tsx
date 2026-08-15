"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CurriculumPhase } from "@/data/curriculum";

export function CurriculumExplorer({ phases }: { phases: CurriculumPhase[] }) {
  const [query, setQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("all");

  const visiblePhases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return phases.flatMap((phase) => {
      if (selectedPhase !== "all" && selectedPhase !== String(phase.number)) return [];

      const visibleLessons = phase.lessons.filter((lesson) => {
        if (!normalizedQuery) return true;

        return [
          lesson.code,
          lesson.title,
          phase.title,
          phase.summary,
          lesson.lab,
          lesson.proof,
          ...lesson.learn,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      });

      return visibleLessons.length ? [{ phase, visibleLessons }] : [];
    });
  }, [phases, query, selectedPhase]);

  const visibleCount = visiblePhases.reduce(
    (total, group) => total + group.visibleLessons.length,
    0,
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedPhase("all");
  };

  return (
    <div className="course-outline" id="curriculum-browser">
      <div className="course-outline-toolbar">
        <label className="course-outline-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search the course</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lessons: cache, NUMA, ITCH, lock-free…"
          />
        </label>

        <label className="course-outline-select">
          <span className="sr-only">Choose a phase</span>
          <select value={selectedPhase} onChange={(event) => setSelectedPhase(event.target.value)}>
            <option value="all">All {phases.length} phases</option>
            {phases.map((phase) => (
              <option value={phase.number} key={phase.number}>
                Phase {String(phase.number).padStart(2, "0")} — {phase.title}
              </option>
            ))}
          </select>
        </label>

        <div className="course-outline-count" aria-live="polite">
          <strong>{visibleCount}</strong>
          <span>lessons</span>
        </div>

        {(query || selectedPhase !== "all") && (
          <button className="course-outline-clear" type="button" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {visiblePhases.length ? (
        <div className="course-outline-phases">
          {visiblePhases.map(({ phase, visibleLessons }) => (
            <section className="course-outline-phase" id={`phase-${phase.number}`} key={phase.number}>
              <header className="course-outline-phase-header">
                <div>
                  <span>PHASE {String(phase.number).padStart(2, "0")} · {phase.range}</span>
                  <h2>{phase.title}</h2>
                  <p>{phase.summary}</p>
                </div>
                <div className="course-outline-output">
                  <span>Exit artifact</span>
                  <strong>{phase.output}</strong>
                </div>
              </header>

              <div className="course-outline-lessons">
                {visibleLessons.map((lesson) => (
                  <Link href={`/curriculum/${lesson.slug}`} key={lesson.slug}>
                    <span className="course-outline-number">{String(lesson.number).padStart(2, "0")}</span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.learn[0]}</small>
                    </div>
                    <span className="course-outline-format">
                      {lesson.youtubeId ? "Video + lab" : "Lesson + lab"}
                    </span>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="course-outline-empty">
          <strong>No matching lessons</strong>
          <p>Try a broader search term or clear the phase filter.</p>
          <button type="button" onClick={clearFilters}>Show all lessons</button>
        </div>
      )}
    </div>
  );
}

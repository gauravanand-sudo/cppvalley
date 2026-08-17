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
        return `${lesson.code} ${lesson.title} ${lesson.learn.join(" ")}`
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

  return (
    <div className="curriculum-browser" id="curriculum-browser">
      <div className="curriculum-tools">
        <label>
          <span>SEARCH</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="C++, NUMA, market data, risk..."
            aria-label="Search lessons"
          />
        </label>

        <label>
          <span>PHASE</span>
          <select
            value={selectedPhase}
            onChange={(event) => setSelectedPhase(event.target.value)}
            aria-label="Filter by phase"
          >
            <option value="all">All phases</option>
            {phases.map((phase) => (
              <option value={phase.number} key={phase.number}>
                {String(phase.number).padStart(2, "0")} — {phase.title}
              </option>
            ))}
          </select>
        </label>

        <div className="curriculum-count">
          <span>VISIBLE</span>
          <strong>{visibleCount}</strong>
        </div>
      </div>

      {visiblePhases.length ? (
        <div className="curriculum-phases">
          {visiblePhases.map(({ phase, visibleLessons }) => (
            <section className="curriculum-phase" id={`phase-${phase.number}`} key={phase.number}>
              <header>
                <span>PHASE {String(phase.number).padStart(2, "0")}</span>
                <h2>{phase.title}</h2>
                <small>{phase.range}</small>
              </header>

              <div className="curriculum-lessons">
                {visibleLessons.map((lesson) => (
                  <Link href={`/curriculum/${lesson.slug}`} key={lesson.slug}>
                    <span>{String(lesson.number).padStart(2, "0")}</span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.learn[0]}</small>
                    </div>
                    <b aria-hidden="true">↗</b>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>NO MATCH</span>
          <p>No lessons match the current filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedPhase("all");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

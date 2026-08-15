"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CurriculumPhase, MasteryTrack, MasteryTrackInfo } from "@/data/curriculum";

export function CurriculumExplorer({
  phases,
  tracks,
}: {
  phases: CurriculumPhase[];
  tracks: readonly MasteryTrackInfo[];
}) {
  const [query, setQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedTrack, setSelectedTrack] = useState<"all" | MasteryTrack>("all");

  const trackById = useMemo(
    () => new Map(tracks.map((track) => [track.id, track])),
    [tracks],
  );

  const visibleLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return phases.flatMap((phase) => {
      if (selectedPhase !== "all" && selectedPhase !== String(phase.number)) return [];

      return phase.lessons
        .filter((lesson) => selectedTrack === "all" || lesson.tracks.includes(selectedTrack))
        .filter((lesson) => {
          if (!normalizedQuery) return true;

          const searchable = [
            lesson.code,
            lesson.title,
            phase.title,
            phase.summary,
            phase.output,
            lesson.lab,
            lesson.proof,
            ...lesson.learn,
            ...lesson.tracks.map((track) => trackById.get(track)?.name ?? track),
          ].join(" ").toLowerCase();

          return searchable.includes(normalizedQuery);
        })
        .map((lesson) => ({ lesson, phase }));
    });
  }, [phases, query, selectedPhase, selectedTrack, trackById]);

  const clearFilters = () => {
    setQuery("");
    setSelectedPhase("all");
    setSelectedTrack("all");
  };

  return (
    <div className="market-explorer" id="curriculum-browser">
      <div className="market-explorer-tabs" aria-label="Filter by expert stack">
        <button
          className={selectedTrack === "all" ? "is-active" : ""}
          type="button"
          onClick={() => setSelectedTrack("all")}
        >
          All skills
        </button>
        {tracks.map((track) => (
          <button
            className={selectedTrack === track.id ? "is-active" : ""}
            type="button"
            onClick={() => setSelectedTrack(track.id)}
            key={track.id}
          >
            {track.shortName}
          </button>
        ))}
      </div>

      <div className="market-explorer-toolbar">
        <label className="market-explorer-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search lessons</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 96 lessons"
          />
        </label>

        <label className="market-explorer-select">
          <span className="sr-only">Filter by phase</span>
          <select value={selectedPhase} onChange={(event) => setSelectedPhase(event.target.value)}>
            <option value="all">All 9 phases</option>
            {phases.map((phase) => (
              <option value={phase.number} key={phase.number}>
                Phase {String(phase.number).padStart(2, "0")} — {phase.title}
              </option>
            ))}
          </select>
        </label>

        <div className="market-explorer-count" aria-live="polite">
          <strong>{visibleLessons.length}</strong>
          <span>results</span>
        </div>

        {(query || selectedPhase !== "all" || selectedTrack !== "all") && (
          <button className="market-clear-button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {visibleLessons.length > 0 ? (
        <div className="market-course-grid market-catalog-grid">
          {visibleLessons.map(({ lesson, phase }) => {
            const primaryTrack = lesson.tracks[0];

            return (
              <Link
                className="market-course-card"
                href={`/curriculum/${lesson.slug}`}
                id={`lesson-${lesson.number}`}
                key={lesson.slug}
              >
                <div className={`market-course-art market-course-art-${primaryTrack}`}>
                  <span className="market-course-art-code">{lesson.code}</span>
                  <strong>{String(lesson.number).padStart(2, "0")}</strong>
                  <div>
                    {lesson.tracks.slice(0, 2).map((track) => (
                      <span key={track}>{trackById.get(track)?.shortName ?? track}</span>
                    ))}
                  </div>
                </div>

                <div className="market-course-card-body">
                  <h3>{lesson.title}</h3>
                  <p>cppvalley · Phase {String(phase.number).padStart(2, "0")}: {phase.title}</p>
                  <div className="market-course-meta">
                    <span>3 outcomes</span>
                    <span>Mini-lab</span>
                    <span>Proof</span>
                  </div>
                  <div className="market-course-bottom">
                    <strong>Advanced systems</strong>
                    <span>{lesson.youtubeId ? "Video ready" : "Course page"}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="market-empty-results">
          <span aria-hidden="true">⌕</span>
          <h3>No lessons match those filters</h3>
          <p>Try a broader search term or clear the selected stack and phase.</p>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  );
}

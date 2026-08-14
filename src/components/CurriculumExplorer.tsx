"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CurriculumPhase, MasteryTrack, MasteryTrackInfo } from "@/data/curriculum";

type VisiblePhase = CurriculumPhase & {
  visibleLessons: CurriculumPhase["lessons"];
};

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

  const normalizedQuery = query.trim().toLowerCase();
  const trackById = useMemo(
    () => new Map(tracks.map((track) => [track.id, track])),
    [tracks],
  );

  const visiblePhases = useMemo<VisiblePhase[]>(() => {
    return phases.flatMap((phase) => {
      if (selectedPhase !== "all" && selectedPhase !== String(phase.number)) return [];

      const visibleLessons = phase.lessons.filter((lesson) => {
        if (selectedTrack !== "all" && !lesson.tracks.includes(selectedTrack)) return false;

        const searchable = [
          lesson.title,
          phase.title,
          phase.summary,
          phase.output,
          lesson.lab,
          lesson.proof,
          ...lesson.learn,
          ...lesson.tracks.map((track) => trackById.get(track)?.name ?? track),
        ].join(" ").toLowerCase();

        return !normalizedQuery || searchable.includes(normalizedQuery);
      });

      return visibleLessons.length ? [{ ...phase, visibleLessons }] : [];
    });
  }, [normalizedQuery, phases, selectedPhase, selectedTrack, trackById]);

  const visibleCount = visiblePhases.reduce(
    (total, phase) => total + phase.visibleLessons.length,
    0,
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedPhase("all");
    setSelectedTrack("all");
  };

  return (
    <div className="curriculum-explorer" id="curriculum-browser">
      <div className="curriculum-tools" aria-label="Curriculum filters">
        <label className="search-field">
          <span>Search 96 mini-topics</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="NUMA, ITCH, lock-free, risk…"
          />
        </label>

        <label className="phase-field">
          <span>Expert stack</span>
          <select
            value={selectedTrack}
            onChange={(event) => setSelectedTrack(event.target.value as "all" | MasteryTrack)}
          >
            <option value="all">All 4 expert stacks</option>
            {tracks.map((track) => (
              <option value={track.id} key={track.id}>{track.name}</option>
            ))}
          </select>
        </label>

        <label className="phase-field">
          <span>Phase</span>
          <select value={selectedPhase} onChange={(event) => setSelectedPhase(event.target.value)}>
            <option value="all">All 9 phases</option>
            {phases.map((phase) => (
              <option value={phase.number} key={phase.title}>
                {String(phase.number).padStart(2, "0")} — {phase.title}
              </option>
            ))}
          </select>
        </label>

        <p className="result-count" aria-live="polite">
          <strong>{visibleCount}</strong> / 96 lessons
        </p>
      </div>

      {visiblePhases.length > 0 ? (
        <div className="curriculum-results">
          {visiblePhases.map((phase) => (
            <section className="curriculum-phase" id={`phase-${phase.number - 1}`} key={phase.title}>
              <header className="curriculum-phase-head">
                <div>
                  <span>PHASE {String(phase.number).padStart(2, "0")} / {phase.range}</span>
                  <h2>{phase.title}</h2>
                  <p>{phase.summary}</p>
                </div>
                <div className="exit-artifact">
                  <span>EXIT ARTIFACT</span>
                  <strong>{phase.output}</strong>
                </div>
              </header>

              <div className="lesson-list">
                {phase.visibleLessons.map((lesson) => (
                  <Link
                    className="lesson-row"
                    href={`/curriculum/${lesson.slug}`}
                    key={lesson.slug}
                  >
                    <span className="episode-number">{String(lesson.number).padStart(2, "0")}</span>
                    <div className="lesson-row-copy">
                      <div className="lesson-row-title">
                        <h3>{lesson.title}</h3>
                        <div className="track-tags" aria-label="Expert tracks">
                          {lesson.tracks.map((track) => (
                            <span className={`track-tag track-${track}`} key={track}>
                              {trackById.get(track)?.shortName ?? track}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p>{lesson.learn[0]}</p>
                      <small>3 learning outcomes · mini-lab · proof artifact</small>
                    </div>
                    <span className="lesson-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <strong>No matching lesson.</strong>
          <p>Try a broader term or clear the stack and phase filters.</p>
          <button type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  );
}

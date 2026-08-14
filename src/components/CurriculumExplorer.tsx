"use client";

import { useMemo, useState } from "react";

export type CurriculumPhase = {
  title: string;
  range: string;
  summary: string;
  output: string;
  episodes: string[];
};

type NumberedPhase = CurriculumPhase & {
  phaseIndex: number;
  firstEpisode: number;
  visibleEpisodes: { title: string; number: string; isGate: boolean }[];
};

export function CurriculumExplorer({ phases }: { phases: CurriculumPhase[] }) {
  const [query, setQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("all");

  const normalizedQuery = query.trim().toLowerCase();

  const numberedPhases = useMemo<NumberedPhase[]>(() => {
    return phases.flatMap((phase, phaseIndex) => {
      const firstEpisode = phases
        .slice(0, phaseIndex)
        .reduce((total, previousPhase) => total + previousPhase.episodes.length, 0);

      if (selectedPhase !== "all" && selectedPhase !== String(phaseIndex)) return [];

      const visibleEpisodes = phase.episodes.flatMap((title, episodeIndex) => {
        const searchable = `${title} ${phase.title} ${phase.summary} ${phase.output}`.toLowerCase();
        if (normalizedQuery && !searchable.includes(normalizedQuery)) return [];

        return [{
          title,
          number: String(firstEpisode + episodeIndex + 1).padStart(2, "0"),
          isGate: title.startsWith("Phase gate"),
        }];
      });

      if (visibleEpisodes.length === 0) return [];
      return [{ ...phase, phaseIndex, firstEpisode, visibleEpisodes }];
    });
  }, [normalizedQuery, phases, selectedPhase]);

  const visibleCount = numberedPhases.reduce((total, phase) => total + phase.visibleEpisodes.length, 0);

  return (
    <div className="curriculum-explorer">
      <div className="curriculum-tools" aria-label="Curriculum filters">
        <label className="search-field">
          <span>Search topics</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: NUMA, ITCH, hazard pointers…"
          />
        </label>

        <label className="phase-field">
          <span>Phase</span>
          <select value={selectedPhase} onChange={(event) => setSelectedPhase(event.target.value)}>
            <option value="all">All 9 phases</option>
            {phases.map((phase, index) => (
              <option value={index} key={phase.title}>0{index + 1} — {phase.title}</option>
            ))}
          </select>
        </label>

        <p className="result-count" aria-live="polite">
          <strong>{visibleCount}</strong> / 96 episodes
        </p>
      </div>

      {numberedPhases.length > 0 ? (
        <div className="curriculum-results">
          {numberedPhases.map((phase) => (
            <section className="curriculum-phase" id={`phase-${phase.phaseIndex}`} key={phase.title}>
              <header className="curriculum-phase-head">
                <div>
                  <span>PHASE {String(phase.phaseIndex + 1).padStart(2, "0")} / {phase.range}</span>
                  <h2>{phase.title}</h2>
                  <p>{phase.summary}</p>
                </div>
                <div className="exit-artifact">
                  <span>EXIT ARTIFACT</span>
                  <strong>{phase.output}</strong>
                </div>
              </header>

              <div className="episode-table">
                <div className="episode-head" aria-hidden="true">
                  <span>EP</span><span>Topic</span><span>Output</span>
                </div>
                {phase.visibleEpisodes.map((episode) => (
                  <article className="episode-row" key={`${episode.number}-${episode.title}`}>
                    <span className="episode-number">{episode.number}</span>
                    <h3>{episode.title}</h3>
                    <span>{episode.isGate ? "phase gate" : "lab + notes"}</span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <strong>No matching episode.</strong>
          <p>Try a broader term or switch the phase filter to “All 9 phases”.</p>
          <button type="button" onClick={() => { setQuery(""); setSelectedPhase("all"); }}>Clear filters</button>
        </div>
      )}
    </div>
  );
}

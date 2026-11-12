"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";

type Props = { courses: Course[]; initialQuery?: string };
export function CourseCatalog({ courses, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [track, setTrack] = useState("All tracks");
  const [sort, setSort] = useState("recommended");
  const tracks = ["All tracks", ...Array.from(new Set(courses.map(course => course.pillar)))];
  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    const matching = courses.filter(course =>
      (track === "All tracks" || course.pillar === track) &&
      (!q || [course.title, course.shortTitle, course.description, course.pillar, ...course.tags, ...course.modules].join(" ").toLocaleLowerCase().includes(q))
    );
    return matching.sort(sort === "alphabetical" ? (a, b) => a.title.localeCompare(b.title) : (a, b) => a.priority - b.priority);
  }, [courses, query, track, sort]);

  return (
    <div id="catalog" className="g-catalog">
      <div className="g-catalog-controls">
        <div className="g-catalog-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
          <label htmlFor="catalog-query" className="g-sr-only">Search courses, topics or modules</label>
          <input id="catalog-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search C++, concurrency, HFT, GPU..." />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button> : null}
        </div>
        <div className="g-catalog-sort">
          <label htmlFor="course-sort">Sort by</label>
          <select id="course-sort" value={sort} onChange={event => setSort(event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="alphabetical">Course name A–Z</option>
          </select>
        </div>
      </div>
      <div className="g-filter-chips" role="group" aria-label="Filter by learning track">
        {tracks.map(item =>
          <button key={item} type="button" className={track === item ? "is-active" : ""} aria-pressed={track === item} onClick={() => setTrack(item)}>
            {item}{item === "All tracks" ? <small>{courses.length}</small> : null}
          </button>
        )}
      </div>
      <div className="g-result-count" aria-live="polite">
        <strong>{results.length} {results.length === 1 ? "course" : "courses"}</strong>
        <span>{track === "All tracks" ? "Explore the full learning library" : track}</span>
      </div>
      {results.length ? <div className="g-card-grid">{results.map(course => <CourseCard key={course.slug} course={course} />)}</div> :
        <div className="g-empty"><strong>No matching courses</strong><p>Try a different search term or learning track.</p><button type="button" onClick={() => {setQuery("");setTrack("All tracks")}}>Clear filters</button></div>}
    </div>
  );
}
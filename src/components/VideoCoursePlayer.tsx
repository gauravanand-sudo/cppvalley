"use client";

import { useState } from "react";
import type { YoutubeSeries } from "@/data/youtube";
import { youtubeEmbedUrl } from "@/data/youtube";

export function VideoCoursePlayer({ series }: { series: YoutubeSeries }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const activeVideo = series.videos[activeIndex];
  if (!activeVideo) return null;

  function markComplete(index: number) {
    setCompleted(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index]);
  }

  return (
    <section className="g-learning-player" aria-label={series.title + " course player"}>
      <div className="g-player-main">
        <div className="g-player-bar"><span className="g-player-live"><span /> Now learning</span><span>Lesson {activeIndex + 1} of {series.videos.length}</span></div>
        <div className="g-player-frame"><iframe key={activeVideo.videoId} src={youtubeEmbedUrl(activeVideo.videoId)} title={activeVideo.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
        <div className="g-player-info"><p className="eyebrow">Current lesson · {activeVideo.topic}</p><h2>{activeVideo.title}</h2><p>{activeVideo.intent}</p>
          <div className="g-player-actions"><button type="button" onClick={() => markComplete(activeIndex)} className={completed.includes(activeIndex) ? "is-done" : ""}>{completed.includes(activeIndex) ? "✓ Marked complete" : "✓ Mark as complete"}</button><button type="button" disabled={activeIndex >= series.videos.length - 1} onClick={() => setActiveIndex(value => Math.min(value + 1, series.videos.length - 1))}>Next lesson →</button></div>
          <p className="g-session-note">Completion marks are for this browsing session only.</p>
        </div>
      </div>
      <aside className="g-player-side" aria-label="Course lessons"><div className="g-player-side-header"><strong>Course content</strong><span>{series.videos.length} lessons</span><div className="g-player-meter"><span style={{width: completed.length / series.videos.length * 100 + "%"}} /></div><small>{completed.length} marked complete this session</small></div>
        <nav className="g-player-lessons">{series.videos.map((video, index) =>
          <button type="button" key={video.videoId + index} aria-current={index === activeIndex ? "true" : undefined} className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)}>
            <span className="g-lesson-index">{completed.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><span><strong>{video.title}</strong><small>{video.topic} · {video.duration}</small></span>
          </button>)}</nav>
      </aside>
    </section>
  );
}
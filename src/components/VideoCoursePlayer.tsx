"use client";

import { useState } from "react";
import type { YoutubeSeries } from "@/data/youtube";
import { youtubeEmbedUrl } from "@/data/youtube";

type VideoCoursePlayerProps = {
  series: YoutubeSeries;
};

export function VideoCoursePlayer({ series }: VideoCoursePlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = series.videos[activeIndex] ?? series.videos[0];

  if (!activeVideo) {
    return null;
  }

  return (
    <section className="course-player-shell" aria-label={`${series.title} course player`}>
      <div className="course-player-left" aria-label="Active video">
        <div className="course-player-video-frame">
          <iframe
            key={activeVideo.videoId}
            src={youtubeEmbedUrl(activeVideo.videoId)}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <aside className="course-player-sidebar content-only-sidebar" aria-label="Course content">
        <nav className="course-player-lessons" aria-label="Course content list">
          {series.videos.map((video, index) => {
            const active = index === activeIndex;

            return (
              <button
                className={active ? "is-active" : undefined}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={active ? "true" : undefined}
                key={`${video.videoId}-${index}`}
              >
                <span className="course-player-lesson-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="course-player-lesson-copy">
                  <strong>{video.title}</strong>
                  <small>{video.topic} · {video.duration}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </section>
  );
}

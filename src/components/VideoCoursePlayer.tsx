"use client";

import { useMemo, useState } from "react";
import type { YoutubeSeries, YoutubeVideo } from "@/data/youtube";
import { youtubeEmbedUrl } from "@/data/youtube";

type VideoCoursePlayerProps = {
  series: YoutubeSeries;
};

function watchUrl(video: YoutubeVideo) {
  return `https://www.youtube.com/watch?v=${video.videoId}`;
}

export function VideoCoursePlayer({ series }: VideoCoursePlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = series.videos[activeIndex] ?? series.videos[0];

  const totalDuration = useMemo(() => {
    return series.videos.map((video) => video.duration).join(" · ");
  }, [series.videos]);

  if (!activeVideo) {
    return null;
  }

  return (
    <section className="course-player-shell" aria-label={`${series.title} video course player`}>
      <div className="course-player-left">
        <div className="course-player-video-frame">
          <iframe
            key={activeVideo.videoId}
            src={youtubeEmbedUrl(activeVideo.videoId)}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="course-player-current">
          <p className="lp-kicker">Lesson {String(activeIndex + 1).padStart(2, "0")}</p>
          <h1>{activeVideo.title}</h1>
          <p>{activeVideo.intent}</p>
          <div className="course-player-meta">
            <span>{activeVideo.topic}</span>
            <span>{activeVideo.level}</span>
            <span>{activeVideo.duration}</span>
            <a href={watchUrl(activeVideo)} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
          </div>
        </div>
      </div>

      <aside className="course-player-sidebar" aria-label="Course content">
        <div className="course-player-sidebar-head">
          <div>
            <span>Video course</span>
            <h2>{series.title}</h2>
          </div>
          <p>{series.videos.length} lessons</p>
        </div>

        <div className="course-player-series-summary">
          <p>{series.description}</p>
          <small>{totalDuration}</small>
        </div>

        <nav className="course-player-lessons" aria-label="Lessons">
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

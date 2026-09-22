import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "Video Courses — cppvalley",
  description:
    "cppvalley video courses for C++ interviews, ownership, virtual dispatch, atomics, cache coherence, false sharing and low-latency systems.",
  alternates: { canonical: "/youtube" },
  keywords: [
    "cppvalley YouTube",
    "C++ video course",
    "C++ interview videos",
    "virtual functions C++ video",
    "unique_ptr deep dive video",
    "C++ atomics video",
    "false sharing C++ video",
    "low latency C++ video"
  ],
};

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "cppvalley video courses",
  itemListElement: youtubeSeries.map((series, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://cppvalley.com/youtube/${series.slug}`,
    name: series.title,
  })),
};

function thumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function YoutubePage() {
  return (
    <div className="page-shell lp-page academic-page video-catalog-page">
      <SiteHeader />
      <main className="lp-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData).replace(/</g, "\\u003c") }}
        />

        <section className="academic-hero youtube-catalog-hero">
          <div className="site-container youtube-catalog-hero-inner">
            <div>
              <p className="lp-kicker">Video courses</p>
              <h1>Each cppvalley YouTube series is a separate course.</h1>
              <p>
                Choose a video course, open the lesson player, and follow the series curriculum in order. Every course uses the actual YouTube videos and thumbnails.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#video-courses">Browse video courses</Link>
                <Link className="lp-button" href="/courses">Curriculum catalog</Link>
                <Link className="lp-button" href={youtubeChannelUrl} target="_blank" rel="noreferrer">YouTube channel ↗</Link>
              </div>
            </div>
            <aside className="lp-hero-card academic-info-card">
              <div className="lp-hero-card-top">
                <span>Video catalog</span>
                <strong>{youtubeSeries.length} courses</strong>
              </div>
              <p>Short course pages with a player, curriculum sidebar and ordered lessons.</p>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section" id="video-courses">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Series catalog</p>
              <h2>Video courses</h2>
            </div>
          </div>

          <div className="lp-course-grid video-series-grid">
            {youtubeSeries.map((series) => {
              const firstVideo = series.videos[0];
              return (
                <Link className="lp-course-card video-series-card" href={`/youtube/${series.slug}`} key={series.slug}>
                  <img className="video-series-thumb" src={thumbnail(firstVideo.videoId)} alt={`${series.title} thumbnail`} loading="lazy" />
                  <div className="lp-card-body">
                    <span className="course-badge">{series.videos.length} lessons</span>
                    <h3>{series.title}</h3>
                    <p>{series.description}</p>
                    <div className="lp-meta"><span>{series.audience}</span></div>
                    <strong className="lp-link-text">Open course →</strong>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

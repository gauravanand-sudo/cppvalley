import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "Courses — cppvalley Lessons",
  description:
    "cppvalley courses built from C++ interview, concurrency and low-latency lesson series.",
  alternates: { canonical: "/youtube" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "cppvalley lesson courses",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />

        <section className="site-container lp-section" id="courses">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Lesson courses</h1>
            </div>
            <Link className="lp-card-link" href={youtubeChannelUrl} target="_blank" rel="noreferrer">YouTube ↗</Link>
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

import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "YouTube Series — C++, HFT, EDA and Low-Latency Systems",
  description:
    "Organized cppvalley YouTube videos for Core C++ interviews, C++ concurrency, HFT systems, EDA software and low-latency interview preparation. Videos are grouped by learning path and embedded on-site.",
  alternates: { canonical: "/youtube" },
  keywords: [
    "cppvalley YouTube",
    "C++ interview videos",
    "virtual functions C++",
    "unique_ptr deep dive",
    "C++ atomics",
    "false sharing C++",
    "low latency C++",
    "HFT systems videos",
    "EDA software C++",
  ],
};

export default function YoutubePage() {
  const videoCount = youtubeSeries.reduce((total, series) => total + series.videos.length, 0);

  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">@cppvalley YouTube</p>
          <h1>{videoCount} videos organized by interview path.</h1>
          <p className="page-intro">
            Your channel videos are now grouped into clean learning paths: Core C++ interviews,
            concurrency/low-latency systems, and the student C++ → EDA/HFT roadmap. Each video
            plays directly inside cppvalley.
          </p>
          <div className="platform-actions">
            <Link className="platform-button primary" href={youtubeChannelUrl} target="_blank" rel="noreferrer">
              Open channel
            </Link>
            <Link className="platform-button" href="/courses/third-year-cpp-eda-hft">
              Student roadmap
            </Link>
          </div>
        </section>

        <section className="platform-video-series" aria-label="Organized YouTube series">
          {youtubeSeries.map((series) => (
            <article className="platform-video-section" id={series.slug} key={series.slug}>
              <div className="platform-section-head compact">
                <span>{series.slug.replaceAll("-", " ")}</span>
                <h2>{series.title}</h2>
                <p>{series.description}</p>
                <p><strong>Audience:</strong> {series.audience}</p>
              </div>

              <div className="platform-grid">
                {series.videos.map((video) => (
                  <div className="platform-video-card" key={`${series.slug}-${video.videoId}`}>
                    <div className="platform-video-frame">
                      <iframe
                        src={youtubeEmbedUrl(video.videoId)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <span className="tag">{video.topic}</span>
                    <h3>{video.title}</h3>
                    <p><strong>{video.duration}</strong> · {video.level}</p>
                    <p>{video.intent}</p>
                    <Link href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
                      Open on YouTube ↗
                    </Link>
                  </div>
                ))}
              </div>

              <ul className="platform-keyword-list" aria-label={`${series.title} SEO topics`}>
                {series.seoKeywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

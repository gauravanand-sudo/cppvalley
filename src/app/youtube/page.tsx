import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "YouTube Series — C++, HFT, EDA and AI Systems",
  description:
    "Organized cppvalley YouTube videos for Core C++, HFT systems, EDA software, AI systems and interview preparation. Videos are grouped by learning path and embedded on-site.",
  alternates: { canonical: "/youtube" },
  keywords: [
    "cppvalley YouTube",
    "C++ interview videos",
    "HFT systems videos",
    "EDA software C++",
    "AI systems videos",
    "low latency C++",
  ],
};

export default function YoutubePage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">@cppvalley YouTube</p>
          <h1>Videos organized by interview path, not upload date.</h1>
          <p className="page-intro">
            Learners should not browse randomly. This page groups cppvalley videos into C++, HFT,
            EDA and AI systems tracks so every video supports a course, blog post or interview goal.
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

        <section className="platform-grid" aria-label="Organized YouTube series">
          {youtubeSeries.map((series) => (
            <article className="platform-video-card" id={series.slug} key={series.slug}>
              <span className="tag">{series.slug.replaceAll("-", " ")}</span>
              <h3>{series.title}</h3>
              <p>{series.description}</p>
              <p><strong>Audience:</strong> {series.audience}</p>

              {series.videos.map((video) => (
                <div className="platform-video-frame" key={`${series.slug}-${video.title}`}>
                  {video.videoId ? (
                    <iframe
                      src={youtubeEmbedUrl(video.videoId)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div>
                      <strong>{video.title}</strong>
                      <p>{video.topic} · {video.level}</p>
                    </div>
                  )}
                </div>
              ))}

              <ul>
                {series.seoKeywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="platform-dark-band">
          <h2>Video IDs needed for live embeds</h2>
          <p>
            I could not reliably extract your current @cppvalley video IDs from public search. The page is wired for embeds now: add each YouTube video ID in src/data/youtube.ts and the iframe appears automatically.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

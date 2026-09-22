import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "C++ Video Courses — cppvalley YouTube Library",
  description:
    "cppvalley video library for C++ interviews, unique_ptr, virtual functions, atomics, false sharing, low-latency C++, HFT systems and EDA/HFT student preparation.",
  alternates: { canonical: "/youtube" },
  keywords: [
    "cppvalley YouTube",
    "C++ video course",
    "C++ interview videos",
    "virtual functions C++ video",
    "unique_ptr deep dive video",
    "C++ atomics video",
    "false sharing C++ video",
    "low latency C++ video",
    "HFT systems videos",
    "EDA software C++ roadmap",
  ],
  openGraph: {
    title: "cppvalley Video Courses",
    description:
      "Organized C++ systems videos for interviews, low latency, atomics, HFT and EDA/HFT preparation.",
    url: "/youtube",
    type: "website",
  },
};

const allVideos = youtubeSeries.flatMap((series) =>
  series.videos.map((video) => ({
    ...video,
    seriesTitle: series.title,
    seriesSlug: series.slug,
  }))
);

const uniqueVideos = Array.from(new Map(allVideos.map((video) => [video.videoId, video])).values());
const featuredVideo = uniqueVideos.find((video) => video.videoId === "0wb01KTkKDo") ?? uniqueVideos[0];

const topicChips = [
  "Modern C++",
  "Object model",
  "RAII",
  "Atomics",
  "Low latency",
  "Interview prep",
  "HFT systems",
  "EDA/HFT roadmap",
] as const;

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "cppvalley C++ systems video library",
  itemListElement: uniqueVideos.map((video, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    name: video.title,
  })),
};

export default function YoutubePage() {
  return (
    <div className="page-shell video-catalog-page">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />

        <section className="youtube-catalog-hero">
          <div className="site-container youtube-catalog-hero-inner">
            <div className="youtube-catalog-copy">
              <p className="youtube-kicker">cppvalley video library</p>
              <h1>C++ systems videos arranged like a course catalog.</h1>
              <p>
                Watch focused cppvalley lessons on C++ interviews, ownership, virtual dispatch,
                atomics, CPU cache, false sharing and low-latency systems without leaving the site.
              </p>

              <div className="youtube-search-box" role="search" aria-label="Video library search placeholder">
                <span>⌕</span>
                <strong>Search topics:</strong>
                <em>unique_ptr, virtual destructor, atomics, false sharing, vtable</em>
              </div>

              <div className="youtube-hero-actions">
                <Link className="youtube-primary-cta" href="#all-videos">Browse video courses</Link>
                <Link className="youtube-secondary-cta" href="/courses">Explore courses</Link>
                <Link className="youtube-text-cta" href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                  Visit @cppvalley ↗
                </Link>
              </div>
            </div>

            {featuredVideo ? (
              <aside className="youtube-featured-course" aria-label="Featured cppvalley video">
                <div className="youtube-featured-video">
                  <iframe
                    src={youtubeEmbedUrl(featuredVideo.videoId)}
                    title={featuredVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="youtube-featured-meta">
                  <span>Featured lesson</span>
                  <h2>{featuredVideo.title}</h2>
                  <p>{featuredVideo.intent}</p>
                  <div className="youtube-rating-row">
                    <b>4.8</b>
                    <span>★★★★★</span>
                    <small>{featuredVideo.duration} · {featuredVideo.level}</small>
                  </div>
                  <Link href={`https://www.youtube.com/watch?v=${featuredVideo.videoId}`} target="_blank" rel="noreferrer">
                    Open on YouTube ↗
                  </Link>
                </div>
              </aside>
            ) : null}
          </div>
        </section>

        <section className="site-container youtube-stats-row" aria-label="cppvalley video stats">
          <div><strong>{uniqueVideos.length}</strong><span>videos</span></div>
          <div><strong>4h 54m</strong><span>watch time</span></div>
          <div><strong>{youtubeSeries.length}</strong><span>learning paths</span></div>
          <div><strong>Free</strong><span>embedded lessons</span></div>
        </section>

        <nav className="site-container youtube-topic-bar" aria-label="Video topics">
          <a href="#all-videos">All videos</a>
          {youtubeSeries.map((series) => (
            <a href={`#${series.slug}`} key={series.slug}>{series.title}</a>
          ))}
        </nav>

        <section className="site-container youtube-chip-row" aria-label="Popular video topics">
          {topicChips.map((topic) => <span key={topic}>{topic}</span>)}
        </section>

        <section className="site-container youtube-catalog-layout">
          <aside className="youtube-filter-panel" aria-label="Learning paths sidebar">
            <h2>Learning paths</h2>
            <p>Pick a path and watch in order, like a compact course.</p>
            <div className="youtube-path-list">
              {youtubeSeries.map((series) => (
                <a href={`#${series.slug}`} key={series.slug}>
                  <strong>{series.title}</strong>
                  <span>{series.videos.length} videos · {series.audience}</span>
                </a>
              ))}
            </div>
            <div className="youtube-side-cta">
              <strong>Want the full roadmap?</strong>
              <p>Pair videos with structured C++, EDA, HFT and systems courses.</p>
              <Link href="/courses">Explore courses</Link>
            </div>
          </aside>

          <div className="youtube-catalog-main">
            <section className="youtube-course-block" id="all-videos">
              <div className="youtube-block-head">
                <div>
                  <p>All cppvalley videos</p>
                  <h2>Most useful videos for C++ systems interviews</h2>
                </div>
                <Link href={youtubeChannelUrl} target="_blank" rel="noreferrer">Channel ↗</Link>
              </div>

              <div className="youtube-course-grid">
                {uniqueVideos.map((video) => (
                  <article className="youtube-course-card" key={video.videoId}>
                    <div className="youtube-course-frame">
                      <iframe
                        src={youtubeEmbedUrl(video.videoId)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="youtube-course-body">
                      <span className="youtube-course-topic">{video.topic}</span>
                      <h3>{video.title}</h3>
                      <p className="youtube-course-instructor">cppvalley · {video.seriesTitle}</p>
                      <div className="youtube-card-rating">
                        <b>4.8</b><span>★★★★★</span><small>{video.level}</small>
                      </div>
                      <p className="youtube-course-intent">{video.intent}</p>
                      <div className="youtube-course-footer">
                        <strong>{video.duration}</strong>
                        <a href={`#${video.seriesSlug}`}>View path</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {youtubeSeries.map((series) => (
              <section className="youtube-course-block" id={series.slug} key={series.slug}>
                <div className="youtube-block-head">
                  <div>
                    <p>{series.videos.length} videos · {series.audience}</p>
                    <h2>{series.title}</h2>
                  </div>
                  <Link href="/courses">Related courses ↗</Link>
                </div>
                <p className="youtube-block-description">{series.description}</p>

                <div className="youtube-row-list">
                  {series.videos.map((video, index) => (
                    <article className="youtube-row-card" key={`${series.slug}-${video.videoId}-${index}`}>
                      <div className="youtube-row-number">{String(index + 1).padStart(2, "0")}</div>
                      <div className="youtube-row-video">
                        <iframe
                          src={youtubeEmbedUrl(video.videoId)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div className="youtube-row-copy">
                        <span>{video.topic}</span>
                        <h3>{video.title}</h3>
                        <p>{video.intent}</p>
                        <small>{video.duration} · {video.level}</small>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="youtube-keyword-pills" aria-label={`${series.title} SEO topics`}>
                  {series.seoKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
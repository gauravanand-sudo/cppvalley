import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type VideoCoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return youtubeSeries.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: VideoCoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = youtubeSeries.find((item) => item.slug === slug);

  if (!series) return {};

  const firstVideo = series.videos[0];

  return {
    title: `${series.title} — cppvalley Video Course`,
    description: series.description,
    alternates: { canonical: `/youtube/${series.slug}` },
    keywords: series.seoKeywords,
    openGraph: {
      title: series.title,
      description: series.description,
      url: `/youtube/${series.slug}`,
      type: "video.other",
      images: firstVideo ? [{ url: `https://img.youtube.com/vi/${firstVideo.videoId}/hqdefault.jpg`, alt: firstVideo.title }] : undefined,
    },
  };
}

function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export default async function VideoCoursePage({ params }: VideoCoursePageProps) {
  const { slug } = await params;
  const series = youtubeSeries.find((item) => item.slug === slug);

  if (!series) notFound();

  const firstVideo = series.videos[0];
  const relatedSeries = youtubeSeries.filter((item) => item.slug !== series.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: series.title,
    description: series.description,
    url: `https://cppvalley.com/youtube/${series.slug}`,
    provider: {
      "@type": "Organization",
      name: "cppvalley",
      sameAs: youtubeChannelUrl,
    },
    hasCourseInstance: series.videos.map((video, index) => ({
      "@type": "VideoObject",
      position: index + 1,
      name: video.title,
      embedUrl: youtubeEmbedUrl(video.videoId),
      url: youtubeWatchUrl(video.videoId),
    })),
  };

  return (
    <div className="page-shell lp-page academic-page video-course-watch-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main className="lp-main">
        <section className="video-watch-shell">
          <div className="video-watch-main">
            {firstVideo ? (
              <iframe
                src={youtubeEmbedUrl(firstVideo.videoId)}
                title={firstVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : null}
          </div>

          <aside className="video-watch-sidebar" aria-label="Course curriculum">
            <div className="video-watch-sidebar-head">
              <strong>Course content</strong>
              <span>{series.videos.length} lessons</span>
            </div>
            <nav>
              {series.videos.map((video, index) => (
                <a href={`#lesson-${video.videoId}`} key={`${video.videoId}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{video.topic}</strong>
                  <small>{video.duration}</small>
                </a>
              ))}
            </nav>
          </aside>
        </section>

        <section className="academic-hero video-course-hero">
          <div className="site-container">
            <nav className="lp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/youtube">Video Courses</Link>
              <span>/</span>
              <span>{series.title}</span>
            </nav>
            <p className="lp-kicker">cppvalley video course</p>
            <h1>{series.title}</h1>
            <p>{series.description}</p>
            <div className="course-tags">
              {series.seoKeywords.slice(0, 6).map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Curriculum</p>
              <h2>Lessons in this course</h2>
            </div>
            <Link className="lp-card-link" href={youtubeChannelUrl} target="_blank" rel="noreferrer">Channel ↗</Link>
          </div>

          <div className="video-lesson-list">
            {series.videos.map((video, index) => (
              <article className="video-lesson-card" id={`lesson-${video.videoId}`} key={`${video.videoId}-${index}`}>
                <div className="video-lesson-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="video-lesson-player">
                  <iframe
                    src={youtubeEmbedUrl(video.videoId)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="video-lesson-copy">
                  <span className="course-badge">{video.topic}</span>
                  <h3>{video.title}</h3>
                  <p>{video.intent}</p>
                  <div className="lp-meta"><span>{video.duration}</span><span>{video.level}</span></div>
                  <Link className="lp-card-link" href={youtubeWatchUrl(video.videoId)} target="_blank" rel="noreferrer">Open on YouTube ↗</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {relatedSeries.length ? (
          <section className="site-container lp-section">
            <div className="lp-section-head">
              <div>
                <p className="lp-kicker">More video courses</p>
                <h2>Continue with another series</h2>
              </div>
            </div>
            <div className="lp-course-grid">
              {relatedSeries.map((item) => (
                <Link className="lp-course-card academic-course-card" href={`/youtube/${item.slug}`} key={item.slug}>
                  <div className="lp-card-thumb academic-card-thumb">
                    <span>Video course</span>
                    <strong>{item.videos.length} lessons</strong>
                  </div>
                  <div className="lp-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

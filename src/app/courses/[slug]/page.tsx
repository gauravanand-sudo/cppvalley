import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoCoursePlayer } from "@/components/VideoCoursePlayer";
import { courses, coursesBySlug } from "@/data/courses";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type CoursePageProps = { params: Promise<{ slug: string }> };

const lessonCourseMap: Record<string, string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "concurrency-low-latency",
  "student-roadmap-lessons": "student-roadmap",
};

const courseAdSlot = process.env.NEXT_PUBLIC_ADSENSE_COURSE_SLOT;

function getSeriesForCourse(slug: string) {
  const seriesSlug = lessonCourseMap[slug];
  return seriesSlug ? youtubeSeries.find((series) => series.slug === seriesSlug) : undefined;
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);
  if (!course) return {};
  const series = getSeriesForCourse(slug);
  const firstVideo = series?.videos[0];
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    keywords: course.tags,
    openGraph: {
      title: course.title,
      description: course.description,
      url: `/courses/${course.slug}`,
      type: series ? "video.other" : "website",
      images: firstVideo
        ? [{ url: `https://img.youtube.com/vi/${firstVideo.videoId}/hqdefault.jpg`, alt: firstVideo.title }]
        : [{ url: `/courses/${course.slug}/opengraph-image`, alt: course.title }],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);
  if (!course) notFound();
  const series = getSeriesForCourse(slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.longDescription,
    url: `https://cppvalley.com/courses/${course.slug}`,
    provider: { "@type": "Organization", name: "cppvalley", sameAs: youtubeChannelUrl },
    educationalLevel: course.level,
    teaches: course.tags,
    ...(series ? {
      hasCourseInstance: series.videos.map((video, index) => ({
        "@type": "VideoObject",
        position: index + 1,
        name: video.title,
        embedUrl: youtubeEmbedUrl(video.videoId),
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
      })),
    } : {}),
  };

  if (series) {
    return (
      <div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <SiteHeader />
        <main className="page-main">
          <section className="course-player-wrap">
            <div className="site-container">
              <div className="course-player-intro">
                <p className="eyebrow">{course.pillar} · video course</p>
                <h1>{course.title}</h1>
                <p>{series.description}</p>
                <Link className="text-link" href="/courses">← All courses</Link>
              </div>
              <VideoCoursePlayer series={series} />
              <AdSlot slot={courseAdSlot} className="ad-slot-leaderboard" />
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero">
          <div className="site-container">
            <Link className="text-link" href="/courses">← Courses</Link>
            <p className="eyebrow" style={{ marginTop: 28 }}>{course.pillar}</p>
            <h1 className="page-title">{course.title}</h1>
            <p>{course.description}</p>
          </div>
        </section>

        <section className="site-container course-detail-grid">
          <div>
            <p className="eyebrow">Course map</p>
            <p className="course-summary">{course.longDescription}</p>
            <div className="module-list">
              {course.modules.map((module, index) => (
                <div className="module-row" key={module}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{module}</strong>
                </div>
              ))}
            </div>
            <AdSlot slot={courseAdSlot} className="ad-slot-leaderboard" />
          </div>
          <aside className="panel course-facts" aria-label="Course details">
            <div className="fact"><span>Level</span><strong>{course.level}</strong></div>
            <div className="fact"><span>Scope</span><strong>{course.duration}</strong></div>
            <div className="fact"><span>Track</span><strong>{course.pillar}</strong></div>
            <div className="fact"><span>Topics</span><strong>{course.tags.join(" · ")}</strong></div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

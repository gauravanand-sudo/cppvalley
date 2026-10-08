import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoCoursePlayer } from "@/components/VideoCoursePlayer";
import { courses, coursesBySlug } from "@/data/courses";
import { imageForCourse } from "@/data/media";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type CoursePageProps = { params: Promise<{ slug: string }> };

const lessonCourseMap: Record<string, string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "concurrency-low-latency",
  "student-roadmap-lessons": "student-roadmap",
};

const courseMarks: Record<string, string> = {
  "C++ Core": "C++",
  Systems: "SYS",
  "EDA / CAD": "EDA",
  "GPU / AI": "GPU",
  Roadmap: "MAP",
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
  const courseImage = imageForCourse(course.slug, course.pillar);

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
              <Link className="breadcrumb" href="/courses">← All courses</Link>
              <div className="course-player-intro course-player-intro-grid">
                <div>
                  <div className="course-kicker"><span>{courseMarks[course.pillar] ?? "C++"}</span>{course.pillar} · Video course</div>
                  <h1>{course.title}</h1>
                  <p>{series.description}</p>
                  <div className="tag-row">
                    <span className="tag">{course.level}</span>
                    <span className="tag">{course.duration}</span>
                    {course.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="course-player-cover"><img src={courseImage} alt="" /></div>
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
        <section className="course-landing image-course-landing">
          <div className="site-container course-landing-grid">
            <div>
              <Link className="breadcrumb" href="/courses">← All courses</Link>
              <div className="course-kicker"><span>{courseMarks[course.pillar] ?? "C++"}</span>{course.pillar}</div>
              <h1>{course.title}</h1>
              <p className="course-landing-copy">{course.description}</p>
              <div className="tag-row course-landing-tags">
                {course.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <a className="button primary" href="#curriculum">View curriculum <span aria-hidden="true">↓</span></a>
            </div>

            <aside className="course-quick-card image-course-quick-card" aria-label="Course overview">
              <div className="course-quick-image-wrap">
                <img className="course-quick-image" src={courseImage} alt="" />
                <div className="course-quick-image-shade" />
                <div className="quick-card-mark">{courseMarks[course.pillar] ?? "C++"}</div>
              </div>
              <div className="course-quick-body">
                <div className="fact"><span>Level</span><strong>{course.level}</strong></div>
                <div className="fact"><span>Scope</span><strong>{course.duration}</strong></div>
                <div className="fact"><span>Track</span><strong>{course.pillar}</strong></div>
                <div className="fact"><span>Curriculum</span><strong>{course.modules.length} modules</strong></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container course-detail-grid" id="curriculum">
          <div>
            <div className="content-heading">
              <p className="eyebrow">Course overview</p>
              <h2>Learn the concepts in a deliberate order.</h2>
              <p className="course-summary">{course.longDescription}</p>
            </div>

            <div className="learn-grid" aria-label="Topics covered">
              {course.tags.map((tag, index) => (
                <div key={tag}><span>{String(index + 1).padStart(2, "0")}</span><strong>{tag}</strong></div>
              ))}
            </div>

            <div className="curriculum-head">
              <div><p className="eyebrow">Curriculum</p><h2>{course.modules.length} focused modules</h2></div>
              <span>{course.duration}</span>
            </div>
            <div className="module-list">
              {course.modules.map((module, index) => (
                <div className="module-row" key={module}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{module}</strong>
                  <span className="module-status">Module</span>
                </div>
              ))}
            </div>
            <AdSlot slot={courseAdSlot} className="ad-slot-leaderboard" />
          </div>

          <aside className="course-side-note">
            <img className="course-side-note-image" src={courseImage} alt="" loading="lazy" />
            <span className="mini-label">How to use this course</span>
            <h3>Study for understanding, not completion.</h3>
            <p>Work through the modules in order, revisit the concepts that feel fuzzy, and use the engineering notes as deeper reference material.</p>
            <Link className="text-link" href="/blog">Browse engineering notes →</Link>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

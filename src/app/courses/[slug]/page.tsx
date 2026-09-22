import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoCoursePlayer } from "@/components/VideoCoursePlayer";
import { courses, coursesBySlug, type Course } from "@/data/courses";
import { youtubeChannelUrl, youtubeEmbedUrl, youtubeSeries } from "@/data/youtube";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const lessonCourseMap: Record<string, string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "concurrency-low-latency",
  "student-roadmap-lessons": "student-roadmap",
};

function getSeriesForCourse(slug: string) {
  const seriesSlug = lessonCourseMap[slug];
  if (!seriesSlug) return undefined;
  return youtubeSeries.find((series) => series.slug === seriesSlug);
}

function isCourseRoutable(course: Course) {
  return course.href === `/courses/${course.slug}` || course.href === "/curriculum" || Boolean(getSeriesForCourse(course.slug));
}

export function generateStaticParams() {
  return courses
    .filter((course) => course.slug !== "third-year-cpp-eda-hft")
    .map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || !isCourseRoutable(course)) return {};

  const series = getSeriesForCourse(slug);
  const firstVideo = series?.videos[0];

  return {
    title: `${course.title} — cppvalley Course`,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    keywords: course.tags,
    openGraph: {
      title: course.title,
      description: course.description,
      url: `/courses/${course.slug}`,
      type: series ? "video.other" : "website",
      images: series && firstVideo
        ? [{ url: `https://img.youtube.com/vi/${firstVideo.videoId}/hqdefault.jpg`, alt: firstVideo.title }]
        : [{ url: `/courses/${course.slug}/opengraph-image`, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [`/courses/${course.slug}/opengraph-image`],
    },
  };
}

function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function courseSignal(course: Course) {
  if (course.slug === "third-year-cpp-eda-hft") return "Recommended for students";
  if (course.level.includes("Beginner")) return "Beginner friendly";
  if (course.tags.some((tag) => tag.toLowerCase().includes("interview")) || course.title.toLowerCase().includes("interview")) return "Interview focused";
  if (course.level.includes("Advanced") || course.level.includes("Senior")) return "Advanced systems";
  if (course.pillar === "Roadmap") return "Roadmap";
  return "Focused track";
}

function courseOutcome(course: Course) {
  if (course.pillar === "Roadmap") return "Know the order to learn C++, systems, EDA and HFT topics without wasting months on unrelated material.";
  if (course.pillar === "C++ Core") return "Build interview-ready C++ depth with ownership, language rules, design trade-offs and debugging intuition.";
  if (course.pillar === "Systems") return "Understand how low-level systems, Linux, networking and latency-sensitive software are designed and measured.";
  if (course.pillar === "EDA / CAD") return "Connect C++ systems skills to graph-heavy EDA/CAD software problems and interview themes.";
  return "Learn the infrastructure concepts behind GPU, CUDA, AI serving and production backend systems.";
}

function courseGoodFor(course: Course) {
  if (course.pillar === "Roadmap") return "3rd/4th year students, internship prep and learners choosing between EDA, HFT and systems paths.";
  if (course.tags.includes("HFT") || course.title.includes("Low-Latency")) return "Students targeting HFT, low-latency C++ and performance-heavy systems roles.";
  if (course.pillar === "GPU / AI") return "Students moving toward GPU programming, AI infra, backend infra or systems design interviews.";
  if (course.pillar === "EDA / CAD") return "Students interested in EDA software, CAD tools, graph algorithms and C++ roles in semiconductor tooling.";
  return "Students preparing for C++ interviews and engineers who want stronger systems foundations.";
}

function coursePrerequisites(course: Course) {
  if (course.level.includes("Beginner")) return "Basic programming and willingness to write C++ examples while reading.";
  if (course.pillar === "GPU / AI") return "Comfortable C++ or Python basics, arrays, memory concepts and basic command-line workflow.";
  if (course.pillar === "Systems") return "C++ fundamentals, basic data structures and curiosity about Linux, CPUs and networking.";
  return "Modern C++ basics, data structures and enough practice to read medium-sized examples.";
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || !isCourseRoutable(course)) notFound();

  const series = getSeriesForCourse(slug);

  if (series) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.title,
      description: course.description,
      url: `https://cppvalley.com/courses/${course.slug}`,
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
      <div className="page-shell lp-page modern-page video-course-watch-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main className="course-player-page">
          <VideoCoursePlayer series={series} />
        </main>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.longDescription,
    url: `https://cppvalley.com/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "cppvalley",
      sameAs: "https://www.youtube.com/@cppvalley",
    },
    educationalLevel: course.level,
    teaches: course.tags,
  };

  return (
    <div className="page-shell lp-page course-detail-page modern-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main className="lp-main">
        <section className="site-container lp-section course-detail-simple smooth-course-detail">
          <nav className="lp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <span>{course.shortTitle}</span>
          </nav>

          <p className="lp-kicker">{course.pillar}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="lp-meta"><span>{courseSignal(course)}</span><span>{course.level}</span><span>{course.duration}</span></div>
          <div className="lp-actions course-detail-actions">
            <Link className="lp-button primary" href="/interviews">Practice interview questions</Link>
            <Link className="lp-button" href="/courses">All courses</Link>
          </div>

          <div className="course-insight-grid" aria-label="Course guidance">
            <article className="course-insight-card">
              <span>Outcome</span>
              <p>{courseOutcome(course)}</p>
            </article>
            <article className="course-insight-card">
              <span>Good for</span>
              <p>{courseGoodFor(course)}</p>
            </article>
            <article className="course-insight-card">
              <span>Prerequisites</span>
              <p>{coursePrerequisites(course)}</p>
            </article>
          </div>

          <div className="course-module-grid">
            {course.modules.map((module, index) => (
              <article className="course-module-card" key={module}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{module}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

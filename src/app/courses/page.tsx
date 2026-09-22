import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses, type Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — cppvalley",
  description: "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "cppvalley Courses",
    description: "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
    url: "/courses",
    images: [{ url: "/courses/opengraph-image", alt: "cppvalley courses" }],
  },
};

function courseHref(course: Course) {
  if (course.href.startsWith("/youtube/") || course.href === "/curriculum") return `/courses/${course.slug}`;
  return course.href;
}

function courseSignal(course: Course) {
  if (course.slug === "third-year-cpp-eda-hft") return "Recommended for students";
  if (course.level.includes("Beginner")) return "Beginner friendly";
  if (course.title.toLowerCase().includes("interview")) return "Interview focused";
  if (course.level.includes("Advanced") || course.level.includes("Senior")) return "Advanced systems";
  if (course.pillar === "Roadmap") return "Roadmap";
  return "Focused track";
}

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page modern-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container lp-section clean-page-section">
          <header className="clean-page-head smooth-page-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Courses</h1>
            </div>
            <p className="catalog-subcopy">Pick one focused track. Each card shows level, duration and the best use case.</p>
          </header>

          <div className="lp-course-grid flagship-course-grid smooth-course-grid">
            {sortedCourses.map((course) => (
              <Link className="lp-course-card smooth-course-card" href={courseHref(course)} key={course.slug}>
                <div className="lp-card-body">
                  <span className="course-card-eyebrow">{courseSignal(course)}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.pillar}</span><span>{course.level}</span><span>{course.duration}</span></div>
                  <strong className="lp-link-text">Open course →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

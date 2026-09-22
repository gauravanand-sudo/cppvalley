import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses, type Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Courses",
  description:
    "C++, HFT, EDA, CUDA, GPU and AI systems courses for students and engineers.",
  alternates: { canonical: "/" },
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

const journey = [
  ["1", "Pick a course", "Choose one track instead of jumping between random topics."],
  ["2", "Practice interviews", "Use question sets to test your C++, systems and design depth."],
  ["3", "Read deep dives", "Use blog posts to understand architecture, latency and trade-offs."],
  ["4", "Revise with books", "Use book summaries as compact revision anchors."],
] as const;

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page modern-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="lp-hero compact-hero smooth-hero">
          <div className="site-container">
            <p className="lp-kicker">cppvalley</p>
            <h1>Learn C++ systems for HFT, EDA, GPU and AI infrastructure roles.</h1>
            <p>Courses, interview questions, blog notes and book summaries for students preparing for serious systems engineering roles.</p>
            <div className="lp-actions hero-cta-row">
              <Link className="lp-button primary" href="/courses">Browse courses</Link>
              <Link className="lp-button" href="/interviews">Practice interviews</Link>
            </div>
          </div>
        </section>

        <section className="site-container lp-section suggested-path-section" aria-labelledby="suggested-path-heading">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Suggested path</p>
              <h2 id="suggested-path-heading">How to use cppvalley</h2>
            </div>
          </div>
          <div className="journey-grid">
            {journey.map(([step, title, copy]) => (
              <article className="journey-card" key={title}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container lp-section" id="courses">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h2>Choose a course</h2>
            </div>
            <Link className="lp-card-link" href="/courses">View all</Link>
          </div>

          <div className="lp-course-grid flagship-course-grid smooth-course-grid">
            {sortedCourses.slice(0, 12).map((course) => (
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

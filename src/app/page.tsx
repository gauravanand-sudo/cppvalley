import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Courses",
  description:
    "C++, HFT, EDA, CUDA, GPU and AI systems courses for students and engineers.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page academic-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="academic-hero lp-hero compact-hero social-hero">
          <div className="site-container">
            <p className="lp-kicker">cppvalley</p>
            <h1>C++ systems courses for serious students.</h1>
            <p>Learn C++, HFT, EDA, CUDA, GPU and AI systems through focused course tracks.</p>
            <div className="lp-actions hero-cta-row">
              <Link className="lp-button primary" href="/courses/third-year-cpp-eda-hft">Start here</Link>
              <Link className="lp-button" href="/courses">Browse courses</Link>
              <Link className="lp-button" href="/interviews">Practice interviews</Link>
            </div>
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

          <div className="lp-course-grid flagship-course-grid">
            {sortedCourses.slice(0, 12).map((course) => (
              <Link className="lp-course-card academic-course-card" href={course.href} key={course.slug}>
                <div className="lp-card-thumb academic-card-thumb">
                  <span>{course.pillar}</span>
                  <strong>{course.shortTitle}</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span></div>
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

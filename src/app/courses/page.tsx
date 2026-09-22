import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — cppvalley",
  description: "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page academic-page clean-courses-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container clean-page-section">
          <header className="clean-page-head clean-page-head-with-cta">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Courses</h1>
            </div>
            <div className="clean-head-actions">
              <Link className="lp-button primary" href="/courses/third-year-cpp-eda-hft">Start here</Link>
              <Link className="lp-button" href="/interviews">Interview questions</Link>
            </div>
          </header>

          <div className="clean-course-list">
            {sortedCourses.map((course) => (
              <Link className="clean-course-row" href={course.href} key={course.slug}>
                <div className="clean-course-main">
                  <span>{course.pillar}</span>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                </div>
                <div className="clean-course-meta">
                  <strong>{course.duration}</strong>
                  <small>{course.level}</small>
                  <em>Open →</em>
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

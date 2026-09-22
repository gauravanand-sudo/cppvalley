import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — cppvalley",
  description:
    "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page academic-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container lp-section" id="courses">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Courses</h1>
            </div>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {sortedCourses.map((course) => (
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

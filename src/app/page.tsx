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
        <section className="academic-hero lp-hero compact-hero">
          <div className="site-container">
            <p className="lp-kicker">cppvalley</p>
            <h1>C++ systems courses.</h1>
            <p>C++, HFT, EDA, CUDA, GPU and AI systems — organized as direct course tracks.</p>
          </div>
        </section>

        <section className="site-container lp-section" id="courses">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h2>Choose a course</h2>
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

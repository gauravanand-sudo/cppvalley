import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coursePillars, courseStats, courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — C++ Systems, HFT and Interview Prep",
  description:
    "Browse public cppvalley learning paths for Core C++, student systems preparation, HFT systems and C++ systems video lessons.",
  alternates: { canonical: "/courses" },
  keywords: [
    "C++ courses",
    "C++ interview preparation",
    "HFT systems course",
    "low latency C++ course",
    "EDA software roadmap",
    "systems interview preparation"
  ],
};

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="catalog-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Focused C++ systems learning paths for students.</h1>
              <p>
                Start with the courses that are ready to read, watch or follow today. The catalog is kept intentionally clean so students do not land on empty or unfinished tracks.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#available-courses">Browse courses</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top">
                <span>Available now</span>
                <strong>{courseStats.totalCourses} public learning paths</strong>
              </div>
              <div className="lp-stat-grid">
                <div><strong>C++</strong><span>core</span></div>
                <div><strong>HFT</strong><span>systems</span></div>
                <div><strong>EDA</strong><span>roadmap</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row" aria-label="Course areas">
          <a href="#available-courses">All</a>
          {coursePillars.map((pillar) => (
            <a href={`#${pillar.toLowerCase().replaceAll(" ", "-")}`} key={pillar}>{pillar}</a>
          ))}
        </section>

        <section className="site-container lp-section" id="available-courses">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Available courses</p>
              <h2>Choose a track</h2>
              <p>Each card links to an actual course page, curriculum, video library or roadmap that students can use immediately.</p>
            </div>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {sortedCourses.map((course) => (
              <Link className="lp-course-card" href={course.href} id={course.slug} key={course.slug}>
                <div className="lp-card-thumb">
                  <span>{course.pillar}</span>
                  <strong>{course.shortTitle}</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span><span>{course.lessons}</span></div>
                  <div className="course-tags">
                    {course.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <strong className="lp-link-text">Open →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {coursePillars.map((pillar) => (
          <section className="site-container lp-section" id={pillar.toLowerCase().replaceAll(" ", "-")} key={pillar}>
            <div className="lp-section-head">
              <div>
                <p className="lp-kicker">{pillar}</p>
                <h2>{pillar} tracks</h2>
              </div>
            </div>
            <div className="course-row-list">
              {sortedCourses.filter((course) => course.pillar === pillar).map((course) => (
                <Link className="course-row-card no-image-row" href={course.href} key={course.slug}>
                  <div>
                    <span>{course.pillar}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                  <strong>{course.duration}</strong>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}

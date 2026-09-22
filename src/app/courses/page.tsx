import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coursePillars, courseStats, courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — C++, HFT, EDA, CUDA, GPU and AI Systems",
  description:
    "Browse cppvalley curricula for C++, advanced modern C++, STL and LLD, concurrency, Linux, HFT, trading systems, EDA, CUDA, GPU programming, AI systems and distributed infrastructure.",
  alternates: { canonical: "/courses" },
  keywords: [
    "C++ courses",
    "C++ interview preparation",
    "HFT systems course",
    "low latency C++ course",
    "CUDA GPU programming course",
    "AI systems engineering course",
    "EDA software engineering course",
    "systems interview preparation"
  ],
};

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page academic-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="academic-hero catalog-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Curricula for C++, HFT, EDA, CUDA, GPU and AI systems.</h1>
              <p>
                cppvalley is organized as a clean academic catalog. Each course page contains a curriculum outline students can follow, without empty lessons or unfinished content blocks.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#all-courses">Browse curricula</Link>
                <Link className="lp-button" href="/youtube">Video courses</Link>
              </div>
            </div>
            <aside className="lp-hero-card academic-info-card">
              <div className="lp-hero-card-top">
                <span>Catalog</span>
                <strong>{courseStats.totalCourses} curricula</strong>
              </div>
              <div className="lp-stat-grid">
                <div><strong>C++</strong><span>core</span></div>
                <div><strong>HFT</strong><span>systems</span></div>
                <div><strong>AI</strong><span>infra</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row academic-topic-row" aria-label="Course areas">
          <a href="#all-courses">All</a>
          {coursePillars.map((pillar) => (
            <a href={`#${pillar.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`} key={pillar}>{pillar}</a>
          ))}
        </section>

        <section className="site-container lp-section" id="all-courses">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">All courses</p>
              <h2>Curriculum catalog</h2>
              <p>Open a course to see its module sequence. Video series are listed separately on the video courses page.</p>
            </div>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {sortedCourses.map((course) => (
              <Link className="lp-course-card academic-course-card" href={course.href} id={course.slug} key={course.slug}>
                <div className="lp-card-thumb academic-card-thumb">
                  <span>{course.pillar}</span>
                  <strong>{course.shortTitle}</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span></div>
                  <div className="course-tags">
                    {course.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <strong className="lp-link-text">Open curriculum →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {coursePillars.map((pillar) => (
          <section className="site-container lp-section" id={pillar.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")} key={pillar}>
            <div className="lp-section-head">
              <div>
                <p className="lp-kicker">{pillar}</p>
                <h2>{pillar} curricula</h2>
              </div>
            </div>
            <div className="course-row-list">
              {sortedCourses.filter((course) => course.pillar === pillar).map((course) => (
                <Link className="course-row-card no-image-row academic-row-card" href={course.href} key={course.slug}>
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

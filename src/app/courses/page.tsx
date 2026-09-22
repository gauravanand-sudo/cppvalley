import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coursePillars, courseStats, courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — C++, HFT, EDA, CUDA, GPU and AI Systems",
  description:
    "Browse the cppvalley course catalog covering Core C++, advanced modern C++, STL and LLD, concurrency, Linux, HFT, trading systems, EDA, CUDA, GPU programming, AI systems and distributed backend infrastructure.",
  alternates: { canonical: "/courses" },
  keywords: [
    "C++ courses",
    "HFT systems course",
    "CUDA GPU programming course",
    "AI systems engineering course",
    "EDA software engineering course",
    "low latency C++ course",
    "C++ concurrency course",
    "systems interview preparation",
  ],
};

const launchPlan = [
  {
    phase: "Phase 1",
    title: "Launch foundation",
    text: "Core C++, student roadmap, HFT/low-latency and AI systems give the site enough breadth without looking empty.",
  },
  {
    phase: "Phase 2",
    title: "Add systems depth",
    text: "Concurrency, Linux/networking, STL/LLD and trading systems turn cppvalley into a serious systems platform.",
  },
  {
    phase: "Phase 3",
    title: "Add specialist tracks",
    text: "EDA, CUDA/GPU, advanced C++ and distributed AI infrastructure complete the long-term catalog.",
  },
] as const;

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page course-catalog-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="catalog-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Course catalog</p>
              <h1>12 flagship courses covering C++, HFT, EDA, CUDA, GPU and AI systems.</h1>
              <p>
                The catalog is intentionally focused: enough courses to cover the full systems roadmap, not so many that learners get lost. Every course has an image-first card, clear level, duration, modules, outcomes and projects.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#all-courses">Browse courses</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top">
                <span>Recommended catalog size</span>
                <strong>{courseStats.totalCourses} main courses</strong>
              </div>
              <div className="lp-stat-grid">
                <div><strong>{courseStats.pillars}</strong><span>pillars</span></div>
                <div><strong>{courseStats.liveOrBuilding}</strong><span>live/building</span></div>
                <div><strong>3</strong><span>launch phases</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row" aria-label="Course pillars">
          <a href="#all-courses">All courses</a>
          {coursePillars.map((pillar) => <a href={`#${pillar.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`} key={pillar}>{pillar}</a>)}
        </section>

        <section className="site-container lp-section course-launch-plan">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Build order</p>
              <h2>Launch in phases, not chaos</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {launchPlan.map((item) => (
              <article className="lp-card" key={item.phase}>
                <img className="course-card-image" src={`/course-cover/${item.phase.toLowerCase().replaceAll(" ", "-")}`} alt={`${item.phase} course launch cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container lp-section" id="all-courses">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">All flagship courses</p>
              <h2>Image-first course catalog</h2>
              <p>Each card uses a real generated cover image so the catalog feels like a production learning platform, not a text directory.</p>
            </div>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {sortedCourses.map((course) => (
              <Link className="lp-course-card image-course-card" href={course.href} id={course.slug} key={course.slug}>
                <img className="course-card-image" src={course.coverImage} alt={`${course.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <div className="course-card-topline">
                    <span className="course-badge">{course.status}</span>
                    <span>{course.launchPhase}</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span><span>{course.lessons}</span></div>
                  <div className="course-tags">
                    {course.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <strong className="lp-link-text">Open course →</strong>
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
                <h2>{pillar} courses</h2>
              </div>
            </div>
            <div className="course-row-list">
              {sortedCourses.filter((course) => course.pillar === pillar).map((course) => (
                <Link className="course-row-card" href={course.href} key={course.slug}>
                  <img src={course.coverImage} alt={`${course.title} cover`} loading="lazy" />
                  <div>
                    <span>{course.status} · {course.launchPhase}</span>
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

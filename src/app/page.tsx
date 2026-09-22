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
  ["1", "Pick a track", "Choose one role path instead of jumping between random topics."],
  ["2", "Watch and read", "Use course pages, lesson players and blog deep dives together."],
  ["3", "Practice interviews", "Answer company-style prompts before checking the framework."],
  ["4", "Revise fast", "Use books and notes as compact revision before interviews."],
] as const;

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);
  const topCourses = sortedCourses.slice(0, 8);
  const pillars = Array.from(new Set(sortedCourses.map((course) => course.pillar)));

  return (
    <div className="page-shell lp-page modern-page market-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="market-home-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <p className="lp-kicker">cppvalley learning marketplace</p>
              <h1>Learn C++ systems for HFT, EDA, GPU and AI infrastructure roles.</h1>
              <p>Structured courses, video lessons, interview banks, engineering notes and book summaries for students preparing for serious systems engineering roles.</p>
              <div className="lp-actions hero-cta-row">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/interviews">Practice interviews</Link>
              </div>
              <div className="market-stats-row" aria-label="Platform stats">
                <span className="market-stat-pill">{sortedCourses.length} learning tracks</span>
                <span className="market-stat-pill">C++ · HFT · EDA · GPU</span>
                <span className="market-stat-pill">Student-first roadmap</span>
              </div>
            </div>

            <aside className="market-hero-panel">
              <strong>Start with the right track</strong>
              <ul>
                <li>Use the roadmap if you are in 3rd/4th year.</li>
                <li>Use Core C++ before HFT, EDA or GPU tracks.</li>
                <li>Practice interviews after every module cluster.</li>
              </ul>
              <Link className="lp-button primary" href="/courses/third-year-cpp-eda-hft">Student roadmap</Link>
            </aside>
          </div>
        </section>

        <div className="site-container market-topic-row" aria-label="Browse by topic">
          {pillars.map((pillar) => <a href="/courses" key={pillar}>{pillar}</a>)}
        </div>

        <section className="site-container lp-section suggested-path-section" aria-labelledby="suggested-path-heading">
          <div className="market-section-head">
            <div>
              <p className="lp-kicker">Learning path</p>
              <h2 id="suggested-path-heading">A marketplace, but with a clear student path</h2>
              <p>Move from choosing one course to practicing questions and revising with notes.</p>
            </div>
          </div>
          <div className="market-grid-3">
            {journey.slice(0, 3).map(([step, title, copy]) => (
              <article className="market-grid-card" key={title}>
                <span className="course-badge">Step {step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container lp-section" id="courses">
          <div className="market-section-head">
            <div>
              <p className="lp-kicker">Popular courses</p>
              <h2>Courses students open first</h2>
              <p>Course cards now behave like a learning marketplace: topic, level, duration and next action are visible at a glance.</p>
            </div>
            <Link className="lp-card-link" href="/courses">View all</Link>
          </div>

          <div className="market-course-list">
            {topCourses.map((course) => (
              <Link className="market-course-card" href={courseHref(course)} key={course.slug}>
                <div className="market-card-thumb">
                  <div>
                    <span>{course.pillar}</span>
                    <strong>{course.shortTitle}</strong>
                  </div>
                </div>
                <div className="market-card-body">
                  <span className="course-card-eyebrow">{courseSignal(course)}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="market-rating-row"><strong>4.8</strong><span>Student-ready</span><span>{course.duration}</span></div>
                  <div className="market-card-meta"><span>{course.level}</span><span>{course.tags.slice(0, 2).join(" · ")}</span></div>
                </div>
                <div className="market-card-action">Open course →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

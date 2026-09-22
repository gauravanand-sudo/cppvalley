import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courseStats, courses, featuredCourses } from "@/data/courses";
import { lessons } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Platform",
  description:
    "Learn C++ systems, HFT, low-latency engineering, EDA software basics and interview preparation through focused courses, videos, projects and questions.",
  alternates: { canonical: "/" },
};

const categories = [
  "C++ Core",
  "HFT Systems",
  "Low Latency",
  "EDA Software",
  "Interview Practice",
  "Projects",
] as const;

const resourceTiles = [
  { title: "Courses", href: "/courses", text: "Focused learning paths that are available now." },
  { title: "Videos", href: "/youtube", text: "Embedded cppvalley lessons grouped by topic." },
  { title: "Practice", href: "/interviews", text: "Company-style C++ and systems interview questions." },
  { title: "Projects", href: "/projects", text: "Portfolio project ideas with design trade-offs." },
  { title: "Articles", href: "/blog", text: "Daily notes on C++, systems and interviews." },
  { title: "Books", href: "/books", text: "Reading paths mapped to interviews and projects." },
] as const;

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="lp-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">C++ systems learning platform</p>
              <h1>Learn C++ systems skills for interviews, HFT and EDA software roles.</h1>
              <p>
                cppvalley keeps the public site focused: courses, video lessons, interview questions, projects and articles that students can use immediately.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
                <Link className="lp-button" href="/youtube">Watch videos</Link>
              </div>
            </div>

            <aside className="lp-hero-card" aria-label="cppvalley summary">
              <div className="lp-hero-card-top">
                <span>Available now</span>
                <strong>{courseStats.totalCourses} learning paths</strong>
              </div>
              <p>Start with Core C++, the student EDA/HFT roadmap, the HFT systems curriculum or the video lesson library.</p>
              <div className="lp-stat-grid">
                <div><strong>{courseStats.totalCourses}</strong><span>paths</span></div>
                <div><strong>{lessons.length}</strong><span>HFT lessons</span></div>
                <div><strong>8</strong><span>videos</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row" aria-label="Browse topics">
          {categories.map((category) => <Link href="/courses" key={category}>{category}</Link>)}
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Featured learning paths</p>
              <h2>Start with a real track</h2>
            </div>
            <Link className="lp-card-link" href="/courses">View courses</Link>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {featuredCourses.map((course) => (
              <Link className="lp-course-card" href={course.href} key={course.slug}>
                <div className="lp-card-thumb">
                  <span>{course.pillar}</span>
                  <strong>{course.shortTitle}</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span><span>{course.lessons}</span></div>
                  <div className="course-tags">
                    {course.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Course catalog</p>
              <h2>Clean public tracks</h2>
            </div>
          </div>
          <div className="course-row-list compact-home-course-list">
            {sortedCourses.map((course) => (
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

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Resource library</p>
              <h2>Useful public sections</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {resourceTiles.map((tile) => (
              <Link className="lp-card" href={tile.href} key={tile.title}>
                <div className="lp-card-body">
                  <h3>{tile.title}</h3>
                  <p>{tile.text}</p>
                  <strong className="lp-link-text">Open →</strong>
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

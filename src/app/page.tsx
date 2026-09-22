import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courseStats, courses, featuredCourses } from "@/data/courses";
import { lessons } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Platform",
  description:
    "Learn C++ systems, EDA software, HFT, low-latency engineering, CUDA, GPU programming and AI systems through courses, videos, projects and interview practice.",
  alternates: { canonical: "/" },
};

const categories = [
  "C++ Core",
  "Concurrency",
  "Linux / OS",
  "HFT Systems",
  "EDA Software",
  "CUDA / GPU",
  "AI Systems",
  "Interview Practice",
] as const;

const careerPaths = [
  {
    title: "C++ Engineer",
    href: "/courses/core-cpp-interviews",
    image: "/course-cover/core-cpp-interviews",
    text: "Master ownership, RAII, STL, object model, templates and interview-level C++ reasoning.",
    outcome: "C++ interviews",
  },
  {
    title: "HFT Systems Engineer",
    href: "/curriculum",
    image: "/course-cover/low-latency-cpp-hft-systems",
    text: "Learn CPU, cache, Linux, networking, latency, order books, market data and execution-system design.",
    outcome: "HFT engineering",
  },
  {
    title: "EDA Software Engineer",
    href: "/courses/eda-cad-software-engineering",
    image: "/course-cover/eda-cad-software-engineering",
    text: "Connect C++ with parsers, graph algorithms, simulation, timing, placement/routing and optimization tooling.",
    outcome: "EDA roles",
  },
  {
    title: "AI Systems Engineer",
    href: "/courses/ai-systems-engineering",
    image: "/course-cover/ai-systems-engineering",
    text: "Build production intuition for RAG, serving, batching, KV cache, evals, observability and AI infrastructure.",
    outcome: "AI infra roles",
  },
] as const;

const resourceTiles = [
  { title: "Courses", href: "/courses", image: "/course-cover/core-cpp-interviews", text: "12 flagship courses with modules, outcomes and projects." },
  { title: "Videos", href: "/youtube", image: "/course-cover/cpp-systems-video-courses", text: "Embedded lessons grouped into learning paths." },
  { title: "Practice", href: "/interviews", image: "/course-cover/interview-question-bank", text: "Company-wise interview questions and answer frameworks." },
  { title: "Projects", href: "/projects", image: "/course-cover/systems-project-lab", text: "Portfolio builds with design trade-offs." },
  { title: "Articles", href: "/blog", image: "/course-cover/daily-systems-articles", text: "Daily systems notes for focused learning and SEO." },
  { title: "Books", href: "/books", image: "/course-cover/book-summaries", text: "Book summaries mapped to interviews and projects." },
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
              <h1>Learn C++, HFT, EDA, CUDA, GPU and AI systems in one focused roadmap.</h1>
              <p>
                cppvalley now has a 12-course structure: broad enough to cover serious systems careers, focused enough that students can still choose a path and make progress.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/interviews">Practice interviews</Link>
                <Link className="lp-button" href="/youtube">Watch video lessons</Link>
              </div>
            </div>

            <aside className="lp-hero-card home-hero-image-card" aria-label="cppvalley course catalog summary">
              <img src="/course-cover/third-year-cpp-eda-hft" alt="cppvalley systems roadmap cover" />
              <div className="lp-card-body">
                <span className="course-badge">Recommended structure</span>
                <h2>{courseStats.totalCourses} flagship courses</h2>
                <p>C++, systems, HFT, EDA, CUDA, GPU and AI systems — organized into 4 pillars and 3 launch phases.</p>
                <div className="lp-stat-grid">
                  <div><strong>{courseStats.totalCourses}</strong><span>courses</span></div>
                  <div><strong>{lessons.length}</strong><span>HFT lessons</span></div>
                  <div><strong>{courseStats.pillars}</strong><span>pillars</span></div>
                </div>
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
              <p className="lp-kicker">Featured courses</p>
              <h2>Start from a strong pillar</h2>
            </div>
            <Link className="lp-card-link" href="/courses">View all 12 courses</Link>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {featuredCourses.map((course) => (
              <Link className="lp-course-card image-course-card" href={course.href} key={course.slug}>
                <img className="course-card-image" src={course.coverImage} alt={`${course.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <div className="course-card-topline"><span className="course-badge">{course.status}</span><span>{course.launchPhase}</span></div>
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
              <p className="lp-kicker">Career paths</p>
              <h2>Four image-first learning paths</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {careerPaths.map((path) => (
              <Link className="lp-course-card image-course-card" href={path.href} key={path.title}>
                <img className="course-card-image" src={path.image} alt={`${path.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">{path.outcome}</span>
                  <h3>{path.title}</h3>
                  <p>{path.text}</p>
                  <strong className="lp-link-text">Explore path →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Complete catalog</p>
              <h2>Every course has a visual tile</h2>
            </div>
          </div>
          <div className="course-row-list compact-home-course-list">
            {sortedCourses.slice(0, 12).map((course) => (
              <Link className="course-row-card" href={course.href} key={course.slug}>
                <img src={course.coverImage} alt={`${course.title} cover`} loading="lazy" />
                <div>
                  <span>{course.pillar} · {course.status}</span>
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
              <h2>Every hub also gets a visual entry point</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {resourceTiles.map((tile) => (
              <Link className="lp-course-card image-course-card" href={tile.href} key={tile.title}>
                <img className="course-card-image" src={tile.image} alt={`${tile.title} cover`} loading="lazy" />
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

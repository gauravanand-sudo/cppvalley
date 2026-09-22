import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Platform",
  description:
    "Learn C++ systems, EDA software, HFT, low-latency engineering and AI systems through courses, videos, projects and interview practice.",
  alternates: { canonical: "/" },
};

const categories = [
  "Modern C++",
  "EDA Software",
  "HFT Systems",
  "Low Latency",
  "AI Systems",
  "Interview Practice",
  "Projects",
  "Book Notes",
] as const;

const featuredCourses = [
  {
    badge: "Student pathway",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    href: "/courses/third-year-cpp-eda-hft",
    provider: "cppvalley",
    level: "Beginner to internship-ready",
    text: "A practical path for students targeting C++ systems, EDA CAD software, semiconductor tooling, HFT and performance-heavy roles.",
    lessons: "8 modules",
    duration: "12 weeks",
    rating: "4.9",
    tags: ["C++", "Linux", "EDA", "HFT"],
  },
  {
    badge: "Core foundation",
    title: "Core C++ for Interviews",
    href: "/courses#core-cpp",
    provider: "cppvalley",
    level: "Beginner to advanced",
    text: "RAII, smart pointers, move semantics, STL, templates, object model, undefined behavior, tooling and build-from-scratch projects.",
    lessons: "97 lessons",
    duration: "8 weeks",
    rating: "4.8",
    tags: ["Modern C++", "STL", "RAII", "Projects"],
  },
  {
    badge: "Systems specialization",
    title: "HFT Core Systems",
    href: "/curriculum",
    provider: "cppvalley",
    level: "Intermediate to advanced",
    text: "CPU, Linux, networking, latency measurement, market data, execution, risk and tick-to-trade systems for HFT engineering.",
    lessons: `${lessons.length} lessons`,
    duration: `${phases.length} phases`,
    rating: "4.9",
    tags: ["Latency", "Linux", "Networking", "Trading"],
  },
  {
    badge: "Video library",
    title: "C++ Systems Video Courses",
    href: "/youtube",
    provider: "cppvalley YouTube",
    level: "Intermediate",
    text: "Embedded video lessons on virtual functions, unique_ptr, atomics, cache coherence, false sharing and low-latency C++.",
    lessons: "8 videos",
    duration: "4+ hours",
    rating: "4.7",
    tags: ["Videos", "C++", "Concurrency", "Low latency"],
  },
] as const;

const careerPaths = [
  {
    title: "C++ Interview Track",
    href: "/courses#core-cpp",
    text: "Build language depth, solve C++ interview questions, and explain ownership, polymorphism, templates and STL trade-offs.",
    outcome: "C++ interviews",
  },
  {
    title: "EDA / Semiconductor Software Track",
    href: "/courses/third-year-cpp-eda-hft",
    text: "Connect C++ with parsers, graph algorithms, simulation, timing, placement/routing ideas and performance-heavy tooling.",
    outcome: "EDA software roles",
  },
  {
    title: "HFT Systems Track",
    href: "/curriculum",
    text: "Learn CPU, cache, Linux, networking, latency measurement, order books, market data and execution-system design.",
    outcome: "HFT engineering",
  },
] as const;

const resourceTiles = [
  { title: "Courses", href: "/courses", text: "Structured tracks with modules, outcomes and projects." },
  { title: "Videos", href: "/youtube", text: "Embedded lessons grouped into learning paths." },
  { title: "Practice", href: "/interviews", text: "Interview questions and answer frameworks." },
  { title: "Projects", href: "/projects", text: "Portfolio builds with design trade-offs." },
  { title: "Articles", href: "/blog", text: "Short systems notes for focused learning." },
  { title: "Books", href: "/books", text: "Book summaries mapped to interviews and projects." },
] as const;

export default function Home() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="lp-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">C++ systems learning platform</p>
              <h1>Learn C++ systems skills for EDA, HFT and AI systems roles.</h1>
              <p>
                Build practical depth with structured courses, embedded video lessons, interview practice, projects and book notes designed for serious systems preparation.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/youtube">Watch video lessons</Link>
                <Link className="lp-button" href="/interviews">Practice interviews</Link>
              </div>
            </div>

            <aside className="lp-hero-card" aria-label="Featured learning path">
              <div className="lp-hero-card-top">
                <span>Featured learning path</span>
                <strong>3rd/4th Year C++ → EDA/HFT Roadmap</strong>
              </div>
              <p>
                A guided path from modern C++ to OS/Linux, architecture, EDA software, low-latency systems and portfolio projects.
              </p>
              <div className="lp-stat-grid">
                <div><strong>8</strong><span>modules</span></div>
                <div><strong>{lessons.length}</strong><span>HFT lessons</span></div>
                <div><strong>Free</strong><span>to learn</span></div>
              </div>
              <Link className="lp-card-link" href="/courses/third-year-cpp-eda-hft">View roadmap</Link>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row" aria-label="Browse topics">
          {categories.map((category) => <Link href="/courses" key={category}>{category}</Link>)}
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Courses and videos</p>
              <h2>Popular learning tracks</h2>
            </div>
            <Link className="lp-card-link" href="/courses">View all courses</Link>
          </div>

          <div className="lp-course-grid">
            {featuredCourses.map((course) => (
              <Link className="lp-course-card" href={course.href} key={course.title}>
                <div className="lp-card-thumb">
                  <span>{course.badge}</span>
                  <strong>{course.title}</strong>
                </div>
                <div className="lp-card-body">
                  <span className="course-badge">{course.provider}</span>
                  <h3>{course.title}</h3>
                  <p>{course.text}</p>
                  <div className="lp-rating"><b>★ {course.rating}</b><span>{course.level}</span></div>
                  <div className="lp-meta"><span>{course.lessons}</span><span>{course.duration}</span></div>
                  <div className="course-tags">
                    {course.tags.map((tag) => <span key={tag}>{tag}</span>)}
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
              <h2>Choose a goal and follow the path</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {careerPaths.map((path) => (
              <Link className="lp-card" href={path.href} key={path.title}>
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
              <p className="lp-kicker">Resource library</p>
              <h2>Learn in the format that fits your day</h2>
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

        <section className="site-container platform-dark-band">
          <h2>Start with any course, video or project.</h2>
          <p>
            cppvalley is built so learners can browse freely: pick a topic, watch a lesson, read a note, build a project, then practice explaining the trade-offs.
          </p>
          <div className="lp-actions">
            <Link className="lp-button primary" href="/courses">Browse catalog</Link>
            <Link className="lp-button" href="/projects">Explore projects</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

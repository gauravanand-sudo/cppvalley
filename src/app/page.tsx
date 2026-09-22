import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Course Marketplace",
  description:
    "Explore cppvalley courses, embedded videos, interview practice, projects and book notes for C++, EDA software, HFT systems, low-latency engineering and AI systems interviews.",
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
    badge: "Student favorite",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    href: "/courses/third-year-cpp-eda-hft",
    level: "Beginner to Internship Ready",
    text: "A practical roadmap for students targeting C++ systems, EDA CAD software, semiconductor tooling, HFT and performance-heavy roles.",
    lessons: "8 modules",
    duration: "12 weeks",
    rating: "4.9",
    meta: ["Modern C++", "OS/Linux", "EDA/HFT", "Projects"],
  },
  {
    badge: "Core foundation",
    title: "Core C++ for Interviews",
    href: "/courses#core-cpp",
    level: "Beginner to Advanced",
    text: "RAII, smart pointers, move semantics, STL, templates, object model, undefined behavior, tooling and build-from-scratch projects.",
    lessons: "97 lessons",
    duration: "8 weeks",
    rating: "4.8",
    meta: ["Scott Meyers", "Effective STL", "Memory", "Tooling"],
  },
  {
    badge: "Systems depth",
    title: "HFT Core Systems",
    href: "/curriculum",
    level: "Intermediate to Advanced",
    text: "CPU, Linux, networking, latency measurement, market data, execution, risk and tick-to-trade systems for HFT engineering.",
    lessons: `${lessons.length} lessons`,
    duration: `${phases.length} phases`,
    rating: "4.9",
    meta: ["Latency", "Linux", "Networking", "Trading"],
  },
  {
    badge: "Video course",
    title: "C++ Interview Video Library",
    href: "/youtube",
    level: "Intermediate",
    text: "cppvalley videos organized like a course catalog: virtual functions, unique_ptr, atomics, cache coherence and low-latency C++.",
    lessons: "8 videos",
    duration: "4+ hours",
    rating: "4.7",
    meta: ["Embedded videos", "C++", "Concurrency", "Low latency"],
  },
] as const;

const learningPaths = [
  {
    title: "C++ Interview Track",
    href: "/courses#core-cpp",
    text: "Learn language internals, ownership, STL, templates, UB, tools and mock interview explanations.",
    count: "Core + videos + questions",
  },
  {
    title: "Student EDA/HFT Track",
    href: "/courses/third-year-cpp-eda-hft",
    text: "A college-friendly path from modern C++ to OS, architecture, EDA, low latency, projects and interviews.",
    count: "8 modules + projects",
  },
  {
    title: "HFT Systems Track",
    href: "/curriculum",
    text: "Move from latency measurement to Linux, networking, market data, execution, risk and tick-to-trade design.",
    count: `${lessons.length} lessons`,
  },
] as const;

const resourceTiles = [
  { title: "Courses", href: "/courses", text: "Structured tracks with modules, projects and outcomes." },
  { title: "Videos", href: "/youtube", text: "Embedded cppvalley video lessons grouped by path." },
  { title: "Questions", href: "/interviews", text: "Interview prompts and answer frameworks." },
  { title: "Projects", href: "/projects", text: "Portfolio builds with design trade-offs." },
  { title: "Blog", href: "/blog", text: "Focused systems notes for long-tail search." },
  { title: "Books", href: "/books", text: "Summaries from C++, STL, concurrency and systems books." },
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site learning-marketplace">
      <SiteHeader />

      <main>
        <section className="market-hero">
          <div className="site-container market-hero-inner">
            <div className="market-hero-copy">
              <p className="market-eyebrow">cppvalley learning catalog</p>
              <h1>Build C++ systems depth for EDA, HFT and AI systems interviews.</h1>
              <p>
                Explore course tracks, embedded video lessons, interview questions, projects and book notes designed for students and engineers preparing for serious systems roles.
              </p>
              <div className="market-search" role="search" aria-label="cppvalley learning search">
                <span>What do you want to learn?</span>
                <strong>C++ interviews · EDA · HFT · low latency · AI systems</strong>
              </div>
              <div className="market-actions">
                <Link className="market-button primary" href="/courses">Explore courses</Link>
                <Link className="market-button" href="/youtube">Browse videos</Link>
                <Link className="market-button ghost" href="/interviews">Practice questions</Link>
              </div>
            </div>

            <aside className="market-hero-card" aria-label="cppvalley catalog snapshot">
              <div className="market-card-top">
                <span>Learning path</span>
                <strong>Systems Interview Prep</strong>
              </div>
              <div className="market-progress">
                <span>C++ foundation</span>
                <b>RAII · STL · Templates</b>
              </div>
              <div className="market-progress">
                <span>Systems depth</span>
                <b>Linux · CPU · Networking</b>
              </div>
              <div className="market-progress">
                <span>Domain tracks</span>
                <b>EDA · HFT · AI Systems</b>
              </div>
              <div className="market-stats-row">
                <div><strong>{lessons.length}</strong><span>HFT lessons</span></div>
                <div><strong>8</strong><span>videos</span></div>
                <div><strong>6</strong><span>hubs</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container market-category-strip" aria-label="Browse categories">
          {categories.map((category) => <Link href="/courses" key={category}>{category}</Link>)}
        </section>

        <section className="site-container market-section">
          <div className="market-section-head">
            <div>
              <p className="market-eyebrow">Featured courses</p>
              <h2>Popular learning tracks</h2>
            </div>
            <Link href="/courses">View full catalog →</Link>
          </div>

          <div className="market-course-grid">
            {featuredCourses.map((course) => (
              <Link className="market-course-card" href={course.href} key={course.title}>
                <div className="course-thumb">
                  <span>{course.badge}</span>
                  <strong>{course.title.split(" ").slice(0, 3).join(" ")}</strong>
                </div>
                <div className="course-body">
                  <span className="course-badge">{course.badge}</span>
                  <h3>{course.title}</h3>
                  <p>{course.text}</p>
                  <div className="course-rating"><b>★ {course.rating}</b><span>{course.level}</span></div>
                  <div className="course-meta"><span>{course.lessons}</span><span>{course.duration}</span></div>
                  <div className="course-tags">
                    {course.meta.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container market-section">
          <div className="market-section-head">
            <div>
              <p className="market-eyebrow">Guided paths</p>
              <h2>Role-based roadmaps</h2>
            </div>
          </div>
          <div className="market-path-list">
            {learningPaths.map((path) => (
              <Link className="market-path-row" href={path.href} key={path.title}>
                <div><span>Path</span><h3>{path.title}</h3><p>{path.text}</p></div>
                <strong>{path.count}</strong>
                <b>Explore →</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container market-section">
          <div className="market-section-head">
            <div>
              <p className="market-eyebrow">Resource library</p>
              <h2>Learn by format</h2>
            </div>
          </div>
          <div className="market-resource-grid">
            {resourceTiles.map((tile) => (
              <Link className="market-resource-tile" href={tile.href} key={tile.title}>
                <h3>{tile.title}</h3>
                <p>{tile.text}</p>
                <span>Open →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container market-final-cta">
          <div>
            <p className="market-eyebrow">Keep exploring</p>
            <h2>Pick a course, watch a lesson, build a project, practice the interview explanation.</h2>
          </div>
          <Link className="market-button primary" href="/courses">Explore catalog</Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
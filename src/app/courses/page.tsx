import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Courses — C++, EDA, HFT and AI Systems",
  description:
    "Browse cppvalley course tracks for Core C++, EDA/HFT preparation, HFT systems, design patterns, concurrency, AI systems and performance engineering.",
  alternates: { canonical: "/courses" },
};

const filters = ["All", "C++", "Student", "EDA", "HFT", "Concurrency", "AI Systems", "Projects"] as const;

const courses = [
  {
    id: "student-cpp-eda-hft",
    badge: "Guided project path",
    status: "Available",
    href: "/courses/third-year-cpp-eda-hft",
    title: "3rd/4th Year C++ → EDA/HFT Track",
    provider: "cppvalley",
    level: "Beginner to internship-ready",
    text: "A practical path into C++ systems, EDA CAD software, semiconductor tooling, HFT engineering and performance-heavy backend roles.",
    lessons: "8 modules",
    duration: "12 weeks",
    rating: "4.9",
    skills: ["Modern C++", "OS/Linux", "Architecture", "EDA", "HFT", "Projects"],
  },
  {
    id: "core-cpp",
    badge: "Core foundation",
    status: "Available",
    href: "/courses#core-cpp",
    title: "Core C++ for Interviews",
    provider: "cppvalley",
    level: "Beginner to advanced",
    text: "A zero-to-senior C++ course around Effective Modern C++, Effective STL and practical interview topics.",
    lessons: "97 lessons",
    duration: "8 weeks",
    rating: "4.8",
    skills: ["RAII", "Smart pointers", "Move semantics", "Templates", "STL", "Tooling"],
  },
  {
    id: "hft",
    badge: "Systems specialization",
    status: "Available",
    href: "/curriculum",
    title: "HFT Core Systems",
    provider: "cppvalley",
    level: "Intermediate to advanced",
    text: "CPU, Linux, networking, low latency, market data, execution, risk and tick-to-trade systems.",
    lessons: "96 lessons",
    duration: "9 phases",
    rating: "4.9",
    skills: ["Latency", "CPU", "Linux", "Networking", "Market data", "Execution"],
  },
  {
    id: "lld",
    badge: "Design track",
    status: "Outline",
    href: "/courses#lld",
    title: "Design Patterns + LLD in Modern C++",
    provider: "cppvalley",
    level: "Intermediate to senior",
    text: "Modern C++ design thinking for interviews: SOLID, dependency inversion, type erasure, patterns and LLD problems.",
    lessons: "Planned",
    duration: "6 weeks",
    rating: "New",
    skills: ["Strategy", "Factory", "Observer", "Command", "Adapter", "Type erasure"],
  },
  {
    id: "concurrency",
    badge: "Concurrency track",
    status: "Outline",
    href: "/courses#concurrency",
    title: "C++ Multithreading and Concurrency",
    provider: "cppvalley",
    level: "Intermediate to senior",
    text: "Threads, locks, condition variables, futures, atomics, memory ordering and concurrent systems.",
    lessons: "Planned",
    duration: "7 weeks",
    rating: "New",
    skills: ["std::thread", "Mutexes", "Futures", "Atomics", "Memory ordering", "Queues"],
  },
  {
    id: "ai-systems",
    badge: "Systems design",
    status: "Outline",
    href: "/courses#ai-systems",
    title: "AI Systems Engineering",
    provider: "cppvalley",
    level: "Intermediate to architect",
    text: "RAG, vector search, inference serving, batching, evals, agents, reliability and cost-aware architecture.",
    lessons: "Planned",
    duration: "6 weeks",
    rating: "New",
    skills: ["RAG", "Vector DBs", "Serving", "Batching", "Evals", "Agents"],
  },
  {
    id: "performance",
    badge: "Project lab",
    status: "Project based",
    href: "/projects",
    title: "Compiler, Performance and Systems Labs",
    provider: "cppvalley",
    level: "Advanced",
    text: "Portfolio-grade labs: parsers, compilers, profilers, allocators, benchmark harnesses and low-level systems projects.",
    lessons: "Project based",
    duration: "Self paced",
    rating: "Lab",
    skills: ["Compiler", "Memory pool", "Profiler", "Benchmarking", "Parsing", "Tracing"],
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="catalog-hero">
          <div className="site-container catalog-hero-inner">
            <div>
              <p className="lp-kicker">Course catalog</p>
              <h1>Courses for C++, EDA, HFT and AI systems interviews.</h1>
              <p>
                Browse role-oriented tracks, study the modules, watch related videos, build projects and practice explaining design decisions clearly.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/youtube">Video lessons</Link>
                <Link className="lp-button" href="/projects">Project labs</Link>
              </div>
            </div>
            <aside>
              <strong>Build depth with a path</strong>
              <span>Each track connects concepts, projects, videos and interview practice so learning stays focused.</span>
            </aside>
          </div>
        </section>

        <section className="site-container catalog-body">
          <div className="catalog-toolbar">
            <Link className="catalog-search" href="/courses" aria-label="Search course catalog">
              Search C++, EDA, HFT, concurrency, AI systems and projects
            </Link>
            <div className="catalog-filters">
              {filters.map((filter) => <span key={filter}>{filter}</span>)}
            </div>
          </div>

          <div className="catalog-layout">
            <aside className="catalog-sidebar" aria-label="Learning paths sidebar">
              <h2>Learning paths</h2>
              <Link href="/courses/third-year-cpp-eda-hft">Student C++ → EDA/HFT</Link>
              <Link href="/courses#core-cpp">Core C++ interviews</Link>
              <Link href="/curriculum">HFT Core Systems</Link>
              <Link href="/youtube">Video courses</Link>
              <Link href="/projects">Project labs</Link>
            </aside>

            <section className="catalog-grid" aria-label="Course cards">
              {courses.map((course) => (
                <article className="catalog-card" id={course.id} key={course.id}>
                  <Link href={course.href}>
                    <div className="catalog-thumb">
                      <span>{course.badge}</span>
                      <strong>{course.title}</strong>
                    </div>
                    <div className="catalog-card-body">
                      <span className="course-badge">{course.provider}</span>
                      <div className="course-rating"><b>{course.rating === "New" || course.rating === "Lab" ? course.rating : `★ ${course.rating}`}</b><span>{course.status}</span></div>
                      <h3>{course.title}</h3>
                      <p>{course.text}</p>
                      <div className="course-meta"><span>{course.level}</span><span>{course.lessons}</span><span>{course.duration}</span></div>
                      <div className="course-tags">
                        {course.skills.map((skill) => <span key={skill}>{skill}</span>)}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

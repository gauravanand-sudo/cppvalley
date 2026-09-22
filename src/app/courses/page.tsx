import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Courses — C++, EDA, HFT and AI Systems",
  description:
    "Browse cppvalley course tracks for Core C++, 3rd/4th year EDA-HFT preparation, HFT systems, C++ design patterns, multithreading, AI systems and performance engineering.",
  alternates: { canonical: "/courses" },
};

const filters = ["All", "C++", "Students", "EDA", "HFT", "Concurrency", "AI Systems", "Projects"] as const;

const courses = [
  {
    id: "student-cpp-eda-hft",
    status: "Student track",
    live: true,
    href: "/courses/third-year-cpp-eda-hft",
    title: "3rd/4th Year C++ → EDA/HFT Track",
    level: "College student → internship/new-grad ready",
    text: "A practical path into C++ systems, EDA CAD software, semiconductor tooling, HFT engineering and performance-heavy backend roles.",
    lessons: "8 modules",
    duration: "12 weeks",
    rating: "4.9",
    learners: "Student roadmap",
    modules: ["Modern C++", "DSA for systems", "OS + Linux", "Computer architecture", "EDA software basics", "Low-latency/HFT basics"],
  },
  {
    id: "core-cpp",
    status: "Free foundation",
    live: true,
    href: "/courses#core-cpp",
    title: "Core C++ for Interviews",
    level: "Beginner → Advanced",
    text: "A natural zero-to-senior C++ course around Effective Modern C++, Effective STL and practical interview topics.",
    lessons: "97 lessons",
    duration: "8 weeks",
    rating: "4.8",
    learners: "Interview prep",
    modules: ["Build model", "RAII", "Smart pointers", "Move semantics", "Templates", "Effective STL"],
  },
  {
    id: "hft",
    status: "Live curriculum",
    live: true,
    href: "/curriculum",
    title: "HFT Core Systems",
    level: "Intermediate → Advanced",
    text: "CPU, Linux, networking, low latency, market data, execution, risk and tick-to-trade systems.",
    lessons: "96 lessons",
    duration: "9 phases",
    rating: "4.9",
    learners: "HFT systems",
    modules: ["Latency", "CPU + memory", "Linux", "Networking", "Market data", "Execution + risk"],
  },
  {
    id: "lld",
    status: "Coming next",
    live: false,
    href: "/courses#lld",
    title: "Design Patterns + LLD in Modern C++",
    level: "Intermediate → Senior",
    text: "Modern C++ design thinking for interviews: SOLID, dependency inversion, type erasure, patterns and LLD problems.",
    lessons: "Planned",
    duration: "6 weeks",
    rating: "Soon",
    learners: "LLD rounds",
    modules: ["Strategy", "Factory", "Observer", "Command", "Adapter", "Type erasure"],
  },
  {
    id: "concurrency",
    status: "Coming next",
    live: false,
    href: "/courses#concurrency",
    title: "C++ Multithreading and Concurrency",
    level: "Intermediate → Senior",
    text: "Threads, locks, condition variables, futures, atomics, memory ordering and concurrent systems.",
    lessons: "Planned",
    duration: "7 weeks",
    rating: "Soon",
    learners: "Concurrency",
    modules: ["std::thread", "Mutexes", "Condition variables", "Futures", "Atomics", "Memory ordering"],
  },
  {
    id: "ai-systems",
    status: "Coming next",
    live: false,
    href: "/courses#ai-systems",
    title: "AI Systems Engineering",
    level: "Intermediate → Architect",
    text: "RAG, vector search, inference serving, batching, evals, agents, reliability and cost-aware architecture.",
    lessons: "Planned",
    duration: "6 weeks",
    rating: "Soon",
    learners: "AI roles",
    modules: ["RAG", "Vector DBs", "Model serving", "Batching", "Evals", "Agents"],
  },
  {
    id: "performance",
    status: "Project lab",
    live: false,
    href: "/projects",
    title: "Compiler, Performance and Systems Labs",
    level: "Advanced",
    text: "Portfolio-grade labs: parsers, compilers, profilers, allocators, benchmark harnesses and low-level systems projects.",
    lessons: "Project based",
    duration: "Self paced",
    rating: "Lab",
    learners: "Portfolio proof",
    modules: ["Compiler", "Memory pool", "Profiler", "Benchmark harness", "Parsing", "Tracing"],
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="page-shell platform-site learning-marketplace">
      <SiteHeader />
      <main>
        <section className="catalog-hero">
          <div className="site-container catalog-hero-inner">
            <div>
              <p className="market-eyebrow">Course catalog</p>
              <h1>Browse C++, EDA, HFT and AI systems tracks.</h1>
              <p>
                Pick a role-oriented path, study the modules, watch related videos, build projects and practice explaining your design choices.
              </p>
            </div>
            <aside>
              <strong>Free while building audience</strong>
              <span>Courses can become cohorts, paid tracks or ad-supported resources later.</span>
            </aside>
          </div>
        </section>

        <section className="site-container catalog-body">
          <div className="catalog-toolbar">
            <div className="catalog-search">Search courses, paths, videos and projects</div>
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
                      <span>{course.status}</span>
                      <strong>{course.title.split(" ").slice(0, 3).join(" ")}</strong>
                    </div>
                    <div className="catalog-card-body">
                      <div className="course-rating"><b>{course.rating === "Soon" || course.rating === "Lab" ? course.rating : `★ ${course.rating}`}</b><span>{course.learners}</span></div>
                      <h3>{course.title}</h3>
                      <p>{course.text}</p>
                      <div className="course-meta"><span>{course.level}</span><span>{course.lessons}</span><span>{course.duration}</span></div>
                      <div className="course-tags">
                        {course.modules.map((module) => <span key={module}>{module}</span>)}
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
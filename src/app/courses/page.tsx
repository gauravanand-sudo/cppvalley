import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Courses — C++, EDA, HFT and AI Systems",
  description:
    "Modular cppvalley courses for Core C++, 3rd/4th year EDA-HFT preparation, HFT systems, C++ design patterns, multithreading, AI systems and performance engineering.",
  alternates: { canonical: "/courses" },
};

const courses = [
  {
    id: "student-cpp-eda-hft",
    status: "Start here",
    live: true,
    href: "/courses/third-year-cpp-eda-hft",
    title: "3rd/4th Year C++ → EDA/HFT Track",
    level: "College student → internship/new-grad ready",
    text: "A practical path into C++ systems, EDA CAD software, semiconductor tooling, HFT engineering and performance-heavy backend roles.",
    modules: ["Modern C++", "DSA for systems", "OS + Linux", "Computer architecture", "EDA software basics", "Low-latency/HFT basics", "Portfolio projects", "Resume + interviews"],
  },
  {
    id: "core-cpp",
    status: "Free foundation",
    live: true,
    href: "/courses#core-cpp",
    title: "Core C++ for Interviews",
    level: "Beginner → Advanced",
    text: "A natural zero-to-senior C++ course around Effective Modern C++, Effective STL and practical interview topics.",
    modules: ["Build model + fundamentals", "RAII + smart pointers", "Move semantics", "Object model", "Templates", "Effective STL", "UB + sanitizers", "Build from scratch"],
  },
  {
    id: "hft",
    status: "Live curriculum",
    live: true,
    href: "/curriculum",
    title: "HFT Core Systems",
    level: "Intermediate → Advanced",
    text: "CPU, Linux, networking, low latency, market data, execution, risk and tick-to-trade systems.",
    modules: ["Latency measurement", "CPU + memory", "Linux tuning", "Networking", "Low-latency C++", "Market data", "Execution + risk", "Tick-to-trade"],
  },
  {
    id: "lld",
    status: "Coming next",
    live: false,
    href: "/courses#lld",
    title: "Design Patterns + LLD in Modern C++",
    level: "Intermediate → Senior",
    text: "Modern C++ design thinking for interviews: SOLID, dependency inversion, type erasure, patterns and LLD problems.",
    modules: ["Strategy", "Factory", "Observer", "Command", "Adapter", "Visitor", "Type erasure", "Logger/cache/editor/plugin designs"],
  },
  {
    id: "concurrency",
    status: "Coming next",
    live: false,
    href: "/courses#concurrency",
    title: "C++ Multithreading and Concurrency",
    level: "Intermediate → Senior",
    text: "Threads, locks, condition variables, futures, atomics, memory ordering and concurrent systems.",
    modules: ["std::thread", "Mutexes", "Condition variables", "Futures/promises", "Atomics", "Memory ordering", "Thread pool", "Concurrent queue/cache"],
  },
  {
    id: "ai-systems",
    status: "Coming next",
    live: false,
    href: "/courses#ai-systems",
    title: "AI Systems Engineering",
    level: "Intermediate → Architect",
    text: "RAG, vector search, inference serving, batching, evals, agents, reliability and cost-aware architecture.",
    modules: ["RAG architecture", "Vector databases", "Model serving", "Batching", "Evaluation", "Agents", "Observability", "Cost/latency trade-offs"],
  },
  {
    id: "performance",
    status: "Project lab",
    live: false,
    href: "/projects",
    title: "Compiler, Performance and Systems Labs",
    level: "Advanced",
    text: "Portfolio-grade labs: parsers, compilers, profilers, allocators, benchmark harnesses and low-level systems projects.",
    modules: ["Compiler project", "Memory pool", "Profiler", "Benchmark harness", "Cache-aware data structures", "Parsing", "Tracing", "Technical writeups"],
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="page-shell platform-site mit-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Courses</p>
          <h1>Clear tracks for C++, EDA, HFT and AI systems interviews.</h1>
          <p className="page-intro">
            Pick one path, follow the modules, build projects, and prepare interview stories around real systems work.
          </p>
        </section>

        <section className="platform-grid" aria-label="Course catalog">
          {courses.map((course) => (
            <article className="platform-card" id={course.id} key={course.id}>
              <span className={`platform-status ${course.live ? "live" : "soon"}`}>{course.status}</span>
              <h3>{course.title}</h3>
              <p><strong>{course.level}</strong></p>
              <p>{course.text}</p>
              <ul>
                {course.modules.map((module) => <li key={module}>{module}</li>)}
              </ul>
              <div className="platform-card-footer">
                <Link href={course.href}>{course.live ? "Open track" : "View outline"}</Link>
                <b>↗</b>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Modular cppvalley courses for Core C++, HFT systems, design patterns, C++ multithreading, AI systems and performance engineering.",
  alternates: { canonical: "/courses" },
};

const courses = [
  {
    id: "core-cpp",
    status: "Free now",
    live: true,
    title: "Core C++ for Interviews",
    level: "Beginner → Advanced",
    text: "A natural zero-to-architect C++ course built around Effective Modern C++, Effective STL and interview-important extras like tooling, UB and performance.",
    modules: ["Build model + fundamentals", "RAII + smart pointers", "Move semantics", "Object model", "Templates", "Effective STL", "UB + sanitizers", "Build from scratch"],
  },
  {
    id: "hft",
    status: "Roadmap live",
    live: true,
    title: "HFT Core Systems",
    level: "Intermediate → Advanced",
    text: "The existing HFT curriculum becomes one specialized track under cppvalley: CPU, Linux, networking, low latency, market data, execution and risk.",
    href: "/curriculum",
    modules: ["Latency measurement", "CPU + memory", "Linux tuning", "Networking", "Low-latency C++", "Market data", "Execution + risk", "Tick-to-trade"],
  },
  {
    id: "lld",
    status: "Placeholder",
    live: false,
    title: "Design Patterns + LLD in Modern C++",
    level: "Intermediate → Senior",
    text: "Klaus Iglberger/Fedor Pikus-style design thinking for interviews: SOLID, dependency inversion, type erasure, patterns and real LLD problems.",
    modules: ["Strategy", "Factory", "Observer", "Command", "Adapter", "Visitor", "Type erasure", "Logger/cache/editor/plugin designs"],
  },
  {
    id: "concurrency",
    status: "Placeholder",
    live: false,
    title: "C++ Multithreading and Concurrency",
    level: "Intermediate → Senior",
    text: "Anthony Williams-inspired concurrency track: threads, locks, condition variables, futures, atomics, memory ordering and concurrent systems.",
    modules: ["std::thread", "Mutexes", "Condition variables", "Futures/promises", "Atomics", "Memory ordering", "Thread pool", "Concurrent queue/cache"],
  },
  {
    id: "ai-systems",
    status: "Placeholder",
    live: false,
    title: "AI Systems Engineering",
    level: "Intermediate → Architect",
    text: "Systems thinking for modern AI roles: RAG, vector search, inference serving, batching, evals, agents, reliability and cost-aware architecture.",
    modules: ["RAG architecture", "Vector databases", "Model serving", "Batching", "Evaluation", "Agents", "Observability", "Cost/latency trade-offs"],
  },
  {
    id: "performance",
    status: "Research lab",
    live: false,
    title: "Compiler, Performance and Systems Labs",
    level: "Advanced",
    text: "Portfolio-grade labs for people who want proof: parsers, compilers, profilers, allocators, benchmark harnesses and low-level systems projects.",
    modules: ["Compiler project", "Memory pool", "Profiler", "Benchmark harness", "Cache-aware data structures", "Parsing", "Tracing", "Technical writeups"],
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Courses</p>
          <h1>One modular catalog for C++, HFT and AI systems preparation.</h1>
          <p className="page-intro">
            Start free. Build trust. Turn the catalog into paid cohorts or ads later. Each track is designed as a clear content silo for SEO and a natural learning path for serious engineers.
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
                {"href" in course ? <Link href={course.href}>Open curriculum</Link> : <span>Placeholder ready</span>}
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

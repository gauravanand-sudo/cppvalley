import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "3rd/4th Year C++ to EDA and HFT Roadmap",
  description:
    "A practical roadmap for 3rd and 4th year students targeting C++ systems, EDA CAD software, semiconductor tooling, HFT engineering and performance-heavy internships.",
  alternates: { canonical: "/courses/third-year-cpp-eda-hft" },
  keywords: [
    "C++ roadmap for college students",
    "EDA software engineer roadmap",
    "HFT internship preparation",
    "C++ systems internship",
    "semiconductor software engineer",
    "VLSI CAD software",
    "low latency C++",
  ],
};

const modules = [
  ["01", "Modern C++ that companies actually test", "Compilation, RAII, smart pointers, move semantics, STL, templates, undefined behavior, sanitizers and debugging."],
  ["02", "DSA for systems roles", "Arrays, strings, hashing, heaps, graphs, trees, tries, interval problems, dynamic programming and implementation-heavy C++ coding."],
  ["03", "OS, Linux and tooling", "Processes, threads, memory, files, sockets, gdb, perf, CMake, compiler flags, Git and shell fluency."],
  ["04", "Computer architecture and performance", "Caches, branch prediction, memory layout, alignment, cache locality, false sharing, profiling and latency measurement."],
  ["05", "EDA and semiconductor software basics", "C++ in EDA: parsers, netlists, graph algorithms, timing analysis, placement/routing, simulation and optimization engines."],
  ["06", "HFT and low-latency systems basics", "Market data, order books, tick-to-trade, UDP, lock-free queues, preallocation, risk checks and performance budgets."],
  ["07", "Portfolio projects", "Build a logic-simulator mini tool, order-book engine, memory pool, benchmark harness, parser and multithreaded job scheduler."],
  ["08", "Resume and interview loop", "Convert projects into proof, write crisp resume bullets, prepare C++/DSA/system questions and practice mock rounds."],
] as const;

const projects = [
  "C++ order book with price levels, matching and latency counters",
  "Mini netlist parser with graph traversal and topological ordering",
  "Fixed-size memory pool with placement new and benchmarks",
  "Cache-friendly graph algorithm benchmark",
  "Multithreaded job scheduler with worker threads and a blocking queue",
  "Simple logic simulator for gates and signal propagation",
] as const;

export default function StudentCppEdaHftPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Guided course</p>
              <h1>3rd/4th Year C++ → EDA/HFT Roadmap</h1>
              <p>
                A practical course for students who want C++ systems internships or new-grad roles in EDA CAD software, semiconductor tooling, HFT, low-latency systems or performance-heavy backend teams.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/youtube#student-roadmap">Watch related videos</Link>
                <Link className="lp-button" href="/courses">Back to catalog</Link>
              </div>
            </div>
            <aside className="lp-hero-card" aria-label="Course summary">
              <div className="lp-hero-card-top">
                <span>Course outcome</span>
                <strong>Become project-ready for systems internships</strong>
              </div>
              <div className="lp-stat-grid">
                <div><strong>8</strong><span>modules</span></div>
                <div><strong>6</strong><span>projects</span></div>
                <div><strong>12w</strong><span>pace</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Who this is for</p>
              <h2>A focused path for students targeting systems roles</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Student</span><h3>3rd/4th year CS, ECE or EE</h3><p>Good for students who know basic programming and want a practical systems path with C++ depth.</p></div></article>
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Targets</span><h3>EDA, HFT and C++ systems</h3><p>Targets EDA software engineer, semiconductor software, HFT intern, trading systems and low-latency C++ roles.</p></div></article>
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Output</span><h3>Proof-based preparation</h3><p>Finish with projects, resume bullets, interview stories and clear trade-off explanations.</p></div></article>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Syllabus</p>
              <h2>Eight modules in the right order</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {modules.map(([number, title, detail]) => (
              <article className="lp-card" key={number}>
                <div className="lp-card-body">
                  <span className="course-badge">Module {number}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Projects</p>
              <h2>Portfolio work for EDA/HFT interviews</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {projects.map((project) => (
              <article className="lp-card" key={project}>
                <div className="lp-card-body">
                  <span className="course-badge">Build</span>
                  <h3>{project}</h3>
                  <p>Include a README, design notes, complexity analysis, benchmarks and interview talking points.</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

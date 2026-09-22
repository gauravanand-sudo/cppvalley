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
  {
    number: "01",
    title: "Modern C++ that companies actually test",
    detail: "Compilation, RAII, smart pointers, move semantics, STL, templates, undefined behavior, sanitizers and debugging.",
  },
  {
    number: "02",
    title: "DSA for systems roles",
    detail: "Arrays, strings, hashing, heaps, graphs, trees, tries, interval problems, dynamic programming and implementation-heavy C++ coding.",
  },
  {
    number: "03",
    title: "OS, Linux and tooling",
    detail: "Processes, threads, memory, files, sockets, gdb, perf, CMake, compiler flags, Git and basic shell fluency.",
  },
  {
    number: "04",
    title: "Computer architecture and performance",
    detail: "Caches, branch prediction, memory layout, alignment, cache locality, false sharing, profiling and latency measurement.",
  },
  {
    number: "05",
    title: "EDA and semiconductor software basics",
    detail: "Where C++ appears in EDA: parsers, netlists, graph algorithms, timing analysis, placement/routing, simulation and optimization engines.",
  },
  {
    number: "06",
    title: "HFT and low-latency systems basics",
    detail: "Market data, order books, tick-to-trade, UDP, lock-free queues, preallocation, risk checks and performance budgets.",
  },
  {
    number: "07",
    title: "Portfolio projects",
    detail: "Build a logic-simulator mini tool, order-book engine, memory pool, benchmark harness, parser and multithreaded job scheduler.",
  },
  {
    number: "08",
    title: "Resume and interview loop",
    detail: "Convert projects into proof, write crisp resume bullets, prepare C++/DSA/system questions and practice mock rounds.",
  },
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
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Student course</p>
          <h1>3rd/4th Year C++ → EDA/HFT Roadmap</h1>
          <p className="page-intro">
            A practical course for students who want C++ systems internships or new-grad roles in EDA CAD software, semiconductor tooling, HFT, low-latency systems or performance-heavy backend teams.
          </p>
          <div className="platform-actions">
            <Link className="platform-button primary" href="/youtube#eda-systems">
              Watch related videos
            </Link>
            <Link className="platform-button" href="/courses">
              Back to courses
            </Link>
          </div>
        </section>

        <section className="platform-section">
          <div className="platform-section-index">01</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Who this is for</p>
                <h2>No hype. Just the useful path.</h2>
              </div>
            </div>
            <div className="platform-grid">
              <article className="platform-card">
                <span className="tag">Student</span>
                <h3>3rd/4th year CS, ECE or EE</h3>
                <p>Good for students who know basic programming and want a focused systems path instead of random LeetCode plus random YouTube.</p>
              </article>
              <article className="platform-card">
                <span className="tag">Targets</span>
                <h3>EDA, HFT, C++ systems</h3>
                <p>Targets EDA software engineer, semiconductor software, HFT intern, trading systems, low-latency C++ and systems backend roles.</p>
              </article>
              <article className="platform-card">
                <span className="tag">Output</span>
                <h3>Proof-based preparation</h3>
                <p>Students finish with projects, resume bullets, interview stories and a clear explanation of trade-offs.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="platform-section">
          <div className="platform-section-index">02</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Modules</p>
                <h2>The order matters.</h2>
              </div>
            </div>
            <div className="platform-path">
              {modules.map((module) => (
                <div key={module.number}>
                  <span>{module.number}</span>
                  <div>
                    <strong>{module.title}</strong>
                    <small>{module.detail}</small>
                  </div>
                  <b>→</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section">
          <div className="platform-section-index">03</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Projects</p>
                <h2>Projects that make sense for EDA/HFT interviews.</h2>
              </div>
            </div>
            <div className="platform-grid">
              {projects.map((project) => (
                <article className="platform-card" key={project}>
                  <span className="tag">Build</span>
                  <h3>{project}</h3>
                  <p>Must include a README, design notes, complexity analysis, benchmarks and interview talking points.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-dark-band">
          <h2>Why this track exists</h2>
          <p>
            Most college students either do only DSA or jump directly into advanced HFT/EDA keywords. This course creates the missing middle: C++ depth, systems fundamentals, performance thinking and project proof.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

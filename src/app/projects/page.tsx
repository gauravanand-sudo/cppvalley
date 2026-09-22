import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects — cppvalley",
  description:
    "cppvalley systems projects for C++, HFT, low-latency engineering and interview preparation.",
  alternates: { canonical: "/projects" },
};

const projects = [
  ["Core C++", "RAII wrapper, unique_ptr, vector, memory pool and benchmark harness.", "Beginner to intermediate"],
  ["HFT systems", "Market data decoder, order book, risk gate, replay engine and tick-to-trade capstone.", "Advanced"],
  ["Concurrency", "Thread-safe queue, scheduler, thread pool, sharded cache and atomics experiments.", "Intermediate"],
  ["Compiler/performance", "Toy compiler, parser, profiler, allocator lab and cache-aware data structures.", "Advanced"],
  ["Portfolio", "Every project gets README, architecture notes, benchmark, failure test and interview script.", "Career prep"],
] as const;

export default function ProjectsPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Project labs</p>
              <h1>Build portfolio projects that prove systems depth.</h1>
              <p>
                Turn C++, HFT, concurrency and performance concepts into projects with benchmarks, design notes and interview-ready explanations.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Study the courses</Link>
                <Link className="lp-button" href="/interviews">Practice project interviews</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top"><span>Project standard</span><strong>Build · Measure · Explain</strong></div>
              <p>Every project should include a README, design notes, benchmark, failure cases and trade-off discussion.</p>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Labs</p>
              <h2>Project tracks by skill area</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {projects.map(([title, text, level]) => (
              <article className="lp-card" key={title}>
                <div className="lp-card-body">
                  <span className="course-badge">{level}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="lp-card-link" href="/courses">Find matching course</Link>
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

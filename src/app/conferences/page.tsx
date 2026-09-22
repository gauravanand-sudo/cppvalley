import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Conference Notes — cppvalley",
  description:
    "Practical cppvalley summaries of C++ conferences and systems talks, converted into interview and production engineering lessons.",
  alternates: { canonical: "/conferences" },
};

const conferences = [
  ["CppCon", "Modern C++, performance, tooling, library design, concurrency and large-scale C++ lessons."],
  ["C++Now", "Advanced C++, templates, compile-time programming, library architecture and language evolution."],
  ["Meeting C++", "Practical engineering talks, production C++, code quality, testing, tooling and real-world architecture."],
  ["ACCU", "Software craftsmanship, design, architecture, testing, team engineering and maintainable systems."],
  ["Performance talks", "CPU, memory, profiling, latency, cache behavior, allocators, systems measurement and optimization."],
  ["AI systems talks", "Inference serving, vector search, RAG architecture, evals, agents, reliability and production AI platforms."],
] as const;

export default function ConferencesPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Conference notes</p>
              <h1>C++ and systems talks distilled into practical lessons.</h1>
              <p>
                Track high-signal talks, extract the engineering idea, connect it to code, then map it to interview questions and projects.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/blog">Read articles</Link>
                <Link className="lp-button" href="/courses">Explore courses</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top"><span>Note format</span><strong>Problem · Idea · Code · Interview</strong></div>
              <p>Each note should make a talk useful for builders, not just summarize slides.</p>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Topics</p>
              <h2>Talk libraries to follow</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {conferences.map(([title, text]) => (
              <article className="lp-card" key={title}>
                <div className="lp-card-body">
                  <span className="course-badge">Talk notes</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="lp-card-link" href="/blog">Read related notes</Link>
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

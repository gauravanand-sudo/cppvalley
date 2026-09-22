import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Interview Practice — cppvalley",
  description:
    "C++, HFT and AI systems interview practice, question banks, round breakdowns and answer frameworks from cppvalley.",
  alternates: { canonical: "/interviews" },
};

const sections = [
  {
    tag: "C++ rounds",
    title: "Modern C++ question bank",
    text: "RAII, smart pointers, move semantics, STL, object model, templates, undefined behavior, performance and debugging prompts.",
    skills: ["RAII", "Object model", "Templates"],
  },
  {
    tag: "HFT rounds",
    title: "HFT systems interview bank",
    text: "Latency measurement, Linux, networking, order books, market data, risk, sequencing, replay and tick-to-trade design.",
    skills: ["Latency", "Order books", "Networking"],
  },
  {
    tag: "LLD rounds",
    title: "C++ low-level design prompts",
    text: "Logger, LRU cache, task scheduler, document editor, parser registry, notification system and rate limiter designs.",
    skills: ["Design", "APIs", "Trade-offs"],
  },
  {
    tag: "HLD rounds",
    title: "AI and backend systems prompts",
    text: "RAG system, vector search, inference service, asset storage, observability and reliability-oriented system design.",
    skills: ["RAG", "Serving", "Reliability"],
  },
  {
    tag: "Experience prep",
    title: "Round breakdown templates",
    text: "Structured preparation for round formats: DSA, C++, systems design, project deep dives and behavioral ownership stories.",
    skills: ["Round plans", "Stories", "Review"],
  },
  {
    tag: "Mock loops",
    title: "Mock interview checklists",
    text: "Full loop checklists for DSA, C++, LLD, HLD, concurrency and project discussion readiness.",
    skills: ["DSA", "C++", "Projects"],
  },
] as const;

export default function InterviewsPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Practice</p>
              <h1>Interview questions and answer frameworks for systems roles.</h1>
              <p>
                Practice C++, HFT, concurrency, low-level design and AI systems questions with prompts that connect directly to the courses and project labs.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Study courses</Link>
                <Link className="lp-button" href="/projects">Build projects</Link>
              </div>
            </div>
            <aside className="lp-hero-card">
              <div className="lp-hero-card-top">
                <span>Practice plan</span>
                <strong>Concept → Project → Explanation</strong>
              </div>
              <p>Each interview topic should end with a clear explanation, a trade-off and one example project you can discuss.</p>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Question banks</p>
              <h2>Practice by round type</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {sections.map((section) => (
              <article className="lp-card" key={section.title}>
                <div className="lp-card-body">
                  <span className="course-badge">{section.tag}</span>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                  <div className="course-tags">
                    {section.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
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

import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Interview Experiences and Questions",
  description:
    "Company-style C++, HFT and AI systems interview experiences, question banks, round breakdowns and answer frameworks from cppvalley.",
  alternates: { canonical: "/interviews" },
};

const sections = [
  {
    tag: "C++ rounds",
    title: "Modern C++ question bank",
    text: "RAII, smart pointers, move semantics, STL, object model, templates, UB, performance and debugging prompts.",
  },
  {
    tag: "HFT rounds",
    title: "HFT systems interview bank",
    text: "Latency measurement, Linux, networking, order books, market data, risk, sequencing, replay and tick-to-trade design.",
  },
  {
    tag: "LLD rounds",
    title: "C++ low-level design prompts",
    text: "Logger, LRU cache, task scheduler, document editor, parser registry, notification system and rate limiter designs.",
  },
  {
    tag: "HLD rounds",
    title: "AI and backend systems prompts",
    text: "RAG system, vector search, inference service, thumbnail pipeline, URL metadata service, asset storage and notification systems.",
  },
  {
    tag: "Experience posts",
    title: "Interview experience templates",
    text: "Structured templates for company experiences: rounds, topics, difficulty, what to prepare and follow-up questions.",
  },
  {
    tag: "Mocks",
    title: "Mock interview loops",
    text: "Full loop checklists for DSA, C++, LLD, HLD, concurrency and behavioral ownership stories.",
  },
] as const;

export default function InterviewsPage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Interview Library</p>
          <h1>Interview experiences, question banks and answer frameworks.</h1>
          <p className="page-intro">
            This page is a placeholder hub for SEO-friendly interview content. Add one post per company, topic or round type and link each post to the relevant course module.
          </p>
        </section>

        <section className="platform-grid" aria-label="Interview content sections">
          {sections.map((section) => (
            <article className="platform-resource-card" key={section.title}>
              <span className="tag">{section.tag}</span>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
              <div className="platform-card-footer"><span>Content slot</span><b>↗</b></div>
            </article>
          ))}
        </section>

        <section className="platform-dark-band">
          <h2>Suggested publishing rhythm</h2>
          <p>
            Publish 3 small interview posts per week: one C++ concept question, one systems/LLD question and one company-style experience breakdown. This creates searchable pages while courses stay free.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

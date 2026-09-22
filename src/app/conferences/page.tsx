import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "C++ Conference Notes",
  description:
    "Practical cppvalley summaries of C++ conferences and systems talks, converted into interview and production engineering lessons.",
  alternates: { canonical: "/conferences" },
};

const conferences = [
  {
    title: "CppCon",
    text: "Modern C++, performance, tooling, library design, concurrency and large-scale C++ lessons.",
  },
  {
    title: "C++Now",
    text: "Advanced C++, templates, compile-time programming, library architecture and language evolution.",
  },
  {
    title: "Meeting C++",
    text: "Practical engineering talks, production C++, code quality, testing, tooling and real-world architecture.",
  },
  {
    title: "ACCU",
    text: "Software craftsmanship, design, architecture, testing, team engineering and maintainable systems.",
  },
  {
    title: "Performance talks",
    text: "CPU, memory, profiling, latency, cache behavior, allocators, systems measurement and optimization.",
  },
  {
    title: "AI systems talks",
    text: "Inference serving, vector search, RAG architecture, evals, agents, reliability and production AI platforms.",
  },
] as const;

export default function ConferencesPage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Conference Notes</p>
          <h1>C++ and systems conference notes rewritten for interviews.</h1>
          <p className="page-intro">
            A future authority hub for cppvalley: summarize strong conference talks, extract engineering lessons, then connect each note to interview prep and course modules.
          </p>
        </section>

        <section className="platform-matrix" aria-label="Conference note categories">
          {conferences.map((conference) => (
            <article className="platform-table-card" key={conference.title}>
              <span className="platform-status soon">Notes slot</span>
              <h3>{conference.title}</h3>
              <p>{conference.text}</p>
            </article>
          ))}
        </section>

        <div className="platform-quote">
          Suggested format for each note: problem, core idea, code/design takeaway, interview question, project connection and further reading.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

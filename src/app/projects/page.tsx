import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "cppvalley systems projects for C++, HFT, low-latency engineering, compiler labs and AI systems interview preparation.",
  alternates: { canonical: "/projects" },
};

const projects = [
  ["Core C++", "RAII wrapper, unique_ptr, shared_ptr, vector, memory pool and benchmark harness."],
  ["HFT systems", "Market data decoder, order book, risk gate, replay engine and tick-to-trade capstone."],
  ["Concurrency", "Thread-safe queue, scheduler, thread pool, sharded cache and atomics experiments."],
  ["AI systems", "RAG pipeline, vector search, eval harness, inference gateway and observability dashboard."],
  ["Compiler/performance", "Toy compiler, parser, profiler, allocator lab and cache-aware data structures."],
  ["Portfolio", "Every project gets README, architecture diagram, benchmark, failure test and interview script."],
] as const;

export default function ProjectsPage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Project Lab</p>
          <h1>Build systems proof, not just course completion screenshots.</h1>
          <p className="page-intro">
            This lab is the place for hands-on C++, HFT, concurrency, compiler/performance and AI systems projects that learners can discuss in interviews.
          </p>
        </section>

        <section className="platform-matrix" aria-label="Project categories">
          {projects.map(([title, text]) => (
            <article className="platform-table-card" key={title}>
              <span className="platform-status soon">Project track</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

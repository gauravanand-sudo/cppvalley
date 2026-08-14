import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "HFT Hiring Proof",
  description: "A practical checklist for converting systems work into credible HFT interview evidence.",
  alternates: { canonical: "/proof" },
};

const evidence = [
  { item: "One-page architecture", question: "Can I understand boundaries and ownership in two minutes?", deliverable: "architecture.md + diagram" },
  { item: "Correctness argument", question: "What must always be true, and how is it tested?", deliverable: "invariants.md + test report" },
  { item: "Benchmark protocol", question: "What exactly was measured on which machine?", deliverable: "benchmarks/method.md" },
  { item: "Raw performance data", question: "Can I inspect distributions instead of a cherry-picked average?", deliverable: "results/*.csv + plots" },
  { item: "Profiling evidence", question: "Do the claimed bottlenecks agree with counters and traces?", deliverable: "perf/ + flamegraphs" },
  { item: "Failure campaign", question: "What happens on gaps, overload, restart, and stale state?", deliverable: "failure-tests.md" },
  { item: "Trade-off record", question: "What alternatives were rejected, and why?", deliverable: "decisions/*.md" },
  { item: "Five-minute demo", question: "Can you explain the system without hiding behind slides?", deliverable: "YouTube demo + README" },
] as const;

const interviewStories = [
  ["Performance", "A measured bottleneck, controlled experiment, result, and limitation"],
  ["Concurrency", "An invariant, linearization point, progress guarantee, and reclamation choice"],
  ["Production", "A failure mode, detection path, containment, recovery, and prevention"],
  ["Design", "A boundary decision with rejected alternatives and operational consequences"],
] as const;

export default function ProofPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="page-hero page-width">
          <div>
            <p className="kicker">HIRING PROOF / NOT CERTIFICATES</p>
            <h1>Turn every project into interview evidence.</h1>
            <p>
              Recruiters notice keywords. Engineers test credibility. This checklist makes the
              work easy to scan, hard to fake, and useful during a deep technical interview.
            </p>
          </div>
          <dl className="page-hero-stats">
            <div><dt>Core projects</dt><dd>04</dd></div>
            <div><dt>Evidence items</dt><dd>08 each</dd></div>
            <div><dt>Goal</dt><dd>Defensible work</dd></div>
          </dl>
        </section>

        <section className="page-section page-width" aria-labelledby="checklist-heading">
          <header className="section-header">
            <div><p className="section-label">01 / REPOSITORY CHECKLIST</p><h2 id="checklist-heading">What every serious project ships with.</h2></div>
            <p>Use this as the definition of done for latlab, wirebook, ordergate, and tickforge.</p>
          </header>

          <div className="evidence-table">
            <div className="evidence-head"><span>#</span><span>Evidence</span><span>Reviewer question</span><span>Deliverable</span></div>
            {evidence.map((row, index) => (
              <div className="evidence-row" key={row.item}>
                <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{row.item}</strong>
                <p>{row.question}</p>
                <code>{row.deliverable}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section section-contrast" aria-labelledby="stories-heading">
          <div className="page-width">
            <header className="section-header">
              <div><p className="section-label">02 / INTERVIEW STORIES</p><h2 id="stories-heading">Prepare four stories from real work.</h2></div>
              <p>Each story should be specific enough for an interviewer to challenge.</p>
            </header>
            <div className="story-grid">
              {interviewStories.map(([title, structure], index) => (
                <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{structure}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-width" aria-labelledby="page-heading">
          <header className="section-header">
            <div><p className="section-label">03 / RECRUITER VIEW</p><h2 id="page-heading">Your eventual /about page should be one screen.</h2></div>
            <p>Do not make a recruiter reconstruct your story from twelve repositories and fifty videos.</p>
          </header>
          <div className="recruiter-wireframe">
            <div><span>01</span><strong>Target</strong><p>Low-latency C++ / market data / exchange connectivity</p></div>
            <div><span>02</span><strong>Best proof</strong><p>One capstone, one performance result, one failure story</p></div>
            <div><span>03</span><strong>Credibility</strong><p>Experience, location, availability, résumé, GitHub, LinkedIn</p></div>
            <div><span>04</span><strong>Contact</strong><p>One obvious email action and no account wall</p></div>
          </div>
          <div className="proof-next">
            <p>The personal recruiter page stays unpublished until real résumé and contact details are supplied.</p>
            <Link className="action action-primary" href="/projects">Choose a flagship project →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


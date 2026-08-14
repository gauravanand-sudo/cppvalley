import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "HFT Systems Projects",
  description: "Four portfolio-grade C++ systems projects with concrete acceptance criteria.",
  alternates: { canonical: "/projects" },
};

const projects = [
  {
    id: "latlab",
    number: "01",
    title: "Latency laboratory",
    roleSignal: "Measurement discipline",
    purpose: "Produce latency claims that another engineer can reproduce and challenge.",
    components: ["Calibrated clocks", "Hdr-style histograms", "Machine manifest", "PMU counter harness", "OS-noise trace", "Report generator"],
    gates: [
      "Reports the measurement boundary and clock source",
      "Retains raw samples and distribution data",
      "Pins workload configuration to a machine manifest",
      "Explains warm-up, outliers, and known sources of bias",
    ],
    episodes: "EP 01–32",
  },
  {
    id: "wirebook",
    number: "02",
    title: "Feed handler + order book",
    roleSignal: "Market-data engineering",
    purpose: "Convert bounded, adversarial wire input into recovered and verified market state.",
    components: ["UDP receiver", "Sequence tracker", "ITCH decoder", "Gap recovery", "L2/L3 book", "Deterministic replay"],
    gates: [
      "Rejects malformed and truncated messages safely",
      "Detects duplicates, gaps, and out-of-order packets",
      "Checks book invariants after every state transition",
      "Replays the same capture to the same terminal state",
    ],
    episodes: "EP 33–76",
  },
  {
    id: "ordergate",
    number: "03",
    title: "Order gateway + risk engine",
    roleSignal: "Exchange connectivity",
    purpose: "Model controlled order entry from intent through acknowledgement, fill, reject, and recovery.",
    components: ["Session state", "Order lifecycle", "Pre-trade limits", "Kill switch", "Journal", "Drop copy + reconciliation"],
    gates: [
      "Every order transition is explicit and testable",
      "Risk checks fail closed under stale or missing state",
      "Kill-switch behavior is deterministic and auditable",
      "Restart reconstructs order state from durable evidence",
    ],
    episodes: "EP 69–88",
  },
  {
    id: "tickforge",
    number: "04",
    title: "Integrated tick-to-trade platform",
    roleSignal: "End-to-end systems ownership",
    purpose: "Integrate market data, decision, risk, order entry, telemetry, replay, and recovery.",
    components: ["Feed plant", "Strategy seam", "Bounded queues", "Risk gateway", "Timestamp provenance", "Failure injection"],
    gates: [
      "Defines ownership and backpressure at every boundary",
      "Attributes latency by clock domain and pipeline stage",
      "Survives an incident game day and state reconciliation",
      "Ships with architecture, performance, and limitation notes",
    ],
    episodes: "EP 89–96",
  },
] as const;

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="page-hero page-width">
          <div>
            <p className="kicker">PROJECTS / THE PORTFOLIO SPINE</p>
            <h1>Four systems. Four different hiring signals.</h1>
            <p>
              These are not weekend demos. Each project has a narrow purpose, explicit failure
              behavior, reproducible evidence, and a reviewable definition of done.
            </p>
          </div>
          <dl className="page-hero-stats">
            <div><dt>Repositories</dt><dd>04</dd></div>
            <div><dt>Evidence types</dt><dd>Tests + traces</dd></div>
            <div><dt>Final system</dt><dd>Tick → trade</dd></div>
          </dl>
        </section>

        <nav className="project-jump" aria-label="Jump to project">
          <div className="page-width">
            {projects.map((project) => <a href={`#${project.id}`} key={project.id}>{project.number} / {project.id}</a>)}
          </div>
        </nav>

        <div className="page-width project-specs">
          {projects.map((project) => (
            <article className="project-spec" id={project.id} key={project.id}>
              <header>
                <div className="spec-number">{project.number}</div>
                <div><code>{project.id}</code><h2>{project.title}</h2><p>{project.purpose}</p></div>
                <div className="role-signal"><span>HIRING SIGNAL</span><strong>{project.roleSignal}</strong></div>
              </header>

              <div className="spec-grid">
                <section>
                  <h3>System components</h3>
                  <ul className="component-list">
                    {project.components.map((component) => <li key={component}>{component}</li>)}
                  </ul>
                </section>
                <section>
                  <h3>Acceptance gates</h3>
                  <ol className="gate-list">
                    {project.gates.map((gate, index) => <li key={gate}><span>0{index + 1}</span>{gate}</li>)}
                  </ol>
                </section>
              </div>

              <footer>
                <span>CURRICULUM COVERAGE / {project.episodes}</span>
                <Link href="/curriculum">Find the dependencies →</Link>
              </footer>
            </article>
          ))}

          <section className="project-note">
            <p className="section-label">IMPORTANT</p>
            <h2>Publish the evidence, not just the code.</h2>
            <p>
              Every repository should include a machine manifest, benchmark method, raw results,
              correctness strategy, architecture note, known limitations, and a short demo.
            </p>
            <Link className="action action-primary" href="/proof">Open the hiring-proof checklist →</Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}


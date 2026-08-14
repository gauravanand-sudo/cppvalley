import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

const phases = [
  { number: "01", episodes: "01–08", focus: "Measurement", result: "Benchmark laboratory" },
  { number: "02", episodes: "09–20", focus: "CPU & memory", result: "Locality evidence pack" },
  { number: "03", episodes: "21–32", focus: "Linux determinism", result: "Low-jitter host profile" },
  { number: "04", episodes: "33–44", focus: "Network datapaths", result: "Receiver bake-off" },
  { number: "05", episodes: "45–56", focus: "Low-latency C++", result: "Protocol core" },
  { number: "06", episodes: "57–68", focus: "Concurrency", result: "Queue library" },
  { number: "07", episodes: "69–80", focus: "Trading systems", result: "Feed plant + gateway" },
  { number: "08", episodes: "81–88", focus: "Production safety", result: "Operable platform" },
  { number: "09", episodes: "89–96", focus: "Hiring conversion", result: "Public capstone" },
] as const;

const projects = [
  {
    name: "latlab",
    title: "Latency laboratory",
    scope: "TSC calibration, histograms, PMU counters, topology manifests, OS-noise traces",
    proves: "You can measure without lying to yourself.",
    href: "/projects#latlab",
  },
  {
    name: "wirebook",
    title: "Feed handler + order book",
    scope: "ITCH parser, sequence recovery, deterministic replay, invariant-checked L2/L3 book",
    proves: "You can turn hostile wire data into correct state.",
    href: "/projects#wirebook",
  },
  {
    name: "ordergate",
    title: "Order gateway + risk",
    scope: "Order lifecycle, pre-trade limits, kill switch, journal, drop copy, reconciliation",
    proves: "You understand exchange connectivity and control.",
    href: "/projects#ordergate",
  },
  {
    name: "tickforge",
    title: "Tick-to-trade capstone",
    scope: "Timestamp provenance, bounded queues, replay, failure injection, recovery",
    proves: "You can own the whole trading-system path.",
    href: "/projects#tickforge",
  },
] as const;

const proofRows = [
  ["Correctness", "Invariants, property tests, sanitizers, recovery tests"],
  ["Performance", "Distributions, machine manifest, flamegraphs, counters"],
  ["Judgement", "Trade-offs, rejected designs, scope, known limitations"],
  ["Communication", "Architecture note, demo video, incident write-up"],
] as const;

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function Home() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="home-intro page-width">
          <figure className="home-logo-wrap">
            <Image
              className="home-logo"
              src="/cppvalley-logo.png"
              alt="cppvalley logo"
              width={1025}
              height={1024}
              sizes="(max-width: 760px) 240px, 340px"
              priority
            />
            <figcaption>BUILD LOG / C++ → HFT</figcaption>
          </figure>

          <div className="home-intro-copy">
            <p className="kicker">A PUBLIC HFT ENGINEERING CURRICULUM</p>
            <h1>C++ for high-frequency trading, taught by building the system.</h1>
            <p className="intro-lede">
              A 96-episode path through measurement, CPU architecture, Linux, networking,
              concurrency, market data, order entry, risk, and production operations.
            </p>
            <div className="primary-actions">
              <Link className="action action-primary" href="/curriculum">
                Browse the curriculum <Arrow />
              </Link>
              <a className="action action-secondary" href={youtubeUrl} target="_blank" rel="noreferrer">
                Watch on YouTube ↗
              </a>
            </div>
            <dl className="intro-stats">
              <div><dt>Episodes</dt><dd>96</dd></div>
              <div><dt>Phases</dt><dd>09</dd></div>
              <div><dt>Systems</dt><dd>04</dd></div>
              <div><dt>Target</dt><dd>HFT core</dd></div>
            </dl>
          </div>
        </section>

        <section className="utility-bar" aria-label="Quick links">
          <div className="page-width utility-grid">
            <Link href="/curriculum">
              <span>01</span><strong>Find an episode</strong><small>Search all 96 topics</small><Arrow />
            </Link>
            <Link href="/projects">
              <span>02</span><strong>Build a system</strong><small>Four portfolio-grade repos</small><Arrow />
            </Link>
            <Link href="/proof">
              <span>03</span><strong>Prepare for hiring</strong><small>Turn work into evidence</small><Arrow />
            </Link>
          </div>
        </section>

        <section className="page-section page-width" aria-labelledby="path-heading">
          <header className="section-header">
            <div>
              <p className="section-label">01 / THE PATH</p>
              <h2 id="path-heading">Learn in dependency order.</h2>
            </div>
            <p>Each phase ends with something inspectable. No badges, streaks, or fake completion metrics.</p>
          </header>

          <div className="phase-table" role="list">
            <div className="table-head" aria-hidden="true">
              <span>Phase</span><span>Episodes</span><span>Focus</span><span>Exit artifact</span><span />
            </div>
            {phases.map((phase, index) => (
              <Link className="phase-row" href={`/curriculum#phase-${index}`} key={phase.number} role="listitem">
                <span className="row-number">{phase.number}</span>
                <span className="row-episodes">EP {phase.episodes}</span>
                <strong>{phase.focus}</strong>
                <span>{phase.result}</span>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>

        <section className="page-section section-contrast" aria-labelledby="projects-heading">
          <div className="page-width">
            <header className="section-header">
              <div>
                <p className="section-label">02 / FLAGSHIP SYSTEMS</p>
                <h2 id="projects-heading">Projects an interviewer can inspect.</h2>
              </div>
              <p>The curriculum converges on four repositories with explicit acceptance criteria.</p>
            </header>

            <div className="project-table">
              {projects.map((project, index) => (
                <Link className="project-row" href={project.href} key={project.name}>
                  <span className="row-number">0{index + 1}</span>
                  <div className="project-name"><code>{project.name}</code><h3>{project.title}</h3></div>
                  <p>{project.scope}</p>
                  <strong>{project.proves}</strong>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-width" aria-labelledby="proof-heading">
          <header className="section-header">
            <div>
              <p className="section-label">03 / HIRING PROOF</p>
              <h2 id="proof-heading">Make the work defensible.</h2>
            </div>
            <p>A fast demo is not enough. Each build should answer the four questions below.</p>
          </header>

          <div className="proof-layout">
            <div className="proof-list">
              {proofRows.map(([label, evidence], index) => (
                <div key={label}>
                  <span>0{index + 1}</span><strong>{label}</strong><p>{evidence}</p>
                </div>
              ))}
            </div>
            <aside className="proof-callout">
              <p className="kicker">THE CPPVALLEY STANDARD</p>
              <blockquote>
                Never claim fast, lock-free, zero-copy, deterministic, or production-ready
                without defining the boundary and publishing the evidence.
              </blockquote>
              <Link className="text-action" href="/proof">Open the hiring-proof checklist <Arrow /></Link>
            </aside>
          </div>
        </section>

        <section className="final-cta">
          <div className="page-width final-cta-inner">
            <div><p className="section-label">START AT THE BEGINNING</p><h2>Measure first. Optimize second.</h2></div>
            <div className="primary-actions">
              <Link className="action action-light" href="/curriculum#phase-0">Open Phase 01 <Arrow /></Link>
              <a className="action action-outline-light" href={youtubeUrl} target="_blank" rel="noreferrer">Subscribe ↗</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}


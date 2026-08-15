import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

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
            <BrandLockup size="hero" />
            <figcaption>BUILD LOG / C++ → HFT</figcaption>
          </figure>

          <div className="home-intro-copy">
            <p className="kicker">THE HFT ENGINEERING MASTERY PATH</p>
            <h1>96 focused lessons. Four expert skill stacks. One serious portfolio.</h1>
            <p className="intro-lede">
              Master modern C++, low-latency engineering, Linux systems and electronic trading
              by learning every layer—and proving it with code an interviewer can inspect.
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
              <div><dt>Mini-topics</dt><dd>96</dd></div>
              <div><dt>Outcomes</dt><dd>288</dd></div>
              <div><dt>Expert stacks</dt><dd>04</dd></div>
              <div><dt>Capstone</dt><dd>Tick → trade</dd></div>
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

        <section className="page-section mastery-home" aria-labelledby="mastery-heading">
          <div className="page-width">
            <header className="section-header mastery-home-head">
              <div>
                <p className="section-label">01 / FOUR EXPERT STACKS</p>
                <h2 id="mastery-heading">Go deep without losing the whole system.</h2>
              </div>
              <p>
                Every mini-topic is tagged by the capability it strengthens, so you can see how
                C++, latency, systems and trading knowledge compound into one engineering profile.
              </p>
            </header>

            <div className="mastery-grid">
              {masteryTracks.map((track, index) => {
                const count = lessons.filter((lesson) => lesson.tracks.includes(track.id)).length;
                return (
                  <Link className={`mastery-card mastery-${track.id}`} href="/curriculum#curriculum-browser" key={track.id}>
                    <div className="mastery-card-top">
                      <span>0{index + 1}</span>
                      <strong>{count} connected lessons</strong>
                    </div>
                    <h3>{track.name}</h3>
                    <p>{track.promise}</p>
                    <ul>
                      {track.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                    </ul>
                    <small>Explore this stack →</small>
                  </Link>
                );
              })}
            </div>

            <div className="value-ledger" aria-label="Curriculum deliverables">
              <div><strong>96</strong><span>video-ready lesson pages</span></div>
              <div><strong>288</strong><span>specific learning outcomes</span></div>
              <div><strong>96</strong><span>focused mini-labs</span></div>
              <div><strong>09</strong><span>portfolio-grade exit artifacts</span></div>
            </div>
          </div>
        </section>

        <section className="page-section page-width" aria-labelledby="path-heading">
          <header className="section-header">
            <div>
              <p className="section-label">02 / THE PATH</p>
              <h2 id="path-heading">Learn in dependency order.</h2>
            </div>
            <p>Each lesson adds a skill. Each phase turns those skills into an artifact worth showing.</p>
          </header>

          <div className="phase-table" role="list">
            <div className="table-head" aria-hidden="true">
              <span>Phase</span><span>Episodes</span><span>Focus</span><span>Exit artifact</span><span />
            </div>
            {phases.map((phase) => (
              <Link className="phase-row" href={`/curriculum#phase-${phase.number - 1}`} key={phase.number} role="listitem">
                <span className="row-number">{String(phase.number).padStart(2, "0")}</span>
                <span className="row-episodes">{phase.range}</span>
                <strong>{phase.title}</strong>
                <span>{phase.output}</span>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>

        <section className="page-section section-contrast" aria-labelledby="projects-heading">
          <div className="page-width">
            <header className="section-header">
              <div>
                <p className="section-label">03 / FLAGSHIP SYSTEMS</p>
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
              <p className="section-label">04 / HIRING PROOF</p>
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
            <div><p className="section-label">START YOUR FIRST MINI-TOPIC</p><h2>Watch it. Build it. Prove it.</h2></div>
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

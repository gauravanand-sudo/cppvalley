import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

const phases = [
  { range: "01–08", title: "Measure first", accent: "mint", proof: "Benchmark laboratory" },
  { range: "09–20", title: "CPU & memory", accent: "cyan", proof: "Locality evidence pack" },
  { range: "21–32", title: "Linux determinism", accent: "violet", proof: "Low-jitter host profile" },
  { range: "33–44", title: "Network datapaths", accent: "amber", proof: "Receiver bake-off" },
  { range: "45–56", title: "Low-latency C++", accent: "mint", proof: "Safe protocol core" },
  { range: "57–68", title: "Concurrency", accent: "cyan", proof: "Queue library" },
  { range: "69–80", title: "Trading systems", accent: "violet", proof: "Feed plant + gateway" },
  { range: "81–88", title: "Production safety", accent: "amber", proof: "Operable platform" },
  { range: "89–96", title: "Hiring conversion", accent: "mint", proof: "Public capstone" },
] as const;

const projects = [
  {
    code: "01",
    name: "latlab",
    title: "Latency laboratory",
    copy: "Clocks, histograms, PMUs, topology manifests, OS-noise traces, and reproducible reports.",
    signal: "measurement discipline",
  },
  {
    code: "02",
    name: "wirebook",
    title: "Feed handler + order book",
    copy: "Bounded wire parsing, sequence recovery, ITCH decoding, and invariant-checked L2/L3 state.",
    signal: "market-data engineering",
  },
  {
    code: "03",
    name: "ordergate",
    title: "Gateway + risk engine",
    copy: "Order lifecycle, pre-trade limits, kill switch, journal, drop copy, and reconciliation.",
    signal: "exchange connectivity",
  },
  {
    code: "04",
    name: "tickforge",
    title: "Tick-to-trade platform",
    copy: "Timestamp provenance, bounded queues, deterministic replay, failure injection, and recovery.",
    signal: "systems ownership",
  },
] as const;

const loop = [
  { step: "Watch", detail: "Build the mental model on YouTube." },
  { step: "Inspect", detail: "Read sources, diagrams, and benchmark notes here." },
  { step: "Build", detail: "Fork the lab and reproduce the result." },
  { step: "Prove", detail: "Publish evidence that survives an interview." },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M6.7 4.4c0-.8.9-1.2 1.5-.8l7 4.8c.6.4.6 1.3 0 1.7l-7 4.8c-.7.5-1.5 0-1.5-.8V4.4Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="site-shell overflow-hidden">
      <header className="nav-wrap">
        <nav className="nav-inner" aria-label="Primary navigation">
          <Link href="/" className="wordmark" aria-label="cppvalley home">
            <span className="wordmark-mark">cv</span>
            <span>cppvalley</span>
          </Link>

          <div className="nav-links">
            <Link href="/curriculum">Curriculum</Link>
            <Link href="#labs">Labs</Link>
            <Link href="#method">Method</Link>
          </div>

          <a className="nav-cta" href={youtubeUrl} target="_blank" rel="noreferrer">
            <span className="status-dot" /> YouTube
          </a>
        </nav>
      </header>

      <section className="hero section-pad">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />

        <div className="content-grid relative">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              HFT CORE SYSTEMS / PUBLIC LAB
            </div>
            <h1>
              From cache line
              <br />
              to <span className="text-gradient">executed order.</span>
            </h1>
            <p className="hero-lede">
              Build, break, measure, and defend low-latency trading infrastructure through a
              96-episode path in C++, Linux, networking, market data, and production systems.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/curriculum">
                Start the curriculum <ArrowIcon />
              </Link>
              <a className="button button-ghost" href={youtubeUrl} target="_blank" rel="noreferrer">
                <PlayIcon /> Watch cppvalley
              </a>
            </div>

            <div className="hero-proof" aria-label="Curriculum summary">
              <div><strong>96</strong><span>episodes</span></div>
              <div><strong>09</strong><span>phases</span></div>
              <div><strong>04</strong><span>flagship builds</span></div>
            </div>
          </div>

          <div className="pipeline-card" aria-label="Tick-to-trade pipeline visualization">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">LIVE SYSTEM MODEL</span>
                <strong>tickforge / pipeline</strong>
              </div>
              <span className="live-pill"><span /> ARMED</span>
            </div>

            <div className="packet-tape">
              <span>ITCH</span><span>0x41</span><span>seq 008421</span><span>len 36</span>
            </div>

            <div className="pipeline">
              {["NIC / RX", "SEQUENCE", "DECODE", "L3 BOOK", "RISK", "ORDER / TX"].map((item, index) => (
                <div className="pipeline-row" key={item}>
                  <span className="pipeline-index">0{index + 1}</span>
                  <span className="pipeline-name">{item}</span>
                  <span className="pipeline-bar"><i style={{ width: `${92 - index * 8}%` }} /></span>
                  <span className="pipeline-state">OK</span>
                </div>
              ))}
            </div>

            <div className="metric-strip">
              <div><span>p50</span><strong>742 ns</strong></div>
              <div><span>p99</span><strong>1.84 µs</strong></div>
              <div><span>drops</span><strong>0</strong></div>
            </div>
            <p className="metric-note">Illustrative UI — every published result includes its boundary and machine manifest.</p>
          </div>
        </div>
      </section>

      <div className="signal-tape" aria-hidden="true">
        <div>
          <span>MEMORY ORDER</span><i />
          <span>NUMA</span><i />
          <span>AF_XDP</span><i />
          <span>DPDK</span><i />
          <span>ITCH 5.0</span><i />
          <span>ORDER BOOKS</span><i />
          <span>PTP / PHC</span><i />
          <span>REPLAY</span><i />
          <span>RISK</span>
        </div>
      </div>

      <section id="method" className="section-pad section-dark">
        <div className="content-grid">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">01 / METHOD</span>
              <h2>No folklore.<br />Only evidence.</h2>
            </div>
            <p>
              cppvalley is not another syntax course. Every claim ends in a trace, test, packet
              capture, benchmark distribution, correctness argument, or failure report.
            </p>
          </div>

          <div className="method-grid">
            {[
              ["BOUNDARY", "Define exactly what the number or guarantee includes."],
              ["INVARIANT", "State what must remain true before optimizing."],
              ["EXPERIMENT", "Change one cause and retain the raw evidence."],
              ["LIMITATION", "Publish where the result stops being valid."],
            ].map(([title, copy], index) => (
              <article className="method-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-paper">
        <div className="content-grid">
          <div className="section-heading split-heading light-heading">
            <div>
              <span className="section-number">02 / CURRICULUM</span>
              <h2>The whole machine,<br />in the right order.</h2>
            </div>
            <p>
              Nine phases take you from trustworthy measurement to an integrated, operable
              tick-to-trade platform—and finally to an interview-ready public portfolio.
            </p>
          </div>

          <div className="phase-grid">
            {phases.map((phase, index) => (
              <Link className={`phase-card accent-${phase.accent}`} href={`/curriculum#phase-${index}`} key={phase.title}>
                <span className="phase-range">EP {phase.range}</span>
                <span className="phase-index">0{index}</span>
                <h3>{phase.title}</h3>
                <p>{phase.proof}</p>
                <span className="phase-link">Open phase <ArrowIcon /></span>
              </Link>
            ))}
          </div>

          <div className="center-action">
            <Link className="button button-ink" href="/curriculum">
              Explore all 96 episodes <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="labs" className="section-pad section-dark labs-section">
        <div className="content-grid">
          <div className="section-heading split-heading">
            <div>
              <span className="section-number">03 / FLAGSHIP LABS</span>
              <h2>Four builds.<br />One hiring story.</h2>
            </div>
            <p>
              Episodes create attention. Projects create conviction. These four repositories
              turn the channel into evidence a systems interviewer can inspect.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.name}>
                <span className="project-code">{project.code}</span>
                <div className="project-title">
                  <span>{project.name}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.copy}</p>
                <span className="project-signal">{project.signal}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad conversion-section">
        <div className="conversion-grid" aria-hidden="true" />
        <div className="content-grid relative">
          <div className="section-heading split-heading light-heading conversion-heading">
            <div>
              <span className="section-number">04 / THE LEARNING LOOP</span>
              <h2>YouTube earns attention.<br />The lab earns trust.</h2>
            </div>
            <p>
              Every video points to one focused lab page. Every lab page returns the learner to
              the next episode. The result is a compounding path, not a collection of dead ends.
            </p>
          </div>

          <div className="loop-grid">
            {loop.map((item, index) => (
              <div className="loop-card" key={item.step}>
                <span>0{index + 1}</span>
                <h3>{item.step}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto-section section-pad">
        <div className="content-grid manifesto-grid">
          <div>
            <span className="section-number">CPPVALLEY STANDARD</span>
            <blockquote>
              “Never claim fast, lock-free, zero-copy, deterministic, or production-ready
              without defining the boundary and publishing the evidence.”
            </blockquote>
          </div>
          <div className="manifesto-actions">
            <p>Start with Episode 01. Leave with a system you can defend.</p>
            <Link className="button button-primary" href="/curriculum">
              Enter the valley <ArrowIcon />
            </Link>
            <a className="text-link" href={youtubeUrl} target="_blank" rel="noreferrer">
              Subscribe on YouTube <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="content-grid footer-grid">
          <div>
            <Link href="/" className="wordmark"><span className="wordmark-mark">cv</span><span>cppvalley</span></Link>
            <p>Low-latency systems, measured in public.</p>
          </div>
          <div className="footer-links">
            <Link href="/curriculum">Curriculum</Link>
            <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://github.com/gauravanand-sudo/cppvalley" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p className="footer-note">Engineering education, not trading advice.</p>
        </div>
      </footer>
    </main>
  );
}

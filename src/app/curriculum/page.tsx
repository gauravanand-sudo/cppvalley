import type { Metadata } from "next";
import Link from "next/link";
import { CurriculumExplorer } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems Curriculum",
  description:
    "See all 96 lessons covering C++, systems, Linux, networking, concurrency, latency statistics, market microstructure, order books, execution, risk and HFT interview preparation.",
  alternates: { canonical: "/curriculum" },
};

const roadmap = [
  ["01", "Measurement + probability basics", "Distributions · percentiles · tail latency · benchmark confidence", "/curriculum/05-histograms-and-tails-not-averages"],
  ["02", "CPU + memory systems", "Caches · branch prediction · TLBs · NUMA · memory bandwidth", "/curriculum#phase-2"],
  ["03", "Linux for low latency", "Scheduling · affinity · interrupts · memory · host tuning", "/curriculum#phase-3"],
  ["04", "Networking + packet paths", "UDP · multicast · sockets · AF_XDP · DPDK · NIC locality", "/curriculum#phase-4"],
  ["05", "Low-latency C++", "Memory layout · allocation · parsing · SIMD · fixed-point types", "/curriculum#phase-5"],
  ["06", "Concurrency + lock-free engineering", "Atomics · memory ordering · queues · reclamation · contention", "/curriculum#phase-6"],
  ["07", "Markets + microstructure", "Orders · venues · spreads · matching · product vocabulary · order books", "/curriculum/69-market-microstructure-for-systems-engineers"],
  ["08", "Market data + execution + risk", "Feeds · sequencing · order entry · executions · limits · reconciliation", "/curriculum#phase-7"],
  ["09", "Tick-to-trade + production systems", "Architecture · latency attribution · recovery · observability · operations", "/curriculum#phase-8"],
  ["10", "HFT interviews + job preparation", "C++/DSA coding · systems design · mock interviews · resume + portfolio", "/curriculum/95-hft-interview-loop-simulation"],
] as const;

export default function CurriculumPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">HFT Core Systems</p>
              <h1>Low-latency engineering curriculum for C++ systems roles.</h1>
              <p>
                {lessons.length} lessons covering measurement, probability, CPU, memory, Linux, networking, concurrency, market microstructure, market data, execution, risk and tick-to-trade design.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href={`/curriculum/${lessons[0].slug}`}>Preview lesson 01</Link>
                <Link className="lp-button" href="/courses">Back to catalog</Link>
              </div>
            </div>
            <aside className="lp-hero-card" aria-label="Curriculum summary">
              <div className="lp-hero-card-top"><span>Curriculum summary</span><strong>C++ · Linux · Networking · Trading Systems</strong></div>
              <div className="lp-stat-grid">
                <div><strong>{lessons.length}</strong><span>lessons</span></div>
                <div><strong>{phases.length}</strong><span>phases</span></div>
                <div><strong>Capstone</strong><span>tick-to-trade</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section" aria-labelledby="roadmap-heading">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Roadmap</p>
              <h2 id="roadmap-heading">What you learn, in order</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {roadmap.map(([number, title, detail, href]) => (
              <Link className="lp-card" href={href} key={number}>
                <div className="lp-card-body">
                  <span className="course-badge">Phase {number}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <strong className="lp-link-text">Open →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container lp-section" aria-labelledby="curriculum-list-heading">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">All lessons</p>
              <h2 id="curriculum-list-heading">Search the curriculum</h2>
            </div>
          </div>
          <CurriculumExplorer phases={phases} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

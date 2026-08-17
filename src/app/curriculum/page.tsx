import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { CurriculumExplorer } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems Curriculum",
  description:
    "See all 96 lessons covering C++, systems, Linux, networking, concurrency, probability and latency statistics, market microstructure, order books, execution, risk and HFT interview preparation.",
  alternates: { canonical: "/curriculum" },
};

const roadmap = [
  {
    number: "01",
    title: "Measurement + probability basics",
    detail: "Distributions · percentiles · tail latency · benchmark confidence",
    href: "/curriculum/05-histograms-and-tails-not-averages",
  },
  {
    number: "02",
    title: "CPU + memory systems",
    detail: "Caches · branch prediction · TLBs · NUMA · memory bandwidth",
    href: "/curriculum#phase-2",
  },
  {
    number: "03",
    title: "Linux for low latency",
    detail: "Scheduling · affinity · interrupts · memory · host tuning",
    href: "/curriculum#phase-3",
  },
  {
    number: "04",
    title: "Networking + packet paths",
    detail: "UDP · multicast · sockets · AF_XDP · DPDK · NIC locality",
    href: "/curriculum#phase-4",
  },
  {
    number: "05",
    title: "Low-latency C++",
    detail: "Memory layout · allocation · parsing · SIMD · fixed-point types",
    href: "/curriculum#phase-5",
  },
  {
    number: "06",
    title: "Concurrency + lock-free engineering",
    detail: "Atomics · memory ordering · queues · reclamation · contention",
    href: "/curriculum#phase-6",
  },
  {
    number: "07",
    title: "Markets + microstructure",
    detail: "Orders · venues · spreads · matching · product vocabulary · order books",
    href: "/curriculum/69-market-microstructure-for-systems-engineers",
  },
  {
    number: "08",
    title: "Market data + execution + risk",
    detail: "Feeds · sequencing · order entry · executions · limits · reconciliation",
    href: "/curriculum#phase-7",
  },
  {
    number: "09",
    title: "Tick-to-trade + production systems",
    detail: "Architecture · latency attribution · recovery · observability · operations",
    href: "/curriculum#phase-8",
  },
  {
    number: "10",
    title: "HFT interviews + job preparation",
    detail: "C++/DSA coding · systems design · mock interviews · resume + portfolio",
    href: "/curriculum/95-hft-interview-loop-simulation",
  },
] as const;

export default function CurriculumPage() {
  return (
    <div className="page-shell institute-site">
      <SiteHeader />

      <main>
        <section className="curriculum-hero site-container">
          <div>
            <p className="eyebrow">HFT CORE SYSTEMS</p>
            <h1>Curriculum</h1>
            <p className="curriculum-deck">
              96 lessons that take you from measurement, probability basics and low-level C++ to
              Linux, networking, concurrency, market microstructure, market data, order books,
              execution, risk and a full tick-to-trade capstone.
            </p>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll now"
                fallbackLabel="Preview lesson 01"
                fallbackHref={`/curriculum/${lessons[0].slug}`}
              />
              <Link className="button button-secondary" href="/">
                Course overview
              </Link>
            </div>
          </div>

          <aside className="curriculum-spec" aria-label="Curriculum summary">
            <div><span>LESSONS</span><strong>{lessons.length}</strong></div>
            <div><span>PHASES</span><strong>{phases.length}</strong></div>
            <div><span>ENGINEERING</span><strong>C++ · Linux · Networking · Concurrency</strong></div>
            <div><span>TRADING</span><strong>Microstructure · Order books · Execution · Risk</strong></div>
            <div><span>CAREER</span><strong>Coding + systems interviews · Portfolio</strong></div>
          </aside>
        </section>

        <section className="curriculum-map site-container" aria-labelledby="roadmap-heading">
          <div className="section-index">01</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">HFT ENGINEERING ROADMAP</p>
                <h2 id="roadmap-heading">What you learn, in order.</h2>
              </div>
            </div>

            <div className="phase-table">
              {roadmap.map((step) => (
                <Link href={step.href} key={step.number}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <small>{step.detail}</small>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="curriculum-main site-container" aria-labelledby="curriculum-list-heading">
          <div className="curriculum-main-heading">
            <span>ALL 96 LESSONS</span>
            <h2 id="curriculum-list-heading">Course lessons</h2>
          </div>
          <CurriculumExplorer phases={phases} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems — C++, Systems, Low Latency & HFT",
  description:
    "Learn C++, Linux, networking, concurrency, low latency, market microstructure and trading systems for HFT engineering. 96 lessons, hands-on projects and interview preparation.",
  alternates: { canonical: "/" },
};

const previewLesson = lessons[0];
const coursePrice = process.env.NEXT_PUBLIC_COURSE_PRICE?.trim();

const hftRoadmap = [
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

export default function Home() {
  return (
    <div className="page-shell institute-site">
      <SiteHeader />

      <main>
        <section className="program-hero site-container">
          <div className="program-hero-main">
            <p className="eyebrow">HFT CORE SYSTEMS</p>
            <h1>Learn C++, systems and low latency for HFT.</h1>
            <p className="program-lede">
              A hands-on course for people who want to understand how fast trading systems are
              actually built. Learn C++, CPU and memory, Linux, networking, concurrency, market
              microstructure, market data, order entry, execution, risk and tick-to-trade design.
            </p>
            <p className="program-audience">
              For college students, job seekers and software engineers who want to break into HFT
              and can see themselves building performance-critical systems.
            </p>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll now"
                fallbackLabel="View the course"
                fallbackHref="/curriculum"
              />
              <Link className="button button-secondary" href={`/curriculum/${previewLesson.slug}`}>
                Preview lesson 01
              </Link>
            </div>
          </div>

          <aside className="program-spec" aria-label="Course details">
            <div><span>LESSONS</span><strong>{lessons.length}</strong></div>
            <div><span>PHASES</span><strong>{phases.length}</strong></div>
            <div><span>CORE</span><strong>C++ · Linux · Networking</strong></div>
            <div><span>HFT</span><strong>Microstructure · Execution · Risk</strong></div>
            <div><span>YOU BUILD</span><strong>Projects + tick-to-trade capstone</strong></div>
            <div><span>CAREER</span><strong>Mock interviews + portfolio preparation</strong></div>
            {coursePrice ? <div><span>PRICE</span><strong>{coursePrice}</strong></div> : null}
          </aside>
        </section>

        <section className="program-outcomes site-container" aria-labelledby="learn-heading">
          <div className="section-index">01</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">WHAT YOU WILL LEARN</p>
                <h2 id="learn-heading">The skills behind serious HFT engineering.</h2>
              </div>
            </div>

            <div className="outcome-table">
              <div>
                <span>C++</span>
                <strong>Write fast, predictable C++</strong>
                <p>Memory layout, allocation, object lifetime, containers, parsing, SIMD and performance.</p>
              </div>
              <div>
                <span>SYSTEMS</span>
                <strong>Understand the machine</strong>
                <p>CPU caches, NUMA, Linux scheduling, interrupts, memory, clocks and measurement.</p>
              </div>
              <div>
                <span>LOW LATENCY</span>
                <strong>Measure before you optimize</strong>
                <p>Distributions, percentiles, tail latency, benchmarking, networking and packet paths.</p>
              </div>
              <div>
                <span>HFT</span>
                <strong>Understand the trading system</strong>
                <p>Market microstructure, order books, market data, execution, risk, replay and recovery.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-section site-container" aria-labelledby="audience-heading">
          <div className="section-index">02</div>
          <div className="section-body">
            <p className="eyebrow">WHO THIS COURSE IS FOR</p>
            <h2 id="audience-heading">If HFT is where you want to go, this gives you a path.</h2>

            <div className="audience-grid">
              <article>
                <span>COLLEGE STUDENT / JOB SEEKER</span>
                <h3>Go beyond DSA and interview puzzles.</h3>
                <p>
                  Learn the systems topics that are hard to pick up from scattered videos and
                  textbooks, then build projects you can talk about in HFT interviews.
                </p>
              </article>
              <article>
                <span>SOFTWARE ENGINEER</span>
                <h3>Move from general software into low-latency systems.</h3>
                <p>
                  Add deeper C++, Linux, networking, concurrency and trading-system knowledge to
                  the engineering experience you already have.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="program-outcomes site-container" aria-labelledby="build-heading">
          <div className="section-index">03</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">WHAT YOU WILL BUILD</p>
                <h2 id="build-heading">Learn by building systems, measuring them and explaining your choices.</h2>
              </div>
            </div>

            <div className="outcome-table">
              <div>
                <span>BENCHMARKING</span>
                <strong>Performance lab</strong>
                <p>Measure latency correctly with clocks, distributions, histograms, counters and reproducible experiments.</p>
              </div>
              <div>
                <span>NETWORKING</span>
                <strong>Low-latency receiver</strong>
                <p>Compare Linux packet paths and understand the cost from the NIC to your application.</p>
              </div>
              <div>
                <span>TRADING</span>
                <strong>Market-data and order systems</strong>
                <p>Decode feeds, maintain book state, model orders and executions, enforce risk and recover from faults.</p>
              </div>
              <div>
                <span>CAPSTONE</span>
                <strong>Tick-to-trade system</strong>
                <p>Bring the pieces together into one project you can use to explain your engineering decisions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="curriculum-map site-container" aria-labelledby="path-heading">
          <div className="section-index">04</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">HFT ENGINEERING ROADMAP</p>
                <h2 id="path-heading">A focused path from low-level systems to HFT interviews.</h2>
              </div>
              <Link href="/curriculum">See every lesson ↗</Link>
            </div>

            <div className="phase-table">
              {hftRoadmap.map((step) => (
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

        <section className="program-outcomes site-container" aria-labelledby="enroll-heading">
          <div className="section-index">05</div>
          <div className="section-body">
            <p className="eyebrow">HFT CORE SYSTEMS</p>
            <div className="section-heading-row">
              <div>
                <h2 id="enroll-heading">Build the C++ and systems depth you need for HFT.</h2>
              </div>
            </div>
            <p className="program-audience">
              Study the full path from low-level performance to market microstructure and trading
              systems, then turn the work into portfolio evidence and stronger interview conversations.
            </p>
            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="View the course"
                fallbackHref="/curriculum"
              />
              <Link className="button button-secondary" href={`/curriculum/${previewLesson.slug}`}>
                Preview lesson 01
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

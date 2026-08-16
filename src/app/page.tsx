import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Engineering Course & Job Preparation",
  description:
    "A 96-lesson path to build HFT engineering skills, portfolio evidence, and interview readiness for HFT roles.",
  alternates: { canonical: "/" },
};

const previewLesson = lessons[0];
const coursePrice = process.env.NEXT_PUBLIC_COURSE_PRICE?.trim();

export default function Home() {
  return (
    <div className="page-shell minimal-site">
      <SiteHeader />

      <main>
        <section className="home-hero site-container">
          <p className="eyebrow">HFT Core Systems</p>
          <h1>Build the skills to break into HFT.</h1>
          <p className="home-lede">
            96 lessons across C++, performance, Linux, networking, concurrency, market data,
            order entry, risk, and tick-to-trade systems — with portfolio work and interview
            preparation designed around HFT engineering roles.
          </p>
          <p>
            For college students and working professionals looking to switch into HFT — builders
            at heart with a passion for high-performance systems and markets.
          </p>

          <div className="action-row">
            <CourseCta
              className="button button-primary"
              checkoutLabel="Enroll now"
              fallbackLabel="View curriculum"
            />
            <Link className="button button-secondary" href={`/curriculum/${previewLesson.slug}`}>
              Preview lesson 01
            </Link>
          </div>

          {coursePrice ? <p className="price">{coursePrice}</p> : null}

          <div className="home-meta" aria-label="Course facts">
            <span>{lessons.length} lessons</span>
            <span>{phases.length} phases</span>
            <span>Portfolio + interview prep</span>
          </div>
        </section>

        <section className="home-content site-container" aria-labelledby="covers-heading">
          <h2 id="covers-heading">What the course covers</h2>
          <div className="topic-grid">
            <div>
              <strong>C++ & performance</strong>
              <span>Memory, allocation, CPU caches, benchmarking, latency.</span>
            </div>
            <div>
              <strong>Linux & networking</strong>
              <span>Scheduling, NUMA, interrupts, multicast, kernel and user-space packet paths.</span>
            </div>
            <div>
              <strong>Concurrency</strong>
              <span>Atomics, memory ordering, lock-free queues, reclamation.</span>
            </div>
            <div>
              <strong>Trading systems</strong>
              <span>Market data, order books, order entry, risk, replay, operations.</span>
            </div>
          </div>
        </section>

        <section className="home-curriculum site-container" aria-labelledby="path-heading">
          <div className="section-row">
            <div>
              <h2 id="path-heading">Course path</h2>
              <p>{phases.length} phases, from fundamentals to portfolio and interview preparation.</p>
            </div>
            <Link href="/curriculum">View all {lessons.length} lessons →</Link>
          </div>

          <div className="phase-list">
            {phases.map((phase) => (
              <Link href={`/curriculum#phase-${phase.number}`} key={phase.number}>
                <span>{String(phase.number).padStart(2, "0")}</span>
                <strong>{phase.title}</strong>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

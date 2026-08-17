import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems — HFT Engineering & Job Preparation",
  description:
    "A rigorous 96-lesson path through low-latency systems, portfolio evidence, and interview preparation for HFT engineering roles.",
  alternates: { canonical: "/" },
};

const previewLesson = lessons[0];
const coursePrice = process.env.NEXT_PUBLIC_COURSE_PRICE?.trim();

export default function Home() {
  return (
    <div className="page-shell institute-site">
      <SiteHeader />

      <main>
        <section className="program-hero site-container">
          <div className="program-hero-main">
            <p className="eyebrow">HFT CORE SYSTEMS / 96 LESSONS / 9 PHASES</p>
            <h1>HFT systems engineering + job preparation.</h1>
            <p className="program-lede">
              One rigorous path from low-latency C++ and Linux to market data, order entry,
              risk, portfolio evidence, and interview readiness for HFT engineering roles.
            </p>
            <p className="program-audience">
              For college students and working professionals looking to switch into HFT —
              builders at heart with a passion for HFT.
            </p>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="View curriculum"
              />
              <Link className="button button-secondary" href={`/curriculum/${previewLesson.slug}`}>
                Open lesson 01
              </Link>
            </div>
          </div>

          <aside className="program-spec" aria-label="Course specification">
            <div><span>PROGRAM</span><strong>HFT Core Systems</strong></div>
            <div><span>OBJECTIVE</span><strong>HFT engineering role</strong></div>
            <div><span>METHOD</span><strong>Systems + labs + evidence</strong></div>
            <div><span>OUTPUT</span><strong>Portfolio + interview readiness</strong></div>
            <div><span>SCOPE</span><strong>{lessons.length} lessons / {phases.length} phases</strong></div>
            {coursePrice ? <div><span>PRICE</span><strong>{coursePrice}</strong></div> : null}
          </aside>
        </section>

        <section className="program-outcomes site-container" aria-labelledby="outcomes-heading">
          <div className="section-index">01</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">PROGRAM OUTPUT</p>
                <h2 id="outcomes-heading">What you leave with</h2>
              </div>
            </div>

            <div className="outcome-table">
              <div>
                <span>01 / SYSTEMS</span>
                <strong>Low-latency engineering depth</strong>
                <p>C++, CPU and memory behavior, Linux, networking, concurrency, measurement.</p>
              </div>
              <div>
                <span>02 / TRADING</span>
                <strong>Trading-system fluency</strong>
                <p>Market data, order books, order entry, risk, replay, production operations.</p>
              </div>
              <div>
                <span>03 / EVIDENCE</span>
                <strong>Work you can defend</strong>
                <p>Labs, measurements, design decisions, capstone artifacts, portfolio evidence.</p>
              </div>
              <div>
                <span>04 / CAREER</span>
                <strong>Interview readiness</strong>
                <p>Systems reasoning, HFT interview simulation, project narrative, hiring conversion.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-section site-container" aria-labelledby="audience-heading">
          <div className="section-index">02</div>
          <div className="section-body">
            <p className="eyebrow">WHO THIS IS FOR</p>
            <h2 id="audience-heading">Two common entry points. One technical bar.</h2>

            <div className="audience-grid">
              <article>
                <span>COLLEGE STUDENT</span>
                <h3>You want to enter HFT with evidence, not just interest.</h3>
                <p>
                  Build the systems foundation, projects, and interview depth that turn curiosity
                  about HFT into a credible engineering profile.
                </p>
              </article>
              <article>
                <span>WORKING PROFESSIONAL</span>
                <h3>You can build software. Now specialize for HFT.</h3>
                <p>
                  Translate existing engineering experience into low-latency C++, Linux,
                  networking, concurrency, and trading-system knowledge that HFT interviews test.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="curriculum-map site-container" aria-labelledby="path-heading">
          <div className="section-index">03</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">CURRICULUM MAP</p>
                <h2 id="path-heading">From measurement to hiring conversion.</h2>
              </div>
              <Link href="/curriculum">All {lessons.length} lessons ↗</Link>
            </div>

            <div className="phase-table">
              {phases.map((phase) => (
                <Link href={`/curriculum#phase-${phase.number}`} key={phase.number}>
                  <span>{String(phase.number).padStart(2, "0")}</span>
                  <strong>{phase.title}</strong>
                  <small>{phase.range}</small>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

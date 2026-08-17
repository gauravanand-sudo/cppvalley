import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems — HFT Engineering Career Program",
  description:
    "A 96-lesson HFT engineering program for college students and software engineers building low-latency systems skills, portfolio evidence, and interview readiness.",
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
            <h1>Train for HFT engineering roles.</h1>
            <p className="program-lede">
              Build the C++, Linux, networking, concurrency, market-data, order-entry,
              and low-latency systems depth that HFT engineering interviews demand.
            </p>
            <p className="program-audience">
              Designed for college students entering HFT and software engineers switching into HFT.
              Every phase ends in work you can explain, measure, and defend in an interview.
            </p>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="Start HFT Core Systems"
                fallbackHref={`/curriculum/${previewLesson.slug}`}
              />
              <Link className="button button-secondary" href="/curriculum">
                View all 96 lessons
              </Link>
            </div>
          </div>

          <aside className="program-spec" aria-label="Course specification">
            <div><span>PROGRAM</span><strong>HFT Core Systems</strong></div>
            <div><span>FOR</span><strong>Students + software engineers</strong></div>
            <div><span>GOAL</span><strong>HFT engineering interviews</strong></div>
            <div><span>METHOD</span><strong>Systems + labs + measurable evidence</strong></div>
            <div><span>OUTPUT</span><strong>Portfolio + capstone + interview practice</strong></div>
            <div><span>SCOPE</span><strong>{lessons.length} lessons / {phases.length} phases</strong></div>
            {coursePrice ? <div><span>PRICE</span><strong>{coursePrice}</strong></div> : null}
          </aside>
        </section>

        <section className="program-outcomes site-container" aria-labelledby="outcomes-heading">
          <div className="section-index">01</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">CAREER OUTPUT</p>
                <h2 id="outcomes-heading">Study that turns into interview evidence.</h2>
              </div>
            </div>

            <div className="outcome-table">
              <div>
                <span>01 / SYSTEMS</span>
                <strong>Low-latency engineering depth</strong>
                <p>C++, CPU and memory behavior, Linux, networking, concurrency, and measurement.</p>
              </div>
              <div>
                <span>02 / TRADING</span>
                <strong>Trading-system fluency</strong>
                <p>Market data, order books, order entry, pre-trade risk, replay, and operations.</p>
              </div>
              <div>
                <span>03 / PORTFOLIO</span>
                <strong>Projects you can defend</strong>
                <p>Benchmark labs, receiver experiments, protocol systems, and a tick-to-trade capstone.</p>
              </div>
              <div>
                <span>04 / INTERVIEW</span>
                <strong>Practice from first principles</strong>
                <p>Systems reasoning, design review, debugging, HFT interview simulation, and project narrative.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-section site-container" aria-labelledby="audience-heading">
          <div className="section-index">02</div>
          <div className="section-body">
            <p className="eyebrow">WHO SHOULD ENROLL</p>
            <h2 id="audience-heading">Two entry points. One HFT engineering standard.</h2>

            <div className="audience-grid">
              <article>
                <span>COLLEGE STUDENT</span>
                <h3>Graduate with systems depth and work to show.</h3>
                <p>
                  Build beyond DSA and textbook C++. Learn performance measurement, Linux,
                  networking, concurrency, trading systems, and complete a portfolio-grade capstone.
                </p>
              </article>
              <article>
                <span>JOB SEEKER / SOFTWARE ENGINEER</span>
                <h3>Convert software experience into HFT-specific evidence.</h3>
                <p>
                  Specialize your existing engineering skills for low-latency systems, market data,
                  order entry, risk, and the technical reasoning HFT interviews probe.
                </p>
              </article>
            </div>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll now"
                fallbackLabel="Start lesson 01"
                fallbackHref={`/curriculum/${previewLesson.slug}`}
              />
              <Link className="button button-secondary" href="/curriculum#phase-9">
                See interview-prep phase
              </Link>
            </div>
          </div>
        </section>

        <section className="program-outcomes site-container" aria-labelledby="portfolio-heading">
          <div className="section-index">03</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">WHAT YOU CAN SHOW</p>
                <h2 id="portfolio-heading">Concrete engineering artifacts, not course completion claims.</h2>
              </div>
            </div>

            <div className="outcome-table">
              <div>
                <span>PHASE 01</span>
                <strong>Reproducible benchmark laboratory</strong>
                <p>Measurement boundaries, clocks, histograms, counters, machine manifests, and raw data.</p>
              </div>
              <div>
                <span>PHASE 04</span>
                <strong>Low-latency receiver bake-off</strong>
                <p>Compare packet paths with latency, loss, CPU, portability, and complexity evidence.</p>
              </div>
              <div>
                <span>PHASE 07</span>
                <strong>Market-data plant + order gateway</strong>
                <p>Sequencing, decoding, book state, order lifecycle, risk, recovery, and reconciliation.</p>
              </div>
              <div>
                <span>PHASE 09</span>
                <strong>Integrated tick-to-trade capstone</strong>
                <p>Architecture, correctness campaign, performance campaign, design review, and interview simulation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="curriculum-map site-container" aria-labelledby="path-heading">
          <div className="section-index">04</div>
          <div className="section-body">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">CURRICULUM MAP</p>
                <h2 id="path-heading">From measurement to interview readiness.</h2>
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

        <section className="program-outcomes site-container" aria-labelledby="enroll-heading">
          <div className="section-index">05</div>
          <div className="section-body">
            <p className="eyebrow">START THE PROGRAM</p>
            <div className="section-heading-row">
              <div>
                <h2 id="enroll-heading">Build the profile you want to discuss in an HFT interview.</h2>
              </div>
            </div>
            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="Start lesson 01"
                fallbackHref={`/curriculum/${previewLesson.slug}`}
              />
              <Link className="button button-secondary" href="/curriculum">
                Review curriculum
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

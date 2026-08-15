import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems Course",
  description:
    "One advanced HFT engineering course covering modern C++, low latency, Linux, networking, concurrency, market data, risk, and tick-to-trade systems.",
  alternates: { canonical: "/" },
};

const previewLesson = lessons[0];
const coursePrice = process.env.NEXT_PUBLIC_COURSE_PRICE?.trim();

export default function Home() {
  return (
    <div className="page-shell single-course-page">
      <SiteHeader />

      <main>
        <section className="course-hero market-container">
          <div className="course-hero-copy">
            <p className="course-kicker">ONE COURSE · HFT CORE SYSTEMS</p>
            <h1>Go from modern C++ to the full tick-to-trade engineering path.</h1>
            <p className="course-hero-lede">
              A dependency-ordered course for engineers who want to understand how performance,
              Linux, networking, concurrency, market data, order flow, and risk fit together in a
              serious HFT system.
            </p>

            <div className="course-hero-actions">
              <CourseCta
                className="course-button course-button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="View the full curriculum"
              />
              <Link
                className="course-button course-button-secondary"
                href={`/curriculum/${previewLesson.slug}`}
              >
                Preview lesson 01
              </Link>
            </div>

            {coursePrice ? <p className="course-price-note">Course price: {coursePrice}</p> : null}

            <dl className="course-facts" aria-label="Course facts">
              <div><dt>Lessons</dt><dd>{lessons.length}</dd></div>
              <div><dt>Phases</dt><dd>{phases.length}</dd></div>
              <div><dt>Skill domains</dt><dd>{masteryTracks.length}</dd></div>
              <div><dt>Format</dt><dd>Video + lab + proof</dd></div>
            </dl>
          </div>

          <div className="course-hero-visual">
            <Image
              src="/cppvalley-logo.webp"
              alt="cppvalley"
              width={1200}
              height={593}
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="course-cover-caption">
              <span>HFT CORE SYSTEMS</span>
              <strong>C++ → Linux → Networks → Trading Systems</strong>
            </div>
          </div>
        </section>

        <section className="course-trust-strip" aria-label="Course approach">
          <div className="market-container course-trust-grid">
            <div><strong>One connected course</strong><span>No marketplace clutter or unrelated tracks.</span></div>
            <div><strong>Hands-on by design</strong><span>Every lesson points to a focused build or experiment.</span></div>
            <div><strong>Evidence over completion</strong><span>Explain, implement, measure, and defend the result.</span></div>
          </div>
        </section>

        <section className="course-section market-container" id="course" aria-labelledby="course-heading">
          <div className="course-section-heading">
            <p className="course-kicker">WHAT THIS COURSE BUILDS</p>
            <h2 id="course-heading">One HFT course, four engineering capabilities.</h2>
            <p>
              The course is organized as one system rather than a collection of separate products.
              Each capability compounds into the next layer of the trading stack.
            </p>
          </div>

          <div className="course-capability-grid">
            {masteryTracks.map((track, index) => (
              <article key={track.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{track.name}</h3>
                <p>{track.promise}</p>
                <ul>
                  {track.capabilities.slice(0, 3).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="course-roadmap-section" aria-labelledby="roadmap-heading">
          <div className="market-container course-roadmap-layout">
            <div className="course-roadmap-intro">
              <p className="course-kicker">THE ROADMAP</p>
              <h2 id="roadmap-heading">Nine phases. One path from measurement to tick-to-trade.</h2>
              <p>
                The order matters. You start by learning how to measure honestly, then work through
                hardware, Linux, networks, C++, concurrency, trading mechanics, and integrated systems.
              </p>
              <Link className="course-text-link" href="/curriculum">
                Open the complete 96-lesson curriculum →
              </Link>
            </div>

            <div className="course-roadmap-list">
              {phases.map((phase) => (
                <Link href={`/curriculum#phase-${phase.number}`} key={phase.number}>
                  <span>{String(phase.number).padStart(2, "0")}</span>
                  <div>
                    <strong>{phase.title}</strong>
                    <small>{phase.output}</small>
                  </div>
                  <b aria-hidden="true">→</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="course-section market-container" aria-labelledby="included-heading">
          <div className="course-section-heading compact">
            <p className="course-kicker">HOW YOU LEARN</p>
            <h2 id="included-heading">Every lesson has a job.</h2>
          </div>

          <div className="course-included-grid">
            <article>
              <span>01</span>
              <h3>Understand the mechanism</h3>
              <p>Start with the systems concept and the mental model you need to reason about it.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Build the mini-lab</h3>
              <p>Reproduce the behavior in code instead of treating the lesson as passive viewing.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Produce evidence</h3>
              <p>Leave with a measurement, artifact, test, or engineering decision that can be inspected.</p>
            </article>
          </div>
        </section>

        <section className="course-audience" id="audience" aria-labelledby="audience-heading">
          <div className="market-container course-audience-grid">
            <div>
              <p className="course-kicker">WHO IT IS FOR</p>
              <h2 id="audience-heading">Built for engineers who want depth, not trading hype.</h2>
            </div>
            <div className="course-audience-copy">
              <div>
                <strong>A strong fit if you want to:</strong>
                <ul>
                  <li>Move from C++ knowledge into performance-critical systems engineering.</li>
                  <li>Understand the end-to-end HFT stack instead of isolated interview tricks.</li>
                  <li>Build projects and evidence you can explain under technical scrutiny.</li>
                </ul>
              </div>
              <div>
                <strong>Probably not the right course if you want:</strong>
                <ul>
                  <li>An introduction to programming from zero.</li>
                  <li>Trading signals, strategies, or financial advice.</li>
                  <li>A collection of disconnected shortcuts without hands-on engineering work.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="course-faq market-container" aria-labelledby="faq-heading">
          <div className="course-section-heading compact">
            <p className="course-kicker">QUICK ANSWERS</p>
            <h2 id="faq-heading">Before you start.</h2>
          </div>
          <div className="course-faq-list">
            <details>
              <summary>Is cppvalley selling multiple courses?</summary>
              <p>No. The site is centered on one course: HFT Core Systems, with 96 lessons across nine phases.</p>
            </details>
            <details>
              <summary>Can I see the syllabus before enrolling?</summary>
              <p>Yes. The complete curriculum is public so you can judge the depth and sequence before deciding.</p>
            </details>
            <details>
              <summary>Is this course about trading strategies?</summary>
              <p>No. It is engineering education focused on software, systems, market infrastructure, and technical evidence.</p>
            </details>
          </div>
        </section>

        <section className="course-final-cta">
          <div className="market-container course-final-cta-inner">
            <div>
              <p className="course-kicker">HFT CORE SYSTEMS</p>
              <h2>Stop browsing courses. Follow one serious engineering path.</h2>
              <p>Review the syllabus, preview the first lesson, then move through the course in order.</p>
            </div>
            <div className="course-final-actions">
              <CourseCta
                className="course-button course-button-light"
                checkoutLabel="Enroll now"
                fallbackLabel="View the curriculum"
              />
              <Link className="course-button course-button-dark-outline" href={`/curriculum/${previewLesson.slug}`}>
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

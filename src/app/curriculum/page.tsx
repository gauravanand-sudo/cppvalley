import type { Metadata } from "next";
import Link from "next/link";
import { CourseCta } from "@/components/CourseCta";
import { CurriculumExplorer } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "HFT Core Systems Curriculum",
  description:
    "Explore the complete 96-lesson HFT Core Systems course across modern C++, low latency, Linux, networking, concurrency, market data, risk, and tick-to-trade engineering.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "HFT Core Systems — Complete Curriculum",
    description: "One dependency-ordered HFT engineering course with 96 lessons across nine phases.",
    url: "/curriculum",
  },
};

export default function CurriculumPage() {
  return (
    <div className="page-shell single-course-page">
      <SiteHeader />

      <main>
        <section className="curriculum-hero">
          <div className="market-container curriculum-hero-grid">
            <div>
              <p className="course-kicker">HFT CORE SYSTEMS · COURSE CURRICULUM</p>
              <h1>See the entire course before you commit.</h1>
              <p>
                This is one connected HFT engineering course. The 96 lessons are ordered so the
                measurement, hardware, Linux, networking, C++, concurrency, and trading layers build
                on one another instead of competing for your attention.
              </p>

              <div className="curriculum-hero-actions">
                <CourseCta
                  className="course-button course-button-primary"
                  checkoutLabel="Enroll in HFT Core Systems"
                  fallbackLabel="Browse the syllabus"
                  fallbackHref="#curriculum-browser"
                />
                <Link
                  className="course-button course-button-secondary"
                  href={`/curriculum/${lessons[0].slug}`}
                >
                  Preview lesson 01
                </Link>
              </div>
            </div>

            <dl className="curriculum-stats">
              <div><dt>Lessons</dt><dd>{lessons.length}</dd></div>
              <div><dt>Phases</dt><dd>{phases.length}</dd></div>
              <div><dt>Skill domains</dt><dd>{masteryTracks.length}</dd></div>
              <div><dt>Learning outcomes</dt><dd>{lessons.length * 3}</dd></div>
            </dl>
          </div>
        </section>

        <section className="curriculum-body market-container">
          <div className="course-section-heading curriculum-heading">
            <p className="course-kicker">COMPLETE SYLLABUS</p>
            <h2>Find a lesson without fighting the interface.</h2>
            <p>
              Search by topic or jump to a phase. Every row opens the lesson page with its video,
              learning outcomes, mini-lab, evidence target, and course navigation.
            </p>
          </div>

          <CurriculumExplorer phases={phases} />
        </section>

        <section className="curriculum-bottom-cta">
          <div className="market-container curriculum-bottom-cta-inner">
            <div>
              <p className="course-kicker">ONE COURSE · ONE PATH</p>
              <h2>Start at lesson 01 and move through the system in order.</h2>
            </div>
            <div>
              <CourseCta
                className="course-button course-button-light"
                checkoutLabel="Enroll now"
                fallbackLabel="Start lesson 01"
                fallbackHref={`/curriculum/${lessons[0].slug}`}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

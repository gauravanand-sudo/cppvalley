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

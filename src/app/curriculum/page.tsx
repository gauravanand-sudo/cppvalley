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
    "See all 96 lessons covering C++, systems, Linux, networking, concurrency, low latency, market data, order entry, risk and HFT interview preparation.",
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
              96 lessons that take you from performance basics and low-level C++ to Linux,
              networking, concurrency, market data, order systems and a full HFT capstone.
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
            <div><span>TOPICS</span><strong>C++ · Systems · Low Latency · HFT</strong></div>
            <div><span>FINISH WITH</span><strong>Capstone + interview preparation</strong></div>
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

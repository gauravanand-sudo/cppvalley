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
    "The complete 96-lesson HFT engineering curriculum: low-latency systems, trading infrastructure, capstone work, portfolio evidence, and interview preparation.",
  alternates: { canonical: "/curriculum" },
};

export default function CurriculumPage() {
  return (
    <div className="page-shell institute-site">
      <SiteHeader />

      <main>
        <section className="curriculum-hero site-container">
          <div>
            <p className="eyebrow">HFT CORE SYSTEMS / PROGRAM MAP</p>
            <h1>Curriculum</h1>
            <p className="curriculum-deck">
              A dependency-ordered path from measurement and low-latency systems to trading
              infrastructure, capstone evidence, and HFT interview preparation.
            </p>

            <div className="action-row">
              <CourseCta
                className="button button-primary"
                checkoutLabel="Enroll in HFT Core Systems"
                fallbackLabel="Start lesson 01"
                fallbackHref={`/curriculum/${lessons[0].slug}`}
              />
              <Link className="button button-secondary" href="/">
                Program overview
              </Link>
            </div>
          </div>

          <aside className="curriculum-spec" aria-label="Curriculum summary">
            <div><span>LESSONS</span><strong>{lessons.length}</strong></div>
            <div><span>PHASES</span><strong>{phases.length}</strong></div>
            <div><span>END STATE</span><strong>Capstone + interview readiness</strong></div>
          </aside>
        </section>

        <section className="curriculum-main site-container" aria-labelledby="curriculum-list-heading">
          <div className="curriculum-main-heading">
            <span>COURSE INDEX</span>
            <h2 id="curriculum-list-heading">All lessons</h2>
          </div>
          <CurriculumExplorer phases={phases} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

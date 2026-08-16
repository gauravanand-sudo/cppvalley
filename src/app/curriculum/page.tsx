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
    "96 lessons from low-latency systems fundamentals through capstone work, portfolio evidence, and HFT interview preparation.",
  alternates: { canonical: "/curriculum" },
};

export default function CurriculumPage() {
  return (
    <div className="page-shell minimal-site">
      <SiteHeader />

      <main>
        <section className="curriculum-intro site-container">
          <p className="eyebrow">HFT Core Systems</p>
          <h1>Curriculum</h1>
          <p>
            {lessons.length} lessons across {phases.length} phases, ending in capstone work,
            HFT interview simulation, and portfolio launch.
          </p>

          <div className="action-row">
            <CourseCta
              className="button button-primary"
              checkoutLabel="Enroll now"
              fallbackLabel="Start lesson 01"
              fallbackHref={`/curriculum/${lessons[0].slug}`}
            />
            <Link className="button button-secondary" href={`/curriculum/${lessons[0].slug}`}>
              Preview lesson 01
            </Link>
          </div>
        </section>

        <section className="curriculum-main site-container">
          <CurriculumExplorer phases={phases} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

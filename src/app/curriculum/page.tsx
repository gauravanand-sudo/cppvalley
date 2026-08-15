import type { Metadata } from "next";
import Link from "next/link";
import { CurriculumExplorer } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "All C++ & HFT Lessons",
  description:
    "Browse 96 lessons covering modern C++, low latency, Linux systems, networking, concurrency and electronic trading.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "96 C++ & HFT Engineering Lessons",
    description: "Search a dependency-ordered systems curriculum with hands-on labs and proof artifacts.",
    url: "/curriculum",
  },
};

export default function CurriculumPage() {
  return (
    <div className="page-shell market-page">
      <SiteHeader />

      <main>
        <section className="market-catalog-hero">
          <div className="market-container market-catalog-hero-inner">
            <div>
              <p className="market-eyebrow">CPPVALLEY COURSE CATALOG</p>
              <h1>Build C++ and systems expertise that survives technical scrutiny</h1>
              <p>
                Browse the complete 96-lesson learning path. Filter by expert stack, search a
                low-level topic, and open any lesson for its outcomes, mini-lab and proof target.
              </p>
              <div className="market-catalog-actions">
                <a href="#curriculum-browser" className="market-button market-button-primary">Browse lessons</a>
                <Link href="/projects" className="market-button market-button-ghost">See projects</Link>
              </div>
            </div>

            <dl className="market-catalog-stats">
              <div><dt>Focused lessons</dt><dd>{lessons.length}</dd></div>
              <div><dt>Expert stacks</dt><dd>{masteryTracks.length}</dd></div>
              <div><dt>Roadmap phases</dt><dd>{phases.length}</dd></div>
              <div><dt>Outcomes</dt><dd>{lessons.length * 3}</dd></div>
            </dl>
          </div>
        </section>

        <section className="market-catalog-body market-container">
          <div className="market-section-heading market-catalog-heading">
            <p className="market-eyebrow">ALL LESSONS</p>
            <h2>Explore the catalog</h2>
            <p>
              Search for cache, NUMA, lock-free, ITCH, risk, clocks, Linux scheduling—or filter by
              the capability stack you want to strengthen.
            </p>
          </div>

          <CurriculumExplorer phases={phases} tracks={masteryTracks} />
        </section>

        <section className="market-catalog-bottom">
          <div className="market-container">
            <div>
              <p className="market-eyebrow">THE CPPVALLEY STANDARD</p>
              <h2>Completion is not the finish line. Evidence is.</h2>
              <p>Each lesson ends in code, a measurement, an artifact or a defensible engineering decision.</p>
            </div>
            <Link className="market-button market-button-light" href="/proof">Open the hiring-proof checklist</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

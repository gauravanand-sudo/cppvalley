import type { Metadata } from "next";
import Link from "next/link";
import { CurriculumExplorer } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "96-Lesson HFT Curriculum",
  description:
    "Build four expert skill stacks across C++, low latency, systems and HFT through 96 focused lessons, mini-labs and portfolio evidence.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "96 Lessons. Four HFT Engineering Skill Stacks.",
    description:
      "A sequenced path from trustworthy measurement to an interview-ready tick-to-trade platform.",
    url: "/curriculum",
  },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export default function CurriculumPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="page-hero curriculum-hero page-width">
          <div>
            <p className="kicker">96 MINI-TOPICS / 4 EXPERT STACKS / 9 PHASES</p>
            <h1>Become the engineer who can explain the whole path.</h1>
            <p>
              Not a playlist of disconnected tricks. This is a dependency-ordered system for
              mastering modern C++, low-latency engineering, Linux systems and electronic
              trading—one inspectable build at a time.
            </p>
          </div>
          <dl className="page-hero-stats">
            <div><dt>Focused lessons</dt><dd>96</dd></div>
            <div><dt>Learning outcomes</dt><dd>288</dd></div>
            <div><dt>Phase artifacts</dt><dd>09</dd></div>
          </dl>
        </section>

        <section className="mastery-strip" aria-labelledby="mastery-strip-heading">
          <div className="page-width">
            <header className="mastery-strip-head">
              <p className="section-label">YOUR FOUR EXPERT STACKS</p>
              <h2 id="mastery-strip-heading">See exactly what compounds.</h2>
            </header>
            <div className="mastery-grid">
              {masteryTracks.map((track, index) => {
                const count = lessons.filter((lesson) => lesson.tracks.includes(track.id)).length;
                return (
                  <article className={`mastery-card mastery-${track.id}`} key={track.id}>
                    <div className="mastery-card-top">
                      <span>0{index + 1}</span>
                      <strong>{count} lessons</strong>
                    </div>
                    <h3>{track.name}</h3>
                    <p>{track.promise}</p>
                    <ul>
                      {track.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="how-to-use" aria-labelledby="how-to-use-heading">
          <div className="page-width">
            <h2 id="how-to-use-heading">Turn every video into capability</h2>
            <ol>
              <li><span>01</span><p><strong>Watch</strong> the concept and mental model.</p></li>
              <li><span>02</span><p><strong>Build</strong> the focused mini-lab yourself.</p></li>
              <li><span>03</span><p><strong>Prove</strong> the result with inspectable evidence.</p></li>
              <li><span>04</span><p><strong>Compound</strong> it into the next system.</p></li>
            </ol>
          </div>
        </section>

        <div className="page-width curriculum-page-content">
          <CurriculumExplorer phases={phases} tracks={masteryTracks} />

          <section className="curriculum-end">
            <div>
              <p className="section-label">VIDEO → LAB → EVIDENCE</p>
              <h2>YouTube teaches the lesson. cppvalley makes it stick.</h2>
            </div>
            <div className="primary-actions">
              <a className="action action-primary" href={youtubeUrl} target="_blank" rel="noreferrer">
                Subscribe on YouTube ↗
              </a>
              <Link className="action action-secondary" href="/projects">See the four systems →</Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

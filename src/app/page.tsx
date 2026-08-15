import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, masteryTracks, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "C++ & HFT Engineering Courses",
  description:
    "Learn modern C++, low-latency systems, Linux, networking and electronic trading through 96 focused lessons, mini-labs and portfolio projects.",
  alternates: { canonical: "/" },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

const featuredLessonNumbers = [1, 2, 9, 21, 33, 45, 57, 69];
const featuredLessons = featuredLessonNumbers.map((number) => lessons[number - 1]);

const goalCards = [
  {
    icon: "⌁",
    title: "Hands-on mini-labs",
    copy: "Turn each concept into code, measurements and a reproducible experiment.",
    link: "Open the curriculum",
    href: "/curriculum",
    external: false,
  },
  {
    icon: "◇",
    title: "Portfolio-grade systems",
    copy: "Build four inspectable repositories that connect low-level skills into complete systems.",
    link: "See flagship projects",
    href: "/projects",
    external: false,
  },
  {
    icon: "✓",
    title: "Interview-ready proof",
    copy: "Document correctness, performance, trade-offs and failure handling like a systems engineer.",
    link: "Use the proof checklist",
    href: "/proof",
    external: false,
  },
  {
    icon: "▶",
    title: "Video-first learning",
    copy: "Follow the lesson on YouTube, then return here for the lab, outcomes and evidence target.",
    link: "Watch on YouTube",
    href: youtubeUrl,
    external: true,
  },
] as const;

function CourseCard({ lesson, index }: { lesson: (typeof lessons)[number]; index: number }) {
  const primaryTrack = lesson.tracks[0];
  const phase = phases[lesson.phase - 1];

  return (
    <Link className="market-course-card" href={`/curriculum/${lesson.slug}`}>
      <div className={`market-course-art market-course-art-${primaryTrack}`}>
        <span className="market-course-art-code">{lesson.code}</span>
        <strong>{String(index + 1).padStart(2, "0")}</strong>
        <div>
          {lesson.tracks.slice(0, 2).map((track) => (
            <span key={track}>{track}</span>
          ))}
        </div>
      </div>
      <div className="market-course-card-body">
        <h3>{lesson.title}</h3>
        <p>cppvalley · {phase.title}</p>
        <div className="market-course-meta">
          <span>3 outcomes</span>
          <span>Mini-lab</span>
          <span>Proof artifact</span>
        </div>
        <div className="market-course-bottom">
          <strong>Free learning path</strong>
          <span>New</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="page-shell market-page">
      <SiteHeader />

      <main>
        <section className="market-hero market-container">
          <div className="market-hero-copy">
            <p className="market-eyebrow">C++ → SYSTEMS → HFT</p>
            <h1>Skills that move your systems career forward</h1>
            <p>
              Learn the low-level engineering behind performance-critical software with a
              dependency-ordered path through modern C++, CPU and memory, Linux, networks,
              concurrency and electronic trading.
            </p>
            <div className="market-hero-actions">
              <Link className="market-button market-button-primary" href="/curriculum">
                Explore all 96 lessons
              </Link>
              <a className="market-button market-button-ghost" href={youtubeUrl} target="_blank" rel="noreferrer">
                Watch on YouTube ↗
              </a>
            </div>
            <div className="market-hero-proof">
              <span><strong>96</strong> focused lessons</span>
              <span><strong>288</strong> learning outcomes</span>
              <span><strong>4</strong> expert skill stacks</span>
            </div>
          </div>

          <div className="market-hero-visual" aria-label="cppvalley brand">
            <Image
              src="/cppvalley-logo.webp"
              alt="cppvalley"
              width={1200}
              height={593}
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <div className="market-hero-visual-caption">
              <span>HFT Core Systems</span>
              <strong>Watch it. Build it. Prove it.</strong>
            </div>
          </div>
        </section>

        <section className="market-section market-container" aria-labelledby="skills-heading">
          <div className="market-section-heading market-section-heading-row">
            <div>
              <p className="market-eyebrow">CURATED FOR SYSTEMS ENGINEERS</p>
              <h2 id="skills-heading">Skills to transform your engineering depth</h2>
              <p>Start with the capability you need today. The roadmap keeps the dependencies connected.</p>
            </div>
            <Link href="/curriculum">Explore all lessons →</Link>
          </div>

          <div className="market-skill-tabs" aria-label="Popular skill areas">
            {masteryTracks.map((track, index) => (
              <Link className={index === 0 ? "is-active" : ""} href="/curriculum#curriculum-browser" key={track.id}>
                {track.shortName}
              </Link>
            ))}
          </div>

          <div className="market-course-grid">
            {featuredLessons.slice(0, 4).map((lesson, index) => (
              <CourseCard lesson={lesson} index={index} key={lesson.slug} />
            ))}
          </div>
        </section>

        <section className="market-goals-wrap">
          <div className="market-section market-container" aria-labelledby="goals-heading">
            <div className="market-section-heading">
              <p className="market-eyebrow">LEARNING THAT COMPOUNDS</p>
              <h2 id="goals-heading">Learning focused on your goals</h2>
            </div>

            <div className="market-goal-grid">
              {goalCards.map((card) => {
                const content = (
                  <>
                    <span className="market-goal-icon" aria-hidden="true">{card.icon}</span>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.copy}</p>
                      <span className="market-inline-link">{card.link} →</span>
                    </div>
                  </>
                );

                return card.external ? (
                  <a className="market-goal-card" href={card.href} target="_blank" rel="noreferrer" key={card.title}>
                    {content}
                  </a>
                ) : (
                  <Link className="market-goal-card" href={card.href} key={card.title}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="market-section market-container" aria-labelledby="trending-heading">
          <div className="market-section-heading market-section-heading-row">
            <div>
              <p className="market-eyebrow">TRENDING IN CPPVALLEY</p>
              <h2 id="trending-heading">Go deeper in performance-critical topics</h2>
            </div>
            <Link href="/curriculum#curriculum-browser">Browse the catalog →</Link>
          </div>

          <div className="market-course-grid">
            {featuredLessons.slice(4).map((lesson, index) => (
              <CourseCard lesson={lesson} index={index + 4} key={lesson.slug} />
            ))}
          </div>
        </section>

        <section className="market-path-wrap">
          <div className="market-section market-container market-path-layout">
            <div>
              <p className="market-eyebrow">ONE CONNECTED ROADMAP</p>
              <h2>From trustworthy benchmarks to a tick-to-trade capstone</h2>
              <p>
                Nine phases keep the learning dependency-ordered. Each phase finishes with an artifact
                that proves more than completion: it proves engineering judgement.
              </p>
              <Link className="market-button market-button-light" href="/curriculum">
                See the full roadmap
              </Link>
            </div>

            <div className="market-path-list">
              {phases.slice(0, 5).map((phase) => (
                <Link href={`/curriculum#phase-${phase.number - 1}`} key={phase.number}>
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

        <section className="market-section market-container" aria-labelledby="popular-heading">
          <div className="market-section-heading">
            <p className="market-eyebrow">POPULAR SKILLS</p>
            <h2 id="popular-heading">Build depth across the stack</h2>
          </div>

          <div className="market-popular-grid">
            {masteryTracks.map((track) => {
              const count = lessons.filter((lesson) => lesson.tracks.includes(track.id)).length;
              return (
                <Link href="/curriculum#curriculum-browser" key={track.id}>
                  <span>{track.shortName}</span>
                  <strong>{track.name}</strong>
                  <p>{track.promise}</p>
                  <small>{count} connected lessons →</small>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="market-cta">
          <div className="market-container market-cta-inner">
            <div>
              <p className="market-eyebrow">START WHERE THE EVIDENCE STARTS</p>
              <h2>Learn one concept. Build one experiment. Publish one proof.</h2>
            </div>
            <div>
              <Link className="market-button market-button-light" href={`/curriculum/${lessons[0].slug}`}>
                Start lesson 01
              </Link>
              <Link className="market-button market-button-outline-light" href="/projects">
                View flagship projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

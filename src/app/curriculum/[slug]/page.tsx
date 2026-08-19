import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPhase, lessons, lessonsBySlug } from "@/data/curriculum";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessonsBySlug.get(slug);

  if (!lesson) return {};

  const description = `${lesson.learn[0]}. Lab: ${lesson.lab}`;

  return {
    title: `${lesson.code}: ${lesson.title}`,
    description,
    alternates: { canonical: `/curriculum/${lesson.slug}` },
    openGraph: {
      title: `${lesson.code} — ${lesson.title}`,
      description,
      url: `/curriculum/${lesson.slug}`,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = lessonsBySlug.get(slug);

  if (!lesson) notFound();

  const phase = getPhase(lesson.phase);
  const previousLesson = lessons[lesson.number - 2];
  const nextLesson = lessons[lesson.number];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.learn.join(" "),
    url: `https://cppvalley.com/curriculum/${lesson.slug}`,
    educationalLevel: "Advanced",
    learningResourceType: ["Video lesson", "Programming lab"],
    teaches: lesson.learn,
    isPartOf: {
      "@type": "Course",
      name: "HFT Core Systems",
      url: "https://cppvalley.com/curriculum",
    },
  };

  return (
    <div className="lesson-reading-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader />

      <main className="lesson-reading-main">
        <div className="site-container lesson-reading-shell">
          <nav className="lesson-breadcrumb" aria-label="Breadcrumb">
            <Link href="/curriculum">Curriculum</Link>
            <span>/</span>
            <Link href={`/curriculum#phase-${phase.number}`}>Phase {String(phase.number).padStart(2, "0")}</Link>
            <span>/</span>
            <span>Lesson {String(lesson.number).padStart(2, "0")}</span>
          </nav>

          <header className="lesson-reading-hero">
            <p className="lesson-reading-kicker">
              LESSON {String(lesson.number).padStart(2, "0")} OF {lessons.length}
            </p>
            <h1>{lesson.title}</h1>
            <p className="lesson-reading-phase">
              Phase {String(phase.number).padStart(2, "0")} · {phase.title}
            </p>
          </header>

          <section className="lesson-media" aria-label="Lesson video">
            {lesson.youtubeId ? (
              <div className="lesson-player">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}`}
                  title={`${lesson.code}: ${lesson.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="lesson-video-note">
                <div>
                  <span>VIDEO LESSON</span>
                  <strong>Coming soon</strong>
                  <p>The lesson notes and hands-on lab are ready below.</p>
                </div>
                <a href={youtubeUrl} target="_blank" rel="noreferrer">Visit cppvalley on YouTube ↗</a>
              </div>
            )}
          </section>

          <article className="lesson-reading-content">
            <section className="lesson-learning">
              <p className="lesson-section-label">WHAT YOU’LL LEARN</p>
              <h2>By the end of this lesson</h2>
              <ul>
                {lesson.learn.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
            </section>

            <div className="lesson-practice-grid">
              <section className="lesson-practice-card">
                <p className="lesson-section-label">HANDS-ON LAB</p>
                <h2>Practice</h2>
                <p>{lesson.lab}</p>
              </section>

              <section className="lesson-practice-card">
                <p className="lesson-section-label">DELIVERABLE</p>
                <h2>What to produce</h2>
                <p>{lesson.proof}</p>
              </section>
            </div>

            {lesson.prerequisites.length ? (
              <section className="lesson-prerequisite">
                <span>Prerequisite</span>
                <strong>{lesson.prerequisites.join(", ")}</strong>
              </section>
            ) : null}
          </article>

          <nav className="lesson-reading-nav" aria-label="Continue course">
            {previousLesson ? (
              <Link href={`/curriculum/${previousLesson.slug}`}>
                <span>← Previous lesson</span>
                <strong>{previousLesson.title}</strong>
              </Link>
            ) : <span />}

            {nextLesson ? (
              <Link href={`/curriculum/${nextLesson.slug}`}>
                <span>Next lesson →</span>
                <strong>{nextLesson.title}</strong>
              </Link>
            ) : (
              <Link href="/curriculum">
                <span>Course complete →</span>
                <strong>Return to the curriculum</strong>
              </Link>
            )}
          </nav>

          <section className="lesson-phase-list" aria-labelledby="phase-lessons-heading">
            <div className="lesson-phase-heading">
              <div>
                <p className="lesson-section-label">PHASE {String(phase.number).padStart(2, "0")}</p>
                <h2 id="phase-lessons-heading">{phase.title}</h2>
              </div>
              <Link href="/curriculum">View all 96 lessons</Link>
            </div>

            <div className="lesson-phase-links">
              {phase.lessons.map((courseLesson) => (
                <Link
                  className={courseLesson.slug === lesson.slug ? "is-current" : ""}
                  href={`/curriculum/${courseLesson.slug}`}
                  aria-current={courseLesson.slug === lesson.slug ? "page" : undefined}
                  key={courseLesson.slug}
                >
                  <span>{String(courseLesson.number).padStart(2, "0")}</span>
                  <strong>{courseLesson.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />

      <style>{`
        .lesson-reading-page {
          min-height: 100vh;
          color: var(--ink);
          background: var(--paper);
        }

        .lesson-reading-main {
          background: var(--white);
        }

        .lesson-reading-shell {
          padding-top: 30px;
          padding-bottom: 96px;
        }

        .lesson-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          color: var(--muted);
          font-size: 12px;
        }

        .lesson-breadcrumb a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }

        .lesson-breadcrumb a:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .lesson-breadcrumb > span:not(:last-child) {
          color: var(--line-strong);
        }

        .lesson-reading-hero {
          max-width: 940px;
          padding: 58px 0 46px;
        }

        .lesson-reading-kicker,
        .lesson-section-label {
          margin: 0;
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .lesson-reading-hero h1 {
          max-width: 900px;
          margin: 14px 0 0;
          font-family: var(--serif);
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 700;
          letter-spacing: -.045em;
          line-height: 1.02;
        }

        .lesson-reading-phase {
          margin: 22px 0 0;
          color: var(--muted);
          font-family: var(--serif);
          font-size: 18px;
          line-height: 1.5;
        }

        .lesson-media {
          max-width: 1040px;
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
          padding: 28px 0;
        }

        .lesson-player {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          background: #111;
        }

        .lesson-player iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .lesson-video-note {
          display: flex;
          min-height: 150px;
          align-items: end;
          justify-content: space-between;
          gap: 36px;
          padding: 26px 28px;
          background: var(--sand);
        }

        .lesson-video-note > div {
          min-width: 0;
        }

        .lesson-video-note span {
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
        }

        .lesson-video-note strong {
          display: block;
          margin-top: 7px;
          font-family: var(--serif);
          font-size: 27px;
          line-height: 1.1;
        }

        .lesson-video-note p {
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .lesson-video-note a {
          flex: 0 0 auto;
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .lesson-reading-content {
          width: min(820px, 100%);
          margin: 0 auto;
          padding: 76px 0 0;
        }

        .lesson-learning h2,
        .lesson-practice-card h2,
        .lesson-phase-heading h2 {
          margin: 10px 0 0;
          font-family: var(--serif);
          font-weight: 700;
          letter-spacing: -.03em;
          line-height: 1.1;
        }

        .lesson-learning h2 {
          font-size: 38px;
        }

        .lesson-learning ul {
          margin: 32px 0 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--line-strong);
        }

        .lesson-learning li {
          position: relative;
          padding: 21px 0 21px 34px;
          border-bottom: 1px solid var(--line);
          font-family: var(--serif);
          font-size: 18px;
          line-height: 1.55;
        }

        .lesson-learning li::before {
          content: "";
          position: absolute;
          top: 31px;
          left: 2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }

        .lesson-practice-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
          margin-top: 68px;
        }

        .lesson-practice-card {
          min-height: 260px;
          border-top: 4px solid var(--accent);
          padding: 28px 30px 30px;
          background: var(--paper);
        }

        .lesson-practice-card h2 {
          font-size: 27px;
        }

        .lesson-practice-card > p:last-child {
          margin: 24px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.7;
        }

        .lesson-prerequisite {
          display: flex;
          align-items: baseline;
          gap: 24px;
          margin-top: 34px;
          padding: 22px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .lesson-prerequisite span {
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .lesson-prerequisite strong {
          font-size: 14px;
        }

        .lesson-reading-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: min(920px, 100%);
          margin: 82px auto 0;
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
        }

        .lesson-reading-nav > a,
        .lesson-reading-nav > span {
          min-height: 118px;
        }

        .lesson-reading-nav > a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 28px;
          text-decoration: none;
        }

        .lesson-reading-nav > a + a,
        .lesson-reading-nav > span + a {
          border-left: 1px solid var(--line);
          text-align: right;
        }

        .lesson-reading-nav > a:hover {
          color: var(--accent);
          background: var(--paper);
        }

        .lesson-reading-nav span {
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .lesson-reading-nav strong {
          margin-top: 8px;
          font-family: var(--serif);
          font-size: 16px;
          line-height: 1.4;
        }

        .lesson-phase-list {
          max-width: 1040px;
          margin: 88px auto 0;
          padding: 44px 0 0;
          border-top: 4px solid var(--accent);
        }

        .lesson-phase-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
        }

        .lesson-phase-heading h2 {
          font-size: 32px;
        }

        .lesson-phase-heading > a {
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .lesson-phase-links {
          margin-top: 28px;
          border-top: 1px solid var(--line-strong);
        }

        .lesson-phase-links a {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 14px;
          align-items: center;
          min-height: 58px;
          border-bottom: 1px solid var(--line);
          text-decoration: none;
        }

        .lesson-phase-links a:hover {
          color: var(--accent);
          background: var(--paper);
        }

        .lesson-phase-links a.is-current {
          color: var(--accent-dark);
          background: var(--accent-soft);
        }

        .lesson-phase-links a span {
          padding-left: 12px;
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
        }

        .lesson-phase-links a strong {
          padding: 12px 14px 12px 0;
          font-family: var(--serif);
          font-size: 15px;
          line-height: 1.4;
        }

        @media (max-width: 760px) {
          .lesson-reading-shell {
            padding-top: 22px;
            padding-bottom: 68px;
          }

          .lesson-reading-hero {
            padding: 44px 0 34px;
          }

          .lesson-reading-hero h1 {
            font-size: clamp(40px, 12vw, 56px);
          }

          .lesson-reading-phase {
            font-size: 16px;
          }

          .lesson-video-note {
            min-height: 0;
            flex-direction: column;
            align-items: flex-start;
            padding: 22px;
          }

          .lesson-reading-content {
            padding-top: 56px;
          }

          .lesson-learning h2 {
            font-size: 32px;
          }

          .lesson-learning li {
            padding-left: 28px;
            font-size: 17px;
          }

          .lesson-practice-grid,
          .lesson-reading-nav {
            grid-template-columns: 1fr;
          }

          .lesson-practice-card {
            min-height: 0;
          }

          .lesson-reading-nav > a + a,
          .lesson-reading-nav > span + a {
            border-top: 1px solid var(--line);
            border-left: 0;
          }

          .lesson-reading-nav > a {
            min-height: 104px;
            padding: 20px 0;
          }

          .lesson-phase-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .lesson-phase-links a {
            grid-template-columns: 42px minmax(0, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

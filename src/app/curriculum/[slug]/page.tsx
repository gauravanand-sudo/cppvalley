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
    <div className="lesson-academic-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader />

      <main className="lesson-academic-main">
        <div className="site-container lesson-academic-shell">
          <nav className="lesson-academic-breadcrumb" aria-label="Breadcrumb">
            <Link href="/curriculum">Curriculum</Link>
            <span>›</span>
            <Link href={`/curriculum#phase-${phase.number}`}>Phase {String(phase.number).padStart(2, "0")}</Link>
            <span>›</span>
            <span>Lesson {String(lesson.number).padStart(2, "0")}</span>
          </nav>

          <header className="lesson-academic-hero">
            <div className="lesson-academic-rule" />
            <p className="lesson-academic-program">HFT CORE SYSTEMS</p>
            <h1>{lesson.title}</h1>
            <div className="lesson-academic-meta">
              <span>Lesson {String(lesson.number).padStart(2, "0")} of {lessons.length}</span>
              <span>Phase {String(phase.number).padStart(2, "0")}: {phase.title}</span>
            </div>
          </header>

          <div className="lesson-academic-column">
            <section className="lesson-academic-media" aria-label="Lesson video">
              {lesson.youtubeId ? (
                <div className="lesson-academic-player">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}`}
                    title={`${lesson.code}: ${lesson.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="lesson-academic-video-note">
                  <div>
                    <strong>Video lesson coming soon</strong>
                    <p>The written objectives and hands-on lab are available now.</p>
                  </div>
                  <a href={youtubeUrl} target="_blank" rel="noreferrer">cppvalley on YouTube ↗</a>
                </div>
              )}
            </section>

            <article className="lesson-academic-content">
              <section className="lesson-academic-section">
                <p className="lesson-academic-label">Learning objectives</p>
                <h2>What you should understand</h2>
                <ol className="lesson-academic-objectives">
                  {lesson.learn.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ol>
              </section>

              <section className="lesson-academic-section lesson-academic-assignment">
                <p className="lesson-academic-label">Lab</p>
                <h2>Hands-on exercise</h2>
                <p>{lesson.lab}</p>
              </section>

              <section className="lesson-academic-section lesson-academic-assignment">
                <p className="lesson-academic-label">Deliverable</p>
                <h2>Evidence of completion</h2>
                <p>{lesson.proof}</p>
              </section>

              {lesson.prerequisites.length ? (
                <dl className="lesson-academic-prerequisite">
                  <dt>Prerequisite</dt>
                  <dd>{lesson.prerequisites.join(", ")}</dd>
                </dl>
              ) : null}
            </article>

            <nav className="lesson-academic-nav" aria-label="Continue course">
              {previousLesson ? (
                <Link href={`/curriculum/${previousLesson.slug}`}>
                  <span>← Previous</span>
                  <strong>{previousLesson.title}</strong>
                </Link>
              ) : <span />}

              {nextLesson ? (
                <Link href={`/curriculum/${nextLesson.slug}`}>
                  <span>Next →</span>
                  <strong>{nextLesson.title}</strong>
                </Link>
              ) : (
                <Link href="/curriculum">
                  <span>Complete →</span>
                  <strong>Return to the curriculum</strong>
                </Link>
              )}
            </nav>

            <section className="lesson-academic-phase" aria-labelledby="phase-lessons-heading">
              <header>
                <div>
                  <p className="lesson-academic-label">Phase {String(phase.number).padStart(2, "0")}</p>
                  <h2 id="phase-lessons-heading">{phase.title}</h2>
                </div>
                <Link href="/curriculum">Full curriculum</Link>
              </header>

              <div className="lesson-academic-phase-list">
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
        </div>
      </main>

      <SiteFooter />

      <style>{`
        .lesson-academic-page {
          min-height: 100vh;
          color: var(--ink);
          background: var(--paper);
        }

        .lesson-academic-main {
          background: var(--white);
        }

        .lesson-academic-shell {
          padding-top: 28px;
          padding-bottom: 104px;
        }

        .lesson-academic-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.5;
        }

        .lesson-academic-breadcrumb a {
          color: var(--muted);
          font-weight: 600;
          text-decoration: none;
        }

        .lesson-academic-breadcrumb a:hover {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .lesson-academic-breadcrumb > span:not(:last-child) {
          color: var(--line-strong);
        }

        .lesson-academic-hero {
          max-width: 930px;
          padding: 44px 0 52px;
        }

        .lesson-academic-rule {
          width: 86px;
          height: 5px;
          margin-bottom: 24px;
          background: var(--accent);
        }

        .lesson-academic-program,
        .lesson-academic-label {
          margin: 0;
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .085em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .lesson-academic-hero h1 {
          max-width: 900px;
          margin: 12px 0 0;
          font-family: var(--serif);
          font-size: clamp(42px, 5.3vw, 64px);
          font-weight: 700;
          letter-spacing: -.038em;
          line-height: 1.04;
        }

        .lesson-academic-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 26px;
          margin-top: 24px;
          color: var(--muted);
          font-family: var(--serif);
          font-size: 16px;
          line-height: 1.5;
        }

        .lesson-academic-column {
          width: min(820px, 100%);
          margin: 0 auto;
        }

        .lesson-academic-media {
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
          padding: 22px 0;
        }

        .lesson-academic-player {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          background: #111;
        }

        .lesson-academic-player iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .lesson-academic-video-note {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 28px;
        }

        .lesson-academic-video-note strong {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 700;
        }

        .lesson-academic-video-note p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .lesson-academic-video-note a {
          flex: 0 0 auto;
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .lesson-academic-content {
          padding-top: 66px;
        }

        .lesson-academic-section {
          padding: 0 0 54px;
          border-bottom: 1px solid var(--line);
        }

        .lesson-academic-section + .lesson-academic-section {
          padding-top: 48px;
        }

        .lesson-academic-section h2,
        .lesson-academic-phase h2 {
          margin: 9px 0 0;
          font-family: var(--serif);
          font-weight: 700;
          letter-spacing: -.025em;
          line-height: 1.15;
        }

        .lesson-academic-section h2 {
          font-size: 30px;
        }

        .lesson-academic-objectives {
          margin: 28px 0 0;
          padding-left: 26px;
        }

        .lesson-academic-objectives li {
          padding: 7px 0 7px 8px;
          font-family: var(--serif);
          font-size: 18px;
          line-height: 1.65;
        }

        .lesson-academic-objectives li::marker {
          color: var(--accent);
          font-family: var(--sans);
          font-size: 13px;
          font-weight: 800;
        }

        .lesson-academic-assignment > p:last-child {
          max-width: 740px;
          margin: 22px 0 0;
          color: #44413d;
          font-size: 16px;
          line-height: 1.75;
        }

        .lesson-academic-prerequisite {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 24px;
          margin: 0;
          padding: 24px 0;
          border-bottom: 1px solid var(--line-strong);
        }

        .lesson-academic-prerequisite dt {
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .lesson-academic-prerequisite dd {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .lesson-academic-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 66px;
          border-top: 1px solid var(--line-strong);
          border-bottom: 1px solid var(--line-strong);
        }

        .lesson-academic-nav > a,
        .lesson-academic-nav > span {
          min-height: 104px;
        }

        .lesson-academic-nav > a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 24px 20px 0;
          text-decoration: none;
        }

        .lesson-academic-nav > a + a,
        .lesson-academic-nav > span + a {
          border-left: 1px solid var(--line);
          padding-right: 0;
          padding-left: 24px;
          text-align: right;
        }

        .lesson-academic-nav > a:hover {
          color: var(--accent);
        }

        .lesson-academic-nav span {
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .055em;
          text-transform: uppercase;
        }

        .lesson-academic-nav strong {
          margin-top: 7px;
          font-family: var(--serif);
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .lesson-academic-phase {
          margin-top: 76px;
          padding-top: 30px;
          border-top: 5px solid var(--accent);
        }

        .lesson-academic-phase > header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
        }

        .lesson-academic-phase h2 {
          font-size: 28px;
        }

        .lesson-academic-phase > header > a {
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .lesson-academic-phase-list {
          margin-top: 24px;
          border-top: 1px solid var(--line-strong);
        }

        .lesson-academic-phase-list a {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 14px;
          align-items: baseline;
          min-height: 52px;
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
          text-decoration: none;
        }

        .lesson-academic-phase-list a:hover {
          color: var(--accent);
        }

        .lesson-academic-phase-list a.is-current {
          border-left: 4px solid var(--accent);
          padding-left: 12px;
          color: var(--accent-dark);
          font-weight: 700;
        }

        .lesson-academic-phase-list a span {
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
        }

        .lesson-academic-phase-list a strong {
          font-family: var(--serif);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.45;
        }

        @media (max-width: 760px) {
          .lesson-academic-shell {
            padding-top: 20px;
            padding-bottom: 72px;
          }

          .lesson-academic-hero {
            padding: 36px 0 40px;
          }

          .lesson-academic-rule {
            width: 64px;
            height: 4px;
            margin-bottom: 20px;
          }

          .lesson-academic-hero h1 {
            font-size: clamp(38px, 11vw, 52px);
          }

          .lesson-academic-meta {
            font-size: 15px;
          }

          .lesson-academic-video-note {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .lesson-academic-content {
            padding-top: 50px;
          }

          .lesson-academic-section {
            padding-bottom: 42px;
          }

          .lesson-academic-section + .lesson-academic-section {
            padding-top: 40px;
          }

          .lesson-academic-section h2 {
            font-size: 27px;
          }

          .lesson-academic-objectives li {
            font-size: 17px;
          }

          .lesson-academic-prerequisite {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .lesson-academic-nav {
            grid-template-columns: 1fr;
          }

          .lesson-academic-nav > a + a,
          .lesson-academic-nav > span + a {
            border-top: 1px solid var(--line);
            border-left: 0;
            padding-left: 0;
          }

          .lesson-academic-nav > a {
            min-height: 92px;
            padding: 18px 0;
          }

          .lesson-academic-phase > header {
            align-items: flex-start;
            flex-direction: column;
          }

          .lesson-academic-phase-list a {
            grid-template-columns: 38px minmax(0, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPhase, getTrack, lessons, lessonsBySlug } from "@/data/curriculum";

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

  const description = `${lesson.learn[0]}. Build: ${lesson.lab}`;

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
      name: "cppvalley HFT Core Systems Curriculum",
      url: "https://cppvalley.com/curriculum",
    },
  };

  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />

        <div className="page-width lesson-breadcrumb" aria-label="Breadcrumb">
          <Link href="/curriculum">Curriculum</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/curriculum#phase-${phase.number - 1}`}>Phase {String(phase.number).padStart(2, "0")}</Link>
          <span aria-hidden="true">/</span>
          <strong>{lesson.code}</strong>
        </div>

        <section className="lesson-hero page-width">
          <div className="lesson-hero-copy">
            <p className="kicker">{lesson.code} / PHASE {String(phase.number).padStart(2, "0")}</p>
            <h1>{lesson.title}</h1>
            <p className="lesson-deck">{lesson.learn[0]}—then prove it in a focused build.</p>
            <div className="track-tags lesson-hero-tags" aria-label="Expert stacks strengthened">
              {lesson.tracks.map((track) => (
                <span className={`track-tag track-${track}`} key={track}>{getTrack(track).name}</span>
              ))}
            </div>
          </div>
          <aside className="lesson-phase-card">
            <span>PART OF</span>
            <strong>{phase.title}</strong>
            <p>{phase.summary}</p>
            <Link href={`/curriculum#phase-${phase.number - 1}`}>View phase {String(phase.number).padStart(2, "0")} →</Link>
          </aside>
        </section>

        <section className="lesson-main page-width">
          <div className="lesson-video-column">
            {lesson.youtubeId ? (
              <div className="video-embed">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}`}
                  title={`${lesson.code}: ${lesson.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-placeholder">
                <span className="video-play" aria-hidden="true">▶</span>
                <p className="section-label">YOUTUBE LESSON SLOT</p>
                <h2>Video coming to cppvalley.</h2>
                <p>
                  This page is ready for the episode. Add its episode number and YouTube ID to
                  the video map and the privacy-enhanced player appears here automatically.
                </p>
                <a href={youtubeUrl} target="_blank" rel="noreferrer">Subscribe before it drops ↗</a>
              </div>
            )}
          </div>

          <aside className="lesson-spec">
            <div>
              <span>FORMAT</span>
              <strong>Video + mini-lab</strong>
            </div>
            <div>
              <span>OUTCOMES</span>
              <strong>03 concrete skills</strong>
            </div>
            <div>
              <span>PROOF</span>
              <strong>01 publishable artifact</strong>
            </div>
            <div>
              <span>PREREQUISITE</span>
              <strong>{lesson.prerequisites.length ? lesson.prerequisites.join(", ") : "Start here"}</strong>
            </div>
          </aside>
        </section>

        <section className="lesson-learning page-width" aria-labelledby="learn-heading">
          <header className="section-header lesson-section-head">
            <div>
              <p className="section-label">THE CAPABILITY</p>
              <h2 id="learn-heading">What you’ll learn</h2>
            </div>
            <p>Three outcomes you should be able to explain, implement and defend after this lesson.</p>
          </header>
          <ol className="outcomes-grid">
            {lesson.learn.map((outcome, index) => (
              <li key={outcome}>
                <span>0{index + 1}</span>
                <p>{outcome}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lesson-work">
          <div className="page-width lesson-work-grid">
            <article>
              <p className="section-label">BUILD IT</p>
              <h2>The mini-lab</h2>
              <p>{lesson.lab}</p>
              <small>Do not just watch. Reproduce the mechanism on your own machine.</small>
            </article>
            <article>
              <p className="section-label">PROVE IT</p>
              <h2>The evidence</h2>
              <p>{lesson.proof}</p>
              <small>Make the result inspectable enough for an engineer—or interviewer—to challenge.</small>
            </article>
          </div>
        </section>

        <section className="lesson-compounds page-width" aria-labelledby="compounds-heading">
          <div>
            <p className="section-label">WHY THIS MINI-TOPIC MATTERS</p>
            <h2 id="compounds-heading">It strengthens {lesson.tracks.length > 1 ? "multiple expert stacks" : "your expert stack"}.</h2>
          </div>
          <div className="lesson-track-list">
            {lesson.tracks.map((track) => {
              const detail = getTrack(track);
              return (
                <article key={track}>
                  <span>{detail.shortName}</span>
                  <div><h3>{detail.name}</h3><p>{detail.promise}</p></div>
                </article>
              );
            })}
          </div>
        </section>

        <nav className="lesson-navigation page-width" aria-label="Lesson navigation">
          {previousLesson ? (
            <Link href={`/curriculum/${previousLesson.slug}`}>
              <span>← PREVIOUS / {previousLesson.code}</span>
              <strong>{previousLesson.title}</strong>
            </Link>
          ) : <span />}
          {nextLesson ? (
            <Link href={`/curriculum/${nextLesson.slug}`}>
              <span>NEXT / {nextLesson.code} →</span>
              <strong>{nextLesson.title}</strong>
            </Link>
          ) : (
            <Link href="/projects">
              <span>NEXT →</span>
              <strong>Open the flagship systems</strong>
            </Link>
          )}
        </nav>

        <section className="final-cta lesson-final-cta">
          <div className="page-width final-cta-inner">
            <div><p className="section-label">KEEP COMPOUNDING</p><h2>One lesson. One build. One piece of proof.</h2></div>
            <div className="primary-actions">
              <Link className="action action-light" href="/curriculum">Browse all 96 lessons →</Link>
              <a className="action action-outline-light" href={youtubeUrl} target="_blank" rel="noreferrer">Subscribe ↗</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

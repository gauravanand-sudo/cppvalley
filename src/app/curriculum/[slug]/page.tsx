import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLockup } from "@/components/BrandLockup";
import { getPhase, lessons, lessonsBySlug, phases } from "@/data/curriculum";

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
    <div className="lesson-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="lesson-header">
        <Link className="lesson-logo" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>
        <span>LESSON {String(lesson.number).padStart(2, "0")} / {lessons.length}</span>
        <Link href="/curriculum">Course index</Link>
      </header>

      <div className="lesson-layout">
        <main className="lesson-main">
          <div className="lesson-video">
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
              <div className="video-placeholder-minimal">
                <strong>Video coming soon</strong>
                <span>The system notes and lab specification are available below.</span>
                <a href={youtubeUrl} target="_blank" rel="noreferrer">cppvalley on YouTube ↗</a>
              </div>
            )}
          </div>

          <section className="lesson-title">
            <div>
              <p>PHASE {String(phase.number).padStart(2, "0")} / {phase.title}</p>
              <h1>{lesson.title}</h1>
            </div>
            <nav className="lesson-arrows" aria-label="Previous and next lesson">
              {previousLesson ? (
                <Link href={`/curriculum/${previousLesson.slug}`} aria-label="Previous lesson">←</Link>
              ) : <span />}
              {nextLesson ? (
                <Link href={`/curriculum/${nextLesson.slug}`} aria-label="Next lesson">→</Link>
              ) : (
                <Link href="/curriculum" aria-label="Return to curriculum">✓</Link>
              )}
            </nav>
          </section>

          <section className="lesson-notes">
            <div className="lesson-block">
              <h2>System objectives</h2>
              <ol>
                {lesson.learn.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ol>
            </div>

            <div className="lesson-task">
              <span>Lab</span>
              <p>{lesson.lab}</p>
            </div>

            <div className="lesson-task">
              <span>Evidence</span>
              <p>{lesson.proof}</p>
            </div>

            {lesson.prerequisites.length ? (
              <div className="lesson-prereq">
                <span>Prerequisite</span>
                <strong>{lesson.prerequisites.join(", ")}</strong>
              </div>
            ) : null}
          </section>

          <nav className="lesson-bottom-nav" aria-label="Continue course">
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
                <strong>Return to course index</strong>
              </Link>
            )}
          </nav>
        </main>

        <aside className="lesson-sidebar" aria-label="Course lessons">
          <div className="lesson-sidebar-inner">
            <div className="lesson-sidebar-top">
              <strong>PROGRAM INDEX</strong>
              <span>{lesson.number} / {lessons.length}</span>
            </div>

            <div className="lesson-sidebar-phases">
              {phases.map((coursePhase) => (
                <details key={coursePhase.number} open={coursePhase.number === phase.number}>
                  <summary>
                    <span>{String(coursePhase.number).padStart(2, "0")}</span>
                    <strong>{coursePhase.title}</strong>
                  </summary>

                  <div>
                    {coursePhase.lessons.map((courseLesson) => (
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
                </details>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

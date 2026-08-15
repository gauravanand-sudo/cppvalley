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
  const progress = Math.round((lesson.number / lessons.length) * 100);

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
    <div className="lesson-focus-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="lesson-focus-header">
        <Link className="lesson-focus-logo" href="/" aria-label="cppvalley home">
          <BrandLockup tone="dark" />
        </Link>
        <div className="lesson-focus-course-name">
          <span>HFT CORE SYSTEMS</span>
          <strong>{lesson.code} · Lesson {lesson.number} of {lessons.length}</strong>
        </div>
        <Link className="lesson-focus-curriculum-link" href="/curriculum">
          Course curriculum
        </Link>
      </header>

      <div className="lesson-focus-layout">
        <main className="lesson-focus-main">
          <div className="lesson-focus-video">
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
              <div className="lesson-focus-placeholder">
                <span aria-hidden="true">▶</span>
                <p>VIDEO LESSON</p>
                <h2>Video coming soon.</h2>
                <p>The lesson notes, mini-lab, and evidence target are ready below.</p>
                <a href={youtubeUrl} target="_blank" rel="noreferrer">Follow cppvalley on YouTube ↗</a>
              </div>
            )}
          </div>

          <section className="lesson-focus-title">
            <div>
              <p>PHASE {String(phase.number).padStart(2, "0")} · {phase.title}</p>
              <h1>{lesson.title}</h1>
              <span>{lesson.learn[0]}</span>
            </div>

            <nav className="lesson-step-nav" aria-label="Previous and next lesson">
              {previousLesson ? (
                <Link href={`/curriculum/${previousLesson.slug}`} aria-label="Previous lesson">←</Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {nextLesson ? (
                <Link href={`/curriculum/${nextLesson.slug}`} aria-label="Next lesson">→</Link>
              ) : (
                <Link href="/curriculum" aria-label="Return to curriculum">✓</Link>
              )}
            </nav>
          </section>

          <section className="lesson-focus-content" aria-labelledby="learn-heading">
            <div className="lesson-content-block">
              <p className="lesson-focus-kicker">WHAT YOU WILL LEARN</p>
              <h2 id="learn-heading">Three outcomes for this lesson</h2>
              <ol className="lesson-outcome-list">
                {lesson.learn.map((outcome, index) => (
                  <li key={outcome}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{outcome}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lesson-practice-grid">
              <article>
                <p className="lesson-focus-kicker">BUILD</p>
                <h2>Mini-lab</h2>
                <p>{lesson.lab}</p>
              </article>
              <article>
                <p className="lesson-focus-kicker">PROVE</p>
                <h2>Evidence target</h2>
                <p>{lesson.proof}</p>
              </article>
            </div>

            <div className="lesson-prerequisite">
              <span>Prerequisite</span>
              <strong>{lesson.prerequisites.length ? lesson.prerequisites.join(", ") : "Start here"}</strong>
            </div>
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
                <span>Course complete →</span>
                <strong>Return to the curriculum</strong>
              </Link>
            )}
          </nav>
        </main>

        <aside className="lesson-focus-sidebar" aria-label="Course content">
          <div className="lesson-sidebar-sticky">
            <header className="lesson-sidebar-header">
              <div>
                <span>COURSE CONTENT</span>
                <strong>{lesson.number} / {lessons.length}</strong>
              </div>
              <div className="lesson-sidebar-progress" aria-label={`${progress}% course progress`}>
                <i style={{ width: `${progress}%` }} />
              </div>
            </header>

            <div className="lesson-sidebar-list">
              {phases.map((coursePhase) => (
                <details key={coursePhase.number} open={coursePhase.number === phase.number}>
                  <summary>
                    <span>{String(coursePhase.number).padStart(2, "0")}</span>
                    <div>
                      <strong>{coursePhase.title}</strong>
                      <small>{coursePhase.lessons.length} lessons</small>
                    </div>
                  </summary>

                  <div className="lesson-sidebar-lessons">
                    {coursePhase.lessons.map((courseLesson) => (
                      <Link
                        className={courseLesson.slug === lesson.slug ? "is-current" : ""}
                        href={`/curriculum/${courseLesson.slug}`}
                        aria-current={courseLesson.slug === lesson.slug ? "page" : undefined}
                        key={courseLesson.slug}
                      >
                        <span>{String(courseLesson.number).padStart(2, "0")}</span>
                        <div>
                          <strong>{courseLesson.title}</strong>
                          <small>{courseLesson.youtubeId ? "Video + lab" : "Lesson + lab"}</small>
                        </div>
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

import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courseStats, courses, featuredCourses } from "@/data/courses";
import { lessons } from "@/data/curriculum";
import { youtubeSeries } from "@/data/youtube";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Platform",
  description:
    "Learn C++ systems, HFT, low-latency engineering, EDA, CUDA, GPU programming, AI systems and interview preparation through focused curricula and video courses.",
  alternates: { canonical: "/" },
};

const categories = [
  "C++ Core",
  "Systems",
  "EDA / CAD",
  "GPU / AI",
  "Roadmap",
] as const;

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);

  return (
    <div className="page-shell lp-page academic-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="academic-hero lp-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">cppvalley school of systems engineering</p>
              <h1>Learn C++ systems for HFT, EDA, CUDA, GPU and AI infrastructure.</h1>
              <p>
                A focused public learning site for students and engineers: curricula, video courses, interview questions, articles and project-oriented systems preparation.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore curricula</Link>
                <Link className="lp-button" href="/youtube">Video courses</Link>
                <Link className="lp-button" href="/interviews">Interview questions</Link>
              </div>
            </div>

            <aside className="lp-hero-card academic-info-card" aria-label="cppvalley summary">
              <div className="lp-hero-card-top">
                <span>Academic catalog</span>
                <strong>{courseStats.totalCourses} curricula</strong>
              </div>
              <p>C++, HFT, EDA, CUDA, GPU and AI systems organized into clean course outlines and video series.</p>
              <div className="lp-stat-grid">
                <div><strong>{courseStats.totalCourses}</strong><span>courses</span></div>
                <div><strong>{youtubeSeries.length}</strong><span>video series</span></div>
                <div><strong>{lessons.length}</strong><span>HFT lessons</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-category-row academic-topic-row" aria-label="Browse topics">
          {categories.map((category) => <Link href="/courses" key={category}>{category}</Link>)}
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Featured curricula</p>
              <h2>Start with a serious systems track</h2>
            </div>
            <Link className="lp-card-link" href="/courses">All curricula</Link>
          </div>

          <div className="lp-course-grid flagship-course-grid">
            {featuredCourses.map((course) => (
              <Link className="lp-course-card academic-course-card" href={course.href} key={course.slug}>
                <div className="lp-card-thumb academic-card-thumb">
                  <span>{course.pillar}</span>
                  <strong>{course.shortTitle}</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span></div>
                  <div className="course-tags">
                    {course.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Video courses</p>
              <h2>Each YouTube series is its own course</h2>
            </div>
            <Link className="lp-card-link" href="/youtube">All video courses</Link>
          </div>
          <div className="lp-course-grid">
            {youtubeSeries.map((series) => (
              <Link className="lp-course-card academic-course-card" href={`/youtube/${series.slug}`} key={series.slug}>
                <div className="lp-card-thumb academic-card-thumb">
                  <span>Video course</span>
                  <strong>{series.videos.length} lessons</strong>
                </div>
                <div className="lp-card-body">
                  <h3>{series.title}</h3>
                  <p>{series.description}</p>
                  <div className="lp-meta"><span>{series.audience}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Complete curriculum index</p>
              <h2>All course outlines</h2>
            </div>
          </div>
          <div className="course-row-list compact-home-course-list">
            {sortedCourses.map((course) => (
              <Link className="course-row-card no-image-row academic-row-card" href={course.href} key={course.slug}>
                <div>
                  <span>{course.pillar}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
                <strong>{course.duration}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

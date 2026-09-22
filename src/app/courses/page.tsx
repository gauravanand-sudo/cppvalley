import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses, type Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — cppvalley",
  description: "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "cppvalley Courses",
    description: "C++, HFT, EDA, CUDA, GPU and AI systems courses from cppvalley.",
    url: "/courses",
    images: [{ url: "/courses/opengraph-image", alt: "cppvalley courses" }],
  },
};

function courseHref(course: Course) {
  if (course.href.startsWith("/youtube/") || course.href === "/curriculum") return `/courses/${course.slug}`;
  return course.href;
}

function courseSignal(course: Course) {
  if (course.slug === "third-year-cpp-eda-hft") return "Recommended for students";
  if (course.level.includes("Beginner")) return "Beginner friendly";
  if (course.title.toLowerCase().includes("interview")) return "Interview focused";
  if (course.level.includes("Advanced") || course.level.includes("Senior")) return "Advanced systems";
  if (course.pillar === "Roadmap") return "Roadmap";
  return "Focused track";
}

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);
  const pillars = Array.from(new Set(sortedCourses.map((course) => course.pillar)));
  const levels = Array.from(new Set(sortedCourses.map((course) => course.level)));

  return (
    <div className="page-shell lp-page course-catalog-page modern-page market-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="market-page-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <p className="lp-kicker">Courses</p>
              <h1>All cppvalley courses</h1>
              <p>Browse focused C++ systems tracks like a course marketplace. Compare level, duration, topic and the next learning action before opening a course.</p>
            </div>
            <aside className="market-hero-panel">
              <strong>Recommended first path</strong>
              <ul>
                <li>Student Roadmap</li>
                <li>Core C++ for Interviews</li>
                <li>Linux / OS / Networking</li>
                <li>Low-Latency C++ or EDA/CAD</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="market-layout">
            <aside className="market-sidebar" aria-label="Course filters">
              <div className="market-sidebar-section">
                <h3>Topics</h3>
                <ul>
                  {pillars.map((pillar) => <li key={pillar}>{pillar}</li>)}
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Level</h3>
                <ul>
                  {levels.map((level) => <li key={level}>{level}</li>)}
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Best for</h3>
                <ul>
                  <li>Students</li>
                  <li>Interview preparation</li>
                  <li>Systems role prep</li>
                  <li>Portfolio direction</li>
                </ul>
              </div>
            </aside>

            <div className="market-content-column">
              <div className="market-section-head">
                <div>
                  <p className="lp-kicker">Catalog</p>
                  <h2>{sortedCourses.length} course tracks</h2>
                  <p>Each card shows the signal, topic, level and duration before you enter the course.</p>
                </div>
              </div>

              <div className="market-course-list">
                {sortedCourses.map((course) => (
                  <Link className="market-course-card" href={courseHref(course)} key={course.slug}>
                    <div className="market-card-thumb">
                      <div>
                        <span>{course.pillar}</span>
                        <strong>{course.shortTitle}</strong>
                      </div>
                    </div>
                    <div className="market-card-body">
                      <span className="course-card-eyebrow">{courseSignal(course)}</span>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="market-rating-row"><strong>4.8</strong><span>Structured path</span><span>{course.duration}</span></div>
                      <div className="market-card-meta"><span>{course.level}</span><span>{course.tags.slice(0, 3).join(" · ")}</span></div>
                    </div>
                    <div className="market-card-action">Open course →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

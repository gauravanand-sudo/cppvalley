import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "C++ systems courses across interviews, concurrency, HFT, EDA, GPU and AI infrastructure.",
  alternates: { canonical: "/courses" },
};

const coursesAdSlot = process.env.NEXT_PUBLIC_ADSENSE_COURSES_FEED_SLOT;

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);
  const pillars = Array.from(new Set(sortedCourses.map((course) => course.pillar)));

  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero">
          <div className="site-container">
            <span className="cinema-line" aria-hidden="true" />
            <p className="eyebrow">Course Catalogue</p>
            <h1 className="page-title">Structured study paths<br />in C++ systems.</h1>
            <p>A catalogue organized by technical field, with the level, scope, topics and modules made explicit before you begin.</p>
          </div>
        </section>

        {pillars.map((pillar, pillarIndex) => {
          const pillarCourses = sortedCourses.filter((course) => course.pillar === pillar);
          return (
            <section className="pillar-section" key={pillar}>
              <div className="site-container">
                <div className="pillar-title">
                  <h2>{pillar}</h2>
                  <span>{pillarCourses.length} {pillarCourses.length === 1 ? "course" : "courses"}</span>
                </div>
                <div className="course-grid">
                  {pillarCourses.map((course, index) => (
                    <Link className="course-card" href={`/courses/${course.slug}`} key={course.slug}>
                      <div className="card-top">
                        <span className="kicker">{course.tags.slice(0, 2).join(" · ")}</span>
                        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="meta-row">
                        <span>{course.level}</span>
                        <span>{course.duration}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                {pillarIndex === 1 ? <AdSlot slot={coursesAdSlot} className="ad-slot-leaderboard" /> : null}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}

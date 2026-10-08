import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses } from "@/data/courses";
import { catalogHeroImage, heroImages, imageForCourse } from "@/data/media";

export const metadata: Metadata = {
  title: "Courses",
  description: "C++ systems courses across interviews, concurrency, HFT, EDA, GPU and AI infrastructure.",
  alternates: { canonical: "/courses" },
};

const coursesAdSlot = process.env.NEXT_PUBLIC_ADSENSE_COURSES_FEED_SLOT;

const courseMarks: Record<string, string> = {
  "C++ Core": "C++",
  Systems: "SYS",
  "EDA / CAD": "EDA",
  "GPU / AI": "GPU",
  Roadmap: "MAP",
};

function anchorFor(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CoursesPage() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);
  const pillars = Array.from(new Set(sortedCourses.map((course) => course.pillar)));

  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero catalog-hero image-page-hero">
          <div className="site-container catalog-hero-grid">
            <div>
              <div className="page-hero-badge">Course library</div>
              <h1 className="page-title">Learn C++ systems<br />one pattern at a time.</h1>
              <p>Structured learning paths from core C++ through concurrency, low-latency systems, EDA, GPU and AI infrastructure. Every course shows its scope before you open it.</p>
              <div className="topic-strip" aria-label="Course tracks">
                {pillars.map((pillar) => <a href={`#${anchorFor(pillar)}`} key={pillar}>{pillar}</a>)}
              </div>
            </div>
            <div className="page-hero-collage" aria-hidden="true">
              <img className="page-hero-collage-main" src={catalogHeroImage} alt="" />
              <img src={heroImages[1]} alt="" />
              <img src={heroImages[2]} alt="" />
            </div>
          </div>
        </section>

        {pillars.map((pillar, pillarIndex) => {
          const pillarCourses = sortedCourses.filter((course) => course.pillar === pillar);
          return (
            <section className="pillar-section" id={anchorFor(pillar)} key={pillar}>
              <div className="site-container">
                <div className="pillar-title">
                  <div>
                    <span className="pillar-mark">{courseMarks[pillar] ?? "C++"}</span>
                    <div><p className="eyebrow">Learning track</p><h2>{pillar}</h2></div>
                  </div>
                  <span>{pillarCourses.length} {pillarCourses.length === 1 ? "course" : "courses"}</span>
                </div>
                <div className="course-grid image-course-grid">
                  {pillarCourses.map((course) => (
                    <Link className="course-card image-course-card" href={`/courses/${course.slug}`} key={course.slug}>
                      <div className="course-card-visual">
                        <img className="course-card-photo" src={imageForCourse(course.slug, course.pillar)} alt="" loading="lazy" />
                        <span className="course-card-mark">{courseMarks[course.pillar] ?? "C++"}</span>
                        <span className="course-card-track">{course.tags.slice(0, 2).join(" · ")}</span>
                      </div>
                      <div className="course-card-body">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <div className="meta-row">
                          <span>{course.level}</span>
                          <span>{course.duration}</span>
                        </div>
                        <span className="course-card-link">View course <span aria-hidden="true">→</span></span>
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coursePages, courses, coursesBySlug } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return coursePages.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || course.href !== `/courses/${course.slug}`) return {};

  return {
    title: `${course.title} — cppvalley Course`,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.description,
      url: `/courses/${course.slug}`,
      type: "website",
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || course.href !== `/courses/${course.slug}`) notFound();

  const relatedCourses = courses
    .filter((item) => item.slug !== course.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.longDescription,
    url: `https://cppvalley.com/courses/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "cppvalley",
      sameAs: "https://www.youtube.com/@cppvalley",
    },
    educationalLevel: course.level,
    teaches: course.tags,
  };

  return (
    <div className="page-shell lp-page course-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main className="lp-main">
        <section className="course-detail-hero">
          <div className="site-container course-detail-hero-inner">
            <div>
              <nav className="lp-breadcrumb" aria-label="Breadcrumb">
                <Link href="/courses">Courses</Link>
                <span>/</span>
                <span>{course.shortTitle}</span>
              </nav>
              <p className="lp-kicker">{course.pillar}</p>
              <h1>{course.title}</h1>
              <p>{course.longDescription}</p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/youtube">Watch related videos</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
              </div>
            </div>
            <aside className="course-detail-cover-card no-image-detail-card">
              <div className="course-detail-card-body">
                <span className="course-badge">{course.pillar}</span>
                <h2>{course.shortTitle}</h2>
                <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span><span>{course.lessons}</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section course-detail-grid">
          <article className="lp-card course-detail-main-card">
            <div className="lp-card-body">
              <p className="lp-kicker">Modules</p>
              <h2>What this course covers</h2>
              <div className="course-module-list">
                {course.modules.map((module, index) => (
                  <div key={module}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{module}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="course-detail-side">
            <div className="lp-card">
              <div className="lp-card-body">
                <p className="lp-kicker">Outcomes</p>
                <ul className="course-check-list">
                  {course.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
              </div>
            </div>
            <div className="lp-card">
              <div className="lp-card-body">
                <p className="lp-kicker">Projects</p>
                <ul className="course-check-list">
                  {course.projects.map((project) => <li key={project}>{project}</li>)}
                </ul>
              </div>
            </div>
          </aside>
        </section>

        {relatedCourses.length ? (
          <section className="site-container lp-section">
            <div className="lp-section-head">
              <div>
                <p className="lp-kicker">Continue learning</p>
                <h2>Related public tracks</h2>
              </div>
              <Link className="lp-card-link" href="/courses">All courses</Link>
            </div>
            <div className="lp-course-grid">
              {relatedCourses.map((item) => (
                <Link className="lp-course-card" href={item.href} key={item.slug}>
                  <div className="lp-card-thumb">
                    <span>{item.pillar}</span>
                    <strong>{item.shortTitle}</strong>
                  </div>
                  <div className="lp-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { courses, coursesBySlug } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses
    .filter((course) => course.slug !== "third-year-cpp-eda-hft")
    .map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course) return {};

  return {
    title: `${course.title} — cppvalley Course`,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.description,
      url: `/courses/${course.slug}`,
      type: "website",
      images: [{ url: course.coverImage, width: 1200, height: 675, alt: `${course.title} cover` }],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || course.slug === "third-year-cpp-eda-hft") notFound();

  const relatedCourses = courses
    .filter((item) => item.slug !== course.slug && item.pillar === course.pillar)
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
                <Link className="lp-button" href="/projects">Build projects</Link>
              </div>
            </div>
            <aside className="course-detail-cover-card">
              <img src={course.coverImage} alt={`${course.title} cover`} />
              <div className="course-detail-card-body">
                <span className="course-badge">{course.status}</span>
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

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Related courses</p>
              <h2>Continue in the same pillar</h2>
            </div>
            <Link className="lp-card-link" href="/courses">All courses</Link>
          </div>
          <div className="lp-course-grid">
            {relatedCourses.map((item) => (
              <Link className="lp-course-card image-course-card" href={item.href} key={item.slug}>
                <img className="course-card-image" src={item.coverImage} alt={`${item.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">{item.pillar}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

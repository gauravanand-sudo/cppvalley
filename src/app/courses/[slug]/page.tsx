import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { coursePages, coursesBySlug } from "@/data/courses";

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
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);

  if (!course || course.href !== `/courses/${course.slug}`) notFound();

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
    <div className="page-shell lp-page course-detail-page academic-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main className="lp-main">
        <section className="site-container lp-section course-detail-simple">
          <nav className="lp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <span>{course.shortTitle}</span>
          </nav>

          <p className="lp-kicker">{course.pillar}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="lp-meta"><span>{course.level}</span><span>{course.duration}</span></div>

          <div className="course-module-list compact-module-list">
            {course.modules.map((module, index) => (
              <div key={module}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{module}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

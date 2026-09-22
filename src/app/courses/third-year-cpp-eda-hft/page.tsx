import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "3rd/4th Year C++ to EDA and HFT Roadmap",
  description:
    "A practical roadmap for 3rd and 4th year students targeting C++ systems, EDA software, semiconductor tooling and HFT engineering.",
  alternates: { canonical: "/courses/third-year-cpp-eda-hft" },
  openGraph: {
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    description:
      "A practical roadmap for students targeting C++ systems, EDA software, semiconductor tooling and HFT internships.",
    url: "/courses/third-year-cpp-eda-hft",
    images: [{ url: "/courses/third-year-cpp-eda-hft/opengraph-image", alt: "Student C++ EDA HFT roadmap" }],
  },
};

const modules = [
  "Modern C++ that companies test",
  "DSA for systems roles",
  "OS, Linux and tooling",
  "Computer architecture and performance",
  "EDA and semiconductor software basics",
  "HFT and low-latency systems basics",
  "Portfolio proof",
  "Resume and interview loop",
] as const;

export default function StudentCppEdaHftPage() {
  return (
    <div className="page-shell lp-page course-detail-page modern-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container lp-section course-detail-simple smooth-course-detail">
          <nav className="lp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <span>Student Roadmap</span>
          </nav>

          <p className="lp-kicker">Roadmap</p>
          <h1>3rd/4th Year C++ → EDA/HFT Roadmap</h1>
          <p>A direct path for students targeting C++ systems, EDA software, semiconductor tooling and HFT internships.</p>
          <div className="lp-meta"><span>Recommended for students</span><span>Student</span><span>8 modules</span></div>
          <div className="lp-actions course-detail-actions">
            <Link className="lp-button primary" href="/courses">Browse all courses</Link>
            <Link className="lp-button" href="/interviews">Practice interview questions</Link>
          </div>

          <div className="course-insight-grid" aria-label="Course guidance">
            <article className="course-insight-card">
              <span>Outcome</span>
              <p>Know the order to learn C++, systems, EDA and HFT topics without wasting months on unrelated material.</p>
            </article>
            <article className="course-insight-card">
              <span>Good for</span>
              <p>3rd/4th year students, internship prep and learners choosing between EDA, HFT and systems paths.</p>
            </article>
            <article className="course-insight-card">
              <span>Prerequisites</span>
              <p>Basic programming, DSA practice and willingness to build small proof projects while learning.</p>
            </article>
          </div>

          <div className="course-module-grid">
            {modules.map((module, index) => (
              <article className="course-module-card" key={module}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{module}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

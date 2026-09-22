import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "3rd/4th Year C++ to EDA and HFT Roadmap",
  description:
    "A practical roadmap for 3rd and 4th year students targeting C++ systems, EDA software, semiconductor tooling and HFT engineering.",
  alternates: { canonical: "/courses/third-year-cpp-eda-hft" },
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
    <div className="page-shell lp-page course-detail-page academic-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container lp-section course-detail-simple">
          <nav className="lp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <span>Student Roadmap</span>
          </nav>

          <p className="lp-kicker">Roadmap</p>
          <h1>3rd/4th Year C++ → EDA/HFT Roadmap</h1>
          <p>A direct path for students targeting C++ systems, EDA software, semiconductor tooling and HFT internships.</p>
          <div className="lp-meta"><span>Student</span><span>8 modules</span></div>
          <div className="lp-actions course-detail-actions">
            <Link className="lp-button primary" href="/courses">Browse all courses</Link>
            <Link className="lp-button" href="/interviews">Practice interview questions</Link>
          </div>

          <div className="course-module-list compact-module-list">
            {modules.map((module, index) => (
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

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
    <div className="page-shell lp-page course-detail-page modern-page market-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="market-page-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <nav className="lp-breadcrumb" aria-label="Breadcrumb">
                <Link href="/courses">Courses</Link>
                <span>/</span>
                <span>Student Roadmap</span>
              </nav>
              <p className="lp-kicker">Roadmap</p>
              <h1>3rd/4th Year C++ → EDA/HFT Roadmap</h1>
              <p>A direct path for students targeting C++ systems, EDA software, semiconductor tooling and HFT internships.</p>
              <div className="market-rating-row"><strong>4.9</strong><span>Recommended for students</span><span>Student</span><span>8 modules</span></div>
            </div>
            <aside className="market-hero-panel">
              <strong>Start here if you are unsure</strong>
              <ul>
                <li>Use this before choosing EDA, HFT or GPU tracks.</li>
                <li>Build portfolio proof while studying.</li>
                <li>Move from fundamentals to internship prep.</li>
              </ul>
              <Link className="lp-button primary" href="/courses">Browse all courses</Link>
              <Link className="lp-button" href="/interviews">Practice interviews</Link>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="market-layout">
            <aside className="market-sidebar" aria-label="Roadmap summary">
              <div className="market-sidebar-section">
                <h3>This roadmap includes</h3>
                <ul>
                  <li>8 modules</li>
                  <li>C++ foundations</li>
                  <li>EDA and HFT orientation</li>
                  <li>Portfolio and resume loop</li>
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Best for</h3>
                <ul>
                  <li>3rd/4th year students</li>
                  <li>Internship prep</li>
                  <li>Systems role discovery</li>
                </ul>
              </div>
            </aside>

            <div className="market-content-column">
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

              <div className="market-section-head">
                <div>
                  <p className="lp-kicker">Roadmap modules</p>
                  <h2>What to do in order</h2>
                  <p>The roadmap is shown like a course curriculum so the sequence is obvious.</p>
                </div>
              </div>

              <div className="course-module-grid">
                {modules.map((module, index) => (
                  <article className="course-module-card" key={module}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{module}</strong>
                  </article>
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

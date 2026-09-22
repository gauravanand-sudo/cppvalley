import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++, EDA, HFT and AI Systems Interview Prep",
  description:
    "cppvalley is a focused learning hub for C++ interviews, EDA software, HFT systems, low-latency C++, AI systems, book summaries, interview questions and YouTube lessons.",
  alternates: { canonical: "/" },
};

const tracks = [
  {
    title: "3rd/4th Year C++ → EDA/HFT Track",
    tag: "Student roadmap",
    href: "/courses/third-year-cpp-eda-hft",
    text: "For college students targeting C++ systems, EDA CAD software, semiconductor tooling, HFT or performance-heavy internships.",
  },
  {
    title: "Core C++ for Interviews",
    tag: "Free course",
    href: "/courses#core-cpp",
    text: "Modern C++, RAII, smart pointers, move semantics, STL, templates, UB, tooling and build-from-scratch projects.",
  },
  {
    title: "HFT Core Systems",
    tag: "Live curriculum",
    href: "/curriculum",
    text: "CPU, Linux, networking, latency, low-latency C++, market data, execution, risk and tick-to-trade design.",
  },
  {
    title: "YouTube Series",
    tag: "Video hub",
    href: "/youtube",
    text: "cppvalley videos organized by learning path: C++, EDA, HFT, AI systems and interview preparation.",
  },
  {
    title: "Interview Questions",
    tag: "Practice",
    href: "/interviews",
    text: "C++ questions, systems questions, HFT rounds, design prompts and project-based interview preparation.",
  },
  {
    title: "Books and Conferences",
    tag: "Reading hub",
    href: "/books",
    text: "Book summaries and conference notes for C++, design, concurrency, HFT, EDA and AI systems.",
  },
] as const;

const seoTopics = [
  "C++ interview preparation",
  "C++ roadmap for college students",
  "EDA software engineer roadmap",
  "HFT internship preparation",
  "low latency C++",
  "AI systems engineering",
  "C++ book summaries",
  "C++ conference notes",
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />

      <main>
        <section className="platform-hero site-container">
          <div>
            <p className="platform-kicker">C++ · EDA · HFT · AI Systems</p>
            <h1>Prepare for serious <span>C++ systems</span> interviews.</h1>
            <p className="platform-lede">
              cppvalley is a focused learning hub for students and engineers preparing for C++, EDA software, HFT, low-latency systems and AI systems roles.
            </p>
            <div className="platform-actions">
              <Link className="platform-button primary" href="/courses/third-year-cpp-eda-hft">
                Start student roadmap
              </Link>
              <Link className="platform-button" href="/courses">
                Browse courses
              </Link>
              <Link className="platform-button ghost" href="/youtube">
                Watch videos
              </Link>
            </div>
          </div>

          <aside className="platform-hero-card" aria-label="cppvalley focus">
            <div className="platform-terminal">
              <div><span>$</span> cppvalley focus</div>
              <div>C++ depth</div>
              <div>systems fundamentals</div>
              <div>performance thinking</div>
              <div>projects + interviews</div>
            </div>
            <div className="platform-stats">
              <div><small>HFT curriculum</small><strong>{lessons.length} lessons · {phases.length} phases</strong></div>
              <div><small>New student track</small><strong>C++ → EDA/HFT roadmap</strong></div>
              <div><small>Traffic strategy</small><strong>Courses · videos · blogs · questions</strong></div>
            </div>
          </aside>
        </section>

        <section className="platform-section site-container">
          <div className="platform-section-index">01</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Learning tracks</p>
                <h2>Clear pages. Clear intent. No random content dump.</h2>
              </div>
              <Link href="/courses">All courses ↗</Link>
            </div>
            <div className="platform-grid">
              {tracks.map((track) => (
                <Link className="platform-card" href={track.href} key={track.title}>
                  <span className="tag">{track.tag}</span>
                  <h3>{track.title}</h3>
                  <p>{track.text}</p>
                  <div className="platform-card-footer"><span>Open</span><b>↗</b></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section site-container">
          <div className="platform-section-index">02</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">SEO topics</p>
                <h2>Build traffic around high-intent searches.</h2>
              </div>
            </div>
            <div className="platform-matrix">
              {seoTopics.map((topic) => (
                <div className="platform-table-card" key={topic}>
                  <h3>{topic}</h3>
                  <p>Supported by a course page, video page, blog posts and interview-practice content.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section site-container">
          <div className="platform-section-index">03</div>
          <div>
            <div className="platform-section-head">
              <div>
                <p className="platform-eyebrow">Content engine</p>
                <h2>Every content type has a job.</h2>
              </div>
            </div>
            <div className="platform-path">
              <Link href="/blog"><span>Blog</span><strong>Daily notes</strong><small>Short posts targeting long-tail searches and internal links.</small><b>↗</b></Link>
              <Link href="/youtube"><span>Video</span><strong>Embedded YouTube series</strong><small>Videos grouped by course path so watch time supports the site.</small><b>↗</b></Link>
              <Link href="/interviews"><span>Prep</span><strong>Interview questions</strong><small>C++/systems/HFT/AI prompts with answer frameworks.</small><b>↗</b></Link>
              <Link href="/books"><span>Books</span><strong>Book summaries</strong><small>Scott Meyers, Effective STL, concurrency, design, HFT and systems reading notes.</small><b>↗</b></Link>
              <Link href="/conferences"><span>Conf</span><strong>C++ conference notes</strong><small>CppCon-style talks distilled into practical interview and project lessons.</small><b>↗</b></Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

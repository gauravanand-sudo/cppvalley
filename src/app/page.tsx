import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Hub",
  description:
    "Explore C++ interview prep, EDA software, HFT systems, low-latency engineering, AI systems, projects, videos and interview questions for students and engineers.",
  alternates: { canonical: "/" },
};

const focusAreas = [
  "Modern C++",
  "EDA Software",
  "HFT Systems",
  "Low Latency",
  "AI Systems",
  "Interview Projects",
] as const;

const featuredPaths = [
  {
    label: "Student track",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    text: "A practical path for students targeting C++ systems, EDA CAD software, semiconductor tooling, HFT or performance-heavy internships.",
    href: "/courses/third-year-cpp-eda-hft",
  },
  {
    label: "C++ foundation",
    title: "Core C++ for Interviews",
    text: "RAII, smart pointers, move semantics, STL, templates, object model, undefined behavior, tooling and build-from-scratch projects.",
    href: "/courses#core-cpp",
  },
  {
    label: "HFT systems",
    title: "HFT Core Systems",
    text: "CPU, Linux, networking, latency measurement, market data, execution, risk and tick-to-trade systems.",
    href: "/curriculum",
  },
] as const;

const resourceLinks = [
  { title: "Courses", text: "Structured paths for C++, EDA, HFT, AI systems and interview preparation.", href: "/courses" },
  { title: "Videos", text: "cppvalley YouTube lessons organized by topic and embedded on-site.", href: "/youtube" },
  { title: "Daily Blog", text: "Short engineering notes on one useful C++ or systems idea at a time.", href: "/blog" },
  { title: "Questions", text: "C++/systems/HFT/AI interview prompts with answer frameworks.", href: "/interviews" },
  { title: "Book Notes", text: "Summaries from C++, STL, design, concurrency, systems and HFT books.", href: "/books" },
  { title: "Projects", text: "Portfolio projects students can build, measure, explain and share.", href: "/projects" },
] as const;

const learningMap = [
  "Build real C++ depth: lifetime, ownership, object model, templates and STL.",
  "Connect C++ to systems: OS, Linux, architecture, networking and performance.",
  "Choose a domain path: EDA software, HFT systems or AI systems.",
  "Create project evidence: README, benchmarks, trade-offs and failure notes.",
  "Practice interviews with clear explanations, not memorized answers.",
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site mit-site">
      <SiteHeader />

      <main>
        <section className="mit-hero site-container">
          <div className="mit-hero-main">
            <p className="mit-kicker">C++ · EDA · HFT · AI Systems</p>
            <h1>C++ systems learning for serious interview preparation.</h1>
            <p className="mit-lede">
              Explore courses, videos, projects, notes and questions for modern C++, EDA software, semiconductor tooling, HFT, low-latency engineering and AI systems roles.
            </p>
            <div className="mit-actions">
              <Link className="mit-button primary" href="/courses">
                Explore courses
              </Link>
              <Link className="mit-button" href="/youtube">
                Watch videos
              </Link>
              <Link className="mit-button" href="/interviews">
                Practice questions
              </Link>
            </div>
          </div>

          <aside className="mit-hero-side" aria-label="cppvalley overview">
            <h2>What you can explore</h2>
            <p>
              Courses, YouTube lessons, interview questions, project ideas, book notes and daily engineering writing — all focused on C++ systems careers.
            </p>
            <div className="mit-mini-links">
              <Link href="/courses/third-year-cpp-eda-hft">Student roadmap</Link>
              <Link href="/curriculum">HFT curriculum</Link>
              <Link href="/projects">Projects</Link>
            </div>
          </aside>
        </section>

        <section className="mit-strip site-container" aria-label="cppvalley focus areas">
          {focusAreas.map((item) => <span key={item}>{item}</span>)}
        </section>

        <section className="mit-section site-container">
          <div className="mit-section-head">
            <span>01</span>
            <div>
              <p className="mit-kicker">Learning paths</p>
              <h2>Clear tracks students can scan fast.</h2>
            </div>
          </div>

          <div className="mit-feature-grid">
            {featuredPaths.map((path) => (
              <Link className="mit-feature-card" href={path.href} key={path.title}>
                <span>{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <b>Explore →</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="mit-section site-container">
          <div className="mit-section-head">
            <span>02</span>
            <div>
              <p className="mit-kicker">Resources</p>
              <h2>Pick a format and keep moving.</h2>
            </div>
          </div>

          <div className="mit-resource-grid">
            {resourceLinks.map((resource) => (
              <Link className="mit-resource-card" href={resource.href} key={resource.title}>
                <h3>{resource.title}</h3>
                <p>{resource.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mit-section site-container mit-split">
          <div>
            <p className="mit-kicker">Learning map</p>
            <h2>From student to systems-ready engineer</h2>
            <p className="mit-copy">
              cppvalley connects C++ depth, systems fundamentals, domain knowledge and projects so students can explore without being forced into one path.
            </p>
          </div>
          <ol className="mit-plan">
            {learningMap.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="mit-section site-container mit-stats">
          <div>
            <span>{lessons.length}</span>
            <p>HFT curriculum lessons</p>
          </div>
          <div>
            <span>{phases.length}</span>
            <p>HFT roadmap phases</p>
          </div>
          <div>
            <span>8</span>
            <p>student roadmap modules</p>
          </div>
          <div>
            <span>6</span>
            <p>main resource hubs</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

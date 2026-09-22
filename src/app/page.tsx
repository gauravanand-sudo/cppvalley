import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Learning Hub",
  description:
    "A clean learning hub for students preparing for C++ systems, EDA software, HFT, low-latency engineering and AI systems interviews.",
  alternates: { canonical: "/" },
};

const focusAreas = [
  "Modern C++",
  "EDA software",
  "HFT systems",
  "Low latency",
  "AI systems",
  "Interview projects",
] as const;

const featuredPaths = [
  {
    label: "Recommended start",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    text: "A practical path for students who want C++ systems, EDA CAD software, semiconductor tooling, HFT, or performance-heavy internships.",
    href: "/courses/third-year-cpp-eda-hft",
  },
  {
    label: "Core foundation",
    title: "Core C++ for Interviews",
    text: "RAII, smart pointers, move semantics, STL, templates, object model, undefined behavior, tools and build-from-scratch projects.",
    href: "/courses#core-cpp",
  },
  {
    label: "Specialized track",
    title: "HFT Core Systems",
    text: "CPU, Linux, networking, latency measurement, market data, execution, risk and tick-to-trade systems.",
    href: "/curriculum",
  },
] as const;

const resourceLinks = [
  { title: "Courses", text: "Structured learning paths for C++, EDA, HFT, AI systems and interview preparation.", href: "/courses" },
  { title: "YouTube", text: "cppvalley videos organized into topic-wise study paths and embedded on the site.", href: "/youtube" },
  { title: "Daily Blog", text: "Short engineering notes on one useful C++ or systems idea at a time.", href: "/blog" },
  { title: "Interview Questions", text: "C++/systems/HFT/AI interview prompts with answer frameworks and project discussion points.", href: "/interviews" },
  { title: "Book Notes", text: "Clean summaries from C++, STL, design, concurrency, systems and HFT books.", href: "/books" },
  { title: "Projects", text: "Portfolio projects students can build, measure, explain and show in interviews.", href: "/projects" },
] as const;

const studentPlan = [
  "Learn modern C++ deeply instead of memorizing syntax.",
  "Build systems projects with clear README, benchmarks and trade-offs.",
  "Practice DSA in C++ with implementation discipline.",
  "Understand OS, Linux, architecture and performance basics.",
  "Prepare interview stories around projects, failures and design choices.",
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site mit-site">
      <SiteHeader />

      <main>
        <section className="mit-hero site-container">
          <div className="mit-hero-main">
            <p className="mit-kicker">C++ · EDA · HFT · AI Systems</p>
            <h1>A serious learning hub for systems interviews.</h1>
            <p className="mit-lede">
              cppvalley helps students and engineers prepare for C++ systems, EDA software, semiconductor tooling, HFT, low-latency and AI systems interviews with courses, videos, notes, projects and questions.
            </p>
            <div className="mit-actions">
              <Link className="mit-button primary" href="/courses/third-year-cpp-eda-hft">
                Start student roadmap
              </Link>
              <Link className="mit-button" href="/courses">
                View all courses
              </Link>
            </div>
          </div>

          <aside className="mit-hero-side" aria-label="cppvalley summary">
            <h2>Start here</h2>
            <p>
              For 3rd/4th year students targeting C++ systems, EDA, HFT, semiconductor software or performance-heavy roles.
            </p>
            <Link href="/courses/third-year-cpp-eda-hft">Open the roadmap →</Link>
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
              <h2>Clear tracks students can understand quickly.</h2>
            </div>
          </div>

          <div className="mit-feature-grid">
            {featuredPaths.map((path) => (
              <Link className="mit-feature-card" href={path.href} key={path.title}>
                <span>{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <b>Open path →</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="mit-section site-container">
          <div className="mit-section-head">
            <span>02</span>
            <div>
              <p className="mit-kicker">Resources</p>
              <h2>Everything on the site has a learning purpose.</h2>
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
            <p className="mit-kicker">For students</p>
            <h2>What to do first</h2>
            <p className="mit-copy">
              This is not a random link dump. The site should help a student decide what to study, what to build, and how to explain it in interviews.
            </p>
          </div>
          <ol className="mit-plan">
            {studentPlan.map((step) => <li key={step}>{step}</li>)}
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
            <p>main learning hubs</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { lessons, phases } from "@/data/curriculum";

export const metadata: Metadata = {
  title: "cppvalley — C++, EDA, HFT and AI Systems Interview Prep",
  description:
    "A modern learning hub for C++ interviews, EDA software, HFT systems, low-latency C++, AI systems, book summaries, interview questions and YouTube lessons.",
  alternates: { canonical: "/" },
};

const featuredTracks = [
  {
    eyebrow: "Start here",
    title: "3rd/4th Year C++ → EDA/HFT",
    text: "A practical student roadmap for C++ systems, EDA CAD software, semiconductor tooling, HFT and performance-heavy internships.",
    href: "/courses/third-year-cpp-eda-hft",
    metric: "8 modules",
  },
  {
    eyebrow: "Core skill",
    title: "Core C++ for Interviews",
    text: "RAII, smart pointers, move semantics, STL, templates, object model, UB, tooling, performance and build-from-scratch projects.",
    href: "/courses#core-cpp",
    metric: "free track",
  },
  {
    eyebrow: "Specialized",
    title: "HFT Core Systems",
    text: "CPU, memory, Linux, networking, latency measurement, low-latency C++, market data, execution, risk and tick-to-trade.",
    href: "/curriculum",
    metric: `${lessons.length} lessons`,
  },
] as const;

const hubs = [
  { label: "Courses", href: "/courses", text: "Structured tracks for C++, EDA, HFT, AI systems and interview prep." },
  { label: "Videos", href: "/youtube", text: "Your @cppvalley videos organized by topic and embedded on-site." },
  { label: "Daily Blog", href: "/blog", text: "Short SEO-friendly notes that answer one focused engineering question." },
  { label: "Interviews", href: "/interviews", text: "C++/systems/HFT/AI interview questions with practical answer frameworks." },
  { label: "Books", href: "/books", text: "Useful summaries from C++, design, concurrency, systems and HFT books." },
  { label: "Projects", href: "/projects", text: "Portfolio-grade systems projects students can explain in interviews." },
] as const;

const proofPoints = [
  "C++ interview prep",
  "EDA software roadmap",
  "HFT internships",
  "low-latency systems",
  "AI systems design",
  "project-based proof",
] as const;

const contentLoops = [
  {
    step: "01",
    title: "Video becomes page",
    text: "Every good YouTube video gets a matching page with notes, transcript summary, links and next steps.",
  },
  {
    step: "02",
    title: "Page links to track",
    text: "The reader always knows the next useful course, roadmap, blog or project to open.",
  },
  {
    step: "03",
    title: "Track builds authority",
    text: "Courses, blogs, questions and book notes reinforce the same high-intent search topics.",
  },
] as const;

export default function Home() {
  return (
    <div className="page-shell platform-site modern-site">
      <SiteHeader />

      <main>
        <section className="modern-hero site-container">
          <div className="modern-hero-copy">
            <div className="modern-pill-row">
              <span>cppvalley</span>
              <span>C++ · EDA · HFT · AI Systems</span>
            </div>
            <h1>Become interview-ready for serious systems roles.</h1>
            <p>
              A focused platform for students and engineers preparing for modern C++, EDA software, HFT, low-latency systems and AI systems interviews — with videos, courses, projects, notes and questions in one place.
            </p>
            <div className="modern-actions">
              <Link className="modern-button primary" href="/courses/third-year-cpp-eda-hft">
                Start student roadmap
              </Link>
              <Link className="modern-button" href="/youtube">
                Watch videos
              </Link>
              <Link className="modern-button subtle" href="/courses">
                Browse tracks
              </Link>
            </div>
            <div className="modern-proof-strip" aria-label="cppvalley focus areas">
              {proofPoints.map((point) => <span key={point}>{point}</span>)}
            </div>
          </div>

          <aside className="modern-hero-panel" aria-label="cppvalley dashboard preview">
            <div className="panel-topbar">
              <span />
              <span />
              <span />
              <strong>learning engine</strong>
            </div>
            <div className="panel-command">
              <span>$</span> build-roadmap --role systems-engineer
            </div>
            <div className="panel-grid">
              <div>
                <small>HFT curriculum</small>
                <strong>{lessons.length}</strong>
                <span>lessons</span>
              </div>
              <div>
                <small>Roadmap depth</small>
                <strong>{phases.length}</strong>
                <span>phases</span>
              </div>
              <div>
                <small>Primary tracks</small>
                <strong>6</strong>
                <span>hubs</span>
              </div>
              <div>
                <small>Monetization later</small>
                <strong>SEO</strong>
                <span>first</span>
              </div>
            </div>
            <div className="panel-stack">
              <div><b>C++</b><span>language depth + projects</span></div>
              <div><b>EDA</b><span>graphs, parsers, simulation, tooling</span></div>
              <div><b>HFT</b><span>latency, order books, trading systems</span></div>
              <div><b>AI Systems</b><span>RAG, inference, serving, reliability</span></div>
            </div>
          </aside>
        </section>

        <section className="modern-section site-container">
          <div className="modern-section-head">
            <span>01 · Main paths</span>
            <h2>Three clear entry points. No confusing content dump.</h2>
          </div>
          <div className="modern-track-grid">
            {featuredTracks.map((track) => (
              <Link className="modern-track-card" href={track.href} key={track.title}>
                <div>
                  <span>{track.eyebrow}</span>
                  <b>{track.metric}</b>
                </div>
                <h3>{track.title}</h3>
                <p>{track.text}</p>
                <strong>Open path →</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="modern-section site-container modern-split-section">
          <div className="modern-section-head compact">
            <span>02 · Traffic system</span>
            <h2>Every page has a purpose.</h2>
            <p>
              Courses are the spine. Videos bring trust. Blog posts capture long-tail search. Interview questions convert visitors into repeat users.
            </p>
          </div>
          <div className="modern-hub-grid">
            {hubs.map((hub) => (
              <Link className="modern-hub-card" href={hub.href} key={hub.label}>
                <h3>{hub.label}</h3>
                <p>{hub.text}</p>
                <span>Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="modern-section site-container">
          <div className="modern-section-head">
            <span>03 · Content loop</span>
            <h2>Modern creator platform, not a static course brochure.</h2>
          </div>
          <div className="modern-loop-grid">
            {contentLoops.map((item) => (
              <article className="modern-loop-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="modern-cta site-container">
          <div>
            <span>Start now</span>
            <h2>Build traffic first. Monetize once trust is real.</h2>
            <p>
              Keep the content sharp, practical and searchable. Courses, videos, blogs and interview pages should all help one audience: engineers preparing for C++/EDA/HFT/AI systems roles.
            </p>
          </div>
          <Link className="modern-button primary" href="/courses/third-year-cpp-eda-hft">
            Open student roadmap
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

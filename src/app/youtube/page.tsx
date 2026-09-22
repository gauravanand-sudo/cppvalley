import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "YouTube Series",
  description:
    "cppvalley YouTube series hub for embedded C++, HFT, AI systems, interview preparation and project walkthrough videos.",
  alternates: { canonical: "/youtube" },
};

const series = [
  {
    title: "Core C++ Interview Series",
    tag: "C++",
    text: "Short lessons for RAII, smart pointers, move semantics, STL, templates, UB and performance traps.",
    embedUrl: "",
  },
  {
    title: "HFT Systems Series",
    tag: "HFT",
    text: "CPU, Linux, networking, low latency, market data, execution, risk and tick-to-trade architecture.",
    embedUrl: "",
  },
  {
    title: "Design Patterns + LLD Series",
    tag: "LLD",
    text: "Modern C++ design patterns, clean architecture, dependency inversion and real design round walkthroughs.",
    embedUrl: "",
  },
  {
    title: "AI Systems Series",
    tag: "AI Systems",
    text: "RAG systems, vector search, model serving, evaluation, agents and production AI architecture.",
    embedUrl: "",
  },
] as const;

export default function YoutubePage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">@cppvalley YouTube</p>
          <h1>YouTube series embedded into the cppvalley learning hub.</h1>
          <p className="page-intro">
            This page is ready for playlist or video embeds. Add the YouTube embed URL for each series and the videos will play inside cppvalley pages instead of sending learners away immediately.
          </p>
          <div className="platform-actions">
            <Link className="platform-button primary" href="https://www.youtube.com/@cppvalley" target="_blank" rel="noreferrer">
              Open @cppvalley channel
            </Link>
            <Link className="platform-button" href="/courses">
              Match videos to courses
            </Link>
          </div>
        </section>

        <section className="platform-grid" aria-label="YouTube series placeholders">
          {series.map((item) => (
            <article className="platform-video-card" key={item.title}>
              <div className="platform-video-frame">
                {item.embedUrl ? (
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div>
                    <strong>Embed slot</strong>
                    <p>Add a YouTube video or playlist embed URL for this series.</p>
                  </div>
                )}
              </div>
              <span className="tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="platform-dark-band">
          <h2>How to add embeds</h2>
          <p>
            Use YouTube share → Embed, then copy the src URL into this page. Playlist embeds work best for course series because each new video can appear without changing the page structure.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

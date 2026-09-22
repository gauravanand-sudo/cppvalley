import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Book Summaries — cppvalley",
  description:
    "C++, systems, HFT and AI infrastructure book summaries from cppvalley.",
  alternates: { canonical: "/books" },
};

const books = [
  ["Effective Modern C++", "Scott Meyers", "Core C++", "Language rules and API design"],
  ["Effective STL", "Scott Meyers", "STL", "Containers, algorithms and trade-offs"],
  ["C++ Concurrency in Action", "Anthony Williams", "Concurrency", "Threads, atomics and memory model"],
  ["C++ Software Design", "Klaus Iglberger", "Design", "Architecture and dependency design"],
  ["Hands-On Design Patterns with C++", "Fedor Pikus", "LLD", "Pattern practice for C++ systems"],
  ["Designing Data-Intensive Applications", "Martin Kleppmann", "Systems", "Storage, consistency and data systems"],
  ["System Design Interview Vol. 1", "Alex Xu", "HLD", "High-level design interview revision"],
  ["Elements of Programming Interviews in C++", "Aziz, Lee, Prakash", "DSA", "DSA practice for C++ interviews"],
] as const;

export default function BooksPage() {
  const tracks = Array.from(new Set(books.map(([, , track]) => track)));

  return (
    <div className="page-shell lp-page modern-page market-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="market-page-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <p className="lp-kicker">Books</p>
              <h1>Book summary shelf</h1>
              <p>Use this like a marketplace resource shelf: pick the book that matches your current course, then revise the summary before interviews.</p>
            </div>
            <aside className="market-hero-panel">
              <strong>Being added gradually</strong>
              <ul>
                <li>Roadmap placeholders are live now.</li>
                <li>Detailed summaries will be published over time.</li>
                <li>Use tracks to decide what to read first.</li>
              </ul>
            </aside>
          </div>
        </section>

        <div className="site-container market-topic-row" aria-label="Book tracks">
          {tracks.map((track) => <a href="#book-shelf" key={track}>{track}</a>)}
        </div>

        <section className="site-container lp-section" id="book-shelf">
          <div className="market-layout">
            <aside className="market-sidebar" aria-label="Book shelf filters">
              <div className="market-sidebar-section">
                <h3>Use for</h3>
                <ul>
                  <li>Course revision</li>
                  <li>Interview vocabulary</li>
                  <li>Project design depth</li>
                  <li>Systems intuition</li>
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Tracks</h3>
                <ul>
                  {tracks.map((track) => <li key={track}>{track}</li>)}
                </ul>
              </div>
            </aside>

            <div className="market-content-column">
              <div className="market-section-head">
                <div>
                  <p className="lp-kicker">Resource shelf</p>
                  <h2>{books.length} book summaries planned</h2>
                  <p>Cards are arranged like course resources so students can connect reading to tracks.</p>
                </div>
              </div>

              <div className="market-note-card">
                <span className="course-badge">Roadmap placeholders</span>
                <h3>Summaries are being added gradually.</h3>
                <p>For now, use this shelf to prioritize reading around Core C++, concurrency, systems design and interviews.</p>
              </div>

              <div className="market-resource-list">
                {books.map(([title, author, track, outcome]) => (
                  <article className="market-resource-card" key={title}>
                    <div className="market-card-thumb">
                      <div>
                        <span>{track}</span>
                        <strong>Book</strong>
                      </div>
                    </div>
                    <div className="market-card-body">
                      <span className="course-card-eyebrow">{track}</span>
                      <h3>{title}</h3>
                      <p>{author}</p>
                      <div className="market-card-meta"><span>{outcome}</span></div>
                    </div>
                    <div className="market-card-action">Summary soon</div>
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

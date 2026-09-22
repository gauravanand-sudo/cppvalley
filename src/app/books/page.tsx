import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Book Notes — cppvalley",
  description:
    "Interview-focused C++, HFT and systems book notes from cppvalley, including Effective Modern C++, Effective STL, C++ Concurrency in Action and DDIA.",
  alternates: { canonical: "/books" },
};

const books = [
  ["Effective Modern C++", "Scott Meyers", "Core C++", "Type deduction, auto, decltype, smart pointers, move semantics, lambdas, emplace, noexcept and modern API design.", "/course-cover/effective-modern-cpp-notes"],
  ["Effective STL", "Scott Meyers", "Core C++", "Container choice, iterator invalidation, algorithms, erase-remove, comparators, vector traps and performance-aware STL use.", "/course-cover/effective-stl-notes"],
  ["C++ Concurrency in Action", "Anthony Williams", "Concurrency", "Threads, locks, condition variables, futures, atomics, memory ordering, deadlocks and thread-safe components.", "/course-cover/cpp-concurrency-book-notes"],
  ["C++ Software Design", "Klaus Iglberger", "LLD", "Dependency management, value semantics, SOLID, type erasure, design trade-offs and maintainable C++ architecture.", "/course-cover/cpp-software-design-notes"],
  ["Hands-On Design Patterns with C++", "Fedor Pikus", "LLD", "Pattern implementation, policies, performance cost of abstractions and C++-specific design techniques.", "/course-cover/cpp-design-patterns-notes"],
  ["Designing Data-Intensive Applications", "Martin Kleppmann", "Systems design", "Indexes, replication, partitioning, transactions, streams, consistency, fault tolerance and production data architecture.", "/course-cover/ddia-book-notes"],
  ["System Design Interview Vol. 1", "Alex Xu", "HLD", "Requirements, APIs, data model, caches, queues, scaling, bottlenecks, failure modes and trade-offs.", "/course-cover/system-design-interview-notes"],
  ["Elements of Programming Interviews in C++", "Aziz, Lee, Prakash", "DSA", "C++ problem-solving discipline, patterns, edge cases, complexity and timed coding practice.", "/course-cover/epi-cpp-notes"],
] as const;

export default function BooksPage() {
  return (
    <div className="page-shell lp-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="platform-page-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Book notes</p>
              <h1>Book summaries mapped to interviews and projects.</h1>
              <p>
                Convert serious C++, systems and design books into practical preparation: what to learn, what to code, and how to explain each idea in interviews.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore related courses</Link>
                <Link className="lp-button" href="/blog">Read articles</Link>
              </div>
            </div>
            <aside className="lp-hero-card home-hero-image-card">
              <img src="/course-cover/book-summaries" alt="Book notes cover" />
              <div className="lp-card-body">
                <span className="course-badge">Study format</span>
                <h2>Read → Code → Explain</h2>
                <p>Every useful note should produce a coding task, a project idea or a crisp interview explanation.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="site-container lp-section">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Library</p>
              <h2>Recommended reading paths</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            {books.map(([title, author, track, text, image]) => (
              <article className="lp-card image-course-card" key={title}>
                <img className="course-card-image" src={image} alt={`${title} notes cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">{track}</span>
                  <h3>{title}</h3>
                  <p><strong>{author}</strong></p>
                  <p>{text}</p>
                  <Link className="lp-card-link" href="/blog">Read related notes</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

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
  ["Effective Modern C++", "Scott Meyers", "Core C++"],
  ["Effective STL", "Scott Meyers", "STL"],
  ["C++ Concurrency in Action", "Anthony Williams", "Concurrency"],
  ["C++ Software Design", "Klaus Iglberger", "Design"],
  ["Hands-On Design Patterns with C++", "Fedor Pikus", "LLD"],
  ["Designing Data-Intensive Applications", "Martin Kleppmann", "Systems"],
  ["System Design Interview Vol. 1", "Alex Xu", "HLD"],
  ["Elements of Programming Interviews in C++", "Aziz, Lee, Prakash", "DSA"],
] as const;

export default function BooksPage() {
  return (
    <div className="page-shell lp-page academic-page">
      <SiteHeader />
      <main className="lp-main">
        <section className="site-container lp-section">
          <div className="lp-section-head compact-section-head">
            <div>
              <p className="lp-kicker">Books</p>
              <h1>Book summaries</h1>
            </div>
          </div>

          <div className="lp-course-grid">
            {books.map(([title, author, track]) => (
              <article className="lp-card" key={title}>
                <div className="lp-card-body">
                  <span className="course-badge">{track}</span>
                  <h3>{title}</h3>
                  <p>{author}</p>
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

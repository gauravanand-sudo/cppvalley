import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Book Summaries",
  description:
    "Interview-focused C++, HFT and systems book summaries from cppvalley, including Effective Modern C++, Effective STL, C++ Concurrency in Action and DDIA.",
  alternates: { canonical: "/books" },
};

const books = [
  {
    title: "Effective Modern C++",
    author: "Scott Meyers",
    track: "Core C++",
    text: "Type deduction, auto, decltype, smart pointers, move semantics, lambdas, emplace, noexcept and modern API design.",
  },
  {
    title: "Effective STL",
    author: "Scott Meyers",
    track: "Core C++",
    text: "Container choice, iterator invalidation, algorithms, erase-remove, comparators, vector traps and performance-aware STL use.",
  },
  {
    title: "C++ Concurrency in Action",
    author: "Anthony Williams",
    track: "Concurrency",
    text: "Threads, locks, condition variables, futures, atomics, memory ordering, deadlocks and thread-safe components.",
  },
  {
    title: "C++ Software Design",
    author: "Klaus Iglberger",
    track: "LLD",
    text: "Dependency management, value semantics, SOLID, type erasure, design trade-offs and maintainable C++ architecture.",
  },
  {
    title: "Hands-On Design Patterns with C++",
    author: "Fedor Pikus",
    track: "LLD",
    text: "Pattern implementation, policies, performance cost of abstractions and C++-specific design techniques.",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    track: "HLD / AI systems",
    text: "Indexes, replication, partitioning, transactions, streams, consistency, fault tolerance and production data architecture.",
  },
  {
    title: "System Design Interview Vol. 1",
    author: "Alex Xu",
    track: "HLD",
    text: "Requirements, APIs, data model, caches, queues, scaling, bottlenecks, failure modes and trade-offs.",
  },
  {
    title: "Elements of Programming Interviews in C++",
    author: "Aziz, Lee, Prakash",
    track: "DSA",
    text: "C++ interview problem-solving discipline, patterns, edge cases, complexity and timed coding practice.",
  },
] as const;

export default function BooksPage() {
  return (
    <div className="page-shell platform-site">
      <SiteHeader />
      <main className="platform-simple-page site-container">
        <section className="platform-page-hero">
          <p className="platform-eyebrow">Book Summaries</p>
          <h1>Book notes that map directly to interviews and projects.</h1>
          <p className="page-intro">
            This hub turns serious books into practical preparation: what to read, what to skip, what to code, and how to explain each idea in an interview.
          </p>
        </section>

        <section className="platform-grid" aria-label="Book summary placeholders">
          {books.map((book) => (
            <article className="platform-resource-card" key={book.title}>
              <span className="tag">{book.track}</span>
              <h3>{book.title}</h3>
              <p><strong>{book.author}</strong></p>
              <p>{book.text}</p>
              <div className="platform-card-footer"><span>Summary slot</span><b>↗</b></div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

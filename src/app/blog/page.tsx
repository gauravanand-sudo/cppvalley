import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Articles — cppvalley",
  description:
    "cppvalley articles on C++, HFT, AI systems, low latency, design patterns, interviews, books, conferences and engineering careers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "cppvalley Articles",
    description: "Notes on C++, HFT, AI systems, low latency, interviews and systems engineering.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="blog-page lp-page">
      <SiteHeader />
      <main className="blog-main lp-main">
        <section className="blog-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Articles</p>
              <h1>Short systems notes for serious C++ learners.</h1>
              <p>
                Read practical explanations on C++, HFT, low latency, AI systems, interviews, books and project ideas. Each note is designed to teach one useful engineering idea clearly.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="/courses">Explore courses</Link>
                <Link className="lp-button" href="/youtube">Watch videos</Link>
              </div>
            </div>

            <aside className="blog-hero-side" aria-label="Article focus">
              <strong>Focused explanations</strong>
              <strong>Interview-ready takeaways</strong>
              <strong>Links to courses and projects</strong>
            </aside>
          </div>
        </section>

        <section className="site-container blog-index" aria-labelledby="latest-posts-heading">
          <div className="blog-index-heading">
            <h2 id="latest-posts-heading">Latest articles</h2>
            <span>{posts.length} published</span>
          </div>

          {posts.length > 0 ? (
            <div className="blog-list">
              {posts.map((post) => (
                <Link className="blog-list-item" href={`/blog/${post.slug}`} key={post.slug}>
                  <span className="blog-list-date">{formatDate(post.publishedAt)}</span>
                  <div className="blog-list-copy">
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                  </div>
                  <span className="blog-list-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="lp-card">
              <div className="lp-card-body">
                <strong>No articles published yet.</strong>
                <p>The article library is ready for the first cppvalley systems note.</p>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

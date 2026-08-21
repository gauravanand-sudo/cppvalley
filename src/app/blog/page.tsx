import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Daily notes on C++, systems, low latency, performance engineering and HFT from cppvalley.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "cppvalley Blog",
    description: "Daily notes on C++, systems, low latency, performance engineering and HFT.",
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
    <div className="blog-page">
      <SiteHeader />

      <main className="blog-main">
        <section className="site-container blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-kicker">cppvalley engineering notes</p>
            <h1>Blog</h1>
            <p>
              Short, practical notes on C++, computer systems, Linux, networking, concurrency,
              latency measurement, market microstructure and HFT engineering.
            </p>
          </div>

          <aside className="blog-hero-side" aria-label="Blog publishing focus">
            <strong>One focused engineering idea at a time</strong>
            <strong>Written for builders and interview candidates</strong>
            <strong>New notes can be published daily</strong>
          </aside>
        </section>

        <section className="site-container blog-index" aria-labelledby="latest-posts-heading">
          <div className="blog-index-heading">
            <h2 id="latest-posts-heading">Latest notes</h2>
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
            <div className="blog-empty">
              <strong>No posts published yet.</strong>
              <p>
                The blog is ready. The first daily note will appear here as soon as it is added.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

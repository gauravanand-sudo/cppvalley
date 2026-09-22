import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Articles — C++, HFT, EDA and Systems Notes",
  description:
    "cppvalley articles on C++, HFT, EDA software, low latency, systems design and interview preparation.",
  alternates: { canonical: "/blog" },
  keywords: [
    "C++ blog",
    "HFT engineering blog",
    "low latency C++ notes",
    "EDA software articles",
    "systems interview preparation"
  ],
  openGraph: {
    title: "cppvalley Articles",
    description: "Notes on C++, HFT, EDA, low latency, interviews and systems engineering.",
    url: "/blog",
    type: "website",
  },
};

const blogTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_TOP_SLOT;
const blogFeedAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_FEED_SLOT;

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "cppvalley Articles",
    description: metadata.description,
    url: "https://cppvalley.com/blog",
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `https://cppvalley.com/blog/${post.slug}`,
    })),
  };

  return (
    <div className="blog-page lp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="blog-main lp-main">
        <section className="blog-hero">
          <div className="site-container lp-hero-inner">
            <div>
              <p className="lp-kicker">Articles</p>
              <h1>Systems notes for serious C++ learners.</h1>
              <p>
                Practical articles on C++, HFT systems, EDA software basics, low latency, interview preparation and project ideas.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#latest-posts-heading">Read articles</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
              </div>
            </div>

            <aside className="blog-hero-side" aria-label="Article focus">
              <strong>C++ systems</strong>
              <strong>Interview preparation</strong>
              <strong>Projects and trade-offs</strong>
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={blogTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container blog-index" aria-labelledby="latest-posts-heading">
          <div className="blog-index-heading">
            <h2 id="latest-posts-heading">Latest articles</h2>
            <span>{posts.length} published</span>
          </div>

          {posts.length > 0 ? (
            <div className="blog-list">
              {posts.map((post, index) => (
                <Fragment key={post.slug}>
                  {index === 2 ? (
                    <AdSlot slot={blogFeedAdSlot} className="ad-slot-leaderboard" />
                  ) : null}
                  <Link className="blog-list-item" href={`/blog/${post.slug}`}>
                    <span className="blog-list-date">{formatDate(post.publishedAt)}</span>
                    <div className="blog-list-copy">
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      {post.topics?.length ? (
                        <div className="course-tags">
                          {post.topics.map((topic) => <span key={topic}>{topic}</span>)}
                        </div>
                      ) : null}
                    </div>
                    <span className="blog-list-arrow" aria-hidden="true">→</span>
                  </Link>
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="lp-card">
              <div className="lp-card-body">
                <strong>No articles published yet.</strong>
                <p>Articles will appear here when they are published.</p>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

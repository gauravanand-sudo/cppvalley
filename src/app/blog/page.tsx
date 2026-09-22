import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Articles — C++, HFT, EDA and AI Systems Notes",
  description:
    "Daily cppvalley articles on C++, HFT, EDA software, low latency, AI systems, design patterns, interviews, books, conferences and engineering careers.",
  alternates: { canonical: "/blog" },
  keywords: [
    "C++ blog",
    "HFT engineering blog",
    "low latency C++ notes",
    "EDA software articles",
    "AI systems engineering articles",
    "C++ interview preparation"
  ],
  openGraph: {
    title: "cppvalley Articles",
    description: "Daily notes on C++, HFT, EDA, AI systems, low latency, interviews and systems engineering.",
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
              <h1>Daily systems notes for serious C++ learners.</h1>
              <p>
                Publish one focused article every day: one concept, one example, one interview takeaway, and clear internal links to courses, videos, projects and question banks.
              </p>
              <div className="lp-actions">
                <Link className="lp-button primary" href="#latest-posts-heading">Read latest articles</Link>
                <Link className="lp-button" href="/interviews">Practice questions</Link>
              </div>
            </div>

            <aside className="blog-hero-side" aria-label="Article system">
              <strong>Daily publishing ready</strong>
              <strong>Article schema enabled</strong>
              <strong>Ad slots on index and article pages</strong>
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={blogTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container lp-section daily-publishing-panel">
          <div className="lp-section-head">
            <div>
              <p className="lp-kicker">Daily workflow</p>
              <h2>One daily blog = one searchable topic</h2>
            </div>
          </div>
          <div className="lp-course-grid">
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Topic</span><h3>Target one keyword</h3><p>Examples: virtual destructor C++, false sharing, EDA netlist graph, HFT order book, C++ atomics.</p></div></article>
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Structure</span><h3>Explain, then connect</h3><p>Use short sections, bullets, code ideas, interview prompts and links to courses or projects.</p></div></article>
            <article className="lp-card"><div className="lp-card-body"><span className="course-badge">Monetize</span><h3>Ads are controlled</h3><p>Top, mid and bottom placements are ready for AdSense without breaking reading flow.</p></div></article>
          </div>
        </section>

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

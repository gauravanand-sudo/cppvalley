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

const workflowCards = [
  {
    label: "Topic",
    title: "Target one keyword",
    image: "/course-cover/daily-blog-keyword",
    text: "Examples: virtual destructor C++, false sharing, EDA netlist graph, HFT order book, C++ atomics.",
  },
  {
    label: "Structure",
    title: "Explain, then connect",
    image: "/course-cover/blog-article-structure",
    text: "Use short sections, bullets, code ideas, interview prompts and links to courses or projects.",
  },
  {
    label: "Monetize",
    title: "Ads are controlled",
    image: "/course-cover/blog-ad-placement",
    text: "Top, mid and bottom placements are ready for AdSense without breaking reading flow.",
  },
] as const;

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

            <aside className="lp-hero-card home-hero-image-card" aria-label="Article system">
              <img src="/course-cover/daily-systems-articles" alt="Daily systems articles cover" />
              <div className="lp-card-body">
                <span className="course-badge">Daily publishing ready</span>
                <h2>One post every day</h2>
                <p>Article schema, RSS, internal links and ad slots are ready for a daily publishing habit.</p>
              </div>
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
            {workflowCards.map((card) => (
              <article className="lp-card image-course-card" key={card.title}>
                <img className="course-card-image" src={card.image} alt={`${card.title} cover`} loading="lazy" />
                <div className="lp-card-body">
                  <span className="course-badge">{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container blog-index" aria-labelledby="latest-posts-heading">
          <div className="blog-index-heading">
            <h2 id="latest-posts-heading">Latest articles</h2>
            <span>{posts.length} published</span>
          </div>

          {posts.length > 0 ? (
            <div className="blog-list image-blog-list">
              {posts.map((post, index) => (
                <Fragment key={post.slug}>
                  {index === 2 ? (
                    <AdSlot slot={blogFeedAdSlot} className="ad-slot-leaderboard" />
                  ) : null}
                  <Link className="blog-list-item image-course-card" href={`/blog/${post.slug}`}>
                    <img className="content-tile-image" src={`/course-cover/${post.slug}`} alt={`${post.title} cover`} loading="lazy" />
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
            <div className="lp-card image-course-card">
              <img className="course-card-image" src="/course-cover/no-articles-yet" alt="Article library cover" />
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

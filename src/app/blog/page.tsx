import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — C++, HFT, EDA and Systems Notes",
  description:
    "cppvalley blog posts on C++, HFT, EDA software, low latency, systems design and interview preparation.",
  alternates: { canonical: "/blog" },
  keywords: [
    "C++ blog",
    "HFT engineering blog",
    "low latency C++ notes",
    "EDA software blog",
    "systems interview preparation"
  ],
  openGraph: {
    title: "cppvalley Blog",
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
  const [featuredPost, ...otherPosts] = posts;
  const topics = Array.from(new Set(posts.flatMap((post) => post.topics ?? []))).slice(0, 10);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "cppvalley Blog",
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
    <div className="blog-page lp-page modern-page market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="blog-main lp-main">
        <section className="market-page-hero">
          <div className="site-container">
            <div className="market-hero-copy">
              <p className="lp-kicker">Engineering notes</p>
              <h1>Blog deep dives</h1>
              <p>Read technical notes as companion lessons to the courses: low latency, C++, HFT systems, EDA software and interview preparation.</p>
            </div>
            <aside className="market-hero-panel">
              <strong>Use posts like course modules</strong>
              <ul>
                <li>Read one deep dive after the matching course topic.</li>
                <li>Turn the key ideas into interview answers.</li>
                <li>Use source boxes to track paper-based posts.</li>
              </ul>
            </aside>
          </div>
        </section>

        <div className="site-container market-topic-row" aria-label="Blog topics">
          {topics.map((topic) => <a href="#latest-posts-heading" key={topic}>{topic}</a>)}
        </div>

        <div className="site-container">
          <AdSlot slot={blogTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="site-container blog-index" aria-labelledby="latest-posts-heading">
          <div className="market-layout">
            <aside className="market-sidebar" aria-label="Blog reading guide">
              <div className="market-sidebar-section">
                <h3>Read by intent</h3>
                <ul>
                  <li>Architecture intuition</li>
                  <li>Low-latency design</li>
                  <li>Paper notes</li>
                  <li>Interview vocabulary</li>
                </ul>
              </div>
              <div className="market-sidebar-section">
                <h3>Best next step</h3>
                <ul>
                  <li>Open a course first</li>
                  <li>Read the related blog</li>
                  <li>Practice interviews</li>
                </ul>
              </div>
            </aside>

            <div className="market-content-column">
              <div className="market-section-head">
                <div>
                  <p className="lp-kicker">Latest posts</p>
                  <h2 id="latest-posts-heading">{posts.length} published notes</h2>
                  <p>Long-form articles are shown like marketplace lessons so students can choose what to read next.</p>
                </div>
              </div>

              {featuredPost ? (
                <Link className="market-featured-card" href={`/blog/${featuredPost.slug}`}>
                  <div className="market-card-body">
                    <span className="course-badge">Featured latest</span>
                    <h2>{featuredPost.title}</h2>
                    <p>{featuredPost.excerpt}</p>
                    <div className="market-card-meta">
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      {featuredPost.readingTime ? <span>{featuredPost.readingTime}</span> : null}
                      {featuredPost.topics?.length ? <span>{featuredPost.topics.join(" · ")}</span> : null}
                    </div>
                    <strong className="lp-link-text">Read post →</strong>
                  </div>
                  <div className="market-featured-art" aria-hidden="true" />
                </Link>
              ) : null}

              {posts.length > 0 ? (
                <div className="market-blog-list">
                  {otherPosts.map((post, index) => (
                    <Fragment key={post.slug}>
                      {index === 1 ? (
                        <AdSlot slot={blogFeedAdSlot} className="ad-slot-leaderboard" />
                      ) : null}
                      <Link className="market-blog-card" href={`/blog/${post.slug}`}>
                        <div className="market-card-thumb">
                          <div>
                            <span>{formatDate(post.publishedAt)}</span>
                            <strong>{post.readingTime ?? "Blog note"}</strong>
                          </div>
                        </div>
                        <div className="market-card-body">
                          <span className="course-card-eyebrow">Engineering note</span>
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          {post.topics?.length ? (
                            <div className="market-card-meta">
                              {post.topics.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
                            </div>
                          ) : null}
                        </div>
                        <div className="market-card-action">Read →</div>
                      </Link>
                    </Fragment>
                  ))}
                </div>
              ) : (
                <div className="market-note-card">
                  <span className="course-badge">Coming soon</span>
                  <h3>No blog posts published yet.</h3>
                  <p>Deep engineering notes are being added gradually.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

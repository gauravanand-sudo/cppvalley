import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { blogHeroImage, heroImages, imageForBlog } from "@/data/media";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form cppvalley notes on C++, HFT, low latency, EDA and systems engineering.",
  alternates: { canonical: "/blog" },
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
  const topics = Array.from(new Set(posts.flatMap((post) => post.topics ?? [])));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "cppvalley Blog",
    description: "Long-form notes on C++ and systems engineering.",
    url: "https://cppvalley.com/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `https://cppvalley.com/blog/${post.slug}`,
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero resources-hero image-page-hero">
          <div className="site-container resources-hero-grid">
            <div>
              <div className="page-hero-badge">Engineering resources</div>
              <h1 className="page-title">Learn the idea.<br />Then learn the trade-off.</h1>
              <p>Deep-dive notes on C++, performance, low latency, HFT and systems design. Written to be useful when you come back six months later.</p>
              {topics.length ? (
                <div className="topic-strip" aria-label="Blog topics">
                  {topics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
              ) : null}
            </div>
            <div className="resources-hero-media" aria-hidden="true">
              <img className="resources-hero-main" src={blogHeroImage} alt="" />
              <img src={heroImages[1]} alt="" />
            </div>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={blogTopAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="section">
          <div className="site-container">
            {featuredPost ? (
              <Link className="feature-card feature-card-wide image-feature-card" href={`/blog/${featuredPost.slug}`}>
                <img className="feature-card-image" src={imageForBlog(featuredPost.slug)} alt="" />
                <div className="feature-card-overlay" />
                <div className="feature-card-content">
                  <div className="resource-badge">Featured note</div>
                  <div className="meta-row">
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                    {featuredPost.readingTime ? <span>{featuredPost.readingTime}</span> : null}
                  </div>
                  <h3>{featuredPost.title}</h3>
                  <p>{featuredPost.excerpt}</p>
                  {featuredPost.topics?.length ? (
                    <div className="tag-row">
                      {featuredPost.topics.map((topic) => <span className="tag" key={topic}>{topic}</span>)}
                    </div>
                  ) : null}
                  <span className="resource-link">Read note →</span>
                </div>
              </Link>
            ) : <div className="empty-state">No posts published yet.</div>}

            {otherPosts.length ? (
              <div className="blog-list image-blog-list">
                {otherPosts.map((post, index) => (
                  <Fragment key={post.slug}>
                    {index === 1 ? <AdSlot slot={blogFeedAdSlot} className="ad-slot-leaderboard" /> : null}
                    <Link className="blog-list-card image-blog-list-card" href={`/blog/${post.slug}`}>
                      <img className="blog-list-image" src={imageForBlog(post.slug)} alt="" loading="lazy" />
                      <div>
                        <div className="meta-row">
                          <span>{formatDate(post.publishedAt)}</span>
                          {post.readingTime ? <span>{post.readingTime}</span> : null}
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                      </div>
                      <span className="arrow" aria-hidden="true">Read →</span>
                    </Link>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

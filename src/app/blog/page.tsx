import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { BlogLibrary } from "@/components/BlogLibrary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { blogHeroImage, heroImages } from "@/data/media";

export const metadata: Metadata = {
  title: "C++ & Systems Engineering Blog",
  description: "Long-form cppvalley notes on C++, concurrency, HFT, low latency, EDA and systems engineering.",
  alternates: {canonical: "/blog"},
};
const blogTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_TOP_SLOT;
const blogFeedAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_FEED_SLOT;

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const teasers = posts.map(({slug,title,excerpt,publishedAt,readingTime,topics}) => ({slug,title,excerpt,publishedAt,readingTime,topics}));
  const structuredData = {
    "@context": "https://schema.org", "@type": "Blog", name: "cppvalley Blog",
    url: "https://cppvalley.com/blog", blogPost: posts.map(post => ({
      "@type": "BlogPosting", headline: post.title, description: post.excerpt,
      datePublished: post.publishedAt, url: "https://cppvalley.com/blog/" + post.slug
    }))
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
      <SiteHeader />
      <main className="page-main">
        <section className="g-catalog-hero g-blog-hero">
          <div className="site-container g-catalog-hero-layout">
            <div><div className="g-breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Blog</strong></div><span className="g-pill">THE ENGINEERING JOURNAL</span>
              <h1>Ideas worth <span>understanding deeply.</span></h1>
              <p>Research breakdowns, performance explorations and learning roadmaps. Carefully written notes to return to when the next systems problem gets complicated.</p>
              <div className="g-catalog-facts"><span>✓ Long-form explanations</span><span>✓ Real references</span><span>✓ Practical takeaways</span></div>
            </div>
            <div className="g-catalog-art" aria-hidden="true"><img src={blogHeroImage} alt="" /><img src={heroImages[1]} alt="" /></div>
          </div>
        </section>
        <div className="site-container"><AdSlot slot={blogTopAdSlot} className="ad-slot-leaderboard" /></div>
        <section className="g-section g-catalog-section">
          <div className="site-container">
            <div className="g-section-header"><div><p className="g-section-kicker">LATEST ENGINEERING NOTES</p><h2>Explore the journal</h2><p>Search a topic, filter by subject or read the newest research-based explanation.</p></div></div>
            <BlogLibrary posts={teasers}/>
            <AdSlot slot={blogFeedAdSlot} className="ad-slot-leaderboard"/>
          </div>
        </section>
        <section className="g-bottom-cta"><div className="site-container"><div><p className="g-section-kicker">LEARNING DOESN'T END HERE</p><h2>Turn technical notes into practical depth.</h2><p>Discover our structured courses in C++, systems engineering and low latency.</p></div><Link href="/courses" className="g-button g-button-white">Explore courses →</Link></div></section>
      </main>
      <SiteFooter/>
    </div>
  );
}
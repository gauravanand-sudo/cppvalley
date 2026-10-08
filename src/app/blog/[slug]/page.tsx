import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { MdxArticle, getMdxHeadings } from "@/components/MdxArticle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, blogPostsBySlug } from "@/data/blog";
import { imageForBlog } from "@/data/media";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

const blogArticleTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_ARTICLE_TOP_SLOT;
const blogArticleBottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_ARTICLE_BOTTOM_SLOT;

const sourceNotes: Record<string, { title: string; author: string; date: string; note: string }> = {
  "cpp-hft-actor-messaging-fast-send-3370ns-to-30ns": {
    title: "Adapting the Actor Model of Concurrency for High-Frequency Trading: Synchronous Message Delivery (fast_send) and a Tick-to-Book Latency Study",
    author: "Vincent Maciejewski",
    date: "September 2026",
    note: "This post explains the paper's reported measurements and architecture at a student-friendly level. Treat the benchmark numbers as workload-specific, not universal performance guarantees.",
  },
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug.get(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.topics,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      images: [{ url: `/blog/${post.slug}/opengraph-image`, alt: post.title }],
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug.get(slug);
  if (!post) notFound();

  const headings = getMdxHeadings(post.mdx).slice(0, 28);
  const source = sourceNotes[post.slug];
  const sortedPosts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const currentIndex = sortedPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = sortedPosts[currentIndex + 1];
  const nextPost = sortedPosts[currentIndex - 1];
  const relatedPosts = sortedPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => !post.topics?.length || !item.topics?.length || item.topics.some((topic) => post.topics?.includes(topic)))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    url: `https://cppvalley.com/blog/${post.slug}`,
    author: { "@type": "Organization", name: "cppvalley", url: "https://cppvalley.com" },
    publisher: { "@type": "Organization", name: "cppvalley", url: "https://cppvalley.com" },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main className="page-main">
        <div className="site-container article-shell">
          <div>
            <Link className="text-link" href="/blog">← Blog</Link>
            <header className="article-header" style={{ marginTop: 28 }}>
              <p className="eyebrow">Engineering note</p>
              <h1>{post.title}</h1>
              <p className="article-deck">{post.excerpt}</p>
              <div className="article-meta">
                <span>{formatDate(post.publishedAt)}</span>
                {post.readingTime ? <span>{post.readingTime}</span> : null}
                {post.topics?.length ? <span>{post.topics.join(" · ")}</span> : null}
              </div>
              <figure className="article-hero-image">
                <img src={imageForBlog(post.slug)} alt="" />
                <figcaption>Systems engineering visual · cppvalley</figcaption>
              </figure>
            </header>

            <AdSlot slot={blogArticleTopAdSlot} className="ad-slot-leaderboard" />
            <MdxArticle source={post.mdx} />

            {source ? (
              <aside className="article-source-box" aria-label="Source note">
                <span className="kicker">Source</span>
                <strong>{source.title}</strong>
                <p>{source.author} · {source.date}</p>
                <p>{source.note}</p>
              </aside>
            ) : null}

            <AdSlot slot={blogArticleBottomAdSlot} className="ad-slot-leaderboard" />

            <nav className="article-nav" aria-label="Article navigation">
              {previousPost ? <Link href={`/blog/${previousPost.slug}`}>← {previousPost.title}</Link> : <span />}
              {nextPost ? <Link href={`/blog/${nextPost.slug}`}>{nextPost.title} →</Link> : <span />}
            </nav>

            {relatedPosts.length ? (
              <section className="related-posts">
                <h2>Keep reading</h2>
                {relatedPosts.map((related) => (
                  <Link className="related-link related-link-image" href={`/blog/${related.slug}`} key={related.slug}>
                    <img src={imageForBlog(related.slug)} alt="" loading="lazy" />
                    <span>{related.title} →</span>
                  </Link>
                ))}
              </section>
            ) : null}
          </div>

          <aside className="article-aside">
            {headings.length ? (
              <nav className="article-toc" aria-label="On this page">
                <strong>On this page</strong>
                {headings.map((heading) => (
                  <a className={heading.level === 3 ? "toc-indent" : undefined} href={`#${heading.id}`} key={`${heading.id}-${heading.text}`}>
                    {heading.text}
                  </a>
                ))}
              </nav>
            ) : null}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

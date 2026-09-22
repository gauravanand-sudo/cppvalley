import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { BlogEngagement } from "@/components/BlogEngagement";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, blogPostsBySlug } from "@/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const blogArticleTopAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_ARTICLE_TOP_SLOT;
const blogArticleMidAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_ARTICLE_MID_SLOT;
const blogArticleBottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_ARTICLE_BOTTOM_SLOT;

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

  const sortedPosts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const currentIndex = sortedPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = sortedPosts[currentIndex + 1];
  const nextPost = sortedPosts[currentIndex - 1];
  const relatedPosts = sortedPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!post.topics?.length || !item.topics?.length) return true;
      return item.topics.some((topic) => post.topics?.includes(topic));
    })
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Articles", item: "https://cppvalley.com/blog" },
          { "@type": "ListItem", position: 2, name: post.title, item: `https://cppvalley.com/blog/${post.slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        inLanguage: "en",
        isAccessibleForFree: true,
        url: `https://cppvalley.com/blog/${post.slug}`,
        mainEntityOfPage: `https://cppvalley.com/blog/${post.slug}`,
        keywords: post.topics?.join(", "),
        author: {
          "@type": "Organization",
          name: "cppvalley",
          url: "https://cppvalley.com",
        },
        publisher: {
          "@type": "Organization",
          name: "cppvalley",
          url: "https://cppvalley.com",
        },
      },
    ],
  };

  return (
    <div className="blog-post-page lp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader />

      <main className="blog-post-main lp-main">
        <div className="site-container blog-post-shell content-with-sidebar">
          <div className="content-main-column">
            <nav className="blog-post-breadcrumb lp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/blog">Articles</Link>
              <span>/</span>
              <span>{post.title}</span>
            </nav>

            <header className="blog-post-hero">
              <p className="blog-post-kicker lp-kicker">cppvalley engineering note</p>
              <h1>{post.title}</h1>
              <p className="blog-post-deck">{post.excerpt}</p>
              <div className="blog-post-meta">
                <span>{formatDate(post.publishedAt)}</span>
                {post.readingTime ? <span>{post.readingTime}</span> : null}
                {post.topics?.length ? <span>{post.topics.join(" · ")}</span> : null}
              </div>
            </header>

            <AdSlot slot={blogArticleTopAdSlot} className="ad-slot-leaderboard" />

            <article className="blog-article optimized-article">
              {post.sections.map((section, index) => (
                <Fragment key={`${post.slug}-${index}`}>
                  <section>
                    {section.heading ? <h2>{section.heading}</h2> : null}
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets?.length ? (
                      <ul>
                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    ) : null}
                  </section>
                  {index === 0 ? (
                    <AdSlot slot={blogArticleMidAdSlot} className="ad-slot-inarticle ad-article-wrap" />
                  ) : null}
                </Fragment>
              ))}
            </article>

            <AdSlot slot={blogArticleBottomAdSlot} className="ad-slot-leaderboard" />

            <nav className="article-prev-next" aria-label="Article navigation">
              {previousPost ? <Link href={`/blog/${previousPost.slug}`}>← {previousPost.title}</Link> : <span />}
              {nextPost ? <Link href={`/blog/${nextPost.slug}`}>{nextPost.title} →</Link> : <span />}
            </nav>

            <BlogEngagement
              slug={post.slug}
              title={post.title}
              issueNumber={post.discussionIssue}
            />

            <Link className="blog-back" href="/blog">← Back to all articles</Link>
          </div>

          <aside className="content-sidebar article-sidebar">
            <div className="lp-card">
              <div className="lp-card-body">
                <span className="course-badge">Continue learning</span>
                <h3>Related cppvalley paths</h3>
                <div className="related-link-list">
                  <Link href="/courses">Course catalog</Link>
                  <Link href="/interviews">Interview questions</Link>
                  <Link href="/projects">Project labs</Link>
                  <Link href="/youtube">Video courses</Link>
                </div>
              </div>
            </div>

            {relatedPosts.length ? (
              <div className="lp-card">
                <div className="lp-card-body">
                  <span className="course-badge">Related articles</span>
                  <div className="related-link-list">
                    {relatedPosts.map((related) => (
                      <Link href={`/blog/${related.slug}`} key={related.slug}>{related.title}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

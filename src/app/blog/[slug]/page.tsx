import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEngagement } from "@/components/BlogEngagement";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, blogPostsBySlug } from "@/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `https://cppvalley.com/blog/${post.slug}`,
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
  };

  return (
    <div className="blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <SiteHeader />

      <main className="blog-post-main">
        <div className="site-container blog-post-shell">
          <nav className="blog-post-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link> / {post.title}
          </nav>

          <header className="blog-post-hero">
            <p className="blog-post-kicker">cppvalley engineering note</p>
            <h1>{post.title}</h1>
            <p className="blog-post-deck">{post.excerpt}</p>
            <div className="blog-post-meta">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime ? <span>{post.readingTime}</span> : null}
              {post.topics?.length ? <span>{post.topics.join(" · ")}</span> : null}
            </div>
          </header>

          <article className="blog-article">
            {post.sections.map((section, index) => (
              <section key={`${post.slug}-${index}`}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <BlogEngagement
            slug={post.slug}
            title={post.title}
            issueNumber={post.discussionIssue}
          />

          <Link className="blog-back" href="/blog">← Back to all notes</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

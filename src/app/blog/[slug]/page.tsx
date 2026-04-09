import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MdxRenderer from "@/components/MdxRenderer";
import { requireContent } from "@/lib/content";
import Link from "next/link";
import GoogleAdSlot from "@/components/GoogleAdSlot";
import BlogComments from "@/components/BlogComments";
import { getBlogViewCount } from "@/lib/blogViews";
import BlogArticleToolbar from "@/components/BlogArticleToolbar";
import BlogThemeShell from "@/components/BlogThemeShell";

const BLOG_TOP_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_TOP;
const BLOG_RAIL_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_RAIL;

function formatDate(date?: string) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = requireContent("blog", slug);
  const viewCount = await getBlogViewCount(slug);

  return (
    <>
      <SiteHeader />
      <BlogThemeShell>
        <main
          id="blog-top-anchor"
          className="relative"
          style={{
            backgroundColor: "var(--blog-bg)",
            color: "var(--blog-heading)",
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl"
              style={{ backgroundColor: "var(--blog-bg-glow-left)" }}
            />
            <div
              className="absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-3xl"
              style={{ backgroundColor: "var(--blog-bg-glow-right)" }}
            />
          </div>

          <div className="relative mx-auto max-w-[1320px] px-6 py-12">
            <div className="flex flex-col gap-10 xl:flex-row xl:items-start">
              <div className="min-w-0 flex-1 xl:max-w-[820px]">
                <GoogleAdSlot
                  slot={BLOG_TOP_AD_SLOT}
                  className="mb-8"
                  label="Sponsored"
                />

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm font-mono hover:opacity-80"
                  style={{ color: "var(--blog-accent)" }}
                >
                  ← blog
                </Link>

                <header className="mt-8 pb-8" style={{ borderBottom: "1px solid var(--blog-border)" }}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: "var(--blog-muted)" }}>
                    cppvalley journal
                  </div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--blog-heading)" }}>
                    {meta.title}
                  </h1>

                  {meta.description && (
                    <p className="mt-5 max-w-3xl text-lg leading-8" style={{ color: "var(--blog-body)" }}>
                      {meta.description}
                    </p>
                  )}

                  {(meta.date || meta.tags?.length) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {meta.date && (
                        <span
                          className="rounded-full px-3 py-1 text-xs font-mono"
                          style={{
                            border: "1px solid var(--blog-border)",
                            backgroundColor: "var(--blog-surface-soft)",
                            color: "var(--blog-muted)",
                          }}
                        >
                          {formatDate(meta.date)}
                        </span>
                      )}
                      {meta.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-3 py-1 text-xs font-mono"
                          style={{
                            border: "1px solid var(--blog-border)",
                            backgroundColor: "var(--blog-chip-bg)",
                            color: "var(--blog-accent)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div className="mt-5 flex justify-end xl:mt-0">
                  <BlogArticleToolbar slug={slug} initialViewCount={viewCount} />
                </div>

                <article
                  id="mdx-article"
                  className="mt-8 rounded-[2rem] px-6 py-8 shadow-sm sm:px-10 sm:py-10"
                  style={{ backgroundColor: "var(--blog-surface)" }}
                >
                  <MdxRenderer source={content} />
                </article>

                <div
                  id="blog-end-anchor"
                  className="mt-16 flex items-center justify-between pt-6"
                  style={{ borderTop: "1px solid var(--blog-border)" }}
                >
                  <Link
                    href="/blog"
                    className="text-sm font-mono hover:opacity-80"
                    style={{ color: "var(--blog-muted)" }}
                  >
                    ← All blog posts
                  </Link>

                  <span className="text-sm font-mono" style={{ color: "var(--blog-muted)" }}>
                    cppvalley · systems-first
                  </span>
                </div>
              </div>

              <div className="xl:w-[340px] xl:shrink-0">
                <div className="xl:sticky xl:top-24 space-y-6">
                  <BlogComments postSlug={slug} />
                  <GoogleAdSlot
                    slot={BLOG_RAIL_AD_SLOT}
                    label="Sponsored"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </BlogThemeShell>

      <SiteFooter />
    </>
  );
}

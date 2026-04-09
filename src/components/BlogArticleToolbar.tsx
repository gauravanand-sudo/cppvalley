"use client";

import BlogViewCount from "@/components/BlogViewCount";
import { useBlogTheme } from "@/components/BlogThemeShell";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function BlogArticleToolbar({
  slug,
  initialViewCount,
}: {
  slug: string;
  initialViewCount: number;
}) {
  const { theme, toggleTheme } = useBlogTheme();

  return (
    <div className="z-[70] lg:fixed lg:right-6 lg:top-[86px] xl:right-10">
      <div
        className="inline-flex flex-wrap items-center gap-1.5 rounded-full px-2 py-1.5 shadow-[0_8px_24px_rgba(74,31,44,0.06)] backdrop-blur-md"
        style={{
          border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--blog-surface) 62%, transparent)",
        }}
      >
        <div className="px-1.5 text-[11px] font-mono" style={{ color: "var(--blog-muted)" }}>
          <BlogViewCount slug={slug} initialCount={initialViewCount} track />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToId("blog-top-anchor")}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--blog-surface) 48%, transparent)",
              color: "var(--blog-accent)",
            }}
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => scrollToId("mdx-article")}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--blog-surface) 48%, transparent)",
              color: "var(--blog-accent)",
            }}
          >
            Article
          </button>
          <button
            type="button"
            onClick={() => scrollToId("blog-comments-panel")}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--blog-surface) 48%, transparent)",
              color: "var(--blog-accent)",
            }}
          >
            Comments
          </button>
          <button
            type="button"
            onClick={() => scrollToId("blog-end-anchor")}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--blog-surface) 48%, transparent)",
              color: "var(--blog-accent)",
            }}
          >
            Bottom
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--blog-border) 78%, transparent)",
              backgroundColor: "color-mix(in srgb, var(--blog-accent-soft) 92%, transparent)",
              color: "var(--blog-accent)",
            }}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </div>
  );
}

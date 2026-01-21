"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; text: string; level: number };

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function OnThisPage({
  containerId = "mdx-article",
}: {
  containerId?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );

    const toc: TocItem[] = headings
      .map((h) => {
        const text = (h.textContent || "").trim();
        if (!text) return null;

        // Ensure each heading has an id (works regardless of rehype-slug)
        if (!h.id) h.id = slugify(text);

        return {
          id: h.id,
          text,
          level: h.tagName === "H2" ? 2 : 3,
        } as TocItem;
      })
      .filter(Boolean) as TocItem[];

    setItems(toc);

    if (toc.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [containerId]);

  const has = useMemo(() => items.length > 0, [items.length]);
  if (!has) return null;

  return (
    <aside className="hidden lg:block w-64">
      <div className="sticky top-[92px] rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4">
        <div className="text-xs font-mono text-gray-500">ON THIS PAGE</div>

        <nav className="mt-3 space-y-1">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={[
                "block text-sm transition",
                it.level === 3 ? "pl-3" : "",
                it.id === activeId
                  ? "text-cyan-700 font-semibold"
                  : "text-gray-600 hover:text-gray-900",
              ].join(" ")}
            >
              {it.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

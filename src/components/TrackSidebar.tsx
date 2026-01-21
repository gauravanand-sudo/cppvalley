// src/components/TrackSidebar.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Lock, Search } from "lucide-react";

type Access = "free" | "premium" | "paid";

type Leaf = { title: string; slug: string; access: Access };
type Node = { title: string; access: Access; children: Leaf[] };
type TrackItem = Leaf | Node;
type TrackSection = { title: string; items: TrackItem[] };

function isNode(it: TrackItem): it is Node {
  return (it as any)?.children && Array.isArray((it as any).children);
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export default function TrackSidebar({
  trackSlug,
  sections,
}: {
  trackSlug: string;
  sections: TrackSection[];
}) {
  const pathname = usePathname();
  const currentLessonSlug = pathname.split("/").pop() || "";
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = normalize(q);
    if (!query) return sections;

    const out: TrackSection[] = [];
    for (const sec of sections || []) {
      const items: TrackItem[] = [];

      for (const it of sec.items || []) {
        if (isNode(it)) {
          const kids = (it.children || []).filter((c) =>
            normalize(c.title).includes(query)
          );
          if (normalize(it.title).includes(query) || kids.length > 0) {
            items.push({ ...it, children: kids.length ? kids : it.children });
          }
        } else {
          if (normalize(it.title).includes(query)) items.push(it);
        }
      }

      if (items.length) out.push({ ...sec, items });
    }
    return out;
  }, [sections, q]);

  const Row = ({
    title,
    slug,
    access,
    indent = false,
  }: {
    title: string;
    slug: string;
    access: Access;
    indent?: boolean;
  }) => {
    const active = slug === currentLessonSlug;
    const locked = access !== "free";

    const href = locked
  ? `/pricing?track=${encodeURIComponent(trackSlug)}`
  : `/learn/tracks/${trackSlug}/${slug}`;

    return (
      <Link
        href={href}
        className={[
          "group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition",
          indent ? "pl-7" : "",
          active
            ? "bg-cyan-50 border border-cyan-200 text-gray-900"
            : "hover:bg-gray-50 text-gray-800",
        ].join(" ")}
      >
        <div className="min-w-0 flex items-center gap-2">
          <span
            className={[
              "h-2 w-2 rounded-full",
              active ? "bg-cyan-600" : "bg-gray-300 group-hover:bg-gray-400",
            ].join(" ")}
          />
          <span className="truncate">{title}</span>
        </div>

        {locked ? (
          <Lock className="h-4 w-4 text-amber-500 shrink-0" />
        ) : null}
      </Link>
    );
  };

  return (
    <div className="p-4">
      {/* search */}
      <div className="sticky top-0 z-10 bg-white pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search in this track…"
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      {/* syllabus */}
      <div className="space-y-5">
        {(filtered || []).map((sec) => (
          <div key={sec.title} className="space-y-2">
            <div className="px-1 text-[11px] font-mono uppercase tracking-wider text-gray-500">
              {sec.title}
            </div>

            <div className="space-y-1">
              {(sec.items || []).map((it, idx) => {
                if (isNode(it)) {
                  return (
                    <div key={it.title + idx} className="space-y-1">
                      <div className="px-2 pt-2 text-xs font-semibold text-gray-700">
                        {it.title}
                      </div>
                      <div className="space-y-1">
                        {(it.children || []).map((c) => (
                          <Row
                            key={c.slug}
                            title={c.title}
                            slug={c.slug}
                            access={c.access}
                            indent
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Row
                    key={(it as Leaf).slug}
                    title={(it as Leaf).title}
                    slug={(it as Leaf).slug}
                    access={(it as Leaf).access}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

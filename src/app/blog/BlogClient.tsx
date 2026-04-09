"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ContentMeta } from "@/lib/content";
import GoogleAdSlot from "@/components/GoogleAdSlot";
import BlogViewCount from "@/components/BlogViewCount";

const BLOG_HERO_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_HERO;
const BLOG_SECTION_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_SECTION;
const BLOG_LEFT_RAIL_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_LEFT_RAIL;
const BLOG_RIGHT_RAIL_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BLOG_RIGHT_RAIL;

function getYear(date?: string) {
  if (!date) return "Unknown";
  const d = new Date(date);
  const y = d.getFullYear();
  return Number.isFinite(y) ? String(y) : "Unknown";
}

function relevanceScore(tags?: string[]) {
  const t = (tags ?? []).map((x) => x.toLowerCase());
  const keywords = [
    "c++",
    "systems",
    "performance",
    "memory",
    "concurrency",
    "templates",
    "allocators",
    "cache",
    "low-latency",
    "low latency",
    "lock-free",
    "interviews",
  ];
  let score = 0;
  for (const k of keywords) if (t.includes(k)) score++;
  if (score >= 7) return 3;
  if (score >= 3) return 2;
  if (score >= 1) return 1;
  return 0;
}

function RelevancePips({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={[
            "h-1.5 w-4 rounded-full border",
            i < score
              ? "border-[#9B1C3A] bg-[#9B1C3A]"
              : "border-[#E2D8DC] bg-[#F5EEF1]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function BlogClient({
  posts,
  viewCounts,
}: {
  posts: ContentMeta[];
  viewCounts: Record<string, number>;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return posts;

    return posts.filter((it) => {
      const hay = [
        it.title,
        it.description ?? "",
        it.slug,
        ...(it.tags ?? []),
        it.date ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [posts, q]);

  const grouped = useMemo(() => {
    const g: Record<string, ContentMeta[]> = {};
    for (const it of filtered) {
      const year = getYear(it.date);
      (g[year] ||= []).push(it);
    }
    return g;
  }, [filtered]);

  const years = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => {
      if (a === "Unknown") return 1;
      if (b === "Unknown") return -1;
      return Number(b) - Number(a);
    });
  }, [grouped]);

  return (
    <main className="relative bg-[#F7F4F2] text-[#1A1215]">
      <div className="pointer-events-none absolute inset-0">
        <div className="-top-40 -left-40 absolute h-96 w-96 rounded-full bg-[#D9B4C0]/20 blur-3xl" />
        <div className="top-1/2 -right-40 absolute h-96 w-96 rounded-full bg-[#EADFE4]/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)_240px]">
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <GoogleAdSlot
                slot={BLOG_LEFT_RAIL_AD_SLOT}
                label="Sponsored"
              />
            </div>
          </aside>

          <div className="min-w-0">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  cppvalley Blog
                </h1>
                <p className="mt-3 text-[#7A6068]">
                  Systems-first C++ writing on performance, memory, concurrency, and real interview depth.
                </p>
              </div>

              <div className="w-full rounded-2xl border border-[#E2D8DC] bg-white/80 px-4 py-3 backdrop-blur sm:w-[320px]">
                <div className="text-xs font-mono text-[#8A7078]">SEARCH</div>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="title, tag, year..."
                  className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-[#B09AA2]"
                />
              </div>
            </header>

            <GoogleAdSlot
              slot={BLOG_HERO_AD_SLOT}
              className="mt-8"
              label="Sponsored"
            />

            <div className="mt-10 space-y-6">
              {years.map((year, index) => (
                <div key={year}>
                  <details
                    open={q !== "" || year === years[0]}
                    className="rounded-2xl border border-[#E2D8DC] bg-white/80 backdrop-blur"
                  >
                    <summary className="flex cursor-pointer list-none justify-between px-5 py-4">
                      <div className="font-semibold">{year}</div>
                      <div className="text-xs font-mono text-[#8A7078]">
                        {grouped[year].length} posts
                      </div>
                    </summary>

                    <div className="grid gap-4 px-5 pb-5">
                      {grouped[year].map((item) => {
                        const score = relevanceScore(item.tags);
                        return (
                          <Link
                            key={item.slug}
                            href={`/blog/${item.slug}`}
                            className="group rounded-xl border border-[#E2D8DC] bg-white px-5 py-4 transition hover:border-[#D5BEC7] hover:shadow-sm"
                          >
                            <div className="flex justify-between gap-6">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h2 className="font-semibold group-hover:text-[#7A203A]">
                                    {item.title}
                                  </h2>
                                  <RelevancePips score={score} />
                                </div>

                                {item.description && (
                                  <p className="mt-2 text-sm text-[#7A6068]">
                                    {item.description}
                                  </p>
                                )}

                                <div className="mt-3 text-[11px] font-mono text-[#9A8890]">
                                  <BlogViewCount
                                    slug={item.slug}
                                    initialCount={viewCounts[item.slug] ?? 0}
                                  />
                                </div>
                              </div>
                              <span className="text-[#B09AA2] group-hover:text-[#7A203A]">
                                →
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </details>

                  {(index === 0 || index % 2 === 1) && (
                    <GoogleAdSlot
                      slot={BLOG_SECTION_AD_SLOT}
                      className="mt-6"
                      label="Sponsored"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <GoogleAdSlot
                slot={BLOG_RIGHT_RAIL_AD_SLOT}
                label="Sponsored"
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

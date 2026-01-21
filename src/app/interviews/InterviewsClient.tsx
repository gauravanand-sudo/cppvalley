"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ContentMeta } from "@/lib/content";

function getYear(date?: string) {
  if (!date) return "Unknown";
  const d = new Date(date);
  const y = d.getFullYear();
  return Number.isFinite(y) ? String(y) : "Unknown";
}

// Tag-driven relevance (no per-post config)
function relevanceScore(tags?: string[]) {
  const t = (tags ?? []).map((x) => x.toLowerCase());
  const keywords = [
    "eda",
    "hft",
    "systems",
    "low-latency",
    "latency",
    "concurrency",
    "memory",
    "abi",
    "performance",
    "lock-free",
    "allocator",
    "cache",
    "numa",
    "debugging",
    "kernel",
    "simulation",
    "interview",
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
              ? "bg-cyan-600 border-cyan-600"
              : "bg-gray-100 border-gray-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function InterviewsClient({ posts }: { posts: ContentMeta[] }) {
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
    // newest first inside group
    for (const y of Object.keys(g)) {
      g[y].sort((a, b) => ((a.date ?? "") < (b.date ?? "") ? 1 : -1));
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
    <main className="relative bg-white text-gray-900">
      {/* abstract background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Interview Experiences</h1>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Real interview experiences from EDA, HFT, and systems roles — curated into MDX notes.
            </p>
          </div>

          <div className="w-full sm:w-[320px]">
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-3">
              <div className="text-xs font-mono text-gray-500">SEARCH</div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="title, tag, company, year..."
                className="mt-2 w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </header>

        <div className="mt-10 space-y-6">
          {years.map((year) => (
            <details
              key={year}
              open={q.trim() !== "" ? true : year === years[0]}
              className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur"
            >
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-cyan-600/70" />
                  <div className="text-lg font-semibold">{year}</div>
                  <div className="text-xs font-mono text-gray-500">
                    {grouped[year]?.length ?? 0} post{(grouped[year]?.length ?? 0) === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="text-sm font-mono text-gray-400">toggle</div>
              </summary>

              <div className="px-5 pb-5 grid gap-4">
                {grouped[year].map((item) => {
                  const score = relevanceScore(item.tags);
                  return (
                    <Link
                      key={item.slug}
                      href={`/interviews/${item.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:border-cyan-300 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <h2 className="text-base font-semibold truncate group-hover:text-cyan-700 transition-colors">
                              {item.title}
                            </h2>
                            <RelevancePips score={score} />
                          </div>

                          {item.description && (
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.date && (
                              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                                {item.date}
                              </span>
                            )}
                            {item.tags?.slice(0, 10).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-mono text-cyan-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-sm font-mono text-gray-400 group-hover:text-cyan-600 transition-colors">
                          →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </details>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-6 py-12 text-center text-gray-600">
              No matching interview posts.
            </div>
          )}
        </div>

        <div className="mt-14 border-t border-gray-200 pt-6 text-sm font-mono text-gray-400">
          cppvalley · interviews · mdx-powered
        </div>
      </div>
    </main>
  );
}

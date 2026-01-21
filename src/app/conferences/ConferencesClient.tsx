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
    "kernel",
    "simulation",
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

export default function ConferencesClient({
  posts,
}: {
  posts: ContentMeta[];
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
    <main className="relative bg-white text-gray-900">
      {/* abstract background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="-top-40 -left-40 absolute h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="top-1/2 -right-40 absolute h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              C++ Conferences
            </h1>
            <p className="mt-3 text-gray-600">
              MDX-powered conference summaries with systems-level interview
              relevance.
            </p>
          </div>

          <div className="w-full sm:w-[320px] rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-3">
            <div className="text-xs font-mono text-gray-500">SEARCH</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="title, tag, year..."
              className="mt-2 w-full bg-transparent outline-none text-sm"
            />
          </div>
        </header>

        <div className="mt-10 space-y-6">
          {years.map((year) => (
            <details
              key={year}
              open={q !== "" || year === years[0]}
              className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur"
            >
              <summary className="cursor-pointer list-none px-5 py-4 flex justify-between">
                <div className="font-semibold">{year}</div>
                <div className="text-xs font-mono text-gray-500">
                  {grouped[year].length} posts
                </div>
              </summary>

              <div className="px-5 pb-5 grid gap-4">
                {grouped[year].map((item) => {
                  const score = relevanceScore(item.tags);
                  return (
                    <Link
                      key={item.slug}
                      href={`/conferences/${item.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-cyan-300 hover:shadow-sm transition"
                    >
                      <div className="flex justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3">
                            <h2 className="font-semibold group-hover:text-cyan-700">
                              {item.title}
                            </h2>
                            <RelevancePips score={score} />
                          </div>

                          {item.description && (
                            <p className="mt-2 text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-400 group-hover:text-cyan-600">
                          →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

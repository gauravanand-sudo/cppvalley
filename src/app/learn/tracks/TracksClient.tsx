"use client";

import Link from "next/link";
import type { TrackMeta } from "@/lib/content";

function formatPrice(p?: number) {
  if (!p || p <= 0) return "Free";
  return `₹${p.toLocaleString("en-IN")}`;
}

function isTrackLive(live: any) {
  return !(live === false || live === "false" || live === 0 || live === "0");
}

export default function TracksClient({ tracks }: { tracks: TrackMeta[] }) {
  const sorted = [...tracks].sort((a, b) => (a.title > b.title ? 1 : -1));

  return (
    <main className="relative bg-white text-gray-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">Tracks</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Pick a track → open the track intro → then start reading. Coming-soon
            tracks are visible but disabled.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((t) => {
            const live = isTrackLive((t as any).live);
            const price =
              typeof (t as any).price === "number" ? (t as any).price : undefined;

            const CardInner = (
              <div
                className={[
                  // fixed height cards
                  "h-[340px] rounded-2xl border bg-white/70 backdrop-blur p-6 transition",
                  "flex flex-col",
                  live
                    ? "border-gray-200 hover:border-cyan-300 hover:shadow-sm"
                    : "border-gray-200 opacity-70",
                ].join(" ")}
              >
                {/* TOP */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                      {t.title}
                    </h2>
                    {t.level ? (
                      <span className="text-xs font-mono text-gray-500">
                        {t.level}
                      </span>
                    ) : null}
                  </div>

                  {t.description ? (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {t.description}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-4">
                      A systems-first track. Open intro to view syllabus and start.
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.duration ? (
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                        {t.duration}
                      </span>
                    ) : null}

                    {t.lessonCount ? (
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                        {t.lessonCount} lessons
                      </span>
                    ) : null}

                    {typeof price === "number" ? (
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono text-gray-600">
                        {formatPrice(price)}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* SPACER */}
                <div className="flex-1" />

                {/* BOTTOM */}
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-3">
                  <div className="text-sm font-mono text-gray-500">
                    {live ? (t.access?.toUpperCase?.() ?? "FREE") : "COMING SOON"}
                  </div>

                  {live ? (
                    <div className="flex items-center gap-2">

                      <span className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition">
                        Open →
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">

                      <button
                        disabled
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );

            return live ? (
              <Link
                key={t.slug}
                href={`/learn/tracks/${t.slug}`}
                className="block"
              >
                {CardInner}
              </Link>
            ) : (
              <div key={t.slug}>{CardInner}</div>
            );
          })}
        </div>

        <div className="mt-16 border-t border-gray-200 pt-6 text-sm font-mono text-gray-400">
          cppvalley · tracks · mdx-driven
        </div>
      </div>
    </main>
  );
}

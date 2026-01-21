"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { TrackMeta } from "@/lib/content";

function formatPrice(p?: number) {
  if (!p || p <= 0) return "Free";
  return `₹${p.toLocaleString("en-IN")}`;
}

function isTrackLive(live: any) {
  return !(live === false || live === "false" || live === 0 || live === "0");
}

export default function PricingClient({ tracks }: { tracks: TrackMeta[] }) {
  const params = useSearchParams();
  const focusSlug = params.get("track");

  const sorted = useMemo(() => {
    const list = [...tracks].sort((a, b) => (a.title > b.title ? 1 : -1));
    if (!focusSlug) return list;
    const idx = list.findIndex((t) => t.slug === focusSlug);
    if (idx <= 0) return list;
    const [picked] = list.splice(idx, 1);
    return [picked, ...list];
  }, [tracks, focusSlug]);

  return (
    <main className="relative bg-white text-gray-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Pay per track. If you arrived here from a premium track, that track is pinned on top.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((t) => {
            const live = isTrackLive((t as any).live);
            const price =
              typeof (t as any).price === "number" ? (t as any).price : undefined;
            const paid = (price ?? 0) > 0;
            const focused = !!focusSlug && t.slug === focusSlug;

            return (
              <div
                key={t.slug}
                className={[
                  "h-[340px] rounded-2xl border bg-white/70 backdrop-blur p-6 transition flex flex-col",
                  focused ? "border-cyan-300 shadow-sm" : "border-gray-200",
                  live ? "hover:border-cyan-300 hover:shadow-sm" : "opacity-70",
                ].join(" ")}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                      {t.title}
                    </h2>
                    {t.level ? (
                      <span className="text-xs font-mono text-gray-500">{t.level}</span>
                    ) : null}
                  </div>

                  {t.description ? (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {t.description}
                    </p>
                  ) : null}

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

                <div className="flex-1" />

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-cyan-700">
                    {typeof price === "number" ? formatPrice(price) : "—"}
                  </div>

                  <div className="flex items-center gap-2">
                    {live ? (
                      <>
                        <Link
                          href={`/learn/tracks/${t.slug}`}
                          className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                          View
                        </Link>

                        {paid ? (
                          <button
                            onClick={() => alert(`Purchase flow for "${t.title}" coming soon`)}
                            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
                          >
                            Purchase
                          </button>
                        ) : (
                          <Link
                            href={`/learn/tracks/${t.slug}`}
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                          >
                            Start
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          disabled
                          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                        >
                          View
                        </button>
                        <button
                          disabled
                          className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed"
                        >
                          Coming Soon
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 border-t border-gray-200 pt-6 text-sm font-mono text-gray-400">
          cppvalley · pricing · consolidated purchase hub
        </div>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, ChevronRight } from "lucide-react";
import type { TrackMeta } from "@/lib/content";
import { trackRequiresPurchase } from "@/lib/trackAccess";

export default function TracksClient({
  tracks,
  purchasedTrackSlugs,
}: {
  tracks: TrackMeta[];
  purchasedTrackSlugs: string[];
}) {
  const sorted = [...tracks].sort((a, b) => {
    if (a.live && !b.live) return -1;
    if (!a.live && b.live) return 1;
    return a.title > b.title ? 1 : -1;
  });
  const purchased = new Set(purchasedTrackSlugs);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#4A1F2C_0%,#181215_42%,#130F12_100%)] text-[#F6EDF0]">
      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#D46886]">
            Learning Courses
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            Everything you need. Structured.
          </h1>
          <p className="max-w-xl leading-relaxed text-[#CFB8C0]">
            Deep reading guides and structured C++ internals content for the systems interviews and engineering roles that actually matter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((t) => {
            const live = t.live !== false;
            const requiresPurchase = trackRequiresPurchase(t);
            const unlocked = !requiresPurchase || purchased.has(t.slug);
            const primaryHref = unlocked ? `/learn/tracks/${t.slug}` : `/checkout?track=${encodeURIComponent(t.slug)}`;

            if (live) {
              return (
                <article
                  key={t.slug}
                  className="group flex h-full min-h-[420px] flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {t.duration && (
                        <span className="text-xs font-mono text-[#B996A2]">
                          {t.duration}
                        </span>
                      )}
                      {t.level && (
                        <>
                          {t.duration && <span className="text-xs text-white/15">·</span>}
                          <span className="text-xs text-[#B996A2]">{t.level}</span>
                        </>
                      )}
                    </div>
                    <span className="rounded-full border border-[#D46886]/25 bg-[#D46886]/12 px-2.5 py-1 text-xs font-semibold text-[#F2C8D5]">
                      {requiresPurchase ? (unlocked ? "Purchased" : "Paid") : "Free"}
                    </span>
                  </div>

                  {/* Title + description */}
                  <Link href={primaryHref} className="flex flex-1 flex-col">
                    <div className="relative mb-4 aspect-[16/8] overflow-hidden rounded-xl border border-white/10 bg-[#20181C]">
                      {t.thumbnail ? (
                        <Image
                          src={t.thumbnail}
                          alt={t.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#2A1E24,#161114)]">
                          <div className="rounded-full bg-[#9B1C3A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                            cppvalley
                          </div>
                        </div>
                      )}
                    </div>
                    <h2 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-[#F2C8D5]">
                      {t.title}
                    </h2>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#CCB5BC]">
                      {t.description ?? "A systems-first course. Open to view syllabus and start."}
                    </p>
                  </Link>

                  {/* Tags */}
                  <div className="mt-4 min-h-[32px]">
                    {t.tags && t.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-0.5 text-xs text-[#BA9CA5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Bottom actions */}
                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                    <Link
                      href={primaryHref}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#D6BBC4] transition-colors hover:text-white"
                    >
                      {unlocked ? "Open course" : "Purchase"} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    {t.lessonCount && (
                      <span className="ml-auto text-xs font-mono text-[#9F7E89]">
                        {t.lessonCount} lessons
                      </span>
                    )}
                  </div>
                </article>
              );
            }

            // Not live
            return (
              <article
                key={t.slug}
                className="flex h-full min-h-[420px] cursor-not-allowed select-none flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 opacity-55"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {t.duration && (
                      <span className="text-xs font-mono text-[#B996A2]">{t.duration}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#B996A2]" />
                    <span className="text-xs text-[#B996A2]">Launching soon</span>
                  </div>
                </div>
                <div className="relative mb-4 aspect-[16/8] overflow-hidden rounded-xl border border-white/10 bg-[#20181C]">
                  {t.thumbnail ? (
                    <Image
                      src={t.thumbnail}
                      alt={t.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#2A1E24,#161114)]">
                      <div className="rounded-full bg-[#9B1C3A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                        cppvalley
                      </div>
                    </div>
                  )}
                </div>
                <h2 className="mb-2 text-base font-semibold text-[#E6D3D9]">{t.title}</h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#B996A2]">
                  {t.description ?? "Coming soon."}
                </p>
                <div className="mt-4 min-h-[32px]" />
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <div className="text-sm font-semibold text-[#B996A2]">Launching soon</div>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#D6BBC4]">
                    Soon
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-16 text-xs font-mono text-[#8F717B]">
          cppvalley · courses · mdx-driven
        </p>
      </div>
    </main>
  );
}

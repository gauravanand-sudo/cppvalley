"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, ChevronRight } from "lucide-react";
import type { TrackMeta } from "@/lib/content";
import { trackRequiresPurchase } from "@/lib/trackAccess";
import GoogleAdSlot from "@/components/GoogleAdSlot";

const COURSE_HUB_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_COURSE_HUB;

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
    <main className="min-h-screen bg-[#F7F4F2] text-[#1A1215]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9B6070]">
            Learning Courses
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#1A1215]">
            Everything you need. Structured.
          </h1>
          <p className="max-w-xl leading-relaxed text-[#7A6068]">
            Deep reading guides and structured C++ internals content for the systems interviews and engineering roles that actually matter.
          </p>
        </div>

        <GoogleAdSlot
          slot={COURSE_HUB_AD_SLOT}
          className="mb-8"
          label="Sponsored"
        />

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {sorted.map((t) => {
            const live = t.live !== false;
            const requiresPurchase = trackRequiresPurchase(t);
            const unlocked = !requiresPurchase || purchased.has(t.slug);
            const primaryHref = unlocked ? `/learn/tracks/${t.slug}` : `/checkout?track=${encodeURIComponent(t.slug)}`;

            if (live) {
              return (
                <article
                  key={t.slug}
                  className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.5rem] border border-[#E2D8DC] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Top row */}
                  <Link href={primaryHref} className="flex flex-1 flex-col">
                    <div className="relative flex h-36 flex-col justify-between overflow-hidden bg-[#1E1418] p-5">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#9B1C3A]/30 blur-3xl" />
                      {t.thumbnail ? (
                        <Image
                          src={t.thumbnail}
                          alt={t.title}
                          fill
                          className="object-cover opacity-70"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,#2A1E24,#161114)]" />
                      )}
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {t.duration && (
                            <span className="text-xs font-mono text-white/70">
                              {t.duration}
                            </span>
                          )}
                          {t.level && (
                            <>
                              {t.duration && <span className="text-xs text-white/20">·</span>}
                              <span className="text-xs text-white/70">{t.level}</span>
                            </>
                          )}
                        </div>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                          {requiresPurchase ? (unlocked ? "Purchased" : "Paid") : "Free"}
                        </span>
                      </div>
                      <div className="relative z-10 self-start rounded-full bg-[#9B1C3A] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                        cppvalley
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h2 className="mb-2 text-lg font-bold text-[#1A1215] transition-colors group-hover:text-[#6E2136]">
                        {t.title}
                      </h2>
                      <p className="line-clamp-3 text-sm leading-6 text-[#7A6068]">
                        {t.description ?? "A systems-first course. Open to view syllabus and start."}
                      </p>

                      <div className="mt-4 min-h-[32px]">
                        {t.tags && t.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {t.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#E2D8DC] bg-[#F7F4F2] px-2.5 py-0.5 text-xs text-[#8A7078]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center gap-3 border-t border-[#EEE4E8] pt-5">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#7A5060] transition-colors group-hover:text-[#5A4048]">
                          {unlocked ? "Open course" : "Purchase"} <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                        {t.lessonCount && (
                          <span className="ml-auto text-xs font-mono text-[#9A8890]">
                            {t.lessonCount} lessons
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              );
            }

            // Not live
            return (
              <article
                key={t.slug}
                className="flex h-full min-h-[420px] cursor-not-allowed select-none flex-col overflow-hidden rounded-[1.5rem] border border-[#E2D8DC] bg-white p-6 opacity-55"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {t.duration && (
                      <span className="text-xs font-mono text-[#8A7078]">{t.duration}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#8A7078]" />
                    <span className="text-xs text-[#8A7078]">Launching soon</span>
                  </div>
                </div>
                <div className="relative mb-4 aspect-[16/8] overflow-hidden rounded-xl border border-[#E2D8DC] bg-[#20181C]">
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
                <h2 className="mb-2 text-base font-semibold text-[#3A2830]">{t.title}</h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#8A7078]">
                  {t.description ?? "Coming soon."}
                </p>
                <div className="mt-4 min-h-[32px]" />
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EEE4E8] pt-5">
                  <div className="text-sm font-semibold text-[#8A7078]">Launching soon</div>
                  <span className="inline-flex items-center rounded-full border border-[#E2D8DC] bg-[#F7F4F2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#7A5060]">
                    Soon
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <GoogleAdSlot
          slot={COURSE_HUB_AD_SLOT}
          className="mt-10"
          label="Sponsored"
        />

        <p className="mt-16 text-xs font-mono text-[#9A8890]">
          cppvalley · courses · mdx-driven
        </p>
      </div>
    </main>
  );
}

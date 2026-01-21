// src/components/TrackReaderShell.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Lock, Search, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

type Access = "free" | "premium" | "paid";

type TrackSyllabusItem =
  | { title: string; slug: string; access: Access }
  | {
      title: string;
      access: Access;
      children: { title: string; slug: string; access: Access }[];
    };

type TrackSection = {
  title: string;
  items: TrackSyllabusItem[];
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function calcScrollPercent(el: HTMLElement | null) {
  if (!el) return 0;
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return 0;
  return clamp(el.scrollTop / max, 0, 1);
}

function ProgressRing({ value }: { value: number }) {
  // 0..1
  const pct = clamp(value, 0, 1);
  const size = 26;
  const r = 11;
  const c = 2 * Math.PI * r;
  const dash = c * pct;

  return (
    <svg width={size} height={size} viewBox="0 0 26 26" className="shrink-0">
      <circle
        cx="13"
        cy="13"
        r={r}
        fill="none"
        stroke="rgba(15, 23, 42, 0.12)"
        strokeWidth="2.5"
      />
      <circle
        cx="13"
        cy="13"
        r={r}
        fill="none"
        stroke="rgba(6, 182, 212, 0.95)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform="rotate(-90 13 13)"
      />
    </svg>
  );
}

function flattenLessonSlugs(sections: TrackSection[]) {
  const out: string[] = [];
  for (const sec of sections) {
    for (const it of sec.items as any[]) {
      if (it?.children && Array.isArray(it.children)) {
        for (const c of it.children) if (c?.slug) out.push(c.slug);
      } else if (it?.slug) out.push(it.slug);
    }
  }
  // preserve order; remove duplicates
  return Array.from(new Set(out));
}

export default function TrackReaderShell({
  trackSlug,
  trackTitle,
  lessonSlug,
  lessonTitle,
  sections,
  canAccessPremium,
  children,
}: {
  trackSlug: string;
  trackTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  sections: TrackSection[];
  canAccessPremium: boolean;
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<Session | null>(null);

  // keep session in sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));

    return () => subscription.unsubscribe();
  }, [supabase]);

  const userKey = session?.user?.email || "anon";

  const ordered = useMemo(() => flattenLessonSlugs(sections), [sections]);
  const idx = Math.max(0, ordered.indexOf(lessonSlug));
  const prevSlug = idx > 0 ? ordered[idx - 1] : null;
  const nextSlug = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const [query, setQuery] = useState("");
  const rightRef = useRef<HTMLDivElement | null>(null);

  // scroll progress (0..1)
  const storageKey = `cppvalley:scroll:${userKey}:${trackSlug}:${lessonSlug}`;
  const [progress, setProgress] = useState(0);

  // restore scroll + progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const v = Number(raw);
        if (!Number.isNaN(v)) setProgress(clamp(v, 0, 1));
      }
    } catch {}
    // restore scrollTop too (nice UX)
    try {
      const rawTop = localStorage.getItem(`${storageKey}:top`);
      const top = rawTop ? Number(rawTop) : 0;
      if (rightRef.current && !Number.isNaN(top)) {
        rightRef.current.scrollTop = clamp(
          top,
          0,
          rightRef.current.scrollHeight
        );
      }
    } catch {}
  }, [storageKey]);

  // track scroll continuously
  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const p = calcScrollPercent(el);
        setProgress(p);
        try {
          localStorage.setItem(storageKey, String(p));
          localStorage.setItem(`${storageKey}:top`, String(el.scrollTop));
        } catch {}
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // init
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [storageKey]);

  // NOTE: removed old next-auth based progress endpoint call (/api/progress/last).
  // We'll re-add progress tracking later using Supabase if desired.

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    const match = (s: string) => s.toLowerCase().includes(q);

    return sections
      .map((sec) => {
        const items: TrackSyllabusItem[] = [];

        for (const it of sec.items) {
          // module
          if ((it as any).children) {
            const mod = it as any;
            const childHits = (mod.children as any[]).filter(
              (c) => match(c.title) || match(c.slug)
            );
            if (match(mod.title) || childHits.length > 0) {
              items.push({
                title: mod.title,
                access: mod.access,
                children: childHits.length ? childHits : mod.children,
              } as any);
            }
          } else {
            const leaf = it as any;
            if (match(leaf.title) || match(leaf.slug)) items.push(it);
          }
        }

        return { ...sec, items };
      })
      .filter((s) => s.items.length > 0);
  }, [sections, query]);

  return (
    <div className="h-[100dvh] bg-white text-gray-900">
      <div className="grid h-full grid-cols-[320px_1fr]">
        {/* LEFT SIDEBAR */}
        <aside className="border-r border-gray-200 bg-white">
          <div className="flex h-full flex-col">
            {/* left top - brand (height aligned with top bar) */}
            <div className="h-12 border-b border-gray-200 px-4 flex items-center">
              <Link
                href="/"
                className="font-mono tracking-wide text-gray-900 hover:text-cyan-700 transition"
              >
                <span className="text-cyan-600">cpp</span>valley
                <span className="text-cyan-600">_</span>
              </Link>
            </div>

            {/* search */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search in this track…"
                  className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>

            {/* scrollable syllabus */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-4">
                {filteredSections.map((sec) => (
                  <div key={sec.title}>
                    <div className="px-2 text-xs font-mono uppercase tracking-wide text-gray-500">
                      {sec.title}
                    </div>

                    <div className="mt-2 space-y-1">
                      {sec.items.map((it: any, i: number) => {
                        // module
                        if (it.children) {
                          return (
                            <div key={`${sec.title}-${i}`} className="mt-3">
                              <div className="px-2 text-[12px] font-semibold text-gray-800 flex items-center gap-2">
                                <span>{it.title}</span>
                                {it.access !== "free" && !canAccessPremium && (
                                  <Lock className="h-3.5 w-3.5 text-cyan-600" />
                                )}
                              </div>

                              <div className="mt-1 space-y-1">
                                {it.children.map((c: any) => {
                                  const isCurrent = c.slug === lessonSlug;
                                  const locked =
                                    c.access !== "free" && !canAccessPremium;

                                  return (
                                    <Link
                                      key={c.slug}
                                      href={
                                        locked
                                          ? `/pricing?track=${trackSlug}`
                                          : `/learn/tracks/${trackSlug}/${c.slug}`
                                      }
                                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                                        isCurrent
                                          ? "bg-cyan-50 text-cyan-800 font-medium"
                                          : "text-gray-700 hover:bg-gray-50"
                                      }`}
                                    >
                                      <div
                                        className={`h-1.5 w-1.5 rounded-full ${
                                          isCurrent
                                            ? "bg-cyan-600"
                                            : "bg-gray-300"
                                        }`}
                                      />
                                      <span className="truncate">{c.title}</span>
                                      {locked && (
                                        <Lock className="ml-auto h-4 w-4 text-cyan-600" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // leaf
                        const isCurrent = it.slug === lessonSlug;
                        const locked = it.access !== "free" && !canAccessPremium;

                        return (
                          <Link
                            key={it.slug}
                            href={
                              locked
                                ? `/pricing?track=${trackSlug}`
                                : `/learn/tracks/${trackSlug}/${it.slug}`
                            }
                            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                              isCurrent
                                ? "bg-cyan-50 text-cyan-800 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`h-1.5 w-1.5 rounded-full ${
                                isCurrent ? "bg-cyan-600" : "bg-gray-300"
                              }`}
                            />
                            <span className="truncate">{it.title}</span>
                            {locked && (
                              <Lock className="ml-auto h-4 w-4 text-cyan-600" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* left bottom - auth/status (height aligned with bottom bar) */}
            <div className="h-12 border-t border-gray-200 px-4 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500 truncate">
                {session?.user?.email ? `signed in` : `guest`}
              </span>
              <Link
                href="/pricing"
                className="text-xs font-mono text-cyan-700 hover:text-cyan-800"
              >
                upgrade →
              </Link>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="min-w-0 bg-white">
          <div className="flex h-full flex-col">
            {/* top bar (aligned height with left brand bar) */}
            <div className="h-12 border-b border-gray-200 bg-white/80 backdrop-blur">
              <div className="h-full px-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[12px] font-mono text-gray-500 truncate">
                    {trackTitle}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {lessonTitle}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ProgressRing value={progress} />
                </div>
              </div>
            </div>

            {/* scrollable lesson body */}
            <div
              ref={rightRef}
              className="min-h-0 flex-1 overflow-y-auto px-5 py-6"
            >
              <div className="mx-auto w-full max-w-3xl">
                {/* subtle top abstract glow (same feel as conference/interview) */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                  <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
                </div>

                <article className="prose prose-gray max-w-none">
                  {children}
                </article>
              </div>
            </div>

            {/* bottom nav (aligned height with left bottom bar) */}
            <div className="h-12 border-t border-gray-200 bg-white/80 backdrop-blur">
              <div className="h-full px-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {prevSlug ? (
                    <Link
                      href={`/learn/tracks/${trackSlug}/${prevSlug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50 transition"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-gray-500">
                  {idx + 1}/{Math.max(1, ordered.length)}
                </div>

                <div className="flex items-center gap-2">
                  {nextSlug ? (
                    <Link
                      href={`/learn/tracks/${trackSlug}/${nextSlug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}

                  {progress > 0.98 && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-mono text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      done
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

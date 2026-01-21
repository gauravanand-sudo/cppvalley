// src/components/LessonContentWrapper.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AnyItem = { title: string; slug?: string; children?: AnyItem[] };
type Section = { title: string; items: AnyItem[] };
type FlatLesson = { title: string; slug: string };

function flatten(items: AnyItem[], out: FlatLesson[] = []) {
  for (const it of items) {
    if (it.slug) out.push({ title: it.title, slug: it.slug });
    if (Array.isArray(it.children)) flatten(it.children, out);
  }
  return out;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

/* ring (no text inside) */
function CircleProgress({ value }: { value: number }) {
  const size = 26;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (clamp(value) / 100) * c;

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(15, 23, 42, 0.12)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(6, 182, 212, 0.95)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export default function LessonContentWrapper({
  children,
  trackSlug,
  sections,
  trackTitle,
}: {
  children: React.ReactNode;
  trackSlug: string;
  sections: Section[];
  trackTitle?: string;
}) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const isLessonPage = !!pathname.match(/\/learn\/tracks\/[^\/]+\/[^\/]+$/);
  const currentSlug = pathname.split("/").pop() || "";

  const lessons = useMemo(() => {
    const safe = Array.isArray(sections) ? sections : [];
    return flatten(safe.flatMap((s) => s.items || []));
  }, [sections]);

  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  const currentTitle =
    isLessonPage && currentIndex >= 0 ? lessons[currentIndex].title : "Overview";

  const prev = isLessonPage && currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next =
    isLessonPage && currentIndex >= 0 && currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  const firstLesson = lessons[0]?.slug || null;

  /* scroll progress */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        setProgress(100);
        return;
      }
      const pct = (el.scrollTop / max) * 100;
      setProgress(clamp(pct));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [currentSlug]);

  return (
    <div className="h-full min-h-0 flex flex-col bg-white">
      {/* TOP BAR (aligned to left) */}
      <div className="h-12 border-b border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur">
        <div className="h-full px-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[12px] font-mono text-gray-500 truncate">
              {trackTitle || trackSlug}
            </div>
            <div className="text-sm font-semibold text-gray-900 truncate">
              {isLessonPage ? currentTitle : "Track Overview"}
            </div>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
    <Link href="/learn/tracks" className="text-gray-600 hover:text-gray-900">Tracks</Link>
    <Link href="/interviews" className="text-gray-600 hover:text-gray-900">Interviews</Link>
    <Link href="/conferences" className="text-gray-600 hover:text-gray-900">Conferences</Link>
    <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
  </nav>

          <div className="flex items-center gap-3">
            {isLessonPage ? (
              <div className="text-xs font-mono text-gray-500">
                {Math.max(1, currentIndex + 1)}/{Math.max(1, lessons.length)}
              </div>
            ) : null}
            <CircleProgress value={progress} />
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto bg-white">
        {/* same abstract feel as conference/interview */}
        <div className="relative px-5 py-6">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="mx-auto w-full max-w-3xl">
            <div className="prose prose-gray max-w-none">{children}</div>
            <div className="h-10" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR (aligned to left) */}
      <div className="h-12 border-t border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur">
        <div className="h-full px-5 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            {isLessonPage ? (
              prev ? (
                <Link
                  href={`/learn/tracks/${trackSlug}/${prev.slug}`}
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
              )
            ) : (
              <Link
                href="/learn/tracks"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50 transition"
              >
                ← Back
              </Link>
            )}
          </div>

          {/* MIDDLE */}
          <div className="text-xs font-mono text-gray-500">
            {isLessonPage ? `${currentIndex + 1}/${Math.max(1, lessons.length)}` : ""}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {isLessonPage ? (
              next ? (
                <Link
                  href={`/learn/tracks/${trackSlug}/${next.slug}`}
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
              )
            ) : firstLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${firstLesson}`}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
              >
                Start reading
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

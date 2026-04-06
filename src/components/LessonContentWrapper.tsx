// src/components/LessonContentWrapper.tsx
"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
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

export default function LessonContentWrapper({
  children,
  trackSlug,
  sections,
  canAccessTrack,
}: {
  children: React.ReactNode;
  trackSlug: string;
  sections: Section[];
  canAccessTrack: boolean;
}) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isLessonPage = !!pathname.match(/\/learn\/tracks\/[^\/]+\/[^\/]+$/);
  const currentSlug = pathname.split("/").pop() || "";

  const lessons = useMemo(() => {
    const safe = Array.isArray(sections) ? sections : [];
    return flatten(safe.flatMap((s) => s.items || []));
  }, [sections]);

  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);
  const prev = isLessonPage && currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next = isLessonPage && currentIndex >= 0 && currentIndex < lessons.length - 1
    ? lessons[currentIndex + 1] : null;
  const firstLesson = lessons[0]?.slug || null;
  const purchaseHref = `/checkout?track=${encodeURIComponent(trackSlug)}`;

  return (
      <div
        className="flex h-full min-h-0 flex-col"
        style={{ backgroundColor: "var(--reader-bg)", color: "var(--reader-body)" }}
      >
      {/* ── Scrollable content ── */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-5 py-3 sm:px-6 sm:py-4">
          {children}
          <div className="h-4" />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex h-11 flex-shrink-0 items-center justify-between border-t px-4 backdrop-blur sm:px-5"
        style={{
          borderColor: "var(--reader-border)",
          backgroundColor: "color-mix(in srgb, var(--reader-surface) 82%, transparent)",
        }}
      >

        {/* Prev */}
        {isLessonPage ? (
          prev ? (
            <Link
              href={`/learn/tracks/${trackSlug}/${prev.slug}`}
              className="inline-flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: "var(--reader-body)" }}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--reader-muted)" }}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </span>
          )
        ) : (
          <Link
            href="/learn/tracks"
            className="text-sm transition-colors"
            style={{ color: "var(--reader-body)" }}
          >
            ← All courses
          </Link>
        )}

        {/* Center — lesson count */}
        <span className="text-xs font-mono" style={{ color: "var(--reader-muted)" }}>
          {isLessonPage ? `${currentIndex + 1} / ${Math.max(1, lessons.length)}` : ""}
        </span>

        {/* Next */}
        {isLessonPage ? (
          next ? (
            <Link
              href={`/learn/tracks/${trackSlug}/${next.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--reader-accent)" }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--reader-muted)" }}>
              Next
              <ChevronRight className="h-4 w-4" />
            </span>
          )
        ) : firstLesson ? (
          <Link
            href={canAccessTrack ? `/learn/tracks/${trackSlug}/${firstLesson}` : purchaseHref}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--reader-accent)" }}
          >
            {canAccessTrack ? "Start reading" : "Purchase course"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}

      </div>
      </div>
  );
}

// src/components/TrackLayout.tsx
"use client";

import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderAuthButton from "@/components/HeaderAuthButton";
import ReaderThemeProvider, { ReaderThemeToggle } from "@/components/ReaderThemeProvider";
import MarkComplete from "@/components/MarkComplete";
import { Menu, X } from "lucide-react";

type AnyItem = { title: string; slug?: string; children?: AnyItem[] };
type Section = { title: string; items: AnyItem[] };

function flatten(items: AnyItem[], out: { title: string; slug: string }[] = []) {
  for (const it of items) {
    if (it.slug) out.push({ title: it.title, slug: it.slug });
    if (Array.isArray(it.children)) flatten(it.children, out);
  }
  return out;
}

export default function TrackLayout({
  children,
  sidebar,
  trackSlug,
  trackTitle,
  sections,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  trackSlug: string;
  trackTitle: string;
  sections: Section[];
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isLessonPage = !!pathname.match(/\/learn\/tracks\/[^\/]+\/[^\/]+$/);
  const currentSlug = pathname.split("/").pop() || "";
  const lessons = useMemo(() => flatten((sections || []).flatMap((s) => s.items || [])), [sections]);
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === currentSlug);
  const currentTitle = isLessonPage && currentIndex >= 0 ? lessons[currentIndex].title : "Course overview";

  return (
    <ReaderThemeProvider>
      <div
        className="h-screen overflow-hidden"
        style={{ backgroundColor: "var(--reader-bg)", color: "var(--reader-body)" }}
      >
        <div className="flex h-full min-h-0 flex-col">
          <header
            className="border-b px-3 py-2 sm:px-5"
            style={{
              borderColor: "var(--reader-border)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface) 96%, white) 0%, color-mix(in srgb, var(--reader-surface-soft) 94%, transparent) 100%)",
              boxShadow: "0 10px 24px color-mix(in srgb, black 4%, transparent)",
            }}
          >
            <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80">
                  <div className="flex items-center gap-2 rounded-full border px-2.5 py-1.5" style={{ borderColor: "var(--reader-border)", backgroundColor: "color-mix(in srgb, var(--reader-surface) 88%, transparent)" }}>
                    <span className="text-[13px] font-semibold tracking-tight" style={{ color: "var(--reader-heading)" }}>
                      <span style={{ color: "var(--reader-accent)" }}>cpp</span>
                      valley
                    </span>
                    <span
                      className="rounded border px-1.5 py-0.5 font-mono text-[9px]"
                      style={{
                        borderColor: "var(--reader-border)",
                        backgroundColor: "var(--reader-surface)",
                        color: "var(--reader-muted)",
                      }}
                    >
                      v0.1
                    </span>
                  </div>
                  <span
                    className="hidden rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] sm:inline"
                    style={{
                      borderColor: "color-mix(in srgb, var(--reader-accent) 35%, transparent)",
                      color: "var(--reader-accent)",
                      background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--reader-accent) 14%, transparent) 0%, color-mix(in srgb, var(--reader-accent) 7%, transparent) 100%)",
                      boxShadow:
                        "0 0 18px color-mix(in srgb, var(--reader-accent) 22%, transparent), inset 0 0 16px color-mix(in srgb, var(--reader-accent) 8%, transparent)",
                    }}
                  >
                    Zero to architect level
                  </span>
                </Link>

                <div
                  className="hidden h-6 w-px shrink-0 sm:block"
                  style={{ backgroundColor: "var(--reader-border)" }}
                />

                <div className="min-w-0">
                  <div className="truncate text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--reader-muted)" }}>
                    {trackTitle}
                  </div>
                  <div className="truncate text-[12px] font-medium leading-4" style={{ color: "var(--reader-heading)" }}>
                    {currentTitle}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-1.5">
                <Link
                  href="/"
                  className="inline-flex rounded-full border px-2.5 py-1.5 text-[10px] font-semibold transition hover:opacity-90 sm:text-[11px]"
                  style={{
                    borderColor: "var(--reader-border)",
                    backgroundColor: "color-mix(in srgb, var(--reader-surface) 88%, transparent)",
                    color: "var(--reader-body)",
                  }}
                >
                  Home
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold transition hover:opacity-90 sm:text-[11px] lg:hidden"
                  style={{
                    borderColor: "var(--reader-border)",
                    backgroundColor: "color-mix(in srgb, var(--reader-surface) 88%, transparent)",
                    color: "var(--reader-body)",
                  }}
                >
                  <Menu className="h-3.5 w-3.5" />
                  Syllabus
                </button>
                {isLessonPage ? (
                  <>
                    <span className="text-[11px] font-mono" style={{ color: "var(--reader-muted)" }}>
                      {Math.max(1, currentIndex + 1)}/{Math.max(1, lessons.length)}
                    </span>
                    <MarkComplete trackSlug={trackSlug} lessonSlug={currentSlug} compact />
                  </>
                ) : null}
                <Link
                  href="/learn/tracks"
                  className="rounded-full border px-2.5 py-1.5 text-[10px] font-semibold transition hover:opacity-90 sm:text-[11px]"
                  style={{
                    borderColor: "var(--reader-border)",
                    backgroundColor: "color-mix(in srgb, var(--reader-surface) 88%, transparent)",
                    color: "var(--reader-body)",
                  }}
                >
                  All courses
                </Link>
                <ReaderThemeToggle />
                <HeaderAuthButton />
              </div>
            </div>
          </header>

          <div className="flex min-h-0 flex-1">
            {mobileSidebarOpen ? (
              <div className="fixed inset-0 z-50 lg:hidden">
                <button
                  type="button"
                  aria-label="Close syllabus"
                  className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                <div
                  className="absolute inset-y-0 left-0 flex w-[88vw] max-w-sm flex-col border-r shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                  style={{
                    borderColor: "var(--reader-border)",
                    backgroundColor: "var(--reader-surface-soft)",
                  }}
                >
                  <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--reader-border)" }}>
                    <div>
                      <div
                        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--reader-muted)" }}
                      >
                        Course navigator
                      </div>
                      <div className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
                        {trackTitle}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Close syllabus"
                      onClick={() => setMobileSidebarOpen(false)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:opacity-90"
                      style={{
                        borderColor: "var(--reader-border)",
                        backgroundColor: "var(--reader-surface)",
                        color: "var(--reader-body)",
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto" onClick={() => setMobileSidebarOpen(false)}>
                    {sidebar}
                  </div>
                </div>
              </div>
            ) : null}

            <aside
              className="hidden min-h-0 w-[320px] flex-shrink-0 flex-col border-r lg:flex"
              style={{
                borderColor: "var(--reader-border)",
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface-soft) 96%, white) 0%, color-mix(in srgb, var(--reader-surface-soft) 82%, var(--reader-bg)) 100%)",
              }}
            >
              <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>

              <div
                className="flex min-h-[3rem] flex-shrink-0 items-center border-t px-4 py-1.5"
                style={{
                  borderColor: "var(--reader-border)",
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface) 84%, transparent) 0%, color-mix(in srgb, var(--reader-surface-soft) 92%, transparent) 100%)",
                  boxShadow: "0 -10px 24px color-mix(in srgb, black 4%, transparent)",
                }}
              >
                <Link
                  href="/learn/tracks"
                  className="text-[11px] font-medium transition-colors hover:opacity-80"
                  style={{ color: "var(--reader-muted)" }}
                >
                  ← All courses
                </Link>
              </div>
            </aside>

            <main
              className="min-h-0 min-w-0 flex-1"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface-soft) 35%, var(--reader-bg)) 0%, var(--reader-bg) 100%)",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </ReaderThemeProvider>
  );
}

// src/components/TrackSidebar.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Lock, Search } from "lucide-react";
import {
  emitProgressUpdate,
  getProgressAuthHeaders,
  loadLocalProgress,
  normalizeCompletedLessons,
  PROGRESS_EVENT,
  saveLocalProgress,
} from "@/lib/browserProgress";

type Access = "free" | "premium" | "paid";
type Leaf = { title: string; slug: string; access: Access };
type Node = { title: string; access: Access; children: Leaf[] };
type TrackItem = Leaf | Node;
type TrackSection = { title: string; items: TrackItem[] };

function isNode(it: TrackItem): it is Node {
  return "children" in it && Array.isArray(it.children);
}

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export function storageKey(trackSlug: string) {
  return `cppvalley:progress:${trackSlug}`;
}

export function loadCompleted(trackSlug: string): Set<string> {
  return new Set(loadLocalProgress(trackSlug).completedLessons);
}

export function saveCompleted(trackSlug: string, completed: Set<string>) {
  const snapshot = {
    completedLessons: [...completed],
    lastLessonSlug: loadLocalProgress(trackSlug).lastLessonSlug,
  };
  saveLocalProgress(trackSlug, snapshot);
  emitProgressUpdate(trackSlug, snapshot);
}

export default function TrackSidebar({
  trackSlug,
  sections,
  canAccessTrack,
  initialCompletedLessons = [],
  initialLastLessonSlug = null,
}: {
  trackSlug: string;
  sections: TrackSection[];
  canAccessTrack: boolean;
  initialCompletedLessons?: string[];
  initialLastLessonSlug?: string | null;
}) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";
  const [q, setQ] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    () => normalizeCompletedLessons(initialCompletedLessons)
  );
  const [lastLessonSlug, setLastLessonSlug] = useState<string | null>(
    () => initialLastLessonSlug ?? null
  );

  useEffect(() => {
    let active = true;
    let localSyncFrame: number | null = null;

    localSyncFrame = window.requestAnimationFrame(() => {
      const local = loadLocalProgress(trackSlug);
      if (local.completedLessons.length > 0) {
        setCompletedLessons(local.completedLessons);
      }
      if (local.lastLessonSlug) {
        setLastLessonSlug(local.lastLessonSlug);
      }
    });

    async function syncFromServer() {
      try {
        const headers = await getProgressAuthHeaders();
        const res = await fetch(`/api/progress?trackSlug=${encodeURIComponent(trackSlug)}`, {
          headers,
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        if (!active || !data?.authenticated) return;

        const snapshot = {
          completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
          lastLessonSlug:
            typeof data.lastLessonSlug === "string" && data.lastLessonSlug.trim().length > 0
              ? data.lastLessonSlug
              : null,
        };

        setCompletedLessons(snapshot.completedLessons);
        setLastLessonSlug(snapshot.lastLessonSlug);
        saveLocalProgress(trackSlug, snapshot);
      } catch {}
    }

    syncFromServer();

    const sync = (event: Event) => {
      const detail =
        event instanceof CustomEvent
          ? (event.detail as { trackSlug?: string; completedLessons?: string[]; lastLessonSlug?: string | null } | undefined)
          : undefined;

      if (detail?.trackSlug && detail.trackSlug !== trackSlug) return;

      if (detail?.completedLessons) {
        setCompletedLessons(detail.completedLessons);
      } else {
        setCompletedLessons(loadLocalProgress(trackSlug).completedLessons);
      }

      if (detail && "lastLessonSlug" in detail) {
        setLastLessonSlug(detail.lastLessonSlug ?? null);
      } else {
        setLastLessonSlug(loadLocalProgress(trackSlug).lastLessonSlug);
      }
    };

    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("focus", syncFromServer);
    return () => {
      active = false;
      if (localSyncFrame !== null) {
        window.cancelAnimationFrame(localSyncFrame);
      }
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("focus", syncFromServer);
    };
  }, [trackSlug]);

  const allSlugs = useMemo(() => {
    const slugs: string[] = [];
    for (const sec of sections || []) {
      for (const it of sec.items || []) {
        if (isNode(it)) it.children.forEach((c) => slugs.push(c.slug));
        else if ((it as Leaf).slug) slugs.push((it as Leaf).slug);
      }
    }
    return slugs;
  }, [sections]);

  const completed = new Set(completedLessons);
  const completedCount = allSlugs.filter((s) => completed.has(s)).length;
  const progressPct = allSlugs.length > 0
    ? Math.round((completedCount / allSlugs.length) * 100)
    : 0;

  const filtered = useMemo(() => {
    const query = normalize(q);
    if (!query) return sections;
    const out: TrackSection[] = [];
    for (const sec of sections || []) {
      const items: TrackItem[] = [];
      for (const it of sec.items || []) {
        if (isNode(it)) {
          const kids = it.children.filter((c) => normalize(c.title).includes(query));
          if (normalize(it.title).includes(query) || kids.length > 0)
            items.push({ ...it, children: kids.length ? kids : it.children });
        } else {
          if (normalize(it.title).includes(query)) items.push(it);
        }
      }
      if (items.length) out.push({ ...sec, items });
    }
    return out;
  }, [sections, q]);

  const LessonRow = ({ title, slug, indent = false }: {
    title: string; slug: string; indent?: boolean;
  }) => {
    const active = slug === currentSlug;
    const done = completed.has(slug);
    const isLastVisited = lastLessonSlug === slug;

    return (
      <Link
        href={canAccessTrack ? `/learn/tracks/${trackSlug}/${slug}` : `/checkout?track=${encodeURIComponent(trackSlug)}`}
        className={[
          "group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
          indent ? "pl-6" : "",
          active ? "font-medium" : "",
        ].join(" ")}
        style={{
          backgroundColor: active ? "var(--reader-accent-soft)" : "transparent",
          color: active ? "var(--reader-accent)" : "var(--reader-body)",
        }}
      >
        {done ? (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "var(--reader-accent)" }}>
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          </span>
        ) : (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full transition-colors"
            style={{
              backgroundColor: active ? "var(--reader-accent)" : "color-mix(in srgb, var(--reader-border) 80%, transparent)",
            }}
          />
        )}
        <span className={[
          "truncate leading-snug",
          done && !active ? "opacity-75" : "",
        ].join(" ")}>
          {title}
        </span>
        {isLastVisited && !active ? (
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: "var(--reader-accent-soft)",
              color: "var(--reader-accent)",
            }}
          >
            Resume
          </span>
        ) : null}
        {!canAccessTrack ? (
          <Lock className="ml-auto h-3.5 w-3.5 shrink-0" style={{ color: "var(--reader-accent)" }} />
        ) : null}
      </Link>
    );
  };

  return (
    <div className="p-4">

      {/* Progress */}
      {allSlugs.length > 0 && (
        <div
          className="mb-5 rounded-2xl border p-4 shadow-sm"
          style={{
            borderColor: "var(--reader-border)",
            backgroundColor: "var(--reader-surface)",
          }}
        >
          <div className="mb-1.5 flex justify-between text-xs" style={{ color: "var(--reader-muted)" }}>
            <span>{completedCount} / {allSlugs.length} completed</span>
            <span>{progressPct}%</span>
          </div>
          <div
            className="h-1.5 w-full rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--reader-accent) 14%, var(--reader-surface))" }}
          >
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, backgroundColor: "var(--reader-accent)" }}
            />
          </div>
        </div>
      )}

      {/* Search */}
      <div className="sticky top-0 z-10 pb-3" style={{ backgroundColor: "var(--reader-surface-soft)" }}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5" style={{ color: "var(--reader-muted)" }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lessons…"
            className="w-full rounded-xl border pl-8 pr-3 py-2 text-sm outline-none focus:ring-2"
            style={{
              borderColor: "var(--reader-border)",
              backgroundColor: "var(--reader-surface)",
              color: "var(--reader-heading)",
            }}
          />
        </div>
      </div>

      {/* Syllabus */}
      <div className="space-y-5">
        {(filtered || []).map((sec) => (
          <div key={sec.title} className="space-y-1">
            <div className="px-1 py-1 text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--reader-muted)" }}>
              {sec.title}
            </div>
            {(sec.items || []).map((it, idx) => {
              if (isNode(it)) {
                return (
                  <div key={it.title + idx} className="space-y-0.5">
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold" style={{ color: "var(--reader-muted)" }}>
                      {it.title}
                    </div>
                    {it.children.map((c) => (
                      <LessonRow key={c.slug} title={c.title} slug={c.slug} indent />
                    ))}
                  </div>
                );
              }
              return (
                <LessonRow
                  key={(it as Leaf).slug}
                  title={(it as Leaf).title}
                  slug={(it as Leaf).slug}
                />
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}

// src/components/MarkComplete.tsx
"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  emitProgressUpdate,
  getProgressAuthHeaders,
  loadLocalProgress,
  saveLocalProgress,
} from "@/lib/browserProgress";

export default function MarkComplete({
  trackSlug,
  lessonSlug,
  compact = false,
}: {
  trackSlug: string;
  lessonSlug: string;
  compact?: boolean;
}) {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    setMounted(true);
    const local = loadLocalProgress(trackSlug);
    setDone(local.completedLessons.includes(lessonSlug));

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

        const completedLessons = Array.isArray(data.completedLessons) ? data.completedLessons : [];
        const lastLessonSlug =
          typeof data.lastLessonSlug === "string" && data.lastLessonSlug.trim().length > 0
            ? data.lastLessonSlug
            : null;

        saveLocalProgress(trackSlug, { completedLessons, lastLessonSlug });
        setDone(completedLessons.includes(lessonSlug));
      } catch {}
    }

    syncFromServer();
    return () => {
      active = false;
    };
  }, [trackSlug, lessonSlug]);

  async function toggle() {
    const local = loadLocalProgress(trackSlug);
    const completed = new Set(local.completedLessons);
    const nextDone = !done;

    if (nextDone) {
      completed.add(lessonSlug);
    } else {
      completed.delete(lessonSlug);
    }

    const snapshot = {
      completedLessons: [...completed],
      lastLessonSlug: lessonSlug,
    };

    saveLocalProgress(trackSlug, snapshot);
    emitProgressUpdate(trackSlug, snapshot);
    setDone(nextDone);
    setSaving(true);

    try {
      const headers = await getProgressAuthHeaders();
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          trackSlug,
          lessonSlug,
          completed: nextDone,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) return;
        throw new Error("Unable to save progress");
      }

      const data = await res.json();
      const serverSnapshot = {
        completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : snapshot.completedLessons,
        lastLessonSlug:
          typeof data.lastLessonSlug === "string" && data.lastLessonSlug.trim().length > 0
            ? data.lastLessonSlug
            : lessonSlug,
      };

      saveLocalProgress(trackSlug, serverSnapshot);
      emitProgressUpdate(trackSlug, serverSnapshot);
      setDone(serverSnapshot.completedLessons.includes(lessonSlug));
    } catch (error) {
      console.error("Error saving lesson progress:", error);
    } finally {
      setSaving(false);
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      disabled={saving}
      className={[
        compact
          ? "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70"
          : "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70",
        done ? "text-white hover:opacity-90" : "border hover:opacity-90",
      ].join(" ")}
      style={
        done
          ? { backgroundColor: "var(--reader-accent)" }
          : {
              borderColor: "var(--reader-border)",
              backgroundColor: "var(--reader-surface)",
              color: "var(--reader-body)",
            }
      }
    >
      <Check
        className={[
          compact ? "h-3.5 w-3.5" : "h-4 w-4",
          "transition-transform",
          done ? "scale-110" : "",
        ].join(" ")}
        strokeWidth={done ? 3 : 2}
      />
      {saving ? "Saving..." : done ? "Completed" : compact ? "Complete" : "Mark as complete"}
    </button>
  );
}

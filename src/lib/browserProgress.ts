"use client";

import { createClient } from "@/lib/supabase/client";

export const PROGRESS_EVENT = "cppvalley:progress";

export type ProgressSnapshot = {
  completedLessons: string[];
  lastLessonSlug: string | null;
};

export function storageKey(trackSlug: string) {
  return `cppvalley:progress:${trackSlug}`;
}

export function normalizeCompletedLessons(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .map((item) => item.trim())
    )
  );
}

export function loadLocalProgress(trackSlug: string): ProgressSnapshot {
  try {
    const raw = localStorage.getItem(storageKey(trackSlug));
    if (!raw) return { completedLessons: [], lastLessonSlug: null };

    const parsed = JSON.parse(raw) as {
      completedLessons?: unknown;
      lastLessonSlug?: unknown;
    };

    return {
      completedLessons: normalizeCompletedLessons(parsed?.completedLessons),
      lastLessonSlug:
        typeof parsed?.lastLessonSlug === "string" && parsed.lastLessonSlug.trim().length > 0
          ? parsed.lastLessonSlug
          : null,
    };
  } catch {
    return { completedLessons: [], lastLessonSlug: null };
  }
}

export function saveLocalProgress(trackSlug: string, snapshot: ProgressSnapshot) {
  try {
    localStorage.setItem(
      storageKey(trackSlug),
      JSON.stringify({
        completedLessons: normalizeCompletedLessons(snapshot.completedLessons),
        lastLessonSlug: snapshot.lastLessonSlug ?? null,
      })
    );
  } catch {}
}

export function emitProgressUpdate(trackSlug: string, snapshot: ProgressSnapshot) {
  window.dispatchEvent(
    new CustomEvent(PROGRESS_EVENT, {
      detail: {
        trackSlug,
        completedLessons: normalizeCompletedLessons(snapshot.completedLessons),
        lastLessonSlug: snapshot.lastLessonSlug ?? null,
      },
    })
  );
}

export async function getProgressAuthHeaders(): Promise<Record<string, string>> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};
}

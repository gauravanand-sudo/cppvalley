"use client";

import { useEffect } from "react";
import { emitProgressUpdate, getProgressAuthHeaders, loadLocalProgress, saveLocalProgress } from "@/lib/browserProgress";

export default function TrackProgressPing({
  trackSlug,
  lessonSlug,
}: {
  trackSlug: string;
  lessonSlug: string;
}) {
  useEffect(() => {
    const local = loadLocalProgress(trackSlug);
    const snapshot = {
      completedLessons: local.completedLessons,
      lastLessonSlug: lessonSlug,
    };

    saveLocalProgress(trackSlug, snapshot);
    emitProgressUpdate(trackSlug, snapshot);

    getProgressAuthHeaders()
      .then((headers) =>
        fetch("/api/progress/last", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({ trackSlug, lessonSlug }),
        })
      )
      .catch(() => {});
  }, [trackSlug, lessonSlug]);

  return null;
}

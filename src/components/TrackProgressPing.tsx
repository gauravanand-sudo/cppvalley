"use client";

import { useEffect } from "react";

export default function TrackProgressPing({
  trackSlug,
  lessonSlug,
}: {
  trackSlug: string;
  lessonSlug: string;
}) {
  useEffect(() => {
    fetch("/api/progress/last", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackSlug, lessonSlug }),
    }).catch(() => {});
  }, [trackSlug, lessonSlug]);

  return null;
}

"use client";

import { useEffect, useState } from "react";

function formatViews(count: number) {
  return `${new Intl.NumberFormat("en-US").format(count)} view${count === 1 ? "" : "s"}`;
}

export default function BlogViewCount({
  slug,
  initialCount,
  track = false,
  className = "",
}: {
  slug: string;
  initialCount: number;
  track?: boolean;
  className?: string;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (!track || !slug || typeof window === "undefined") return;

    let active = true;

    fetch("/api/blog/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!active || !res.ok || !data) return;
        if (typeof data.viewCount === "number") {
          setCount(data.viewCount);
        }
      })
      .catch((error) => {
        console.error("Error tracking blog view:", error);
      });

    return () => {
      active = false;
    };
  }, [slug, track]);

  return <span className={className}>{formatViews(count)}</span>;
}

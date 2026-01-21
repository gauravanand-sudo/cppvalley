import React from "react";

type Props = {
  /** Accepts full URL (https://youtu.be/.. or https://www.youtube.com/watch?v=..) or just the videoId */
  id?: string;
  url?: string;
  title?: string;
  start?: number; // seconds
  autoplay?: boolean;
  muted?: boolean;
};

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;

    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];

    return null;
  } catch {
    // maybe they passed a raw id
    return url.length >= 8 ? url : null;
  }
}

export default function YouTube({
  id,
  url,
  title = "YouTube video",
  start,
  autoplay,
  muted,
}: Props) {
  const videoId = id ?? (url ? extractVideoId(url) : null);
  if (!videoId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Invalid YouTube link/id.
      </div>
    );
  }

  const params = new URLSearchParams();
  params.set("rel", "0");
  params.set("modestbranding", "1");
  params.set("playsinline", "1");
  if (start && start > 0) params.set("start", String(start));
  if (autoplay) params.set("autoplay", "1");
  if (muted) params.set("mute", "1");

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  return (
    <div className="my-6">
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {title && <div className="mt-2 text-xs text-gray-500">{title}</div>}
    </div>
  );
}

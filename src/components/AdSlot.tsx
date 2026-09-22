"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slot?: string;
  className?: string;
  label?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  fullWidthResponsive?: boolean;
};

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const showDebugPlaceholder = process.env.NEXT_PUBLIC_ADSENSE_DEBUG === "true";

export function AdSlot({
  slot,
  className = "",
  label = "Advertisement",
  format = "auto",
  layout,
  fullWidthResponsive = true,
}: AdSlotProps) {
  const enabled = Boolean(adsenseClient && slot);

  useEffect(() => {
    if (!enabled) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense loading can throw. The page should continue to render.
    }
  }, [enabled, slot]);

  if (!enabled) {
    if (!showDebugPlaceholder) return null;

    return (
      <aside className={`ad-slot ad-slot-placeholder ${className}`} aria-label={label}>
        <span>{label}</span>
        <strong>Ad slot ready</strong>
        <small>Set NEXT_PUBLIC_ADSENSE_CLIENT and the matching slot env variable.</small>
      </aside>
    );
  }

  return (
    <aside className={`ad-slot ${className}`} aria-label={label}>
      <span className="ad-slot-label">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </aside>
  );
}

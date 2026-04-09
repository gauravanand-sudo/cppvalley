"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type GoogleAdSlotProps = {
  slot?: string;
  className?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  label?: string;
  fullWidthResponsive?: boolean;
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export default function GoogleAdSlot({
  slot,
  className = "",
  format = "auto",
  label = "Advertisement",
  fullWidthResponsive = true,
}: GoogleAdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || !adRef.current) return;

    try {
      const status = adRef.current.getAttribute("data-adsbygoogle-status");
      if (status === "done") return;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and local development can prevent Google scripts from running.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <div className={className}>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        {label}
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <ins
          ref={adRef}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}

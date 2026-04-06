"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (!anchor.href) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
    return false;
  }

  return true;
}

export default function RouteLoadingProvider() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigation(target)) return;

      setLoading(true);
    };

    const onSubmit = () => {
      setLoading(true);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  useEffect(() => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
    }

    hideTimer.current = window.setTimeout(() => {
      setLoading(false);
    }, 220);

    return () => {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, [pathname]);

  return (
    <>
      <div
        className={[
          "pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] origin-left transition-transform duration-300 ease-out",
          loading ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(90deg, rgba(212,104,134,0.25) 0%, #D46886 18%, #F6D6DF 48%, #D46886 72%, rgba(212,104,134,0.15) 100%)",
          boxShadow: "0 0 18px rgba(212,104,134,0.5)",
        }}
      />

      <div
        className={[
          "pointer-events-none fixed right-4 top-4 z-[99] transition-all duration-300 ease-out",
          loading ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="rounded-full border border-[#ffffff1c] bg-[#2a151d]/85 px-3 py-1.5 shadow-[0_18px_50px_rgba(23,8,12,0.34)] backdrop-blur">
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f6e8ed]">
            {"cppvalley".split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="inline-block animate-[cppvalley-route-pulse_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes cppvalley-route-pulse {
          0%,
          100% {
            opacity: 0.45;
            transform: translateY(0);
          }
          45% {
            opacity: 1;
            transform: translateY(-1px);
          }
        }
      `}</style>
    </>
  );
}

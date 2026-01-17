"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { TrackSection } from "@/lib/content";

const badge = {
  free: "bg-green-100 text-green-800",
  premium: "bg-purple-100 text-purple-800",
  paid: "bg-orange-100 text-orange-800",
};

export default function TrackSidebar({
  trackSlug,
  sections,
}: {
  trackSlug: string;
  sections: TrackSection[];
}) {
  const pathname = usePathname();

  const activeLessonSlug = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    // /learn/tracks/<trackSlug>/<lessonSlug?>
    return parts.length >= 4 ? parts[3] : null;
  }, [pathname]);

  const [open, setOpen] = useState<Record<number, boolean>>(
    Object.fromEntries(sections.map((_, i) => [i, i === 0]))
  );

  return (
    <aside className="w-full md:w-80 md:shrink-0">
      <div className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3">Syllabus</div>

        <div className="space-y-3">
          {sections.map((sec, i) => (
            <div key={sec.title} className="border rounded-lg">
              <button
                onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
                className="w-full flex items-center justify-between px-3 py-2 text-left"
              >
                <span className="font-medium text-sm">{sec.title}</span>
                <span className="text-xs">{open[i] ? "▾" : "▸"}</span>
              </button>

              {open[i] && (
                <div className="px-3 pb-3 space-y-2">
                  {sec.items.map((it, idx) => {
                    // ✅ Parent/module with children
                    if ("children" in it) {
                      return (
                        <div key={`${it.title}-${idx}`} className="mt-2">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {it.title}
                          </div>

                          <div className="ml-3 mt-2 space-y-1">
                            {it.children.map((child) => {
                              const href = `/learn/tracks/${trackSlug}/${child.slug}`;
                              const active = activeLessonSlug === child.slug;

                              return (
                                <div
                                  key={child.slug}
                                  className={`flex items-center justify-between gap-2 rounded px-2 py-1 ${
                                    active ? "bg-gray-100 dark:bg-gray-900" : ""
                                  }`}
                                >
                                  <Link
                                    className={`text-sm hover:underline ${
                                      active ? "font-semibold" : ""
                                    }`}
                                    href={href}
                                  >
                                    {child.title}
                                  </Link>

                                  <span
                                    className={`text-[10px] px-2 py-1 rounded ${badge[child.access]}`}
                                  >
                                    {child.access === "premium"
                                      ? "LOCK"
                                      : child.access.toUpperCase()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // ✅ Normal single lesson
                    const href = `/learn/tracks/${trackSlug}/${it.slug}`;
                    const active = activeLessonSlug === it.slug;

                    return (
                      <div
                        key={it.slug}
                        className={`flex items-center justify-between gap-2 rounded px-2 py-1 ${
                          active ? "bg-gray-100 dark:bg-gray-900" : ""
                        }`}
                      >
                        <Link
                          className={`text-sm hover:underline ${
                            active ? "font-semibold" : ""
                          }`}
                          href={href}
                        >
                          {it.title}
                        </Link>

                        <span
                          className={`text-[10px] px-2 py-1 rounded ${badge[it.access]}`}
                        >
                          {it.access === "premium" ? "LOCK" : it.access.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
          Free lessons open fully. Premium/Paid show preview.
        </div>
      </div>
    </aside>
  );
}


// src/app/learn/tracks/[trackSlug]/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import {
  getTrackBySlug,
  parseTrackSyllabus,
  type TrackSection,
  type TrackSyllabusItem,
} from "@/lib/content";
import { ChevronRight, Lock, Sparkles } from "lucide-react";
import { getUserEntitlements } from "@/lib/entitlements";
import { hasTrackAccess, trackRequiresPurchase } from "@/lib/trackAccess";

// Add any track slug here that should redirect to a standalone HTML page
// File must exist at public/<filename>.html
const HTML_REDIRECTS: Record<string, string> = {
  "adobe-zero-to-cs2": "/adobe-prep.html",
};

function isTrackLive(live: boolean | string | number | undefined) {
  return !(live === false || live === "false" || live === 0 || live === "0");
}

export default async function TrackIntroPage({
  params,
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;

  // Redirect to standalone HTML page if configured
  if (HTML_REDIRECTS[trackSlug]) {
    redirect(HTML_REDIRECTS[trackSlug]);
  }

  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();
  if (!isTrackLive(track.meta.live)) notFound();
  const entitlements = await getUserEntitlements();
  const unlocked = hasTrackAccess(entitlements, track.meta);
  const requiresPurchase = trackRequiresPurchase(track.meta);
  const purchaseHref = `/checkout?track=${encodeURIComponent(trackSlug)}`;

  const sections = parseTrackSyllabus(track.content);

  // Find first lesson
  let firstLesson: string | null = null;
  for (const sec of sections) {
    for (const it of sec.items || []) {
      if ("children" in it && Array.isArray(it.children)) {
        const first = it.children.find((c) => c.slug);
        if (first) { firstLesson = first.slug; break; }
      } else if ("slug" in it && it.slug) {
        firstLesson = it.slug;
        break;
      }
    }
    if (firstLesson) break;
  }

  // Count total lessons
  let totalLessons = 0;
  for (const sec of sections) {
    for (const it of sec.items || []) {
      if ("children" in it && Array.isArray(it.children)) totalLessons += it.children.length;
      else if ("slug" in it && it.slug) totalLessons++;
    }
  }

  return (
    <div className="min-h-full" style={{ color: "var(--reader-body)" }}>
      <div className="mx-auto max-w-4xl px-6 py-6">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: "var(--reader-muted)" }}>
          <Link href="/learn/tracks" className="transition-colors hover:opacity-80">
            Tracks
          </Link>
          <span>/</span>
          <span style={{ color: "var(--reader-body)" }}>{track.meta.title}</span>
        </nav>

        {/* Track header */}
        <header
          className="mb-8 rounded-[2rem] border p-8 shadow-sm"
          style={{
            borderColor: "var(--reader-border)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface) 92%, white) 0%, var(--reader-surface-soft) 100%)",
          }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {track.meta.duration && (
              <span
                className="rounded-full border px-2.5 py-1 text-xs font-mono"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "var(--reader-surface)",
                  color: "var(--reader-muted)",
                }}
              >
                {track.meta.duration}
              </span>
            )}
            {track.meta.level && (
              <span
                className="rounded-full border px-2.5 py-1 text-xs"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "var(--reader-surface)",
                  color: "var(--reader-muted)",
                }}
              >
                {track.meta.level}
              </span>
            )}
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: "var(--reader-accent-soft)", color: "var(--reader-accent)" }}
            >
              {totalLessons > 0 ? `${totalLessons} lessons · ` : ""}
              {requiresPurchase ? (unlocked ? "Purchased" : `Paid${track.meta.price ? ` · ₹${track.meta.price}` : ""}`) : "Free"}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-semibold tracking-tight" style={{ color: "var(--reader-heading)" }}>
            {track.meta.title}
          </h1>

          {track.meta.description && (
            <p className="mb-6 max-w-2xl text-lg leading-8" style={{ color: "var(--reader-body)" }}>
              {track.meta.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {firstLesson && unlocked && (
              <Link
                href={`/learn/tracks/${trackSlug}/${firstLesson}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--reader-accent)" }}
              >
                Start learning
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            {requiresPurchase && !unlocked && (
              <Link
                href={purchaseHref}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--reader-accent)" }}
              >
                Purchase Track
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/learn/tracks"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:opacity-90"
              style={{
                borderColor: "var(--reader-border)",
                backgroundColor: "var(--reader-surface)",
                color: "var(--reader-body)",
              }}
            >
              ← All tracks
            </Link>
          </div>
        </header>

        {/* Tags */}
        {track.meta.tags && track.meta.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {track.meta.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-1 text-xs"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "var(--reader-surface)",
                  color: "var(--reader-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Syllabus */}
        {sections.length > 0 && (
          <section
            className="rounded-[1.75rem] border p-6 shadow-sm"
            style={{
              borderColor: "var(--reader-border)",
              backgroundColor: "var(--reader-surface)",
            }}
          >
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--reader-accent)" }}>
              <Sparkles className="h-3.5 w-3.5" />
              Syllabus
            </div>

            <h2 className="mb-6 text-2xl font-semibold tracking-tight" style={{ color: "var(--reader-heading)" }}>
              Move through the track one clear step at a time
            </h2>

            <div className="space-y-3">
              {sections.map((sec: TrackSection) => (
                <div
                  key={sec.title}
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--reader-border)" }}
                >
                  <div className="border-b px-5 py-3" style={{ borderColor: "var(--reader-border)", backgroundColor: "var(--reader-surface-soft)" }}>
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--reader-muted)" }}>
                      {sec.title}
                    </span>
                  </div>

                  <div style={{ borderColor: "var(--reader-border)" }} className="divide-y">
                    {sec.items.map((it: TrackSyllabusItem, idx: number) => {
                      if ("children" in it && Array.isArray(it.children)) {
                        return (
                          <div key={it.title + idx}>
                            <div className="px-5 py-2.5" style={{ backgroundColor: "var(--reader-surface)" }}>
                              <span className="text-xs font-semibold" style={{ color: "var(--reader-muted)" }}>
                                {it.title}
                              </span>
                            </div>
                            {it.children.map((c) => (
                              <Link
                                key={c.slug}
                                href={unlocked ? `/learn/tracks/${trackSlug}/${c.slug}` : purchaseHref}
                                className="group flex items-center justify-between px-5 py-3 pl-8 transition-colors hover:opacity-90"
                                style={{ color: "var(--reader-body)" }}
                              >
                                <span className="text-sm transition-colors group-hover:opacity-80">
                                  {c.title}
                                </span>
                                {unlocked ? (
                                  <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-colors" style={{ color: "var(--reader-muted)" }} />
                                ) : (
                                  <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--reader-accent)" }} />
                                )}
                              </Link>
                            ))}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={"slug" in it ? it.slug : `${it.title}-${idx}`}
                          href={unlocked && "slug" in it ? `/learn/tracks/${trackSlug}/${it.slug}` : purchaseHref}
                          className="group flex items-center justify-between px-5 py-3 transition-colors hover:opacity-90"
                          style={{ color: "var(--reader-body)" }}
                        >
                          <span className="text-sm transition-colors group-hover:opacity-80">
                            {it.title}
                          </span>
                          {unlocked ? (
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-colors" style={{ color: "var(--reader-muted)" }} />
                          ) : (
                            <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--reader-accent)" }} />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 text-xs font-mono" style={{ color: "var(--reader-muted)" }}>
          cppvalley · {trackSlug}
        </p>
      </div>
    </div>
  );
}

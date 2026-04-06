// src/app/learn/tracks/[trackSlug]/[lessonSlug]/page.tsx
import { notFound, redirect } from "next/navigation";
import MdxRenderer from "@/components/MdxRenderer";
import { requireContent, parseTrackSyllabus, type TrackSection } from "@/lib/content";
import Link from "next/link";
import TrackProgressPing from "@/components/TrackProgressPing";
import { getUserEntitlements } from "@/lib/entitlements";
import { hasTrackAccess, trackRequiresPurchase } from "@/lib/trackAccess";

interface PageParams {
  params: Promise<{ trackSlug: string; lessonSlug: string }>;
}

interface AnyItem {
  title: string;
  slug?: string;
  children?: AnyItem[];
}

function flatten(items: AnyItem[], out: AnyItem[] = []): AnyItem[] {
  for (const it of items) {
    if (it?.slug) out.push(it);
    if (Array.isArray(it?.children)) flatten(it.children, out);
  }
  return out;
}

function loadLesson(trackSlug: string, lessonSlug: string) {
  try {
    return requireContent("learn", `${trackSlug}/${lessonSlug}`);
  } catch {}
  try {
    return requireContent("learn", lessonSlug);
  } catch {}
  notFound();
}

function loadTrack(trackSlug: string) {
  try {
    return requireContent("tracks", trackSlug);
  } catch {
    notFound();
  }
}

export default async function TrackLessonPage({ params }: PageParams) {
  const { trackSlug, lessonSlug } = await params;
  if (!trackSlug || !lessonSlug) notFound();

  const track = loadTrack(trackSlug);
  const entitlements = await getUserEntitlements();
  const trackUnlocked = hasTrackAccess(entitlements, track.meta);
  const requiresPurchase = trackRequiresPurchase(track.meta);
  if (requiresPurchase && !trackUnlocked) {
    redirect(`/checkout?track=${encodeURIComponent(trackSlug)}`);
  }
  const sections = parseTrackSyllabus(track.content);
  const all = flatten(sections.flatMap((s: TrackSection) => s.items ?? []));
  const idx = all.findIndex((x) => x.slug === lessonSlug);
  if (idx === -1) notFound();

  const lesson = loadLesson(trackSlug, lessonSlug);
  const prevLesson = idx > 0 ? all[idx - 1] : null;
  const nextLesson = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="min-h-full" style={{ color: "var(--reader-body)" }}>
      <TrackProgressPing trackSlug={trackSlug} lessonSlug={lessonSlug} />
      <div className="mx-auto max-w-4xl px-5 py-3 sm:px-6 sm:py-4">

        {/* MDX content */}
        <article
          className="mb-6 rounded-[2rem] border p-5 shadow-sm sm:p-6"
          style={{
            borderColor: "var(--reader-border)",
            backgroundColor: "var(--reader-surface)",
          }}
        >
          <MdxRenderer source={lesson.content} />
        </article>

        {/* Prev / next navigation */}
        <div className="pt-5" style={{ borderTop: "1px solid var(--reader-border)" }}>
          <div className="flex items-stretch justify-between gap-4">
            {prevLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${prevLesson.slug}`}
                className="group flex max-w-[46%] flex-1 flex-col gap-1 rounded-2xl border p-5 transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "var(--reader-surface)",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--reader-muted)" }}>
                  ← Previous
                </span>
                <span
                  className="line-clamp-2 text-sm font-semibold transition-colors group-hover:opacity-80"
                  style={{ color: "var(--reader-heading)" }}
                >
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${nextLesson.slug}`}
                className="group ml-auto flex max-w-[46%] flex-1 flex-col gap-1 rounded-2xl border p-5 text-right transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "var(--reader-surface)",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--reader-muted)" }}>
                  Next →
                </span>
                <span
                  className="line-clamp-2 text-sm font-semibold transition-colors group-hover:opacity-80"
                  style={{ color: "var(--reader-heading)" }}
                >
                  {nextLesson.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={`/learn/tracks/${trackSlug}`}
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: "var(--reader-muted)" }}
            >
              ↑ Back to track syllabus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

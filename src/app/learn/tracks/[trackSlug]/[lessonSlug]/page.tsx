// src/app/learn/tracks/[trackSlug]/[lessonSlug]/page.tsx
import { notFound, redirect } from "next/navigation";
import MdxRenderer from "@/components/MdxRenderer";
import { requireContent, parseTrackSyllabus, type TrackSection } from "@/lib/content";
import Link from "next/link";
import TrackProgressPing from "@/components/TrackProgressPing";
import { getUserEntitlements } from "@/lib/entitlements";
import { hasTrackAccess, trackRequiresPurchase } from "@/lib/trackAccess";
import { isPublicTrackSlug } from "@/lib/publicContent";
import GoogleAdSlot from "@/components/GoogleAdSlot";

const LESSON_INLINE_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_LESSON_INLINE;
const LESSON_FOOTER_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_LESSON_FOOTER;

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
  if (!isPublicTrackSlug(trackSlug)) notFound();

  const track = loadTrack(trackSlug);
  const sections = parseTrackSyllabus(track.content);
  const all = flatten(sections.flatMap((s: TrackSection) => s.items ?? []));
  const idx = all.findIndex((x) => x.slug === lessonSlug);
  if (idx === -1) notFound();

  const lessonItem = all[idx] as AnyItem & { access?: string };
  const lessonIsFree = lessonItem?.access === "free";

  const entitlements = await getUserEntitlements();
  const trackUnlocked = hasTrackAccess(entitlements, track.meta);
  const requiresPurchase = trackRequiresPurchase(track.meta);
  if (requiresPurchase && !trackUnlocked && !lessonIsFree) {
    redirect(`/checkout?track=${encodeURIComponent(trackSlug)}`);
  }

  const lesson = loadLesson(trackSlug, lessonSlug);
  const prevLesson = idx > 0 ? all[idx - 1] : null;
  const nextLesson = idx < all.length - 1 ? all[idx + 1] : null;
  const lessonNumber = idx + 1;
  const totalLessons = Math.max(1, all.length);

  return (
    <div className="min-h-full" style={{ color: "var(--reader-body)" }}>
      <TrackProgressPing trackSlug={trackSlug} lessonSlug={lessonSlug} />
      <div className="mx-auto max-w-5xl px-5 py-4 sm:px-6 sm:py-5">
        <section
          className="mb-5 overflow-hidden rounded-[1.75rem] border"
          style={{
            borderColor: "var(--reader-border)",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--reader-surface) 94%, white) 0%, color-mix(in srgb, var(--reader-surface-soft) 88%, var(--reader-bg)) 100%)",
            boxShadow: "0 22px 50px color-mix(in srgb, var(--reader-accent) 8%, transparent)",
          }}
        >
          <div
            className="flex flex-wrap items-center gap-2 border-b px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-6"
            style={{ borderColor: "var(--reader-border)", color: "var(--reader-muted)" }}
          >
            <span>{track.meta.title}</span>
            <span style={{ color: "var(--reader-border)" }}>•</span>
            <span>
              Lesson {lessonNumber} of {totalLessons}
            </span>
            <span style={{ color: "var(--reader-border)" }}>•</span>
            <span>{lessonIsFree ? "Free preview" : trackUnlocked ? "Unlocked" : "Premium lesson"}</span>
          </div>

          <div className="grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
            <div className="min-w-0">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--reader-accent)" }}
              >
                High-signal lesson
              </p>
              <h1
                className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-[2rem]"
                style={{ color: "var(--reader-heading)" }}
              >
                {lesson.meta.title}
              </h1>
              {lesson.meta.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--reader-body)" }}>
                  {lesson.meta.description}
                </p>
              ) : (
                <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-[15px]" style={{ color: "var(--reader-body)" }}>
                  Tighten fundamentals, reduce blind spots, and move through the material like a guided systems course
                  instead of a raw markdown page.
                </p>
              )}
            </div>

            <div
              className="grid gap-3 rounded-[1.25rem] border p-4"
              style={{
                borderColor: "var(--reader-border)",
                backgroundColor: "color-mix(in srgb, var(--reader-surface) 82%, transparent)",
              }}
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--reader-muted)" }}>
                  Reading mode
                </div>
                <div className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
                  Deep work, compact chrome
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href={`/learn/tracks/${trackSlug}`}
                  className="rounded-full border px-3 py-2 text-center font-semibold transition hover:opacity-90"
                  style={{
                    borderColor: "var(--reader-border)",
                    backgroundColor: "var(--reader-surface)",
                    color: "var(--reader-body)",
                  }}
                >
                  Syllabus
                </Link>
                {nextLesson ? (
                  <Link
                    href={`/learn/tracks/${trackSlug}/${nextLesson.slug}`}
                    className="rounded-full px-3 py-2 text-center font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: "var(--reader-accent)" }}
                  >
                    Continue
                  </Link>
                ) : (
                  <div
                    className="rounded-full border px-3 py-2 text-center font-semibold"
                    style={{ borderColor: "var(--reader-border)", color: "var(--reader-muted)" }}
                  >
                    Final lesson
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <article
          className="mb-6 overflow-hidden rounded-[2rem] border shadow-sm"
          style={{
            borderColor: "var(--reader-border)",
            backgroundColor: "var(--reader-surface)",
            boxShadow:
              "0 1px 0 color-mix(in srgb, var(--reader-border) 80%, transparent), 0 24px 60px color-mix(in srgb, black 6%, transparent)",
          }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3 sm:px-6"
            style={{ borderColor: "var(--reader-border)" }}
          >
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--reader-muted)" }}>
                Lesson notes
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
                {lesson.meta.title}
              </div>
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--reader-muted)" }}>
              {lessonNumber}/{totalLessons}
            </div>
          </div>
          <MdxRenderer source={lesson.content} />
        </article>

        <GoogleAdSlot
          slot={LESSON_INLINE_AD_SLOT}
          className="mb-6"
          label="Advertisement"
        />

        <div className="pt-5" style={{ borderTop: "1px solid var(--reader-border)" }}>
          <div className="mb-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--reader-muted)" }}>
              Continue the track
            </div>
            <div className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
              Stay in the flow instead of jumping back to the catalog
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {prevLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${prevLesson.slug}`}
                className="group flex min-h-[112px] flex-col gap-1 rounded-2xl border p-5 transition-all hover:shadow-sm"
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
              <div
                className="flex min-h-[112px] flex-col justify-center rounded-2xl border p-5"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "color-mix(in srgb, var(--reader-surface-soft) 86%, transparent)",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--reader-muted)" }}>
                  Start point
                </span>
                <span className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
                  You are at the beginning of this course path
                </span>
              </div>
            )}

            {nextLesson ? (
              <Link
                href={`/learn/tracks/${trackSlug}/${nextLesson.slug}`}
                className="group flex min-h-[112px] flex-col gap-1 rounded-2xl border p-5 text-right transition-all hover:shadow-sm"
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
              <div
                className="flex min-h-[112px] flex-col justify-center rounded-2xl border p-5 text-right"
                style={{
                  borderColor: "var(--reader-border)",
                  backgroundColor: "color-mix(in srgb, var(--reader-surface-soft) 86%, transparent)",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--reader-muted)" }}>
                  End of track
                </span>
                <span className="mt-1 text-sm font-semibold" style={{ color: "var(--reader-heading)" }}>
                  You have reached the last available lesson
                </span>
              </div>
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

        <GoogleAdSlot
          slot={LESSON_FOOTER_AD_SLOT}
          className="mt-8"
          label="Sponsored"
        />
      </div>
    </div>
  );
}

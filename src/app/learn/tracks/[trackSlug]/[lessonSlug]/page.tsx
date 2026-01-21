// src/app/learn/tracks/[trackSlug]/[lessonSlug]/page.tsx
import { notFound, redirect } from "next/navigation";
import MdxRenderer from "@/components/MdxRenderer";
import { requireContent, parseTrackSyllabus } from "@/lib/content";
import { getUserEntitlements, canAccessTrack } from "@/lib/entitlements";

type AnyItem = { title: string; slug?: string; children?: AnyItem[] };

function flatten(items: AnyItem[], out: AnyItem[] = []) {
  for (const it of items) {
    if (it?.slug) out.push(it);
    if (Array.isArray(it?.children)) flatten(it.children, out);
  }
  return out;
}

function loadLesson(trackSlug: string, lessonSlug: string) {
  // 1) preferred: per-track folder
  try {
    return requireContent("learn", `${trackSlug}/${lessonSlug}`);
  } catch {}

  // 2) fallback: old flat folder (optional)
  try {
    return requireContent("learn", lessonSlug);
  } catch {}

  notFound();
}

export default async function TrackLessonPage(props: { params: any }) {
  const p = await props.params;
  const trackSlug = p?.trackSlug;
  const lessonSlug = p?.lessonSlug;

  if (typeof trackSlug !== "string" || typeof lessonSlug !== "string") {
    notFound();
  }

  // 1) Load track (this is the "main track page" source of truth)
  const track = requireContent("tracks", trackSlug);

  // ✅ CHANGE: If the TRACK itself is premium/paid, ALWAYS send to payment page
  // (regardless of per-lesson meta.access)


  // 2) Ensure lesson exists in syllabus
  const sections = parseTrackSyllabus(track.content);
  const all = flatten(sections.flatMap((s: any) => s.items ?? []));
  const idx = all.findIndex((x) => x.slug === lessonSlug);
  if (idx === -1) notFound();

  // 3) Load lesson content
  const { meta, content } = loadLesson(trackSlug, lessonSlug);

  // 4) Get entitlements using Supabase
  const entitlements = await getUserEntitlements();
  const hasTrackAccess = canAccessTrack(entitlements, trackSlug);

  // 5) Lock logic (kept for compatibility, but track-level redirect already handles premium tracks)
  const locked =
    (meta.access === "premium" || meta.access === "paid") && !hasTrackAccess;

  if (locked) {
    redirect(`/pricing?track=${encodeURIComponent(trackSlug)}`);
  }

  return (
    <div>
      <div className="deepseek-prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{meta.title}</h1>
        {meta.description && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {meta.description}
          </p>
        )}

        <div className="mt-6">
          <MdxRenderer source={content} />
        </div>
      </div>
    </div>
  );
}
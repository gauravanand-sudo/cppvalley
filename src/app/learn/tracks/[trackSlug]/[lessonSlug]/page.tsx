import Link from "next/link";
import MdxRenderer from "@/components/MdxRenderer";
import {
  getTrackBySlug,
  parseTrackSyllabus,
  requireContent,
  flattenTrackLessonSlugs,
} from "@/lib/content";
import { notFound } from "next/navigation";

export default async function TrackLessonPage({
  params,
}: {
  params: Promise<{ trackSlug: string; lessonSlug: string }>;
}) {
  const { trackSlug, lessonSlug } = await params;

  // Ensure track exists
  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();

  // Parse syllabus and ensure lesson is part of the ordered syllabus
  const sections = parseTrackSyllabus(track.content);
  const ordered = flattenTrackLessonSlugs(sections);

  const idx = ordered.indexOf(lessonSlug);
  if (idx === -1) notFound();

  const prevSlug = idx > 0 ? ordered[idx - 1] : null;
  const nextSlug = idx < ordered.length - 1 ? ordered[idx + 1] : null;

  // Load the actual lesson content from /content/learn
  const { meta, content } = requireContent("learn", lessonSlug);

  const locked = meta.access === "premium" || meta.access === "paid";

  return (
    <>
      <h1 className="text-2xl font-bold">{meta.title}</h1>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        Lesson {idx + 1} / {ordered.length}
      </p>

      {meta.description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {meta.description}
        </p>
      )}

      <div className="mt-6">
        {locked ? (
          <div className="rounded-xl border p-6">
            <p className="font-medium">
              This lesson is <b>{meta.access}</b>.
            </p>

            <div className="mt-4">
              <MdxRenderer source={content.slice(0, 800)} />
            </div>

            <a
              href="/pricing"
              className="inline-block mt-4 rounded-lg bg-black px-4 py-2 text-white"
            >
              Unlock full content
            </a>
          </div>
        ) : (
          <MdxRenderer source={content} />
        )}
      </div>

      {/* Next / Previous navigation (Grokking feel) */}
      <div className="mt-10 flex items-center justify-between gap-3">
        {prevSlug ? (
          <Link
            href={`/learn/tracks/${trackSlug}/${prevSlug}`}
            className="rounded-xl border px-4 py-2 hover:shadow-sm transition"
          >
            ← Previous
          </Link>
        ) : (
          <div />
        )}

        {nextSlug ? (
          <Link
            href={`/learn/tracks/${trackSlug}/${nextSlug}`}
            className="rounded-xl bg-black text-white px-4 py-2 hover:opacity-90 transition"
          >
            Next →
          </Link>
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            End of track ✅
          </span>
        )}
      </div>
    </>
  );
}


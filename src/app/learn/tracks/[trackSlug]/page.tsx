import { getTrackBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function TrackOverviewPage({
  params,
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;

  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();

  const { meta } = track;

  return (
    <>
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      {meta.description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {meta.description}
        </p>
      )}

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Start here</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Use the syllabus on the left. Click any lesson to open it here while the sidebar stays.
        </p>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Next: click the first lesson in the left sidebar.
        </p>
      </div>
    </>
  );
}


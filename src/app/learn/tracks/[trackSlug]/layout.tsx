import { getTrackBySlug, parseTrackSyllabus } from "@/lib/content";
import TrackSidebar from "@/components/TrackSidebar";
import { notFound } from "next/navigation";

export default async function TrackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;

  const track = getTrackBySlug(trackSlug);
  if (!track) notFound();

  const { meta, content } = track;
  const sections = parseTrackSyllabus(content);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <TrackSidebar trackSlug={meta.slug} sections={sections} />
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}


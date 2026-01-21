// src/app/learn/tracks/[trackSlug]/layout.tsx
import { notFound } from "next/navigation";
import { requireContent, parseTrackSyllabus } from "@/lib/content";
import TrackLayout from "@/components/TrackLayout";
import TrackSidebar from "@/components/TrackSidebar";
import LessonContentWrapper from "@/components/LessonContentWrapper";

export default async function TrackLayoutPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const p = await params;
  const trackSlug = p?.trackSlug;

  if (typeof trackSlug !== "string") notFound();

  const track = requireContent("tracks", trackSlug);
  const sections = parseTrackSyllabus(track.content);

  return (
    <TrackLayout sidebar={<TrackSidebar trackSlug={trackSlug} sections={sections as any} />}>
      <LessonContentWrapper
        trackSlug={trackSlug}
        sections={sections as any}
        trackTitle={track?.meta?.title || trackSlug}
      >
        {children}
      </LessonContentWrapper>
    </TrackLayout>
  );
}

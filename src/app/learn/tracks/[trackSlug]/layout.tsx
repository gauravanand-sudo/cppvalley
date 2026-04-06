// src/app/learn/tracks/[trackSlug]/layout.tsx
import { notFound } from "next/navigation";
import { requireContent, parseTrackSyllabus, type TrackSection } from "@/lib/content";
import { getUserEntitlements } from "@/lib/entitlements";
import { hasTrackAccess } from "@/lib/trackAccess";
import { getTrackProgress } from "@/lib/progress";
import TrackLayout from "@/components/TrackLayout";
import TrackSidebar from "@/components/TrackSidebar";
import LessonContentWrapper from "@/components/LessonContentWrapper";

export default async function TrackLayoutPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ trackSlug: string }>;
}) {
  const p = await params;
  const trackSlug = p?.trackSlug;

  if (typeof trackSlug !== "string") notFound();

  const track = requireContent("tracks", trackSlug);
  const sections = parseTrackSyllabus(track.content);
  const entitlements = await getUserEntitlements();
  const progress = await getTrackProgress(trackSlug);
  const unlocked = hasTrackAccess(entitlements, {
    slug: trackSlug,
    access: track.meta.access,
    price: (track.meta as { price?: number }).price,
  });

  return (
    <TrackLayout
      trackSlug={trackSlug}
      trackTitle={track?.meta?.title || trackSlug}
      sections={sections as TrackSection[]}
      sidebar={
        <TrackSidebar
          trackSlug={trackSlug}
          sections={sections as TrackSection[]}
          canAccessTrack={unlocked}
          initialCompletedLessons={progress?.completedLessons ?? []}
          initialLastLessonSlug={progress?.lastLessonSlug ?? null}
        />
      }
    >
        <LessonContentWrapper
          trackSlug={trackSlug}
          sections={sections as TrackSection[]}
          canAccessTrack={unlocked}
        >
        {children}
      </LessonContentWrapper>
    </TrackLayout>
  );
}

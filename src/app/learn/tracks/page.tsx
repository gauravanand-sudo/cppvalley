import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listTracks, type TrackMeta } from "@/lib/content";
import { getUserEntitlements } from "@/lib/entitlements";
import { PUBLIC_TRACK_SLUGS } from "@/lib/publicContent";
import TracksClient from "./TracksClient";

export default async function TracksPage() {
  const allTracks = listTracks();
  const tracks = PUBLIC_TRACK_SLUGS
    .map((slug) => allTracks.find((track) => track.slug === slug))
    .filter((track): track is TrackMeta => Boolean(track));
  const entitlements = await getUserEntitlements();

  return (
    <>
      <SiteHeader />
      <TracksClient
        tracks={tracks}
        purchasedTrackSlugs={Object.keys(entitlements.trackAccess)}
      />
      <SiteFooter />
    </>
  );
}

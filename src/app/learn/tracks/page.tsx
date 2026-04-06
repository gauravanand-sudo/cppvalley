import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listTracks } from "@/lib/content";
import { getUserEntitlements } from "@/lib/entitlements";
import TracksClient from "./TracksClient";

export default async function TracksPage() {
  // IMPORTANT: show ALL tracks (live + coming soon)
  const tracks = listTracks();
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

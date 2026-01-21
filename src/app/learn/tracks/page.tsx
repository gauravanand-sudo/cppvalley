import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listTracks } from "@/lib/content";
import TracksClient from "./TracksClient";

export default function TracksPage() {
  // IMPORTANT: show ALL tracks (live + coming soon)
  const tracks = listTracks();

  return (
    <>
      <SiteHeader />
      <TracksClient tracks={tracks} />
      <SiteFooter />
    </>
  );
}

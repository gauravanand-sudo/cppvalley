import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { listTracks } from "@/lib/content";
import PricingClient from "./PricingClient";

export default function PricingPage() {
  const tracks = listTracks();

  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="p-6">Loading pricing…</div>}>
        <PricingClient tracks={tracks} />
      </Suspense>
      <SiteFooter />
    </>
  );
}

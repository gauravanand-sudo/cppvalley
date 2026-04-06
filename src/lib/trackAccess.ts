import type { TrackMeta } from "@/lib/content";

export type UserEntitlements = {
  trackAccess: Record<string, boolean>;
  siteAccess: boolean;
};

export function canAccessTrack(entitlements: UserEntitlements, trackSlug: string): boolean {
  return entitlements.siteAccess || entitlements.trackAccess[trackSlug] || false;
}

export function trackRequiresPurchase(track: Pick<TrackMeta, "access" | "price">): boolean {
  return (track.price ?? 0) > 0 || track.access === "paid";
}

export function hasTrackAccess(
  entitlements: UserEntitlements,
  track: Pick<TrackMeta, "slug" | "access" | "price">
): boolean {
  if (!trackRequiresPurchase(track)) return true;
  return canAccessTrack(entitlements, track.slug);
}

export const PUBLIC_TRACK_SLUGS = [
  "core-cpp-for-interviews",
  "low-latency-and-systems",
] as const;

export function isPublicTrackSlug(trackSlug: string) {
  return PUBLIC_TRACK_SLUGS.includes(trackSlug as (typeof PUBLIC_TRACK_SLUGS)[number]);
}

import { createClient } from "@/lib/supabase/server";

export type UserEntitlements = {
  trackAccess: Record<string, boolean>; // trackSlug -> hasAccess
  siteAccess: boolean;
};

export async function getUserEntitlements(): Promise<UserEntitlements> {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return { trackAccess: {}, siteAccess: false };
    }

    // Fetch user's entitlements from Supabase
    const { data: entitlements, error } = await supabase
      .from("entitlements")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("status", "active");

    if (error) {
      console.error("Error fetching entitlements:", error);
      return { trackAccess: {}, siteAccess: false };
    }

    // Process entitlements
    const trackAccess: Record<string, boolean> = {};
    let siteAccess = false;

    entitlements?.forEach((entitlement) => {
      if (entitlement.scope === "site") {
        siteAccess = true;
      } else if (entitlement.scope === "track" && entitlement.track_slug) {
        trackAccess[entitlement.track_slug] = true;
      }
    });

    return { trackAccess, siteAccess };
  } catch (error) {
    console.error("Error in getUserEntitlements:", error);
    return { trackAccess: {}, siteAccess: false };
  }
}

export function canAccessTrack(entitlements: UserEntitlements, trackSlug: string): boolean {
  // Free tracks are always accessible
  // Premium tracks need either site access or specific track access
  return entitlements.siteAccess || entitlements.trackAccess[trackSlug] || false;
}
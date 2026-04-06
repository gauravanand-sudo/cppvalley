import { createClient } from "@/lib/supabase/server";
import type { UserEntitlements } from "@/lib/trackAccess";

function isExpectedDynamicUsageError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    (error as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function getUserEntitlements(): Promise<UserEntitlements> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      return { trackAccess: {}, siteAccess: false };
    }

    // Fetch user's entitlements from Supabase
    const { data: entitlements, error } = await supabase
      .from("entitlements")
      .select("*")
      .eq("user_id", user.id)
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
    if (!isExpectedDynamicUsageError(error)) {
      console.error("Error in getUserEntitlements:", error);
    }
    return { trackAccess: {}, siteAccess: false };
  }
}

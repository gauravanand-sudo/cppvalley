import { createClient } from "@/lib/supabase/server";

export async function getUserIdOrNull() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}

export async function getProgress(trackSlug: string) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return null;

    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("track_slug", trackSlug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      console.error("Error fetching progress:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getProgress:", error);
    return null;
  }
}
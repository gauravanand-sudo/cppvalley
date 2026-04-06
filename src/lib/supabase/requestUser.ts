import { createClient as createSupabaseAuthClient, type User } from "@supabase/supabase-js";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";

function getBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim() || null;
}

export async function getAuthenticatedUser(req: Request): Promise<User | null> {
  const token = getBearerToken(req);

  if (token) {
    const supabase = createSupabaseAuthClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Error verifying Supabase token:", error);
    } else if (user) {
      return user;
    }
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
}

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function isMissingBlogViewsSchemaError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error ? String(error.message ?? "") : "";
  const details = "details" in error ? String(error.details ?? "") : "";
  return (
    message.includes("blog_page_views")
    || details.includes("blog_page_views")
    || message.includes("does not exist")
  );
}

export async function getBlogViewCounts(slugs: string[]) {
  const unique = Array.from(new Set(slugs.filter(Boolean)));
  if (unique.length === 0) return new Map<string, number>();

  try {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from("blog_page_views")
      .select("post_slug,view_count")
      .in("post_slug", unique);

    if (error) {
      if (isMissingBlogViewsSchemaError(error)) return new Map<string, number>();
      console.error("Error loading blog view counts:", error);
      return new Map<string, number>();
    }

    const map = new Map<string, number>();
    for (const row of data ?? []) {
      map.set(row.post_slug, Number(row.view_count) || 0);
    }
    return map;
  } catch (error) {
    console.error("Unexpected blog view count error:", error);
    return new Map<string, number>();
  }
}

export async function getBlogViewCount(slug: string) {
  const counts = await getBlogViewCounts([slug]);
  return counts.get(slug) ?? 0;
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";

    if (!slug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: existing, error: fetchError } = await supabase
      .from("blog_page_views")
      .select("post_slug,view_count")
      .eq("post_slug", slug)
      .maybeSingle();

    if (fetchError) {
      console.error("Error loading blog view row:", fetchError);
      return NextResponse.json({ error: "Unable to update views." }, { status: 500 });
    }

    const nextCount = (Number(existing?.view_count) || 0) + 1;

    const { error: upsertError } = await supabase.from("blog_page_views").upsert(
      {
        post_slug: slug,
        view_count: nextCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "post_slug" }
    );

    if (upsertError) {
      console.error("Error updating blog views:", upsertError);
      return NextResponse.json({ error: "Unable to update views." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, viewCount: nextCount });
  } catch (error) {
    console.error("Unexpected blog views update error:", error);
    return NextResponse.json({ error: "Unable to update views." }, { status: 500 });
  }
}

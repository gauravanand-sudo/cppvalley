import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isMissingProgressSchemaError, normalizeCompletedLessons } from "@/lib/progress";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ ok: true, authenticated: false });
    }

    const body = await req.json();
    const trackSlug = typeof body?.trackSlug === "string" ? body.trackSlug.trim() : "";
    const lessonSlug = typeof body?.lessonSlug === "string" ? body.lessonSlug.trim() : "";

    if (!trackSlug || !lessonSlug) {
      return NextResponse.json({ error: "Missing trackSlug or lessonSlug." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: existing, error: fetchError } = await supabase
      .from("progress")
      .select("completed_lessons")
      .eq("user_id", user.id)
      .eq("track_slug", trackSlug)
      .maybeSingle();

    if (fetchError) {
      if (isMissingProgressSchemaError(fetchError)) {
        return NextResponse.json({ ok: true, authenticated: true, lastLessonSlug: lessonSlug, progressDisabled: true });
      }
      console.error("Error loading progress before visit update:", fetchError);
      return NextResponse.json({ error: "Unable to update lesson visit." }, { status: 500 });
    }

    const { error: upsertError } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        track_slug: trackSlug,
        completed_lessons: normalizeCompletedLessons(existing?.completed_lessons),
        last_lesson_slug: lessonSlug,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,track_slug",
      }
    );

    if (upsertError) {
      if (isMissingProgressSchemaError(upsertError)) {
        return NextResponse.json({ ok: true, authenticated: true, lastLessonSlug: lessonSlug, progressDisabled: true });
      }
      console.error("Error saving last visited lesson:", upsertError);
      return NextResponse.json({ error: "Unable to update lesson visit." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, authenticated: true, lastLessonSlug: lessonSlug });
  } catch (error) {
    console.error("Unexpected progress visit error:", error);
    return NextResponse.json({ error: "Unable to update lesson visit." }, { status: 500 });
  }
}

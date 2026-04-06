import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isMissingProgressSchemaError, normalizeCompletedLessons } from "@/lib/progress";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Please login to save lesson progress." }, { status: 401 });
    }

    const body = await req.json();
    const trackSlug = typeof body?.trackSlug === "string" ? body.trackSlug.trim() : "";
    const lessonSlug = typeof body?.lessonSlug === "string" ? body.lessonSlug.trim() : "";
    const completed = Boolean(body?.completed);

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
        return NextResponse.json({
          ok: true,
          completedLessons: completed ? [lessonSlug] : [],
          lastLessonSlug: lessonSlug,
          progressDisabled: true,
        });
      }
      console.error("Error loading progress before update:", fetchError);
      return NextResponse.json({ error: "Unable to update progress." }, { status: 500 });
    }

    const lessons = new Set(normalizeCompletedLessons(existing?.completed_lessons));
    if (completed) lessons.add(lessonSlug);
    else lessons.delete(lessonSlug);

    const completedLessons = Array.from(lessons);

    const { error: upsertError } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        track_slug: trackSlug,
        completed_lessons: completedLessons,
        last_lesson_slug: lessonSlug,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,track_slug",
      }
    );

    if (upsertError) {
      if (isMissingProgressSchemaError(upsertError)) {
        return NextResponse.json({
          ok: true,
          completedLessons,
          lastLessonSlug: lessonSlug,
          progressDisabled: true,
        });
      }
      console.error("Error saving progress:", upsertError);
      return NextResponse.json({ error: "Unable to save progress." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      completedLessons,
      lastLessonSlug: lessonSlug,
    });
  } catch (error) {
    console.error("Unexpected progress completion error:", error);
    return NextResponse.json({ error: "Unable to save progress." }, { status: 500 });
  }
}

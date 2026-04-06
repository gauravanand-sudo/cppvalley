import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isMissingProgressSchemaError, normalizeCompletedLessons } from "@/lib/progress";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";

export async function GET(req: NextRequest) {
  try {
    const trackSlug = req.nextUrl.searchParams.get("trackSlug")?.trim();

    if (!trackSlug) {
      return NextResponse.json({ error: "Missing trackSlug." }, { status: 400 });
    }

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        completedLessons: [],
        lastLessonSlug: null,
      });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("progress")
      .select("completed_lessons,last_lesson_slug")
      .eq("user_id", user.id)
      .eq("track_slug", trackSlug)
      .maybeSingle();

    if (error) {
      if (isMissingProgressSchemaError(error)) {
        return NextResponse.json({
          authenticated: true,
          completedLessons: [],
          lastLessonSlug: null,
          progressDisabled: true,
        });
      }
      console.error("Error loading progress:", error);
      return NextResponse.json({ error: "Unable to load progress." }, { status: 500 });
    }

    return NextResponse.json({
      authenticated: true,
      completedLessons: normalizeCompletedLessons(data?.completed_lessons),
      lastLessonSlug:
        typeof data?.last_lesson_slug === "string" && data.last_lesson_slug.trim().length > 0
          ? data.last_lesson_slug
          : null,
    });
  } catch (error) {
    console.error("Unexpected progress load error:", error);
    return NextResponse.json({ error: "Unable to load progress." }, { status: 500 });
  }
}

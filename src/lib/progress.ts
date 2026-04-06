import { createClient } from "@/lib/supabase/server";

export type TrackProgressRecord = {
  completedLessons: string[];
  lastLessonSlug: string | null;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return "";
}

function getErrorCode(error: unknown) {
  if (error && typeof error === "object" && "code" in error && typeof error.code === "string") {
    return error.code;
  }
  return "";
}

export function isMissingProgressSchemaError(error: unknown) {
  const message = getErrorMessage(error).toLowerCase();
  const code = getErrorCode(error);

  return (
    code === "PGRST205" ||
    code === "42P01" ||
    code === "42703" ||
    message.includes("relation") ||
    message.includes("does not exist") ||
    message.includes("column") ||
    message.includes("schema cache")
  );
}

export function normalizeCompletedLessons(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .map((item) => item.trim())
    )
  );
}

export async function getUserIdOrNull() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.id || null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}

export async function getTrackProgress(trackSlug: string): Promise<TrackProgressRecord | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("progress")
      .select("completed_lessons,last_lesson_slug")
      .eq("user_id", user.id)
      .eq("track_slug", trackSlug)
      .maybeSingle();

    if (error) {
      if (isMissingProgressSchemaError(error)) {
        return null;
      }
      console.error("Error fetching progress:", error);
      return null;
    }

    return {
      completedLessons: normalizeCompletedLessons(data?.completed_lessons),
      lastLessonSlug:
        typeof data?.last_lesson_slug === "string" && data.last_lesson_slug.trim().length > 0
          ? data.last_lesson_slug
          : null,
    };
  } catch (error) {
    console.error("Error in getTrackProgress:", error);
    return null;
  }
}

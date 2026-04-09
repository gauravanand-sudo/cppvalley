import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";

async function getCommentId(req: NextRequest) {
  const body = await req.json();
  return typeof body.commentId === "string" ? body.commentId.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const commentId = await getCommentId(req);
    if (!commentId) {
      return NextResponse.json({ error: "Missing commentId." }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("blog_comment_likes").upsert(
      { comment_id: commentId, user_id: user.id },
      { onConflict: "comment_id,user_id", ignoreDuplicates: true }
    );

    if (error) {
      console.error("Error liking comment:", error);
      return NextResponse.json({ error: "Unable to like comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected comment like error:", error);
    return NextResponse.json({ error: "Unable to like comment." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const commentId = await getCommentId(req);
    if (!commentId) {
      return NextResponse.json({ error: "Missing commentId." }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("blog_comment_likes")
      .delete()
      .eq("comment_id", commentId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error unliking comment:", error);
      return NextResponse.json({ error: "Unable to unlike comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected comment unlike error:", error);
    return NextResponse.json({ error: "Unable to unlike comment." }, { status: 500 });
  }
}

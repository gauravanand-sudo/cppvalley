import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";
import { isBlogAuthorEmail } from "@/lib/blogComments";

type LegacyProfileRow = {
  id: string;
  name: string | null;
  image: string | null;
};

function isMissingColumnError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const message = "message" in error && typeof error.message === "string" ? error.message : "";
  return message.toLowerCase().includes("column");
}

export async function GET(req: NextRequest) {
  try {
    const postSlug = req.nextUrl.searchParams.get("slug")?.trim();
    if (!postSlug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }

    const supabase = await createClient();
    let user = null;
    try {
      user = await getAuthenticatedUser(req);
    } catch (error) {
      console.error("Unable to resolve viewer for blog comments:", error);
    }

    let comments = null;
    let error = null;
    let usingLegacySchema = false;

    const richResult = await supabase
      .from("blog_comments")
      .select("id,post_slug,parent_id,user_id,body,created_at,author_name,author_image,is_author")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: true });

    if (richResult.error && isMissingColumnError(richResult.error)) {
      usingLegacySchema = true;
      const fallbackResult = await supabase
        .from("blog_comments")
        .select("id,post_slug,parent_id,user_id,body,created_at")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: true });
      comments = fallbackResult.data;
      error = fallbackResult.error;
    } else {
      comments = richResult.data;
      error = richResult.error;
    }

    if (error) {
      console.error("Error loading blog comments:", error);
      return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
    }

    const commentIds = (comments ?? []).map((comment) => comment.id);
    const userIds = Array.from(new Set((comments ?? []).map((comment) => comment.user_id)));
    const { data: likes, error: likesError } = commentIds.length > 0
      ? await supabase
          .from("blog_comment_likes")
          .select("comment_id,user_id")
          .in("comment_id", commentIds)
      : { data: [], error: null };

    if (likesError) {
      console.error("Error loading blog comment likes:", likesError);
      return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
    }

    let profileMap = new Map<string, LegacyProfileRow>();
    if (usingLegacySchema && userIds.length > 0) {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id,name,image")
        .in("id", userIds);

      if (!profilesError) {
        profileMap = new Map(((profiles ?? []) as LegacyProfileRow[]).map((profile) => [profile.id, profile]));
      }
    }

    const likeMap = new Map<string, number>();
    const viewerLiked = new Set<string>();
    for (const like of likes ?? []) {
      likeMap.set(like.comment_id, (likeMap.get(like.comment_id) ?? 0) + 1);
      if (user && like.user_id === user.id) {
        viewerLiked.add(like.comment_id);
      }
    }

    const payload = (comments ?? []).map((comment) => {
      const legacyProfile = profileMap.get(comment.user_id);
      return {
        id: comment.id,
        postSlug: comment.post_slug,
        parentId: comment.parent_id,
        userId: comment.user_id,
        body: comment.body,
        createdAt: comment.created_at,
        authorName:
          ("author_name" in comment && typeof comment.author_name === "string" && comment.author_name.trim()) ||
          legacyProfile?.name?.trim() ||
          "Reader",
        authorImage:
          "author_image" in comment && typeof comment.author_image === "string"
            ? comment.author_image
            : legacyProfile?.image ?? null,
        isAuthor: "is_author" in comment ? Boolean(comment.is_author) : false,
        heartCount: likeMap.get(comment.id) ?? 0,
        viewerHasLiked: viewerLiked.has(comment.id),
      };
    });

    return NextResponse.json({ comments: payload });
  } catch (error) {
    console.error("Unexpected blog comments load error:", error);
    return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const body = await req.json();
    const postSlug = typeof body.postSlug === "string" ? body.postSlug.trim() : "";
    const parentId = typeof body.parentId === "string" && body.parentId.trim() ? body.parentId.trim() : null;
    const content = typeof body.body === "string" ? body.body.trim() : "";

    if (!postSlug) {
      return NextResponse.json({ error: "Missing postSlug." }, { status: 400 });
    }

    if (content.length < 1 || content.length > 2000) {
      return NextResponse.json({ error: "Comment must be between 1 and 2000 characters." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("name,image")
      .eq("id", user.id)
      .maybeSingle();

    const authorName =
      (typeof profile?.name === "string" && profile.name.trim()) ||
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
      (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
      (typeof user.email === "string" && user.email.split("@")[0]?.trim()) ||
      "Reader";

    const authorImage =
      (typeof profile?.image === "string" && profile.image.trim()) ||
      (typeof user.user_metadata?.avatar_url === "string" && user.user_metadata.avatar_url.trim()) ||
      null;
    const isAuthor = isBlogAuthorEmail(user.email);

    if (parentId) {
      const { data: parent, error: parentError } = await supabase
        .from("blog_comments")
        .select("id,post_slug")
        .eq("id", parentId)
        .maybeSingle();

      if (parentError) {
        console.error("Error loading parent comment:", parentError);
        return NextResponse.json({ error: "Unable to create reply." }, { status: 500 });
      }

      if (!parent || parent.post_slug !== postSlug) {
        return NextResponse.json({ error: "Invalid parent comment." }, { status: 400 });
      }
    }

    const richInsert = await supabase.from("blog_comments").insert({
      post_slug: postSlug,
      parent_id: parentId,
      user_id: user.id,
      author_name: authorName,
      author_image: authorImage,
      is_author: isAuthor,
      body: content,
    });

    const error =
      richInsert.error && isMissingColumnError(richInsert.error)
        ? (
            await supabase.from("blog_comments").insert({
              post_slug: postSlug,
              parent_id: parentId,
              user_id: user.id,
              body: content,
            })
          ).error
        : richInsert.error;

    if (error) {
      console.error("Error creating blog comment:", error);
      return NextResponse.json({ error: "Unable to post comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected blog comment create error:", error);
    return NextResponse.json({ error: "Unable to post comment." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const body = await req.json();
    const commentId = typeof body.commentId === "string" ? body.commentId.trim() : "";
    const content = typeof body.body === "string" ? body.body.trim() : "";

    if (!commentId) {
      return NextResponse.json({ error: "Missing commentId." }, { status: 400 });
    }

    if (content.length < 1 || content.length > 2000) {
      return NextResponse.json({ error: "Comment must be between 1 and 2000 characters." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: comment, error: commentError } = await supabase
      .from("blog_comments")
      .select("id,user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (commentError) {
      console.error("Error loading comment for edit:", commentError);
      return NextResponse.json({ error: "Unable to edit comment." }, { status: 500 });
    }

    if (!comment) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    if (comment.user_id !== user.id) {
      return NextResponse.json({ error: "You can only edit your own comments." }, { status: 403 });
    }

    const { error } = await supabase
      .from("blog_comments")
      .update({
        body: content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", commentId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json({ error: "Unable to edit comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected blog comment update error:", error);
    return NextResponse.json({ error: "Unable to edit comment." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const commentId = req.nextUrl.searchParams.get("commentId")?.trim();
    if (!commentId) {
      return NextResponse.json({ error: "Missing commentId." }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: comment, error: commentError } = await supabase
      .from("blog_comments")
      .select("id,user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (commentError) {
      console.error("Error loading comment for delete:", commentError);
      return NextResponse.json({ error: "Unable to delete comment." }, { status: 500 });
    }

    if (!comment) {
      return NextResponse.json({ error: "Comment not found." }, { status: 404 });
    }

    const canDelete = comment.user_id === user.id || isBlogAuthorEmail(user.email);
    if (!canDelete) {
      return NextResponse.json({ error: "You cannot delete this comment." }, { status: 403 });
    }

    const { error } = await supabase.from("blog_comments").delete().eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
      return NextResponse.json({ error: "Unable to delete comment." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected blog comment delete error:", error);
    return NextResponse.json({ error: "Unable to delete comment." }, { status: 500 });
  }
}

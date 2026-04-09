import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/requestUser";

type ProfileRow = {
  id: string;
  name: string | null;
  image: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const postSlug = req.nextUrl.searchParams.get("slug")?.trim();
    if (!postSlug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }

    const supabase = await createClient();
    const user = await getAuthenticatedUser(req);

    const { data: comments, error } = await supabase
      .from("blog_comments")
      .select("id,post_slug,parent_id,user_id,body,created_at")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading blog comments:", error);
      return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
    }

    const commentIds = (comments ?? []).map((comment) => comment.id);
    const userIds = Array.from(new Set((comments ?? []).map((comment) => comment.user_id)));

    const [{ data: likes, error: likesError }, { data: profiles, error: profilesError }] =
      await Promise.all([
        commentIds.length > 0
          ? supabase
              .from("blog_comment_likes")
              .select("comment_id,user_id")
              .in("comment_id", commentIds)
          : Promise.resolve({ data: [], error: null }),
        userIds.length > 0
          ? supabase
              .from("profiles")
              .select("id,name,image")
              .in("id", userIds)
          : Promise.resolve({ data: [], error: null }),
      ]);

    if (likesError) {
      console.error("Error loading blog comment likes:", likesError);
      return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
    }

    if (profilesError) {
      console.error("Error loading blog comment profiles:", profilesError);
      return NextResponse.json({ error: "Unable to load comments." }, { status: 500 });
    }

    const profileMap = new Map(
      ((profiles ?? []) as ProfileRow[]).map((profile) => [profile.id, profile])
    );

    const likeMap = new Map<string, number>();
    const viewerLiked = new Set<string>();
    for (const like of likes ?? []) {
      likeMap.set(like.comment_id, (likeMap.get(like.comment_id) ?? 0) + 1);
      if (user && like.user_id === user.id) {
        viewerLiked.add(like.comment_id);
      }
    }

    const payload = (comments ?? []).map((comment) => {
      const profile = profileMap.get(comment.user_id);
      return {
        id: comment.id,
        postSlug: comment.post_slug,
        parentId: comment.parent_id,
        userId: comment.user_id,
        body: comment.body,
        createdAt: comment.created_at,
        authorName: profile?.name ?? "Reader",
        authorImage: profile?.image ?? null,
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

    const { error } = await supabase.from("blog_comments").insert({
      post_slug: postSlug,
      parent_id: parentId,
      user_id: user.id,
      body: content,
    });

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

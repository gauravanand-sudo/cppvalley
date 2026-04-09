"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getAuthRedirectUrl } from "@/lib/authRedirect";

type FlatComment = {
  id: string;
  postSlug: string;
  parentId: string | null;
  userId: string;
  body: string;
  createdAt: string;
  authorName: string;
  authorImage: string | null;
  heartCount: number;
  viewerHasLiked: boolean;
};

type CommentNode = FlatComment & { replies: CommentNode[] };

function buildTree(comments: FlatComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of comments) {
    const node = map.get(comment.id)!;
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies.push(node);
        continue;
      }
    }
    roots.push(node);
  }

  return roots;
}

function formatTime(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsed);
}

function Avatar({ name, image }: { name: string; image: string | null }) {
  const initial = name.trim().charAt(0).toUpperCase() || "R";

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={28}
        height={28}
        className="h-7 w-7 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1E3E8] text-[11px] font-semibold text-[#7A203A]">
      {initial}
    </div>
  );
}

function CommentItem({
  comment,
  replyDraft,
  onReplyDraftChange,
  onReply,
  onToggleReply,
  onLike,
  activeReplyId,
  session,
}: {
  comment: CommentNode;
  replyDraft: string;
  onReplyDraftChange: (value: string) => void;
  onReply: (commentId: string) => Promise<void>;
  onToggleReply: (commentId: string) => void;
  onLike: (commentId: string, liked: boolean) => Promise<void>;
  activeReplyId: string | null;
  session: Session | null;
}) {
  return (
    <div
      className="rounded-2xl p-3"
      style={{
        border: "1px solid var(--blog-border)",
        backgroundColor: "var(--blog-surface)",
      }}
    >
      <div className="flex items-start gap-3">
        <Avatar name={comment.authorName} image={comment.authorImage} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate text-sm font-semibold" style={{ color: "var(--blog-heading)" }}>
              {comment.authorName}
            </div>
            <div className="text-[11px] font-mono" style={{ color: "var(--blog-muted)" }}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6" style={{ color: "var(--blog-body)" }}>
            {comment.body}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => onLike(comment.id, comment.viewerHasLiked)}
              className={[
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 transition-colors",
                comment.viewerHasLiked
                  ? "border-[#D9A6B4] bg-[#FFF1F5] text-[#8B1734]"
                  : "border-[#E2D8DC] bg-[#FCFAF9] text-[#8A7078]",
              ].join(" ")}
              style={
                comment.viewerHasLiked
                  ? {
                      border: "1px solid color-mix(in srgb, var(--blog-accent) 35%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--blog-accent-soft) 92%, transparent)",
                      color: "var(--blog-accent)",
                    }
                  : {
                      border: "1px solid var(--blog-border)",
                      backgroundColor: "var(--blog-surface-soft)",
                      color: "var(--blog-muted)",
                    }
              }
            >
              <Heart className={["h-3.5 w-3.5", comment.viewerHasLiked ? "fill-current" : ""].join(" ")} />
              {comment.heartCount}
            </button>

            <button
              type="button"
              onClick={() => onToggleReply(comment.id)}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors"
              style={{
                border: "1px solid var(--blog-border)",
                backgroundColor: "var(--blog-surface-soft)",
                color: "var(--blog-muted)",
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Reply
            </button>
          </div>

          {activeReplyId === comment.id ? (
            <div className="mt-3">
              {session ? (
                <>
                  <textarea
                    value={replyDraft}
                    onChange={(e) => onReplyDraftChange(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-[84px] w-full rounded-xl px-3 py-2 text-sm outline-none"
                    style={{
                      border: "1px solid var(--blog-border)",
                      backgroundColor: "var(--blog-surface-soft)",
                      color: "var(--blog-heading)",
                    }}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onReply(comment.id)}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                      style={{ backgroundColor: "var(--blog-accent)" }}
                    >
                      Post reply
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="mt-2 rounded-xl px-3 py-2 text-xs"
                  style={{
                    border: "1px solid var(--blog-border)",
                    backgroundColor: "var(--blog-surface-soft)",
                    color: "var(--blog-muted)",
                  }}
                >
                  Log in to join the thread.
                </div>
              )}
            </div>
          ) : null}

          {comment.replies.length > 0 ? (
            <div className="mt-3 space-y-2 pl-3" style={{ borderLeft: "1px solid var(--blog-border)" }}>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                comment={reply}
                replyDraft={activeReplyId === reply.id ? replyDraft : ""}
                onReplyDraftChange={onReplyDraftChange}
                onReply={onReply}
                onToggleReply={onToggleReply}
                  onLike={onLike}
                  activeReplyId={activeReplyId}
                  session={session}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function BlogComments({ postSlug }: { postSlug: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [comments, setComments] = useState<FlatComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tree = useMemo(() => buildTree(comments), [comments]);

  async function loadComments() {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/comments?slug=${encodeURIComponent(postSlug)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to load comments.");
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      loadComments();
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  async function ensureLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: getAuthRedirectUrl() },
    });

    if (error) {
      console.error("Error signing in for comments:", error);
    }
  }

  async function submitComment(parentId?: string | null) {
    if (!session) {
      await ensureLogin();
      return;
    }

    const content = (parentId ? replyDraft : draft).trim();
    if (!content) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, parentId, body: content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to post comment.");
      if (parentId) {
        setReplyDraft("");
        setActiveReplyId(null);
      } else {
        setDraft("");
      }
      await loadComments();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleLike(commentId: string, liked: boolean) {
    if (!session) {
      await ensureLogin();
      return;
    }

    try {
      const res = await fetch("/api/blog/comments/like", {
        method: liked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to update like.");
      await loadComments();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <aside
      id="blog-comments-panel"
      className="rounded-[1.75rem] shadow-sm backdrop-blur"
      style={{
        border: "1px solid var(--blog-border)",
        backgroundColor: "color-mix(in srgb, var(--blog-surface) 90%, transparent)",
      }}
    >
      <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--blog-border)" }}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--blog-muted)" }}>
          Comments
        </div>
        <div className="mt-1 text-sm font-semibold" style={{ color: "var(--blog-heading)" }}>
          Reader discussion
        </div>
        <div className="mt-1 text-[11px]" style={{ color: "var(--blog-muted)" }}>
          Anyone can read. Logged-in users can comment, reply, and heart.
        </div>
      </div>

      <div className="max-h-[72vh] overflow-y-auto px-4 py-4">
        <div
          className="rounded-2xl p-3"
          style={{
            border: "1px solid var(--blog-border)",
            backgroundColor: "var(--blog-surface-soft)",
          }}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={session ? "Add a comment..." : "Log in to write a comment..."}
            className="min-h-[96px] w-full bg-transparent text-sm outline-none"
            style={{ color: "var(--blog-heading)" }}
            disabled={submitting}
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="text-[11px]" style={{ color: "var(--blog-muted)" }}>
              {session ? "Replies and hearts are enabled." : "Sign in with Google to join in."}
            </div>
            <button
              type="button"
              onClick={() => submitComment(null)}
              disabled={submitting}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "var(--blog-accent)" }}
            >
              {session ? "Post" : "Login"}
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="text-sm" style={{ color: "var(--blog-muted)" }}>Loading comments...</div>
          ) : tree.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed px-4 py-6 text-center text-sm"
              style={{
                borderColor: "var(--blog-border)",
                backgroundColor: "var(--blog-surface-soft)",
                color: "var(--blog-muted)",
              }}
            >
              No comments yet. Be the first to start the thread.
            </div>
          ) : (
            tree.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replyDraft={activeReplyId === comment.id ? replyDraft : ""}
                onReplyDraftChange={setReplyDraft}
                onReply={submitComment}
                onToggleReply={(commentId) => {
                  setReplyDraft("");
                  setActiveReplyId((current) => (current === commentId ? null : commentId));
                }}
                onLike={toggleLike}
                activeReplyId={activeReplyId}
                session={session}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

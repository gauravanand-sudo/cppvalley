"use client";

import { useEffect, useMemo, useState } from "react";

type GitHubComment = {
  id: number;
  body: string | null;
  html_url: string;
  created_at: string;
  user: {
    login: string;
    html_url: string;
  } | null;
};

type BlogEngagementProps = {
  slug: string;
  title: string;
  issueNumber?: number;
};

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogEngagement({ slug, title, issueNumber }: BlogEngagementProps) {
  const storageKey = useMemo(() => `cppvalley:blog-like:${slug}`, [slug]);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<GitHubComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(Boolean(issueNumber));

  const issueUrl = issueNumber
    ? `https://github.com/gauravanand-sudo/cppvalley/issues/${issueNumber}`
    : null;

  useEffect(() => {
    setLiked(window.localStorage.getItem(storageKey) === "1");
  }, [storageKey]);

  useEffect(() => {
    if (!issueNumber) return;

    const controller = new AbortController();

    fetch(`https://api.github.com/repos/gauravanand-sudo/cppvalley/issues/${issueNumber}/comments`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((value: GitHubComment[]) => setComments(Array.isArray(value) ? value : []))
      .catch(() => undefined)
      .finally(() => setCommentsLoading(false));

    return () => controller.abort();
  }, [issueNumber]);

  function toggleLike() {
    const next = !liked;
    setLiked(next);
    window.localStorage.setItem(storageKey, next ? "1" : "0");
  }

  async function sharePost() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="blog-engagement" aria-label="Article engagement">
      <div className="blog-engagement-actions">
        <button
          className={`blog-engagement-button${liked ? " is-active" : ""}`}
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
        >
          <span aria-hidden="true">♥</span>
          {liked ? "Liked" : "Like"}
        </button>

        <button className="blog-engagement-button" type="button" onClick={sharePost}>
          Share
        </button>

        <button className="blog-engagement-button" type="button" onClick={copyLink}>
          {copied ? "Copied" : "Copy link"}
        </button>

        {issueUrl ? (
          <a className="blog-engagement-button" href={issueUrl} target="_blank" rel="noreferrer">
            Comment
          </a>
        ) : null}
      </div>

      <p className="blog-engagement-note">
        Likes are saved privately in your browser. Public discussion is hosted on GitHub so comments are shared across readers.
      </p>

      {issueUrl ? (
        <div className="blog-comments">
          <div className="blog-comments-heading">
            <div>
              <span className="blog-comments-kicker">Discussion</span>
              <h2>Comments</h2>
            </div>
            <a href={issueUrl} target="_blank" rel="noreferrer">
              Add a comment on GitHub →
            </a>
          </div>

          {commentsLoading ? (
            <p className="blog-comments-status">Loading comments…</p>
          ) : comments.length ? (
            <div className="blog-comment-list">
              {comments.map((comment) => (
                <article className="blog-comment" key={comment.id}>
                  <div className="blog-comment-meta">
                    {comment.user ? (
                      <a href={comment.user.html_url} target="_blank" rel="noreferrer">
                        @{comment.user.login}
                      </a>
                    ) : (
                      <span>GitHub user</span>
                    )}
                    <time dateTime={comment.created_at}>{formatCommentDate(comment.created_at)}</time>
                  </div>
                  <p>{comment.body || ""}</p>
                  <a className="blog-comment-source" href={comment.html_url} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-comments-empty">
              <strong>Start the discussion.</strong>
              <p>Ask a question, challenge a point, or share what you built from the roadmap.</p>
              <a href={issueUrl} target="_blank" rel="noreferrer">
                Write the first comment →
              </a>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

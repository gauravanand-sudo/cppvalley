"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { imageForBlog } from "@/data/media";

export type BlogTeaser = {slug: string; title: string; excerpt: string; publishedAt: string; readingTime?: string; topics?: string[]};
export function BlogLibrary({ posts }: {posts: BlogTeaser[]}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const topics = ["All topics", ...Array.from(new Set(posts.flatMap(post => post.topics ?? [])))];
  const results = useMemo(() => posts.filter(post =>
    (topic === "All topics" || (post.topics ?? []).includes(topic)) &&
    (!query.trim() || [post.title, post.excerpt, ...(post.topics ?? [])].join(" ").toLowerCase().includes(query.trim().toLowerCase()))
  ), [posts, query, topic]);
  return (
    <div className="g-blog-library">
      <div className="g-catalog-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
        <label className="g-sr-only" htmlFor="post-search">Search notes</label>
        <input id="post-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search engineering notes..." />
      </div>
      <div className="g-filter-chips" role="group" aria-label="Filter blog topics">
        {topics.map(item => <button type="button" key={item} aria-pressed={topic === item} className={topic === item ? "is-active" : ""} onClick={() => setTopic(item)}>{item}</button>)}
      </div>
      <p className="g-result-count" aria-live="polite"><strong>{results.length} {results.length === 1 ? "article" : "articles"}</strong><span>Technical writing from cppvalley</span></p>
      {results.length ? <div className="g-blog-grid">
        {results.map(post => <Link href={"/blog/" + post.slug} className="g-blog-card" key={post.slug}>
          <div className="g-blog-art"><img src={imageForBlog(post.slug)} alt="" loading="lazy" /></div>
          <div className="g-blog-content">
            <div className="g-blog-meta"><span>{new Date(post.publishedAt + "T00:00:00Z").toLocaleDateString("en", {month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}</span><span>{post.readingTime}</span></div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="g-course-tags">{post.topics?.slice(0,3).map(item => <span key={item}>{item}</span>)}</div>
            <span className="g-course-link">Read article →</span>
          </div>
        </Link>)}
      </div> : <div className="g-empty"><strong>No matching notes</strong><p>Try a different search or topic.</p><button type="button" onClick={() => {setQuery("");setTopic("All topics")}}>Clear filters</button></div>}
    </div>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — C++ systems study",
  description: "Structured C++ systems courses and long-form engineering notes.",
  alternates: { canonical: "/" },
};

const homeAdSlot = process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function Home() {
  const featuredCourses = [...courses].sort((a, b) => a.priority - b.priority).slice(0, 6);
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [latestPost, ...otherPosts] = posts;

  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="hero">
          <div className="site-container hero-grid">
            <div>
              <span className="cinema-line" aria-hidden="true" />
              <p className="eyebrow reveal">cppvalley / C++ Systems Study</p>
              <h1 className="reveal">Systems engineering,<br />organized for study.</h1>
              <p className="hero-copy reveal-delay">
                Structured courses and technical notes on modern C++, memory, concurrency, Linux, low-latency systems, EDA, GPU programming and AI infrastructure.
              </p>
              <div className="hero-actions reveal-delay">
                <Link className="button primary" href="/courses">Open course catalogue</Link>
                <Link className="button" href="/blog">Read technical notes</Link>
              </div>
            </div>
            <aside className="hero-note reveal-delay" aria-label="Study areas">
              <span className="note-label">Primary fields</span>
              <ol>
                <li>Modern C++ & memory</li>
                <li>Concurrency & low latency</li>
                <li>HFT & systems design</li>
                <li>EDA, GPU & AI infrastructure</li>
              </ol>
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={homeAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="section section-ruled">
          <div className="site-container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Course Catalogue</p>
                <h2>Structured paths through systems C++.</h2>
                <p>Each course is organized around a technical domain, level and defined set of modules.</p>
              </div>
              <Link className="text-link" href="/courses">View complete catalogue</Link>
            </div>
            <div className="course-grid">
              {featuredCourses.map((course, index) => (
                <Link className="course-card" href={`/courses/${course.slug}`} key={course.slug}>
                  <div className="card-top">
                    <span className="kicker">{course.pillar}</span>
                    <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="meta-row">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {latestPost ? (
          <section className="section section-ruled">
            <div className="site-container">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Technical Notes</p>
                  <h2>Recent writing from the archive.</h2>
                  <p>Long-form explanations intended to function as reference material, not disposable posts.</p>
                </div>
                <Link className="text-link" href="/blog">Browse all notes</Link>
              </div>
              <div className="blog-grid">
                <Link className="feature-card" href={`/blog/${latestPost.slug}`}>
                  <div className="meta-row">
                    <span>{formatDate(latestPost.publishedAt)}</span>
                    {latestPost.readingTime ? <span>{latestPost.readingTime}</span> : null}
                  </div>
                  <h3>{latestPost.title}</h3>
                  <p>{latestPost.excerpt}</p>
                  {latestPost.topics?.length ? (
                    <div className="tag-row">
                      {latestPost.topics.slice(0, 4).map((topic) => <span className="tag" key={topic}>{topic}</span>)}
                    </div>
                  ) : null}
                </Link>
                <div className="post-stack">
                  {otherPosts.slice(0, 2).map((post) => (
                    <Link className="post-card" href={`/blog/${post.slug}`} key={post.slug}>
                      <div className="meta-row">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.readingTime ? <span>{post.readingTime}</span> : null}
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

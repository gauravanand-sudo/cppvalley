import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — C++ systems, explained quietly",
  description: "Focused C++ systems courses and long-form engineering notes.",
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
              <p className="eyebrow reveal">cppvalley · systems learning</p>
              <h1 className="reveal">C++ systems,<br />explained quietly.</h1>
              <p className="hero-copy reveal-delay">
                Courses and engineering notes for people who want to understand what happens beneath the abstraction — memory, concurrency, Linux, HFT, EDA, GPU and AI infrastructure.
              </p>
              <div className="hero-actions reveal-delay">
                <Link className="button primary" href="/courses">Browse courses</Link>
                <Link className="button" href="/blog">Read the blog</Link>
              </div>
            </div>
            <aside className="hero-note reveal-delay">
              <strong>No dashboards. No filler.</strong>
              Two things live here: structured courses and long-form technical writing. Ads, when enabled, sit between content rather than pretending to be content.
            </aside>
          </div>
        </section>

        <div className="site-container">
          <AdSlot slot={homeAdSlot} className="ad-slot-leaderboard" />
        </div>

        <section className="section">
          <div className="site-container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Courses</p>
                <h2>Learn one layer deeper.</h2>
                <p>Focused paths across modern C++, low-latency systems, EDA, GPU programming and infrastructure.</p>
              </div>
              <Link className="text-link" href="/courses">All courses →</Link>
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
          <section className="section">
            <div className="site-container">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Blog</p>
                  <h2>Notes from the engineering side.</h2>
                  <p>Long-form explanations built to be read slowly, revisited, and used in real technical conversations.</p>
                </div>
                <Link className="text-link" href="/blog">All posts →</Link>
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

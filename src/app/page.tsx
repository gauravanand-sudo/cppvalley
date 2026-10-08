import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — Learn C++ systems by patterns",
  description: "Structured C++ systems courses and technical notes for modern C++, concurrency, HFT, EDA, GPU and AI infrastructure.",
  alternates: { canonical: "/" },
};

const homeAdSlot = process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT;

const courseMarks: Record<string, string> = {
  "C++ Core": "C++",
  Systems: "SYS",
  "EDA / CAD": "EDA",
  "GPU / AI": "GPU",
  Roadmap: "MAP",
};

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
  const learningPaths = Array.from(new Set(courses.map((course) => course.pillar))).map((pillar) => ({
    pillar,
    count: courses.filter((course) => course.pillar === pillar).length,
  }));

  return (
    <div>
      <SiteHeader />
      <main className="page-main">
        <section className="hero">
          <div className="site-container hero-grid">
            <div className="hero-content">
              <div className="hero-badge"><span /> Pattern-based C++ systems learning</div>
              <h1>Understand the patterns behind <span>high-performance C++.</span></h1>
              <p className="hero-copy">
                Build depth in modern C++, concurrency, Linux, low-latency systems, HFT, EDA, GPU and AI infrastructure through structured courses and practical engineering notes.
              </p>
              <div className="hero-actions">
                <Link className="button primary" href="/courses">Explore courses <span aria-hidden="true">→</span></Link>
                <Link className="button secondary" href="/blog">Read engineering notes</Link>
              </div>
              <div className="hero-stats" aria-label="cppvalley library summary">
                <div><strong>{courses.length}</strong><span>Courses</span></div>
                <div><strong>{learningPaths.length}</strong><span>Learning tracks</span></div>
                <div><strong>{blogPosts.length}</strong><span>Deep-dive notes</span></div>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Learning paths">
              <div className="hero-panel-head">
                <div>
                  <span className="mini-label">Learning paths</span>
                  <strong>Choose a track</strong>
                </div>
                <span className="panel-code">C++</span>
              </div>
              <div className="path-list">
                {learningPaths.map((path, index) => (
                  <Link href="/courses" key={path.pillar}>
                    <span className="path-icon">{String(index + 1).padStart(2, "0")}</span>
                    <span className="path-copy"><strong>{path.pillar}</strong><small>{path.count} {path.count === 1 ? "course" : "courses"}</small></span>
                    <span className="path-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
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
                <p className="eyebrow">Start learning</p>
                <h2>Courses built around reusable engineering ideas.</h2>
                <p>Pick a focused path, understand the fundamentals, then move into the systems-level trade-offs that matter in real C++ work.</p>
              </div>
              <Link className="text-link" href="/courses">View all courses →</Link>
            </div>
            <div className="course-grid">
              {featuredCourses.map((course) => (
                <Link className="course-card" href={`/courses/${course.slug}`} key={course.slug}>
                  <div className="course-card-visual">
                    <span className="course-card-mark">{courseMarks[course.pillar] ?? "C++"}</span>
                    <span className="course-card-track">{course.pillar}</span>
                  </div>
                  <div className="course-card-body">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="meta-row">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                    <span className="course-card-link">View course <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {latestPost ? (
          <section className="section section-alt">
            <div className="site-container">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Engineering notes</p>
                  <h2>Go deeper than the course outline.</h2>
                  <p>Long-form explanations, performance studies and roadmaps you can return to while building or preparing for systems roles.</p>
                </div>
                <Link className="text-link" href="/blog">Browse all notes →</Link>
              </div>
              <div className="blog-grid">
                <Link className="feature-card" href={`/blog/${latestPost.slug}`}>
                  <div className="resource-badge">Featured note</div>
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
                  <span className="resource-link">Read note →</span>
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
                      <span className="resource-link">Read note →</span>
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

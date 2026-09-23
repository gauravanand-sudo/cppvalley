import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/blog";
import { courses, type Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "cppvalley — C++ Systems Courses",
  description:
    "C++, HFT, EDA, CUDA, GPU and AI systems courses for students and engineers.",
  alternates: { canonical: "/" },
};

const books = [
  ["Effective Modern C++", "Scott Meyers", "Core C++"],
  ["Effective STL", "Scott Meyers", "STL"],
  ["C++ Concurrency in Action", "Anthony Williams", "Concurrency"],
  ["C++ Software Design", "Klaus Iglberger", "Design"],
  ["Designing Data-Intensive Applications", "Martin Kleppmann", "Systems"],
  ["Elements of Programming Interviews in C++", "Aziz, Lee, Prakash", "DSA"],
] as const;

function courseHref(course: Course) {
  if (course.href.startsWith("/youtube/") || course.href === "/curriculum") return `/courses/${course.slug}`;
  return course.href;
}

function courseSignal(course: Course) {
  if (course.slug === "third-year-cpp-eda-hft") return "Recommended for students";
  if (course.level.includes("Beginner")) return "Beginner friendly";
  if (course.title.toLowerCase().includes("interview")) return "Interview focused";
  if (course.level.includes("Advanced") || course.level.includes("Senior")) return "Advanced systems";
  if (course.pillar === "Roadmap") return "Roadmap";
  return "Course";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function Home() {
  const sortedCourses = [...courses].sort((a, b) => a.priority - b.priority);
  const latestPost = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];

  return (
    <div className="page-shell lp-page modern-page simple-home-page">
      <SiteHeader />

      <main className="lp-main">
        <section className="site-container lp-section home-courses-section" id="courses">
          <div className="market-section-head">
            <div>
              <p className="lp-kicker">Courses</p>
              <h1>Courses</h1>
              <p>C++ systems, HFT, EDA, GPU and AI infrastructure tracks.</p>
            </div>
            <Link className="lp-card-link" href="/courses">View all courses</Link>
          </div>

          <div className="market-course-list">
            {sortedCourses.map((course) => (
              <Link className="market-course-card" href={courseHref(course)} key={course.slug}>
                <div className="market-card-thumb">
                  <div>
                    <span>{course.pillar}</span>
                    <strong>{course.shortTitle}</strong>
                  </div>
                </div>
                <div className="market-card-body">
                  <span className="course-card-eyebrow">{courseSignal(course)}</span>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <div className="market-card-meta">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                    <span>{course.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                </div>
                <div className="market-card-action">Open →</div>
              </Link>
            ))}
          </div>
        </section>

        {latestPost ? (
          <section className="site-container lp-section home-blog-section" aria-labelledby="daily-blog-heading">
            <div className="market-section-head">
              <div>
                <p className="lp-kicker">Daily blog</p>
                <h2 id="daily-blog-heading">Daily blog</h2>
              </div>
              <Link className="lp-card-link" href="/blog">View blog</Link>
            </div>

            <Link className="market-featured-card" href={`/blog/${latestPost.slug}`}>
              <div className="market-card-body">
                <span className="course-card-eyebrow">{formatDate(latestPost.publishedAt)}</span>
                <h2>{latestPost.title}</h2>
                <p>{latestPost.excerpt}</p>
                <div className="market-card-meta">
                  {latestPost.readingTime ? <span>{latestPost.readingTime}</span> : null}
                  {latestPost.topics?.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
                </div>
              </div>
              <div className="market-card-action">Read →</div>
            </Link>
          </section>
        ) : null}

        <section className="site-container lp-section home-books-section" aria-labelledby="books-heading">
          <div className="market-section-head">
            <div>
              <p className="lp-kicker">Books</p>
              <h2 id="books-heading">Book section</h2>
              <p>Only the core reading list for now. Detailed summaries can come later.</p>
            </div>
            <Link className="lp-card-link" href="/books">View books</Link>
          </div>

          <div className="market-resource-list">
            {books.map(([title, author, track]) => (
              <article className="market-resource-card" key={title}>
                <div className="market-card-thumb">
                  <div>
                    <span>{track}</span>
                    <strong>Book</strong>
                  </div>
                </div>
                <div className="market-card-body">
                  <span className="course-card-eyebrow">{track}</span>
                  <h3>{title}</h3>
                  <p>{author}</p>
                </div>
                <div className="market-card-action">Soon</div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

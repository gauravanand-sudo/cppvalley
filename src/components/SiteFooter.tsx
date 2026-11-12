import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="g-footer">
      <div className="site-container">
        <div className="g-footer-main">
          <div className="g-footer-about">
            <Link href="/" className="g-footer-logo">cpp<span>valley</span><i>.</i></Link>
            <p>Go deeper into C++, systems programming, concurrency, low-latency engineering, EDA, GPU and AI infrastructure—one concept at a time.</p>
          </div>
          <div className="g-footer-links">
            <strong>Explore</strong>
            <Link href="/courses">All courses</Link>
            <Link href="/courses#catalog">Learning tracks</Link>
            <Link href="/blog">Engineering blog</Link>
          </div>
          <div className="g-footer-links">
            <strong>Learning resources</strong>
            <Link href="/courses/core-cpp-interview-series">C++ video lessons</Link>
            <Link href="/courses/concurrency-low-latency-lessons">Concurrency lessons</Link>
            <Link href="/courses/student-roadmap-lessons">Student roadmap</Link>
          </div>
          <div className="g-footer-links">
            <strong>Connect</strong>
            <a href="https://www.youtube.com/@cppvalley" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <Link href="/blog">Latest writing</Link>
          </div>
        </div>
        <div className="g-footer-bottom"><span>© {new Date().getFullYear()} cppvalley. Built for engineers who keep asking why.</span><span>Courses · Notes · Real systems</span></div>
      </div>
    </footer>
  );
}
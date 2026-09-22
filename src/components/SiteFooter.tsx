import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteFooter() {
  return (
    <footer className="site-footer mit-footer">
      <div className="site-container site-footer-inner">
        <div className="site-footer-mark">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <span>C++ systems learning for students and engineers</span>
        </div>

        <div className="site-footer-meta">
          <span>Modern C++ · EDA software · HFT systems · AI systems</span>
          <span>Courses, videos, daily notes, interview questions, book summaries and projects.</span>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/courses/third-year-cpp-eda-hft">Start</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/youtube">Videos</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/interviews">Questions</Link>
          <Link href="/books">Books</Link>
        </nav>
      </div>
    </footer>
  );
}

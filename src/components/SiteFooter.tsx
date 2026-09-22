import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div className="site-footer-mark">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <span>C++ · EDA · HFT · AI Systems Interview Prep</span>
        </div>

        <div className="site-footer-meta">
          <span>Courses · videos · daily notes · interview questions · book summaries</span>
          <span>Built for students and engineers targeting serious systems roles</span>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/courses/third-year-cpp-eda-hft">Student Roadmap</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/youtube">YouTube</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/interviews">Interviews</Link>
          <Link href="/books">Books</Link>
        </nav>
      </div>
    </footer>
  );
}

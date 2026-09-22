import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header mit-header">
      <div className="mit-top-line" />
      <div className="site-header-main">
        <div className="site-header-inner site-container">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <span className="site-program">C++ Systems Learning Hub</span>

          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/courses/third-year-cpp-eda-hft">Start</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/youtube">Videos</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/interviews">Questions</Link>
            <Link href="/books">Books</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

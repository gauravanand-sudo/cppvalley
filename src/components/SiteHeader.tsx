import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header g-site-header">
      <div className="g-topline">
        <span>Deep C++ learning, from language fundamentals to real systems.</span>
        <Link href="/courses">Explore the learning library <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="site-container g-nav-shell">
        <Link className="site-logo" href="/" aria-label="cppvalley home"><BrandLockup /></Link>
        <nav className="g-primary-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <div className="g-nav-actions">
          <form className="g-header-search" action="/courses" role="search">
            <label className="g-sr-only" htmlFor="header-course-search">Search courses</label>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
            <input id="header-course-search" type="search" name="q" placeholder="Search courses..." />
          </form>
          <Link className="g-nav-cta" href="/courses">Start learning <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </header>
  );
}
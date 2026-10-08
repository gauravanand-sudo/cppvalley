import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link className="site-logo" href="/" aria-label="cppvalley home">
          <span>cppvalley</span>
          <small>systems, slowly</small>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}

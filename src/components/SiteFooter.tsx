import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div className="footer-brand">
          <strong>cppvalley</strong>
          <span>Structured learning for C++ systems engineering.</span>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <small>© {new Date().getFullYear()} cppvalley</small>
      </div>
    </footer>
  );
}

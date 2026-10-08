import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span>© {new Date().getFullYear()} cppvalley · C++ systems, without the noise.</span>
        <nav aria-label="Footer navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </footer>
  );
}

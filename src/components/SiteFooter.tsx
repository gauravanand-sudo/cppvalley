import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div className="site-footer-mark">
          <strong>cppvalley</strong>
          <span>HFT Core Systems</span>
        </div>

        <div className="site-footer-meta">
          <span>96 lessons · 9 phases</span>
          <span>C++ · systems · low latency · HFT</span>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/curriculum">Curriculum</Link>
          <Link href="/curriculum/01-define-latency-like-an-engineer">Preview lesson</Link>
        </nav>
      </div>
    </footer>
  );
}

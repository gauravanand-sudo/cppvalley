import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <span>© 2026 cppvalley</span>
        <Link href="/curriculum">Curriculum</Link>
      </div>
    </footer>
  );
}

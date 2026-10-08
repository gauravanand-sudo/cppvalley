import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container nav-shell">
        <Link className="site-logo" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <Link className="nav-cta" href="/courses">
          Explore courses <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}

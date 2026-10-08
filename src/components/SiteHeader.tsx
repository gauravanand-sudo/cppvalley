import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container masthead">
        <Link className="site-logo" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>
        <div className="masthead-copy">
          <span>C++ Systems & Software Engineering</span>
          <small>Courses · Technical Notes</small>
        </div>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}

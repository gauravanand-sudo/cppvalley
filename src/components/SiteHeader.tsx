import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header marketplace-header">
      <div className="site-header-main">
        <div className="site-header-inner site-container">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <span className="site-program">Systems Learning Platform</span>

          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/courses">Catalog</Link>
            <Link href="/youtube">Video Courses</Link>
            <Link href="/interviews">Practice</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/books">Books</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/youtube", label: "Videos" },
  { href: "/interviews", label: "Practice" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Articles" },
  { href: "/books", label: "Books" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header lp-header">
      <div className="site-header-main">
        <div className="site-header-inner site-container">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <Link className="lp-explore-button" href="/courses">
            Explore
          </Link>

          <Link className="lp-search" href="/courses" aria-label="Search cppvalley courses">
            <span aria-hidden="true">⌕</span>
            <strong>What do you want to learn?</strong>
          </Link>

          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </nav>

          <Link className="lp-join-button" href="/courses">
            Join for Free
          </Link>
        </div>
      </div>
    </header>
  );
}

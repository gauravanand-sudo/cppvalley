import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/youtube", label: "Videos" },
  { href: "/interviews", label: "Questions" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Articles" },
  { href: "/books", label: "Books" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header lp-header">
      <div className="site-header-main">
        <div className="site-header-inner site-container public-header-inner">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

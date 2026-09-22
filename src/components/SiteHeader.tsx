import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/interviews", label: "Interview Questions" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header lp-header academic-header">
      <div className="academic-brand-bar">
        <div className="site-container">cppvalley</div>
      </div>
      <div className="site-header-main academic-local-header">
        <div className="site-header-inner site-container public-header-inner">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </nav>

          <Link className="site-header-cta" href="/courses/third-year-cpp-eda-hft">
            Start here
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { ActiveNav } from "@/components/ActiveNav";
import { BrandLockup } from "@/components/BrandLockup";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/interviews", label: "Interview Questions" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header lp-header clean-header">
      <div className="site-header-main clean-header-main">
        <div className="site-header-inner site-container public-header-inner clean-header-inner">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <ActiveNav items={navItems} />
        </div>
      </div>
    </header>
  );
}

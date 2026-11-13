"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountLink } from "@/components/AccountLink";
import { BrandLockup } from "@/components/BrandLockup";

const navigation = [
  ["Career Paths", "/career-paths"],
  ["Courses", "/courses"],
  ["Practice", "/problems"],
  ["Projects", "/projects"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="cv-header"><div className="cv-nav-inner">
    <Link href="/" className="cv-logo" aria-label="CppValley home"><BrandLockup tone="light" /></Link>
    <nav className="cv-main-nav" aria-label="Main navigation">
      {navigation.map(([label,href]) => {
        const active = pathname === href || pathname.startsWith(href + "/") ||
          (href === "/problems" && pathname.startsWith("/practice"));
        return <Link href={href} key={href}
          className={active ? "cv-nav-current" : undefined}
          aria-current={active ? "page" : undefined}>
          {label}
        </Link>;
      })}
    </nav>
    <AccountLink />
  </div></header>;
}

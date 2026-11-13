"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountLink } from "@/components/AccountLink";
import { BrandLockup } from "@/components/BrandLockup";

const navigation = [
  ["Problems", "/problems"],
  ["Study Plans", "/study-plans"],
  ["Courses", "/courses"],
  ["Videos", "/videos"],
  ["Articles", "/blog"],
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
    <form action="/problems" role="search" className="cv-nav-search">
      <label className="cv-sr-only" htmlFor="cv-search">Search C++ problems</label>
      <span aria-hidden="true">⌕</span>
      <input id="cv-search" name="q" type="search" placeholder="Search problems…" />
      <kbd aria-hidden="true">/</kbd>
    </form>
    <AccountLink />
  </div></header>;
}

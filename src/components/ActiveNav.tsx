"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
};

type ActiveNavProps = {
  items: readonly NavItem[];
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNav({ items }: ActiveNavProps) {
  const pathname = usePathname();

  return (
    <nav className="site-nav clean-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link href={item.href} key={item.href} aria-current={active ? "page" : undefined} data-active={active ? "true" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

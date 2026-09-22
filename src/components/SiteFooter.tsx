import Link from "next/link";

const links = [
  ["Courses", "/courses"],
  ["Interview Questions", "/interviews"],
  ["Blog", "/blog"],
  ["Books", "/books"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer lp-footer compact-footer">
      <div className="site-container compact-footer-inner">
        <span>© cppvalley</span>
        <nav aria-label="Footer navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

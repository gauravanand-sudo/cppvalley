import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const links = [
  ["Courses", "/courses"],
  ["Interview Questions", "/interviews"],
  ["Blog", "/blog"],
  ["Books", "/books"],
  ["HFT Curriculum", "/curriculum"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer lp-footer">
      <div className="site-container site-footer-inner">
        <div className="lp-footer-brand">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <p>C++, HFT, EDA, CUDA, GPU and AI systems courses for students and engineers.</p>
        </div>

        <nav className="lp-footer-columns" aria-label="Footer navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>

        <div className="lp-footer-bottom">
          <span>© cppvalley</span>
        </div>
      </div>
    </footer>
  );
}

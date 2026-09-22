import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const links = [
  ["Start here", "/courses/third-year-cpp-eda-hft"],
  ["Courses", "/courses"],
  ["Interview Questions", "/interviews"],
  ["Blog", "/blog"],
  ["Books", "/books"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer lp-footer">
      <div className="site-container site-footer-inner">
        <div className="lp-footer-brand">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <p>C++ systems courses for students targeting HFT, EDA, CUDA, GPU and AI systems roles.</p>
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

import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div className="site-footer-mark">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <span>C++ · HFT · AI Systems Interview Prep</span>
        </div>

        <div className="site-footer-meta">
          <span>Courses · daily writing · interview questions · book notes · YouTube series</span>
          <span>Built for engineers preparing for C++ / HFT / AI systems roles</span>
        </div>

        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/interviews">Interviews</Link>
          <Link href="/conferences">Conferences</Link>
          <Link href="/books">Books</Link>
          <Link href="/youtube">YouTube</Link>
        </nav>
      </div>
    </footer>
  );
}

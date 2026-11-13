import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
export function SiteFooter() {
  return <footer className="cv-footer"><div className="cv-shell cv-footer-inner">
    <div><Link href="/" className="cv-footer-brand" aria-label="CppValley home"><BrandLockup tone="light" /></Link><p>Real C++. Deeper engineering. Your next level starts here.</p></div>
    <nav aria-label="Footer navigation"><Link href="/career-paths">Career Paths</Link><Link href="/courses">Courses</Link><Link href="/problems">Problems</Link><Link href="/practice-labs">GPU/AI Labs</Link><Link href="/projects">Projects</Link><Link href="/study-plans">Interview Prep</Link><Link href="/blog">Articles</Link><a href="https://www.youtube.com/@cppvalley" target="_blank" rel="noopener noreferrer">YouTube ↗</a></nav>
    <small>© {new Date().getFullYear()} CppValley. Original engineering content and coding practice.</small>
  </div></footer>;
}

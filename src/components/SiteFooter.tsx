import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
export function SiteFooter() {
  return <footer className="cv-footer"><div className="cv-shell cv-footer-inner">
    <div><Link href="/" className="cv-footer-brand" aria-label="CppValley home"><BrandLockup tone="light" /></Link><p>Quant/HFT C++ · CUDA/GPU · AI Systems</p></div>
    <nav aria-label="Footer navigation"><Link href="/career-paths">Paths</Link><Link href="/courses">Courses</Link><Link href="/problems">Practice</Link><Link href="/projects">Projects</Link><Link href="/blog">Articles</Link><a href="https://www.youtube.com/@cppvalley" target="_blank" rel="noopener noreferrer">YouTube ↗</a></nav>
    <small>© {new Date().getFullYear()} CppValley. Original engineering content and coding practice.</small>
  </div></footer>;
}

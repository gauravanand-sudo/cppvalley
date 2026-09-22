import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-identity-bar">
        <div className="site-container site-identity-inner">
          <span>cppvalley</span>
          <span>C++ · EDA · HFT · AI Systems · Interviews</span>
        </div>
      </div>

      <div className="site-header-main">
        <div className="site-header-inner site-container">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <span className="site-program">Systems Interview Institute</span>

          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/courses/third-year-cpp-eda-hft">Student Roadmap</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/youtube">YouTube</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/interviews">Interviews</Link>
            <Link className="site-preview" href="/curriculum">
              HFT Curriculum
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

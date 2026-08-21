import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { CourseCta } from "@/components/CourseCta";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-identity-bar">
        <div className="site-container site-identity-inner">
          <span>cppvalley</span>
          <span>C++ · Systems · Low Latency · HFT</span>
        </div>
      </div>

      <div className="site-header-main">
        <div className="site-header-inner site-container">
          <Link className="site-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>

          <span className="site-program">HFT Core Systems</span>

          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/curriculum">Curriculum</Link>
            <Link href="/blog">Blog</Link>
            <Link className="site-preview" href="/curriculum/01-define-latency-like-an-engineer">
              Preview lesson
            </Link>
            <CourseCta
              className="site-enroll"
              checkoutLabel="Enroll"
              fallbackLabel="View course"
              fallbackHref="/curriculum"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}

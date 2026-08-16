import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { CourseCta } from "@/components/CourseCta";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner site-container">
        <Link className="site-logo" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/curriculum">Curriculum</Link>
          <CourseCta
            className="site-enroll"
            checkoutLabel="Enroll"
            fallbackLabel="Start course"
          />
        </nav>
      </div>
    </header>
  );
}

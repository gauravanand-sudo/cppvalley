import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { CourseCta } from "@/components/CourseCta";

export function SiteHeader() {
  return (
    <header className="simple-header">
      <div className="simple-header-inner market-container">
        <Link className="simple-logo" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>

        <nav className="simple-nav" aria-label="Primary navigation">
          <Link href="/#course">The course</Link>
          <Link href="/curriculum">Curriculum</Link>
          <Link className="simple-nav-secondary" href="/#audience">Who it is for</Link>
        </nav>

        <CourseCta
          className="simple-header-cta"
          checkoutLabel="Enroll now"
          fallbackLabel="View curriculum"
        />
      </div>
    </header>
  );
}

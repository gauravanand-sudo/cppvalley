import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { CourseCta } from "@/components/CourseCta";

export function SiteFooter() {
  return (
    <footer className="simple-footer">
      <div className="market-container simple-footer-main">
        <div className="simple-footer-brand">
          <BrandLockup tone="dark" />
          <p>
            HFT Core Systems is one focused path from modern C++ and Linux fundamentals to
            low-latency networking, market data, order flow, risk, and tick-to-trade design.
          </p>
        </div>

        <nav className="simple-footer-links" aria-label="Footer navigation">
          <Link href="/#course">The course</Link>
          <Link href="/curriculum">Curriculum</Link>
          <Link href="/curriculum/01-define-latency-like-an-engineer">Preview lesson 01</Link>
        </nav>

        <div className="simple-footer-action">
          <strong>Ready to go through the full path?</strong>
          <CourseCta
            className="simple-footer-cta"
            checkoutLabel="Enroll in HFT Core Systems"
            fallbackLabel="View the full curriculum"
          />
        </div>
      </div>

      <div className="market-container simple-footer-bottom">
        <span>© 2026 cppvalley</span>
        <span>Engineering education · No trading signals or financial advice</span>
      </div>
    </footer>
  );
}

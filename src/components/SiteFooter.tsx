import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <BrandLockup tone="dark" />
          <div>
            <p>C++ · Linux · networks · trading systems</p>
          </div>
        </div>

        <div className="footer-nav">
          <Link href="/curriculum">96-episode curriculum</Link>
          <Link href="/projects">Flagship projects</Link>
          <Link href="/proof">Hiring proof</Link>
          <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube ↗</a>
          <a href="https://github.com/gauravanand-sudo/cppvalley" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>

        <p className="footer-note">Engineering education. No trading signals or financial advice.</p>
      </div>
    </footer>
  );
}

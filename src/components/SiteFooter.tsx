import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export function SiteFooter() {
  return (
    <footer className="market-footer">
      <div className="market-footer-band">
        <div className="market-container market-footer-band-inner">
          <div>
            <h2>Build the engineering depth serious systems roles demand.</h2>
            <p>C++, Linux, networking, low latency and trading infrastructure—connected into one path.</p>
          </div>
          <Link href="/curriculum">Browse all 96 lessons</Link>
        </div>
      </div>

      <div className="market-container market-footer-grid">
        <div className="market-footer-column">
          <h3>Learn</h3>
          <Link href="/curriculum">All lessons</Link>
          <Link href="/curriculum#curriculum-browser">Modern C++</Link>
          <Link href="/curriculum#curriculum-browser">Low latency</Link>
          <Link href="/curriculum#curriculum-browser">Linux systems</Link>
          <Link href="/curriculum#curriculum-browser">Electronic trading</Link>
        </div>

        <div className="market-footer-column">
          <h3>Build</h3>
          <Link href="/projects">Flagship projects</Link>
          <Link href="/projects#latlab">latlab</Link>
          <Link href="/projects#wirebook">wirebook</Link>
          <Link href="/projects#ordergate">ordergate</Link>
          <Link href="/projects#tickforge">tickforge</Link>
        </div>

        <div className="market-footer-column">
          <h3>Career</h3>
          <Link href="/proof">Hiring proof</Link>
          <Link href="/curriculum">Learning roadmap</Link>
          <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube ↗</a>
          <a href="https://github.com/gauravanand-sudo/cppvalley" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>

        <div className="market-footer-column market-footer-about">
          <BrandLockup tone="dark" />
          <p>
            A systems-first learning platform for engineers who want to understand the path from
            source code and cache lines to packets, order books and controlled orders.
          </p>
          <small>Engineering education. No trading signals or financial advice.</small>
        </div>
      </div>

      <div className="market-container market-footer-bottom">
        <span>© 2026 cppvalley</span>
        <span>Learn it. Build it. Prove it.</span>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Image
            className="footer-logo"
            src="/cppvalley-logo.webp"
            alt="cppvalley"
            width={1672}
            height={941}
            sizes="180px"
          />
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

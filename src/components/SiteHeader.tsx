import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="cppvalley home">
          <BrandLockup />
          <span className="sr-only">cppvalley</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/curriculum">Curriculum</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/proof">Hiring proof</Link>
        </nav>

        <a className="youtube-link" href={youtubeUrl} target="_blank" rel="noreferrer">
          YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

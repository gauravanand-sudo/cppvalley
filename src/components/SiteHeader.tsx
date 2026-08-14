import Image from "next/image";
import Link from "next/link";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="cppvalley home">
          <span className="brand-logo-frame" aria-hidden="true">
            <Image
              className="brand-logo"
              src="/cppvalley-logo.webp"
              alt=""
              width={1672}
              height={941}
              sizes="228px"
              priority
            />
          </span>
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

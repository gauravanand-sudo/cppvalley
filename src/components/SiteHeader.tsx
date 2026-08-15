import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

const categories = [
  ["Modern C++", "/curriculum#curriculum-browser"],
  ["Low Latency", "/curriculum#curriculum-browser"],
  ["Linux Systems", "/curriculum#curriculum-browser"],
  ["Networking", "/curriculum#curriculum-browser"],
  ["Concurrency", "/curriculum#curriculum-browser"],
  ["Trading Systems", "/curriculum#curriculum-browser"],
  ["Interview Proof", "/proof"],
] as const;

export function SiteHeader() {
  return (
    <header className="market-header">
      <div className="market-announcement">
        <div className="market-container">
          <strong>Build systems, not just syntax.</strong>
          <span>96 focused lessons across C++, low latency, Linux and electronic trading.</span>
          <Link href="/curriculum">Explore the path</Link>
        </div>
      </div>

      <div className="market-main-nav market-container">
        <Link className="market-logo-link" href="/" aria-label="cppvalley home">
          <BrandLockup />
        </Link>

        <Link className="market-explore-link" href="/curriculum">
          Explore
        </Link>

        <Link className="market-search-launcher" href="/curriculum#curriculum-browser">
          <span aria-hidden="true">⌕</span>
          <span>Search C++, latency, Linux, trading systems…</span>
        </Link>

        <nav className="market-primary-links" aria-label="Primary navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/proof">Hiring proof</Link>
          <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>
        </nav>

        <Link className="market-login-button" href="/curriculum">
          My learning
        </Link>
        <Link className="market-signup-button" href="/curriculum#curriculum-browser">
          Start learning
        </Link>
      </div>

      <nav className="market-category-nav" aria-label="Learning categories">
        <div className="market-container">
          {categories.map(([label, href]) => (
            <Link href={href} key={label}>{label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

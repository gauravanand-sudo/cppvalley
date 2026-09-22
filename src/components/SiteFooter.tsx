import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const columns = [
  {
    title: "Learn",
    links: [
      ["Course catalog", "/courses"],
      ["Video courses", "/youtube"],
      ["HFT curriculum", "/curriculum"],
      ["Student roadmap", "/courses/third-year-cpp-eda-hft"],
    ],
  },
  {
    title: "Practice",
    links: [
      ["Interview questions", "/interviews"],
      ["Projects", "/projects"],
      ["Daily articles", "/blog"],
      ["Book notes", "/books"],
    ],
  },
  {
    title: "Topics",
    links: [
      ["Modern C++", "/courses#core-cpp"],
      ["EDA software", "/courses/third-year-cpp-eda-hft"],
      ["Low latency", "/curriculum"],
      ["AI systems", "/courses#ai-systems"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer lp-footer">
      <div className="site-container site-footer-inner">
        <div className="lp-footer-brand">
          <Link className="site-footer-logo" href="/" aria-label="cppvalley home">
            <BrandLockup />
          </Link>
          <p>
            Learn C++ systems, EDA software, HFT, low-latency engineering and AI systems with structured courses, videos, projects and interview practice.
          </p>
        </div>

        <div className="lp-footer-columns">
          {columns.map((column) => (
            <nav aria-label={column.title} key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => (
                <Link href={href} key={href}>{label}</Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="lp-footer-bottom">
          <span>© cppvalley</span>
          <span>Built for students and engineers preparing for systems roles.</span>
        </div>
      </div>
    </footer>
  );
}

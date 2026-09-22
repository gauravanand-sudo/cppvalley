import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";

const columns = [
  {
    title: "Learn",
    links: [
      ["Courses", "/courses"],
      ["Videos", "/youtube"],
      ["HFT curriculum", "/curriculum"],
      ["Student roadmap", "/courses/third-year-cpp-eda-hft"],
    ],
  },
  {
    title: "Practice",
    links: [
      ["Interview questions", "/interviews"],
      ["Projects", "/projects"],
      ["Articles", "/blog"],
      ["Books", "/books"],
    ],
  },
  {
    title: "Topics",
    links: [
      ["Modern C++", "/courses/core-cpp-interviews"],
      ["EDA roadmap", "/courses/third-year-cpp-eda-hft"],
      ["Low latency", "/curriculum"],
      ["C++ videos", "/youtube"],
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
            Learn C++ systems, HFT, low-latency engineering, EDA software basics and interview preparation with focused courses, videos, projects and questions.
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

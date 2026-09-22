"use client";

import { useEffect, useState } from "react";
import type { MdxHeading } from "@/components/MdxArticle";

type BlogReadingToolsProps = {
  headings: MdxHeading[];
};

export function BlogReadingTools({ headings }: BlogReadingToolsProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {headings.length ? (
        <details className="mobile-article-toc">
          <summary>On this page</summary>
          <nav aria-label="Article table of contents">
            {headings.map((heading) => (
              <a className={heading.level === 3 ? "toc-indent" : undefined} href={`#${heading.id}`} key={`${heading.id}-${heading.text}`}>
                {heading.text}
              </a>
            ))}
          </nav>
        </details>
      ) : null}

      <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        ↑
      </button>
    </>
  );
}

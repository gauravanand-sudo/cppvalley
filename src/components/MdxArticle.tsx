import type { ReactNode } from "react";

type MdxArticleProps = {
  source: string;
};

type ListBlock = {
  type: "list";
  items: string[];
};

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

type QuoteBlock = {
  type: "quote";
  text: string;
};

type CodeBlock = {
  type: "code";
  code: string;
};

type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type DividerBlock = {
  type: "divider";
};

type Block = ListBlock | ParagraphBlock | HeadingBlock | QuoteBlock | CodeBlock | TableBlock | DividerBlock;

export type MdxHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);
}

function parseTableRow(line: string) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseMdx(source: string): Block[] {
  const blocks: Block[] = [];
  const lines = source.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let tableMode: "idle" | "header" | "body" = "idle";
  let inCodeBlock = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push({ type: "list", items: list });
    list = [];
  };

  const flushTable = () => {
    if (!tableHeaders.length || !tableRows.length) {
      tableHeaders = [];
      tableRows = [];
      tableMode = "idle";
      return;
    }

    blocks.push({ type: "table", headers: tableHeaders, rows: tableRows });
    tableHeaders = [];
    tableRows = [];
    tableMode = "idle";
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      flushTable();
      if (inCodeBlock) {
        blocks.push({ type: "code", code: code.join("\n") });
        code = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      code.push(rawLine);
      return;
    }

    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }

    if (line === "---" || line === "***") {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push({ type: "divider" });
      return;
    }

    if (line.includes("|") && !line.startsWith("> ")) {
      if (tableMode === "idle") {
        flushParagraph();
        flushList();
        tableHeaders = parseTableRow(line);
        tableMode = "header";
        return;
      }

      if (tableMode === "header" && isTableSeparator(line)) {
        tableMode = "body";
        return;
      }

      if (tableMode === "body") {
        tableRows.push(parseTableRow(line));
        return;
      }

      flushTable();
    }

    if (tableMode !== "idle") flushTable();

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: line.replace(/^#\s+/, "") });
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: line.replace(/^###\s+/, "") });
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: line.replace(/^##\s+/, "") });
      return;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: line.replace(/^>\s+/, "") });
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^-\s+/, ""));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushTable();

  return blocks;
}

export function getMdxHeadings(source: string): MdxHeading[] {
  return parseMdx(source)
    .filter((block): block is HeadingBlock => block.type === "heading")
    .map((block) => ({ id: slugifyHeading(block.text), text: block.text, level: block.level }));
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const external = href.startsWith("http");
      return (
        <a href={href} key={`${href}-${index}`} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {label}
        </a>
      );
    }

    return part;
  });
}

function calloutType(text: string) {
  const lower = text.toLowerCase();
  if (lower.startsWith("key idea") || lower.startsWith("takeaway")) return "idea";
  if (lower.startsWith("warning") || lower.startsWith("note")) return "note";
  return "quote";
}

export function MdxArticle({ source }: MdxArticleProps) {
  const blocks = parseMdx(source);

  return (
    <article className="blog-article optimized-article mdx-article">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = slugifyHeading(block.text);
          if (block.level === 3) {
            return <h3 id={id} key={`${block.text}-${index}`}>{renderInline(block.text)}</h3>;
          }

          return <h2 id={id} key={`${block.text}-${index}`}>{renderInline(block.text)}</h2>;
        }

        if (block.type === "list") {
          return (
            <ul key={`list-${index}`}>
              {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
            </ul>
          );
        }

        if (block.type === "quote") {
          return <blockquote className={`mdx-callout mdx-callout-${calloutType(block.text)}`} key={`${block.text}-${index}`}>{renderInline(block.text)}</blockquote>;
        }

        if (block.type === "code") {
          return (
            <pre key={`code-${index}`}>
              <code>{block.code}</code>
            </pre>
          );
        }

        if (block.type === "table") {
          return (
            <div className="mdx-table-wrap" key={`table-${index}`}>
              <table>
                <thead>
                  <tr>{block.headers.map((header) => <th key={header}>{renderInline(header)}</th>)}</tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "divider") {
          return <hr key={`divider-${index}`} />;
        }

        return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>;
      })}
    </article>
  );
}

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

type Block = ListBlock | ParagraphBlock | HeadingBlock | QuoteBlock | CodeBlock;

function parseMdx(source: string): Block[] {
  const blocks: Block[] = [];
  const lines = source.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
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

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
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

  return blocks;
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

export function MdxArticle({ source }: MdxArticleProps) {
  const blocks = parseMdx(source);

  return (
    <article className="blog-article optimized-article mdx-article">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 3) {
            return <h3 key={`${block.text}-${index}`}>{renderInline(block.text)}</h3>;
          }

          return <h2 key={`${block.text}-${index}`}>{renderInline(block.text)}</h2>;
        }

        if (block.type === "list") {
          return (
            <ul key={`list-${index}`}>
              {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
            </ul>
          );
        }

        if (block.type === "quote") {
          return <blockquote key={`${block.text}-${index}`}>{renderInline(block.text)}</blockquote>;
        }

        if (block.type === "code") {
          return (
            <pre key={`code-${index}`}>
              <code>{block.code}</code>
            </pre>
          );
        }

        return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>;
      })}
    </article>
  );
}

// @/components/MdxRenderer.tsx
// ⚠️ REMOVE 'use client' - This MUST be a Server Component

import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from 'next/dynamic';

import Callout from "@/components/Callout";
import YouTube from "@/components/YouTube";

const CodeBlock = dynamic(() => import("@/components/CodeBlock"), {
  loading: () => (
    <div className="h-40 bg-gray-100 animate-pulse rounded-lg my-4" />
  )
});

const Tabs = dynamic(() => import("@/components/Tabs").then(mod => mod.Tabs), {
  loading: () => (
    <div className="h-20 bg-gray-100 animate-pulse rounded-lg my-4" />
  )
});

const TabsList = dynamic(() =>
  import("@/components/Tabs").then(mod => mod.TabsList)
);

const TabsTrigger = dynamic(() =>
  import("@/components/Tabs").then(mod => mod.TabsTrigger)
);

const TabsContent = dynamic(() =>
  import("@/components/Tabs").then(mod => mod.TabsContent)
);

// ── All components defined at module scope to avoid SWC parse issues ──────────

function MdxH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-10 mb-4 scroll-mt-20 text-3xl font-bold tracking-tight text-[var(--reader-heading)]">
      {children}
    </h1>
  );
}

function MdxH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 mb-3 scroll-mt-20 border-b border-[var(--reader-border)] pb-2 text-2xl font-bold text-[var(--reader-heading)]">
      {children}
    </h2>
  );
}

function MdxH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 scroll-mt-20 text-xl font-bold text-[var(--reader-heading)]">
      {children}
    </h3>
  );
}

function MdxH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-4 mb-2 text-lg font-semibold text-[var(--reader-heading)]">
      {children}
    </h4>
  );
}

function MdxH5({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="mt-4 mb-1 text-base font-semibold uppercase tracking-wide text-[var(--reader-muted)]">
      {children}
    </h5>
  );
}

function MdxP({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 leading-7 text-[var(--reader-body)]">
      {children}
    </p>
  );
}

function MdxUl({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-4 ml-6 list-disc space-y-1.5 text-[var(--reader-body)] marker:text-[var(--reader-accent)]">
      {children}
    </ul>
  );
}

function MdxOl({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-4 ml-6 list-decimal space-y-1.5 text-[var(--reader-body)] marker:text-[var(--reader-accent)]">
      {children}
    </ol>
  );
}

function MdxLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="pl-1.5 leading-7">{children}</li>
  );
}

function MdxCode({ children, className }: { children: React.ReactNode; className?: string }) {
  const isInline = !className?.includes('language-');
  if (isInline) {
    return (
      <code className="rounded border border-[var(--reader-border)] bg-[var(--reader-inline-code-bg)] px-1.5 py-0.5 font-mono text-sm text-[var(--reader-inline-code-text)]">
        {children}
      </code>
    );
  }
  return <CodeBlock className={className}>{children}</CodeBlock>;
}

function MdxPre({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function MdxBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 rounded-r-lg border-l-4 border-[var(--reader-accent)] bg-[var(--reader-blockquote-bg)] px-4 py-3 pl-4 italic text-[var(--reader-body)]">
      {children}
    </blockquote>
  );
}

function MdxTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[var(--reader-border)] shadow-sm">
      <table className="min-w-full divide-y divide-[var(--reader-border)] text-sm">
        {children}
      </table>
    </div>
  );
}

function MdxThead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-[var(--reader-table-head)]">{children}</thead>;
}

function MdxTbody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-[var(--reader-border)] bg-[var(--reader-surface-soft)]/60">
      {children}
    </tbody>
  );
}

function MdxTr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="transition-colors hover:bg-[var(--reader-accent-soft)]">{children}</tr>
  );
}

function MdxTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--reader-heading)]">
      {children}
    </th>
  );
}

function MdxTd({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-sm align-top text-[var(--reader-body)]">{children}</td>
  );
}

function MdxA({ href, children }: { href?: string; children: React.ReactNode }) {
  const isExternal = href?.startsWith("http");
  const cls = [
    "text-[var(--reader-accent)]",
    "decoration-[var(--reader-muted)]",
    "underline",
    "underline-offset-4",
    "transition-colors",
    "hover:opacity-80",
  ].join(" ");

  return (
    <a
      href={href}
      className={cls}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}


function MdxStrong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-bold text-[var(--reader-heading)]">{children}</strong>
  );
}

function MdxEm({ children }: { children: React.ReactNode }) {
  return <em className="italic text-[var(--reader-body)]">{children}</em>;
}

function MdxHr() {
  return (
    <hr className="my-10 h-px border-0 bg-gradient-to-r from-transparent via-[var(--reader-border)] to-transparent" />
  );
}

function MdxDetails({ children }: { children: React.ReactNode }) {
  return (
    <details className="group my-4 overflow-hidden rounded-lg border border-[var(--reader-border)] bg-[var(--reader-surface-soft)]">
      {children}
    </details>
  );
}

function MdxSummary({ children }: { children: React.ReactNode }) {
  return (
    <summary className="list-none flex cursor-pointer select-none items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--reader-body)] transition-colors hover:bg-[var(--reader-accent-soft)]">
      <span>{children}</span>
      <svg
        className="h-4 w-4 shrink-0 text-[var(--reader-accent)] transition-transform duration-200 group-open:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </summary>
  );
}

// ── Components map ────────────────────────────────────────────────────────────

const components = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  p: MdxP,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  code: MdxCode,
  pre: MdxPre,
  blockquote: MdxBlockquote,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  a: MdxA,
  strong: MdxStrong,
  em: MdxEm,
  hr: MdxHr,
  details: MdxDetails,
  summary: MdxSummary,
  Callout,
  YouTube,
  CodeBlock,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};

// ── Renderer ──────────────────────────────────────────────────────────────────

export default function MdxRenderer({ source }: { source: string }) {
  return (
    <article className="max-w-none text-[#6A5058]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MDXRemote
          source={source}
          components={components}
          options={{
            parseFrontmatter: true,
          }}
        />
      </div>
    </article>
  );
}

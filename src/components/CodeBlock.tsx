"use client";

import { useState } from "react";

export default function CodeBlock({ children }: { children: any }) {
  const [copied, setCopied] = useState(false);

  const code =
    typeof children === "string"
      ? children
      : children?.props?.children ?? "";

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="relative my-6">
      {/* Copy button */}
      <button
        onClick={copy}
        className="
          absolute right-3 top-3 z-10
          rounded-md border border-slate-300
          bg-white px-2 py-1 text-xs font-medium text-slate-600
          hover:bg-slate-100
        "
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre
        className="
          overflow-x-auto rounded-xl
          border border-slate-300
          bg-slate-100
          px-4 py-4
          text-sm leading-6
          text-slate-900
        "
      >
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

// src/components/TrackHeader.tsx
"use client";

import Link from "next/link";
import HeaderAuthButton from "@/components/HeaderAuthButton";

export default function TrackHeader() {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6">
      {/* Left: cppvalley logo */}
      <Link
        href="/"
        className="flex items-center gap-2 font-mono tracking-wide text-gray-900 hover:text-gray-700"
      >
        <span>
          <span className="text-blue-600">cpp</span>
          valley
          <span className="ml-1 text-blue-600/90">_</span>
        </span>
        <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5">
          v0.1
        </span>
      </Link>

      <div className="flex-1" />

      {/* Right: Auth */}
      <div className="flex items-center gap-3">
        <HeaderAuthButton />
      </div>
    </div>
  );
}

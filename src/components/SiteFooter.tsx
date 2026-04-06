// src/components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">
            <span className="text-[#9B1C3A]">cpp</span>
            <span className="text-gray-900">valley</span>
          </span>
          <span className="text-xs text-gray-400">
            Systems-first C++ interview mastery
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link className="text-sm text-gray-400 hover:text-gray-700 transition-colors" href="/learn/tracks">
            Courses
          </Link>
        </div>

      </div>
    </footer>
  );
}

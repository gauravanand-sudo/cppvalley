// src/components/SiteFooter.tsx
import Link from "next/link";
import GoogleAdSlot from "@/components/GoogleAdSlot";

const FOOTER_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SITE_FOOTER;

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-5xl px-6 pt-3">
        <GoogleAdSlot
          slot={FOOTER_AD_SLOT}
          className="mb-2"
          label="Sponsored"
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-2 flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">
          <span className="font-bold text-sm">
            <span className="text-[#9B1C3A]">cpp</span>
            <span className="text-gray-900">valley</span>
          </span>
          <span className="text-xs text-gray-400">
            Systems-first C++ interview mastery
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link className="text-sm text-gray-400 hover:text-gray-700 transition-colors" href="/">
            Home
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-700 transition-colors" href="/learn/tracks">
            Courses
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-700 transition-colors" href="/blog">
            Blog
          </Link>
        </div>

      </div>

      <div className="mx-auto max-w-5xl px-6 pb-2 text-center text-[10px] text-gray-400">
        Made with <span className="text-[#9B1C3A]">♥</span> by HFT/Systems/EDA Experts
      </div>
    </footer>
  );
}

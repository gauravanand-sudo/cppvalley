import Link from "next/link";
import HeaderAuthButton from "@/components/HeaderAuthButton";
import GoogleAdSlot from "@/components/GoogleAdSlot";

const HEADER_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SITE_HEADER;

export default function SiteHeader() {
  return (
    <>
      <div className="h-[61px]" />

      <header className="fixed inset-x-0 top-0 z-[140] border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">

          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight sm:text-base">
                <span className="text-[#9B1C3A]">cpp</span>
                <span className="text-gray-900">valley</span>
              </span>
              <span className="rounded border border-gray-200 px-1.5 py-0.5 font-mono text-[9px] text-gray-400">
                v0.1
              </span>
            </div>
            <span
              className="hidden rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] lg:inline"
              style={{
                borderColor: "rgba(212, 104, 134, 0.35)",
                color: "#d46886",
                background:
                  "linear-gradient(180deg, rgba(212, 104, 134, 0.12) 0%, rgba(212, 104, 134, 0.06) 100%)",
                boxShadow: "0 0 18px rgba(212, 104, 134, 0.18), inset 0 0 18px rgba(212, 104, 134, 0.06)",
              }}
            >
              Zero to architect level
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border border-[#9B1C3A]/20 bg-[#9B1C3A]/8 px-2 py-1 text-[10px] font-semibold text-[#9B1C3A] transition-colors hover:bg-[#9B1C3A]/14 sm:px-2.5 sm:text-[11px]"
            >
              Home
            </Link>
            <Link
              href="/learn/tracks"
              className="inline-flex items-center gap-1 rounded-full border border-[#9B1C3A]/20 bg-[#9B1C3A]/8 px-2 py-1 text-[10px] font-semibold text-[#9B1C3A] transition-colors hover:bg-[#9B1C3A]/14 sm:px-2.5 sm:text-[11px]"
            >
              Courses
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 rounded-full border border-[#9B1C3A]/20 bg-[#9B1C3A]/8 px-2 py-1 text-[10px] font-semibold text-[#9B1C3A] transition-colors hover:bg-[#9B1C3A]/14 sm:px-2.5 sm:text-[11px]"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <HeaderAuthButton />
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-2 pt-3 sm:px-6">
        <GoogleAdSlot
          slot={HEADER_AD_SLOT}
          label="Sponsored"
        />
      </div>
    </>
  );
}

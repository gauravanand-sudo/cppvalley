import Link from "next/link";
import { ChevronDown } from "lucide-react";
import HeaderAuthButton from "@/components/HeaderAuthButton";
import GoogleAdSlot from "@/components/GoogleAdSlot";

const HEADER_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SITE_HEADER;

const COURSE_ITEMS = [
  { label: "Core C++ for Interviews", href: "/learn/tracks/core-cpp-for-interviews", blurb: "Modern C++ depth for tough interviews" },
  { label: "Low Latency & Systems", href: "/learn/tracks/low-latency-and-systems", blurb: "Performance, caches, lock-free, profiling" },
];

export default function SiteHeader() {
  return (
    <>
      <div className="h-[68px]" />

      <header className="fixed inset-x-0 top-0 z-[140] border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">

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

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-[#F7EFF2] hover:text-[#7F1730]"
            >
              Home
            </Link>
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-[#F7EFF2] hover:text-[#7F1730]"
              >
                Courses
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full z-50 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-[340px] rounded-[1.5rem] border border-[#E9DCE1] bg-white p-3 shadow-[0_24px_60px_rgba(41,18,25,0.12)]">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A06A7B]">
                    Courses
                  </div>
                  <div className="mt-2 space-y-1">
                    <Link
                      href="/learn/tracks"
                      className="block rounded-2xl px-3 py-3 transition hover:bg-[#FBF5F7]"
                    >
                      <div className="text-sm font-semibold text-[#24171B]">All courses</div>
                      <div className="mt-1 text-xs leading-5 text-[#7E6871]">Browse the full cppvalley course catalog.</div>
                    </Link>
                    {COURSE_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-2xl px-3 py-3 transition hover:bg-[#FBF5F7]"
                      >
                        <div className="text-sm font-semibold text-[#24171B]">{item.label}</div>
                        <div className="mt-1 text-xs leading-5 text-[#7E6871]">{item.blurb}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-[#F7EFF2] hover:text-[#7F1730]"
            >
              Blog
            </Link>
            <Link
              href="/interviews"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-[#F7EFF2] hover:text-[#7F1730]"
            >
              Interviews
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-[#F7EFF2] hover:text-[#7F1730]"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/learn/tracks/core-cpp-for-interviews/what-happens-when-you-compile-cpp"
              className="hidden rounded-full border border-[#D8BDC6] bg-[#FCF5F7] px-3 py-1.5 text-xs font-semibold text-[#7F1730] transition hover:border-[#C69EAB] hover:bg-[#F8ECEF] sm:inline-flex"
            >
              Start Free
            </Link>
            <HeaderAuthButton />
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-2 pt-3 sm:px-6">
        <GoogleAdSlot
          slot={HEADER_AD_SLOT}
          label="Sponsored"
        />
      </div>
    </>
  );
}

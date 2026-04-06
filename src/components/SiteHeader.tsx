import Link from "next/link";
import HeaderAuthButton from "@/components/HeaderAuthButton";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight">
              <span className="text-[#9B1C3A]">cpp</span>
              <span className="text-gray-900">valley</span>
            </span>
            <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 font-mono">
              v0.1
            </span>
          </div>
          <span
            className="hidden rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:inline"
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

        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/learn/tracks"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#9B1C3A]/20 bg-[#9B1C3A]/8 px-3 py-1.5 text-xs font-semibold text-[#9B1C3A] transition-colors hover:bg-[#9B1C3A]/14"
          >
            Courses
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <HeaderAuthButton />
        </div>

      </div>
    </header>
  );
}

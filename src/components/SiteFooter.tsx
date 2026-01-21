import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        
        <div className="text-sm text-gray-600">
          <span className="font-mono text-gray-900">
            <span className="text-green-500/100">cpp</span>
            valley
            <span className="ml-1 text-blue-600/90">_</span>
          </span>{" "}
          <span className="text-[10px] text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5">
            systems-first interview mastery (EDA • HFT • low latency)
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <Link className="hover:text-gray-900" href="/learn/tracks">
            Tracks
          </Link>
          <Link className="hover:text-gray-900" href="/interviews">
            Interviews
          </Link>
          <Link className="hover:text-gray-900" href="/conferences">
            Conferences
          </Link>
          <Link className="hover:text-gray-900" href="/pricing">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
}
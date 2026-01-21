// src/app/page.tsx - COMPLETE (Light theme, MDX-driven lists, moving companies ticker + terminal restored)
import RegularPageLayout from "@/components/RegularPageLayout";
import Link from "next/link";
import { listContent, listTracks } from "@/lib/content";
import {
  CompaniesTicker,
  CodePreviewTerminal,
  CppJargonsTicker,
  SuccessMetrics,
} from "@/components/home/HomeClientBits";
import { ChevronRight, Play } from "lucide-react";

export default function HomePage() {
  // MDX-driven (no hardcoding)
  const tracks = listTracks().sort((a, b) => (a.title > b.title ? 1 : -1));
  const conferences = listContent("conferences")
    .slice(0, 6)
    .sort((a, b) => (a.date && b.date ? (a.date < b.date ? 1 : -1) : 0));
  const interviews = listContent("interviews").slice(0, 6);

  return (
    <RegularPageLayout>
      <div className="min-h-screen bg-white text-gray-900">
        {/* Topics ticker (moving) */}
        <CppJargonsTicker />

        {/* Hero */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                {/* USP Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-mono text-gray-700">
                    CRASH ANY C++ SYSTEMS INTERVIEW
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  <span className="text-gray-900">C++ Systems</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-violet-600">
                    Interview Mastery
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                  Master the C++ that actually matters in systems interviews.
                  Virtual tables, memory models, concurrency, and performance
                  optimizations that separate seniors from junior engineers.
                </p>

                {/* Success metrics (restored) */}
                <div className="mb-8">
                  <SuccessMetrics />
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/learn/tracks/60-day-cpp-interview"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold hover:from-emerald-700 hover:to-cyan-700 transition-all rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-500/10 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/18 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Play className="w-5 h-5 mr-2 relative" />
                    <span className="relative">START 60-DAY MASTERY</span>
                  </Link>

                  <Link
                    href="/learn/tracks"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition rounded-lg shadow-sm"
                  >
                    Browse tracks
                  </Link>
                </div>
              </div>

              {/* Terminal (restored) */}
              <CodePreviewTerminal />
            </div>
          </div>
        </div>

        {/* Companies ticker (moving like topic ticker) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="text-sm text-gray-700 font-mono">
                PLACEMENTS AT
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Where You Will Land
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Companies glide just like the topics ticker.
            </p>
          </div>

          <CompaniesTicker />
        </div>

        {/* Tracks (MDX-driven) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-mono text-gray-600">
                  SPECIALIZED TRACKS
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Master Production-Grade C++
              </h2>
            </div>

            <Link
              href="/learn/tracks"
              className="text-cyan-700 hover:text-cyan-900 font-mono text-sm"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {tracks.slice(0, 4).map((t) => {
              const live = (t as any).live !== false;

              return live ? (
                <Link
                  key={t.slug}
                  href={`/learn/tracks/${t.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors group cursor-pointer shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono text-gray-600">
                          {t.duration ?? "track"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {t.title}
                      </h3>
                    </div>

                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
                      {(t.access ?? "free").toUpperCase()}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {t.description ?? "Track overview → syllabus → start reading."}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {t.level ?? "All levels"} • Live
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium">
                      <span>Open Track</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={t.slug}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 cursor-not-allowed opacity-80 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <span className="text-xs font-mono text-gray-500">
                          {t.duration ?? "track"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-700">
                        {t.title}
                      </h3>
                    </div>

                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-600 border border-gray-200">
                      COMING SOON
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {t.description ?? "Launching soon."}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {t.level ?? "All levels"} • Soon
                    </div>
                    <div className="text-gray-600 font-medium">Not clickable</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conferences (MDX-driven cards) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                <span className="text-sm font-mono text-gray-600">
                  CONFERENCES
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Keynotes, Talks, Takeaways
              </h2>
            </div>

            <Link
              href="/conferences"
              className="text-cyan-700 hover:text-cyan-900 font-mono text-sm"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {conferences.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/conferences/${c.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors group shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
                    CONFERENCE
                  </div>
                  <div className="text-gray-400 group-hover:text-cyan-700 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-800 transition-colors line-clamp-2">
                  {c.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {c.description ?? "Summary notes from the conference session."}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Interviews (MDX-driven cards) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                <span className="text-sm font-mono text-gray-600">
                  INTERVIEWS
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Real Interview Scenarios
              </h2>
            </div>
            <Link
              href="/interviews"
              className="text-cyan-700 hover:text-cyan-900 font-mono text-sm"
            >
              VIEW ARCHIVE →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {interviews.slice(0, 3).map((i) => (
              <Link
                key={i.slug}
                href={`/interviews/${i.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors group shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
                    INTERVIEW
                  </div>
                  <div className="text-gray-400 group-hover:text-cyan-700 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-800 transition-colors line-clamp-2">
                  {i.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {i.description ?? "Real interview experience and breakdown."}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-mono text-gray-700">
                COHORT STARTS SOON
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="block">Master the C++ That Gets You</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                Senior & Staff Level Offers
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join engineers who've cracked systems interviews at top companies
              with our production-focused curriculum.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn/tracks/60-day-cpp-interview"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold hover:from-emerald-700 hover:to-cyan-700 transition-all rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
              >
                <Play className="w-5 h-5 mr-2" />
                ENROLL IN 60-DAY MASTERY
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-100 transition rounded-lg shadow-sm"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RegularPageLayout>
  );
}

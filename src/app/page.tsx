import Link from "next/link";
import { ArrowRight, Unlock } from "lucide-react";
import RegularPageLayout from "@/components/RegularPageLayout";
import GoogleAdSlot from "@/components/GoogleAdSlot";
import { listContent, listTracks } from "@/lib/content";

const COURSE_SLUGS = [
  "core-cpp-for-interviews",
  "low-latency-and-systems",
  "design-pattern-mastery-eda",
];
const HOME_HERO_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME_HERO;

const COURSE_META: Record<
  string,
  {
    price: string;
    tagline: string;
    modules: string[];
    firstFreeSlug: string;
    visual: { label: string; color: string };
  }
> = {
  "core-cpp-for-interviews": {
    price: "₹899",
    tagline:
      "RAII, value categories, object model, templates, STL internals, concurrency, UB, and coding-round depth for serious loops.",
    modules: ["Ownership", "Move semantics", "OOP internals", "Templates", "Concurrency"],
    firstFreeSlug: "what-happens-when-you-compile-cpp",
    visual: { label: "Core C++", color: "#9B1C3A" },
  },
  "low-latency-and-systems": {
    price: "₹599",
    tagline:
      "Cache hierarchy, atomics, lock-free queues, allocators, perf, and throughput-first reasoning for HFT and systems roles.",
    modules: ["CPU & Cache", "Lock-free", "Allocators", "Profiling", "Systems design"],
    firstFreeSlug: "cache-hierarchy",
    visual: { label: "Low Latency", color: "#1C5E4A" },
  },
  "design-pattern-mastery-eda": {
    price: "Free",
    tagline:
      "SOLID, creational, structural, behavioural, concurrency, and architecture patterns taught with C++ interview depth and systems context.",
    modules: ["SOLID", "Creational", "Structural", "Behavioural", "Architecture"],
    firstFreeSlug: "what-is-a-design-pattern",
    visual: { label: "Patterns", color: "#7A4A12" },
  },
};

function formatDate(date?: string) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function SectionTitle({
  label,
  title,
  href,
}: {
  label: string;
  title: string;
  href: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A17380]">{label}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#171216]">{title}</h2>
      </div>
      <Link href={href} className="text-sm font-semibold text-[#7F1730] transition hover:opacity-70">
        View all
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const allTracks = listTracks();
  const courses = COURSE_SLUGS.map((slug) => allTracks.find((track) => track.slug === slug)).filter(Boolean);
  const blogPosts = listContent("blog").slice(0, 3);
  const interviewPosts = listContent("interviews").slice(0, 3);

  return (
    <RegularPageLayout>
      <div className="bg-[#F6F1F2] text-[#171216]">
        <section className="border-b border-[#E8DDE1] bg-[linear-gradient(180deg,#FFFDFC_0%,#F6F1F2_100%)]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:py-20">
            <div className="inline-flex rounded-full border border-[#E3D4D9] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9B1C3A]">
              cppvalley
            </div>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Crack elite C++ interviews with systems-grade preparation.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6B5960]">
              Ownership semantics, template mechanics, STL internals, atomics, cache behavior, allocators, and the exact jargon-rich concepts that strong hiring loops use to cut candidates.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/learn/tracks"
                className="inline-flex items-center gap-2 rounded-full bg-[#9B1C3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#861733]"
              >
                Explore courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[#D7C2C8] bg-white px-5 py-3 text-sm font-semibold text-[#7F1730] transition hover:bg-[#FCF7F8]"
              >
                Read the blog
              </Link>
              <Link
                href="/interviews"
                className="inline-flex items-center gap-2 rounded-full border border-[#D7C2C8] bg-white px-5 py-3 text-sm font-semibold text-[#7F1730] transition hover:bg-[#FCF7F8]"
              >
                See interviews
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <GoogleAdSlot slot={HOME_HERO_AD_SLOT} label="Sponsored" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14">
          <SectionTitle label="Courses" title="Start with the highest-signal learning paths." href="/learn/tracks" />

          <div className="grid gap-5 md:grid-cols-2">
            {courses.map((track) => {
              if (!track) return null;
              const meta = COURSE_META[track.slug];
              return (
                <div
                  key={track.slug}
                  className="overflow-hidden rounded-[1.75rem] border border-[#E2D8DC] bg-white shadow-sm"
                >
                  <div className="relative bg-[#1C1519] p-5 text-white">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ backgroundColor: meta.visual.color }}
                      >
                        {meta.visual.label}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {meta.price}
                      </span>
                    </div>
                    <div className="relative mt-5 text-2xl font-semibold">{track.title}</div>
                    <p className="relative mt-3 text-sm leading-7 text-white/72">{meta.tagline}</p>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex items-center gap-2 text-[12px] text-[#2A7A5E]">
                      <Unlock className="h-3.5 w-3.5" />
                      <span>Free lessons before full track unlock</span>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {meta.modules.map((module) => (
                        <span
                          key={module}
                          className="rounded-full border border-[#E3D9DD] bg-[#F8F4F5] px-2.5 py-1 text-[11px] text-[#7B666E]"
                        >
                          {module}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link
                        href={`/learn/tracks/${track.slug}/${meta.firstFreeSlug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9B1C3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#861733]"
                      >
                        Start free
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/learn/tracks/${track.slug}`}
                        className="inline-flex items-center justify-center rounded-full border border-[#D7C2C8] px-4 py-3 text-sm font-semibold text-[#7F1730] transition hover:bg-[#FCF7F8]"
                      >
                        View course
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#E8DDE1] bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <SectionTitle label="Blog" title="Keep sharpening the edge between deep study blocks." href="/blog" />

            <div className="grid gap-5 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[1.5rem] border border-[#E6DCE0] bg-[#FBF8F9] p-5 transition hover:border-[#D8C3CA] hover:bg-white"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B6070]">
                    {formatDate(post.date)}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-[#1E1518]">{post.title}</div>
                  {post.description ? (
                    <p className="mt-3 text-sm leading-7 text-[#6D5860]">{post.description}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-14">
          <SectionTitle label="Interviews" title="Use real interview loops to calibrate your preparation." href="/interviews" />

          <div className="grid gap-4">
            {interviewPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/interviews/${post.slug}`}
                className="rounded-[1.5rem] border border-[#E3D8DD] bg-white p-5 transition hover:border-[#D3BEC6] hover:bg-[#FCFAFA]"
              >
                <div className="text-lg font-semibold text-[#1E1518]">{post.title}</div>
                {post.description ? (
                  <p className="mt-2 text-sm leading-7 text-[#6D5860]">{post.description}</p>
                ) : null}
                <div className="mt-3 text-xs font-mono text-[#9B8690]">{formatDate(post.date)}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </RegularPageLayout>
  );
}

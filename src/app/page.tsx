import RegularPageLayout from "@/components/RegularPageLayout";
import GoogleAdSlot from "@/components/GoogleAdSlot";
import Link from "next/link";
import { listTracks } from "@/lib/content";
import { ArrowRight, Unlock } from "lucide-react";

const COURSE_SLUGS = ["core-cpp-for-interviews", "low-latency-and-systems"];
const HOME_HERO_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME_HERO;
const HOME_SECTION_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME_SECTION;

const COURSE_META: Record<string, {
  lessons: number;
  free: number;
  price: string;
  tagline: string;
  modules: string[];
  keywords: string[];
  firstFreeSlug: string;
  visual: { label: string; color: string };
  syllabus: { module: string; topics: string[] }[];
}> = {
  "core-cpp-for-interviews": {
    lessons: 97,
    free: 5,
    price: "₹899",
    tagline: "Every concept C++ interviewers test — memory, OOP, templates, STL, concurrency, UB, and 7 live coding builds.",
    modules: ["Memory & Ownership", "Move Semantics", "OOP & vtables", "Templates", "STL", "Concurrency", "Build from Scratch"],
    keywords: ["RAII", "vtables", "move semantics", "smart pointers", "SFINAE", "lock_guard", "placement new", "type erasure"],
    firstFreeSlug: "what-happens-when-you-compile-cpp",
    visual: { label: "Core C++", color: "#9B1C3A" },
    syllabus: [
      {
        module: "C++ Fundamentals",
        topics: ["Compilation pipeline", "Stack vs Heap", "Pointers vs References", "const correctness", "4 meanings of static", "volatile vs atomic", "extern & linkage", "sizeof traps", "ODR rule", "Header files & TUs"],
      },
      {
        module: "Memory & Ownership",
        topics: ["RAII", "Stack unwinding", "new/delete vs malloc/free", "unique_ptr · shared_ptr · weak_ptr", "make_shared vs new", "shared_ptr thread-safety trap", "Dangling pointers", "Memory leaks", "Rule of 3 / 5 / 0", "Copy elision & RVO", "Alignment & padding", "placement new"],
      },
      {
        module: "Move Semantics",
        topics: ["lvalues · rvalues · xvalues", "Move constructor from scratch", "std::move is just a cast", "std::forward & perfect forwarding", "Compiler-generated move ops", "Moved-from state", "noexcept on move"],
      },
      {
        module: "OOP in C++",
        topics: ["Constructors deep dive", "Virtual destructors", "Public vs Protected vs Private inheritance", "How vtables work internally", "Pure virtual & abstract classes", "override and final", "Object slicing", "Diamond problem", "static_cast · dynamic_cast · const_cast · reinterpret_cast", "Operator overloading", "mutable keyword"],
      },
      {
        module: "Templates",
        topics: ["Function & class templates", "Template type deduction", "Full & partial specialization", "constexpr & consteval", "Variadic templates", "SFINAE", "std::enable_if", "Concepts (C++20)", "CRTP", "type_traits"],
      },
      {
        module: "STL Mastery",
        topics: ["vector internals & reallocation", "list vs deque vs array", "map vs unordered_map", "Iterator invalidation", "Iterator categories", "sort · find · transform", "string_view", "optional & variant", "Custom comparators", "std::span"],
      },
      {
        module: "Modern C++",
        topics: ["auto type deduction", "Lambda captures & closures", "Range-based for internals", "Brace initialization quirks", "nullptr vs NULL", "enum class vs enum", "if constexpr", "Structured bindings", "std::initializer_list"],
      },
      {
        module: "Exception Handling",
        topics: ["try / catch / throw", "Basic · Strong · Nothrow guarantees", "noexcept & performance", "Stack unwinding on exceptions", "When NOT to use exceptions", "std::terminate vs std::abort"],
      },
      {
        module: "Undefined Behavior",
        topics: ["What UB really means", "Signed integer overflow", "Use-after-free", "Uninitialized variables", "Out-of-bounds access", "Strict aliasing violations", "Data races as UB", "ASan · UBSan · Valgrind"],
      },
      {
        module: "Concurrency",
        topics: ["std::thread · join · detach", "mutex & lock_guard", "Deadlock prevention", "condition_variable", "std::atomic basics", "Memory ordering simplified", "shared_mutex", "async · future · promise", "thread_local"],
      },
      {
        module: "Design Patterns",
        topics: ["Thread-safe Singleton", "Factory pattern", "Observer pattern", "PIMPL idiom", "Strategy with std::function", "Type erasure"],
      },
      {
        module: "Build from Scratch",
        topics: ["shared_ptr with ref counting", "unique_ptr with custom deleter", "Thread-safe queue", "Memory pool allocator", "std::vector from scratch", "LRU cache", "Spin lock with atomics"],
      },
    ],
  },
  "low-latency-and-systems": {
    lessons: 28,
    free: 5,
    price: "₹599",
    tagline: "Cache lines, lock-free queues, custom allocators, profiling tools — for HFT, systems, and performance engineering roles.",
    modules: ["CPU & Cache", "Lock-Free Programming", "Memory Allocators", "Profiling", "Systems Design"],
    keywords: ["cache lines", "false sharing", "CAS loops", "atomics", "pool allocator", "ring buffer", "flamegraphs", "perf"],
    firstFreeSlug: "cache-hierarchy",
    visual: { label: "Low Latency", color: "#1C5E4A" },
    syllabus: [
      {
        module: "CPU & Memory",
        topics: ["L1 / L2 / L3 cache hierarchy", "Cache-friendly data structures", "AoS vs SoA layout", "False sharing & alignas(64)", "Branch prediction & misprediction cost", "MESI protocol basics"],
      },
      {
        module: "Lock-Free Programming",
        topics: ["std::atomic operations", "relaxed · acquire · release · seq_cst", "compare_exchange strong vs weak", "Lock-free SPSC queue", "ABA problem & tagged pointers", "Hazard pointers overview"],
      },
      {
        module: "Memory Allocators",
        topics: ["Why malloc is slow", "Fragmentation & lock contention", "Fixed-size pool allocator", "Bump-pointer arena allocator", "Thread-local caches", "pmr allocator interface"],
      },
      {
        module: "Profiling Tools",
        topics: ["Linux perf & PMU counters", "Google Benchmark setup", "Preventing dead-code elimination", "Reading benchmark output", "Generating flamegraphs", "Interpreting call stacks"],
      },
      {
        module: "Systems Design",
        topics: ["Cache-line-aligned ring buffer", "High-throughput inter-thread comms", "Zero dynamic allocation design", "Power-of-2 sizing & masking", "Producer-consumer without locks"],
      },
    ],
  },
};

export default async function HomePage() {
  const allTracks = listTracks();
  const courses = COURSE_SLUGS.map((slug) => allTracks.find((t) => t.slug === slug)).filter(Boolean);

  return (
    <RegularPageLayout>
      <div className="bg-[#F7F4F2] text-[#1A1215]">

        {/* Hero text */}
        <div className="mx-auto max-w-4xl px-5 pb-8 pt-14 text-center sm:pt-20">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9B6070]">
            C++ Interview Preparation
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1215] sm:text-4xl">
            The only two courses you need<br className="hidden sm:block" /> to pass a C++ interview.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#7A6068]">
            Start with 5 free lessons per course. No account needed. Go deeper when you're ready.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-8">
          <GoogleAdSlot
            slot={HOME_HERO_AD_SLOT}
            label="Sponsored"
            className="mx-auto max-w-3xl"
          />
        </div>

        {/* Cards */}
        <div className="mx-auto max-w-4xl px-5 pb-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {courses.map((track) => {
              if (!track) return null;
              const meta = COURSE_META[track.slug];
              const price = track.price ? `₹${track.price}` : "Free";

              return (
                <div key={track.slug} className="flex flex-col overflow-hidden rounded-[1.5rem] border border-[#E2D8DC] bg-white shadow-sm">

                  {/* Visual header */}
                  <div className="relative flex h-36 flex-col justify-between overflow-hidden bg-[#1E1418] p-5">
                    {/* Grid lines */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    {/* Glow */}
                    <div
                      className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                      style={{ backgroundColor: `${meta.visual.color}50` }}
                    />
                    {/* Label */}
                    <span
                      className="relative z-10 self-start rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
                      style={{ backgroundColor: meta.visual.color }}
                    >
                      {meta.visual.label}
                    </span>
                    {/* Keyword chips */}
                    <div className="relative z-10 flex flex-wrap gap-1.5">
                      {meta.keywords.map((k) => (
                        <span
                          key={k}
                          className="rounded border border-white/15 bg-white/[0.08] px-2 py-0.5 font-mono text-[9px] text-white/70"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h2 className="text-base font-bold text-[#1A1215] sm:text-lg">{track.title}</h2>
                      <span className="shrink-0 rounded-full border border-[#9B1C3A]/20 bg-[#9B1C3A]/8 px-2.5 py-0.5 text-[10px] font-bold text-[#9B1C3A]">
                        {price}
                      </span>
                    </div>

                    <p className="mb-4 text-[12px] leading-5 text-[#7A6068]">
                      {meta.tagline}
                    </p>

                    {/* Module pills */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {meta.modules.map((m) => (
                        <span key={m} className="rounded-full border border-[#E2D8DC] bg-[#F7F4F2] px-2 py-0.5 text-[10px] text-[#8A7078]">
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Free preview note */}
                    <div className="mb-4 flex items-center gap-1.5 text-[11px] text-[#2A7A5E]">
                      <Unlock className="h-3 w-3" />
                      <span>First 5 lessons free — no account needed</span>
                    </div>

                    {/* Stats row */}
                    <div className="mb-4 text-[11px] text-[#9A8890]">
                      {meta.lessons} lessons · {meta.modules.length} modules
                    </div>

                    {/* CTAs */}
                    <div className="mt-auto flex flex-col gap-2">
                      <Link
                        href={`/learn/tracks/${track.slug}/${meta.firstFreeSlug}`}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#9B1C3A] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#861733]"
                      >
                        Start free lesson
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/learn/tracks/${track.slug}`}
                        className="flex items-center justify-center rounded-full border border-[#E2D8DC] py-2.5 text-[11px] font-medium text-[#8A7078] transition hover:border-[#C9B0BA] hover:text-[#5A4048]"
                      >
                        View full syllabus
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-10">
          <GoogleAdSlot
            slot={HOME_SECTION_AD_SLOT}
            label="Advertisement"
          />
        </div>

        {/* Persuasion strip */}
        <div className="border-t border-[#E2D8DC] bg-white">
          <div className="mx-auto max-w-4xl px-5 py-10">
            <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A8890]">
              Why engineers choose cppvalley
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Targeted at real interviews",
                  body: "Every lesson maps to a question that gets asked at Google, Meta, Bloomberg, Citadel, or HFT firms. No filler.",
                },
                {
                  title: "Start free, go deep",
                  body: "5 free lessons per course, no account needed. Read before you commit. Every paid lesson is worth it.",
                },
                {
                  title: "Built for the hard roles",
                  body: "NVIDIA, Jane Street, Jump Trading, Synopsys — the companies that grill C++ hardest. We prep for those.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#EDE5E9] bg-[#F7F4F2] p-4">
                  <p className="mb-1.5 text-[12px] font-semibold text-[#3A2830]">{item.title}</p>
                  <p className="text-[11px] leading-5 text-[#8A7078]">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-[11px] text-[#B0A0A8]">
              Launch pricing · <span className="text-[#7A5060]">Core C++ ₹899</span> · <span className="text-[#7A5060]">Low Latency ₹599</span> · Prices go up after early access ends
            </p>
          </div>
        </div>

      </div>
    </RegularPageLayout>
  );
}

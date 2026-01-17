import Link from "next/link";

const tracks = [
  {
    title: "60-Day C++ Systems Mastery",
    slug: "60-day-cpp-interview",
    duration: "60 days",
    level: "Advanced",
    access: "Premium",
    bullets: ["ABI & Object Model", "Concurrency & Memory Model", "Lock-Free Design", "Low-Latency Performance"],
    accent: "cyan",
  },
  {
    title: "Low-Latency C++ for HFT",
    slug: "low-latency-hft",
    duration: "30–45 days",
    level: "Advanced",
    access: "Premium",
    bullets: ["Latency budgets", "Ring buffers", "NUMA & cache", "Micro-benchmarking"],
    accent: "cyan",
  },
  {
    title: "EDA Simulation Kernel Deep Dive",
    slug: "eda-sim-kernel",
    duration: "30 days",
    level: "Advanced",
    access: "Premium",
    bullets: ["Event queues", "Delta cycles", "Scheduling", "Perf pitfalls"],
    accent: "green",
  },
  {
    title: "Templates & Compile-Time Mastery",
    slug: "templates-mastery",
    duration: "21–30 days",
    level: "Advanced",
    access: "Premium",
    bullets: ["Instantiation model", "SFINAE → Concepts", "constexpr/consteval", "Type traits"],
    accent: "amber",
  },
];

const interviews = [
  {
    title: "Siemens EDA / Questa-style Loop",
    slug: "siemens-eda-questa",
    tag: "EDA",
    desc: "What they actually test: object model, concurrency, toolchain, debugging depth.",
  },
  {
    title: "ABI Breakages During Porting",
    slug: "abi-porting-war-stories",
    tag: "Systems",
    desc: "Real ABI failure patterns and how to explain fixes like an architect.",
  },
  {
    title: "Jane Street Thinking Style",
    slug: "jane-street-systems-thinking",
    tag: "HFT",
    desc: "How to communicate tradeoffs, latency vs throughput, and correctness constraints.",
  },
];

function AccentPill({ children, tone }: { children: React.ReactNode; tone: "cyan" | "green" | "amber" }) {
  const cls =
    tone === "cyan"
      ? "bg-cyan-500/10 text-cyan-200 ring-cyan-500/20"
      : tone === "green"
        ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20"
        : "bg-amber-500/10 text-amber-200 ring-amber-500/20";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ring-1 ${cls}`}>
      {children}
    </span>
  );
}

function GlowButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="relative inline-flex items-center justify-center rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400 transition"
    >
      <span className="absolute -inset-1 rounded-xl bg-cyan-400/25 blur-md" />
      <span className="relative">{children}</span>
    </Link>
  );
}

function HeroTerminal() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-emerald-500/10 to-amber-500/10 blur-2xl" />
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between text-xs text-white/70 font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
            <span className="ml-2">cppvalley://terminal</span>
          </div>
          <span>p99 matters.</span>
        </div>

        <div className="mt-4 grid gap-4">
          {/* Panel 1: HFT Latency */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Order Match Engine</div>
                <div className="mt-1 text-xs text-white/60 font-mono">latency profile (µs)</div>
              </div>
              <AccentPill tone="cyan">HFT</AccentPill>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 items-center">
              <div className="text-xs font-mono text-white/80 space-y-1">
                <div className="flex justify-between">
                  <span>p50</span>
                  <span className="text-cyan-200">12</span>
                </div>
                <div className="flex justify-between">
                  <span>p99</span>
                  <span className="text-cyan-200">184</span>
                </div>
                <div className="flex justify-between">
                  <span>p999</span>
                  <span className="text-cyan-200">412</span>
                </div>
              </div>

              <svg viewBox="0 0 200 60" className="w-full h-16">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(34,211,238,0.15)" />
                    <stop offset="1" stopColor="rgba(34,211,238,0.6)" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 45 L25 40 L40 44 L60 30 L80 34 L95 28 L115 35 L130 22 L150 26 L170 18 L195 20"
                  fill="none"
                  stroke="rgba(34,211,238,0.9)"
                  strokeWidth="2"
                />
                <path
                  d="M5 55 L5 45 L25 40 L40 44 L60 30 L80 34 L95 28 L115 35 L130 22 L150 26 L170 18 L195 20 L195 55 Z"
                  fill="url(#g1)"
                />
                <circle cx="170" cy="18" r="3.5" fill="rgba(34,211,238,0.95)" />
              </svg>
            </div>
          </div>

          {/* Panel 2: EDA waveform */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Waveform View</div>
                <div className="mt-1 text-xs text-white/60 font-mono">clk/rst/valid/data</div>
              </div>
              <AccentPill tone="green">EDA</AccentPill>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-[60px_1fr] gap-3 text-xs font-mono">
                <div className="space-y-2 text-white/70">
                  <div>clk</div>
                  <div>rst</div>
                  <div>valid</div>
                  <div>data</div>
                </div>
                <svg viewBox="0 0 320 90" className="w-full h-20">
                  {/* clk */}
                  <path
                    d="M0 10 H20 V0 H40 V10 H60 V0 H80 V10 H100 V0 H120 V10 H140 V0 H160 V10 H180 V0 H200 V10 H220 V0 H240 V10 H260 V0 H280 V10 H300 V0 H320 V10"
                    fill="none"
                    stroke="rgba(52,211,153,0.9)"
                    strokeWidth="2"
                  />
                  {/* rst */}
                  <path
                    d="M0 35 H140 V25 H220 V35 H320"
                    fill="none"
                    stroke="rgba(52,211,153,0.65)"
                    strokeWidth="2"
                  />
                  {/* valid */}
                  <path
                    d="M0 60 H80 V50 H160 V60 H240 V50 H320 V60"
                    fill="none"
                    stroke="rgba(52,211,153,0.85)"
                    strokeWidth="2"
                  />
                  {/* data bus “steps” */}
                  <path
                    d="M0 85 H60 V75 H130 V85 H200 V75 H260 V85 H320"
                    fill="none"
                    stroke="rgba(52,211,153,0.55)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="mt-2 text-xs font-mono text-white/60">
                data: <span className="text-emerald-200">0011</span>{" "}
                <span className="text-white/30">→</span>{" "}
                <span className="text-emerald-200">1010</span>{" "}
                <span className="text-white/30">→</span>{" "}
                <span className="text-emerald-200">1100</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Systems warning */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-white">⚠ False Sharing Detected</div>
                <div className="mt-1 text-xs text-white/60 font-mono">cache-line contention</div>
              </div>
              <AccentPill tone="amber">Systems</AccentPill>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 items-center">
              <div className="text-xs font-mono text-white/80 space-y-1">
                <div className="flex justify-between">
                  <span>cache line</span>
                  <span className="text-amber-200">64B</span>
                </div>
                <div className="flex justify-between">
                  <span>threads</span>
                  <span className="text-amber-200">T3 ↔ T4</span>
                </div>
                <div className="flex justify-between">
                  <span>impact</span>
                  <span className="text-amber-200">p99 ↑</span>
                </div>
              </div>

              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 rounded-sm ${
                      i === 12 || i === 13 || i === 20 || i === 21
                        ? "bg-amber-300/70"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
	<div className="mt-4 text-xs font-mono text-white/60 space-y-1">
  		<div>hint: ABI is a contract.</div>
  		<div>note: cache line = 64 bytes.</div>
  		<div>warning: false sharing kills p99.</div>
  		<div>fact: templates instantiate at compile-time.</div>
	</div>

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* background grid + glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:100%_24px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono tracking-wide text-white/90 hover:text-white">
            <span className="text-cyan-300">cpp</span>valley
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link className="hover:text-white" href="/">Home</Link>
            <Link className="hover:text-white" href="/learn/tracks">Tracks</Link>
            <Link className="hover:text-white" href="/interviews">Interviews</Link>
            <Link className="hover:text-white" href="/conferences">Conferences</Link>
            <Link className="hover:text-white" href="/blog">Blog</Link>
            <Link className="hover:text-white" href="/pricing">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <GlowButton href="/learn/tracks">Start Track</GlowButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <AccentPill tone="cyan">HFT</AccentPill>
                <AccentPill tone="green">EDA</AccentPill>
                <AccentPill tone="amber">Low Latency</AccentPill>
                <AccentPill tone="cyan">Systems</AccentPill>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Master C++ Systems Interviews
              </h1>

              <p className="mt-3 text-lg text-white/70 font-mono">
                EDA • HFT • Low Latency • Big Tech
              </p>

              <p className="mt-5 text-white/70">
                Object model. ABI. Cache lines. Atomics. Lock-free thinking.
                We teach C++ the way interviewers actually test it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <GlowButton href="/learn/tracks/60-day-cpp-interview">
                  Start 60-Day Systems Track
                </GlowButton>
                <GlowButton href="/learn/tracks" variant="outline">
                  Browse All Tracks
                </GlowButton>
                <Link href="/interviews" className="text-sm text-white/70 hover:text-white self-center">
                  See real interview experiences →
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-white/60">
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  ABI & Object Layout
                </span>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  Concurrency & Atomics
                </span>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  Low-Latency Design
                </span>
              </div>

              <p className="mt-3 text-xs text-white/50">
                Built for Siemens EDA / Synopsys / Jane Street style interviews.
              </p>
            </div>

            <HeroTerminal />
          </div>
        </section>

<div className="relative overflow-hidden border-y border-white/10 bg-black/30">
  <div className="whitespace-nowrap animate-[scroll_25s_linear_infinite] py-2 text-xs font-mono text-white/60">
    <span className="mx-6">CACHE_LINE=64B</span>
    <span className="mx-6">p99 &gt; p50</span>
    <span className="mx-6">LOCK_FREE != FAST</span>
    <span className="mx-6">ABI_BREAKAGE</span>
    <span className="mx-6">TEMPLATE_INSTANTIATION</span>
    <span className="mx-6">NUMA_LOCALITY</span>
    <span className="mx-6">HAPPENS_BEFORE</span>
    <span className="mx-6">FALSE_SHARING</span>
  </div>
</div>


        {/* Tracks */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">Choose Your Track</h2>
              <p className="mt-1 text-white/60 text-sm">
                Tracks are structured like Grokking: left syllabus + step-by-step lessons + locked/free flow.
              </p>
            </div>
            <Link href="/learn/tracks" className="text-sm text-white/70 hover:text-white">
              View all tracks →
            </Link>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {tracks.map((t) => (
              <Link
                key={t.slug}
                href={t.slug === "60-day-cpp-interview" ? `/learn/tracks/${t.slug}` : "/learn/tracks"}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{t.title}</div>
                    <div className="mt-1 text-xs font-mono text-white/60">
                      {t.duration} • {t.level}
                    </div>
                  </div>
                  <AccentPill tone={t.accent as any}>{t.access}</AccentPill>
                </div>

                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white/60" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-sm text-white/70 group-hover:text-white">
                  View track →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-bold">Why cppvalley feels different</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-mono text-cyan-200">INTERVIEW-FIRST</div>
              <div className="mt-2 font-semibold">Teach what actually gets asked</div>
              <p className="mt-2 text-sm text-white/70">
                Not textbook completeness. We focus on how interviewers probe: invariants, tradeoffs, failure modes.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-mono text-emerald-200">SYSTEMS DEPTH</div>
              <div className="mt-2 font-semibold">From cache lines to memory ordering</div>
              <p className="mt-2 text-sm text-white/70">
                ABI stability, false sharing, atomics, scheduling—explained with clear mental models and examples.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-mono text-amber-200">REAL CONTEXT</div>
              <div className="mt-2 font-semibold">EDA kernels & low-latency pipelines</div>
              <p className="mt-2 text-sm text-white/70">
                You’ll learn to talk like an architect: constraints, performance budgets, and design justifications.
              </p>
            </div>
          </div>
        </section>

        {/* Interviews */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">What interviews really test</h2>
              <p className="mt-1 text-white/60 text-sm">
                Real writeups. Real signals. The patterns repeat across Siemens/Synopsys/HFT loops.
              </p>
            </div>
            <Link href="/interviews" className="text-sm text-white/70 hover:text-white">
              Read interview experiences →
            </Link>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {interviews.map((it) => (
              <Link
                key={it.slug}
                href="/interviews"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-white/60">{it.tag}</div>
                  <span className="text-xs font-mono text-white/50">read →</span>
                </div>
                <div className="mt-2 font-semibold">{it.title}</div>
                <p className="mt-2 text-sm text-white/70">{it.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pricing preview */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold">Free vs Premium</h2>
                <p className="mt-1 text-white/60 text-sm">
                  Start free. Upgrade when you want full deep-dive tracks and advanced modules.
                </p>
              </div>
              <GlowButton href="/pricing" variant="outline">
                View Pricing
              </GlowButton>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Free</div>
                  <AccentPill tone="green">Start here</AccentPill>
                </div>
                <ul className="mt-3 text-sm text-white/70 space-y-2">
                  <li>• Fundamentals + selected lessons</li>
                  <li>• Interview experience posts</li>
                  <li>• Public track previews</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Premium</div>
                  <AccentPill tone="cyan">Unlock all</AccentPill>
                </div>
                <ul className="mt-3 text-sm text-white/70 space-y-2">
                  <li>• Full tracks (EDA/HFT/Systems)</li>
                  <li>• Deep concurrency + lock-free</li>
                  <li>• Performance engineering modules</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="text-sm text-white/60">
              <span className="font-mono text-white/80">
                <span className="text-cyan-300">cpp</span>valley
              </span>{" "}
              — built for systems-level interview mastery.
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <Link className="hover:text-white" href="/learn/tracks">Tracks</Link>
              <Link className="hover:text-white" href="/interviews">Interviews</Link>
              <Link className="hover:text-white" href="/conferences">Conferences</Link>
              <Link className="hover:text-white" href="/blog">Blog</Link>
              <Link className="hover:text-white" href="/pricing">Pricing</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


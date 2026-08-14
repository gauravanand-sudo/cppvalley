import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "96-Episode HFT Curriculum",
  description:
    "The complete cppvalley roadmap from reproducible benchmarking and low-latency C++ to market data, order entry, risk, and an interview-ready tick-to-trade capstone.",
  alternates: { canonical: "/curriculum" },
  openGraph: {
    title: "96-Episode HFT Core Systems Curriculum",
    description:
      "A sequenced path from trustworthy measurement to an interview-ready tick-to-trade platform.",
    url: "/curriculum",
  },
};

const youtubeUrl = "https://www.youtube.com/@cppvalley?sub_confirmation=1";

type Phase = {
  title: string;
  range: string;
  summary: string;
  output: string;
  episodes: string[];
};

const phases: Phase[] = [
  {
    title: "Measurement before optimization",
    range: "EP 01–08",
    summary: "Build the instruments and habits that make every later performance claim trustworthy.",
    output: "Reproducible benchmark laboratory",
    episodes: [
      "Define latency like an engineer",
      "Build a benchmark harness that resists self-deception",
      "Clocks: monotonic time, TSC, RDTSCP, and calibration",
      "Describe the machine before describing the result",
      "Histograms and tails, not averages",
      "Hardware counters without cargo culting",
      "Disassembly as experimental evidence",
      "Phase gate: the reproducible benchmark laboratory",
    ],
  },
  {
    title: "CPU and memory systems",
    range: "EP 09–20",
    summary: "Reason from address, dependency, topology, and workload instead of optimization folklore.",
    output: "CPU and memory evidence pack",
    episodes: [
      "Cache geometry and address decomposition",
      "Cache coherence: MESI/MOESI without the bus-lock myth",
      "False sharing and constructive sharing",
      "Out-of-order execution and the dependency graph",
      "Branch prediction and data-dependent control flow",
      "SIMD with feature dispatch",
      "TLBs and page walks",
      "Huge pages: explicit HugeTLB vs. THP",
      "NUMA placement and ownership",
      "Prefetching: hardware, software, and pointer chasing",
      "DRAM and memory bandwidth under contention",
      "Phase gate: data-oriented redesign",
    ],
  },
  {
    title: "Linux determinism",
    range: "EP 21–32",
    summary: "Control scheduling, placement, interrupts, memory, power, and observability without unsafe tuning recipes.",
    output: "Reproducible low-jitter host profile",
    episodes: [
      "Scheduler classes and real-time hazards",
      "Affinity, topology, SMT, and migration",
      "CPU isolation as a system configuration",
      "Interrupts, NAPI, softirqs, and NIC queues",
      "Memory locking and prefaulting",
      "Power management, turbo, C-states, and thermal behavior",
      "Finding OS noise with rtla, ftrace, and perf",
      "System calls and context switches are different things",
      "Shared memory IPC with explicit ownership",
      "cgroup v2, cpusets, memory nodes, and least privilege",
      "Asynchronous logging: page cache, direct I/O, and io_uring",
      "Phase gate: reproducible low-jitter host profile",
    ],
  },
  {
    title: "Network datapaths",
    range: "EP 33–44",
    summary: "Follow packet ownership from the wire to the application and compare bypass paths fairly.",
    output: "Multicast receiver bake-off",
    episodes: [
      "Ethernet frames and the real wire budget",
      "IPv4/IPv6, UDP, checksums, and fragmentation",
      "Multicast joins, IGMP, and feed topology",
      "The Linux receive path: DMA to userspace",
      "Socket tuning and busy polling",
      "RSS, flow steering, RPS/RFS, and XPS",
      "AF_PACKET, PACKET_MMAP, and AF_XDP",
      "DPDK architecture and memory ownership",
      "AMD Solarflare ef_vi and raw layer-2 access",
      "PCIe, DMA, IOMMU, DDIO, and NIC locality",
      "Hardware and software packet timestamps",
      "Phase gate: receiver bake-off",
    ],
  },
  {
    title: "Low-latency C++",
    range: "EP 45–56",
    summary: "Build bounded, allocation-aware protocol code while respecting the object model and wire safety.",
    output: "Allocation-free protocol core",
    episodes: [
      "Object lifetime, storage, alignment, and aliasing",
      "Value categories, moves, forwarding, and copy elision",
      "Layout by access pattern, not packing",
      "Allocation strategy: arenas, PMR, pools, and failure policy",
      "Fixed-capacity text and identifiers",
      "Static polymorphism, concepts, and devirtualization",
      "Inlining, branch hints, LTO, PGO, and code layout",
      "Exceptions, RTTI, noexcept, and error channels",
      "Containers under latency constraints",
      "Fixed-point money and quantity types",
      "Safe, allocation-free binary parsing",
      "Phase gate: allocation-free protocol core",
    ],
  },
  {
    title: "Concurrency and lock-free engineering",
    range: "EP 57–68",
    summary: "Derive memory order, ownership, linearization, progress, and reclamation before chasing throughput.",
    output: "Queue library and proof notes",
    episodes: [
      "The C++ memory model and data-race freedom",
      "Sequential consistency and total order",
      "Acquire/release publication",
      "Relaxed atomics, counters, and misconceptions",
      "SPSC ring buffer from invariants first",
      "Bounded MPMC queues and sequence numbers",
      "Michael–Scott queue and linked-node trade-offs",
      "Spinlocks, atomic_wait, futexes, and backoff",
      "ABA: mechanism, not slogan",
      "Hazard pointers and safe reclamation",
      "Epoch reclamation and user-space RCU",
      "Phase gate: queue library and concurrency defense",
    ],
  },
  {
    title: "Electronic trading systems",
    range: "EP 69–80",
    summary: "Turn hostile wire input into recovered market state, controlled orders, and reconciled executions.",
    output: "Market-data plant and order gateway",
    episodes: [
      "Market microstructure for systems engineers",
      "Feed transport, packet headers, and sequencing",
      "Nasdaq ITCH decoding with schema discipline",
      "Feed arbitration, gap detection, and recovery",
      "L1, L2, and L3 limit-order-book design",
      "Book data structures by instrument domain",
      "FIX tag-value, FAST, and SBE are different tools",
      "Order entry: OUCH lifecycle and session state",
      "Pre-trade risk as a controlled system",
      "Order management, drop copy, and reconciliation",
      "Deterministic replay and exchange simulation",
      "Phase gate: market-data plant and order gateway",
    ],
  },
  {
    title: "Production safety and operations",
    range: "EP 81–88",
    summary: "Make the platform observable, recoverable, capacity-bounded, clock-aware, and safe to operate.",
    output: "Operable trading platform",
    episodes: [
      "PTP, PHC, clock domains, and timestamp provenance",
      "End-to-end latency attribution",
      "Capacity, backpressure, and overload policy",
      "Journaling, durability, and crash recovery",
      "Failure injection and chaos for a single host",
      "Observability that stays off the critical path",
      "Deployment, warm-up, rollout, and rollback",
      "Incident response and postmortems",
    ],
  },
  {
    title: "Capstone and hiring conversion",
    range: "EP 89–96",
    summary: "Integrate the complete path, withstand adversarial review, and convert the work into interview evidence.",
    output: "Interview-ready public portfolio",
    episodes: [
      "Architecture of the integrated tick-to-trade platform",
      "Integrate the hot path without hiding copies",
      "End-to-end correctness campaign",
      "End-to-end performance campaign",
      "Design review: defend the trade-offs",
      "Incident game day and recovery demonstration",
      "HFT interview loop simulation",
      "Portfolio launch and engineering retrospective",
    ],
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CurriculumPage() {
  return (
    <main className="curriculum-shell">
      <header className="nav-wrap">
        <nav className="nav-inner" aria-label="Primary navigation">
          <Link href="/" className="wordmark" aria-label="cppvalley home">
            <span className="wordmark-mark">cv</span>
            <span>cppvalley</span>
          </Link>
          <div className="nav-links">
            <Link href="/curriculum">Curriculum</Link>
            <Link href="/#labs">Labs</Link>
            <Link href="/#method">Method</Link>
          </div>
          <a className="nav-cta" href={youtubeUrl} target="_blank" rel="noreferrer">
            <span className="status-dot" /> YouTube
          </a>
        </nav>
      </header>

      <section className="curriculum-hero">
        <div className="content-grid curriculum-hero-grid">
          <div>
            <span className="section-number">THE COMPLETE PATH / V1.0</span>
            <h1>Build the system.<br /><span className="text-gradient">Earn the evidence.</span></h1>
            <p>
              A sequenced curriculum for engineers targeting low-latency C++, market-data,
              exchange-connectivity, and core trading-platform roles. Each phase exits with a
              public artifact—not a completion badge.
            </p>
          </div>
          <div className="curriculum-stats" aria-label="Curriculum statistics">
            <div><strong>96</strong><span>episodes</span></div>
            <div><strong>09</strong><span>phases</span></div>
            <div><strong>04</strong><span>flagship labs</span></div>
            <div><strong>01</strong><span>integrated system</span></div>
          </div>
        </div>
      </section>

      <nav className="phase-jump" aria-label="Jump to curriculum phase">
        <div>
          {phases.map((phase, index) => (
            <a href={`#phase-${index}`} key={phase.title}>0{index} {phase.title}</a>
          ))}
        </div>
      </nav>

      <div className="content-grid curriculum-content">
        {phases.map((phase, phaseIndex) => {
          const firstEpisode = phases
            .slice(0, phaseIndex)
            .reduce((total, previousPhase) => total + previousPhase.episodes.length, 0);

          return (
            <section className="curriculum-phase" id={`phase-${phaseIndex}`} key={phase.title}>
              <div className="phase-meta">
                <span>{phase.range} / PHASE 0{phaseIndex}</span>
                <h2>{phase.title}</h2>
                <p>{phase.summary}</p>
                <div className="phase-output">
                  <span>EXIT ARTIFACT</span>
                  <strong>{phase.output}</strong>
                </div>
              </div>

              <div className="episode-list">
                {phase.episodes.map((episode, episodeIndex) => {
                  const number = String(firstEpisode + episodeIndex + 1).padStart(2, "0");
                  const isGate = episode.startsWith("Phase gate");
                  return (
                    <article className="episode-item" key={`${number}-${episode}`}>
                      <span className="episode-number">{number}</span>
                      <h3>{episode}</h3>
                      <em>{isGate ? "phase gate" : "lab + proof"}</em>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="curriculum-cta">
          <div>
            <h2>Watch. Inspect. Build. Prove.</h2>
            <p>Subscribe for the episode. Return here for the lab, evidence, and next dependency.</p>
          </div>
          <a className="button button-primary" href={youtubeUrl} target="_blank" rel="noreferrer">
            Subscribe to cppvalley <ArrowIcon />
          </a>
        </section>
      </div>

      <footer className="footer">
        <div className="content-grid footer-grid">
          <div>
            <Link href="/" className="wordmark"><span className="wordmark-mark">cv</span><span>cppvalley</span></Link>
            <p>Low-latency systems, measured in public.</p>
          </div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <a href={youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://github.com/gauravanand-sudo/cppvalley" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p className="footer-note">Engineering education, not trading advice.</p>
        </div>
      </footer>
    </main>
  );
}

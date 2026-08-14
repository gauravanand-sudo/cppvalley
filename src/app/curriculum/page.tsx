import type { Metadata } from "next";
import Link from "next/link";
import { CurriculumExplorer, type CurriculumPhase } from "@/components/CurriculumExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

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

const phases: CurriculumPhase[] = [
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

export default function CurriculumPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>
        <section className="page-hero page-width">
          <div>
            <p className="kicker">CURRICULUM / 96 EPISODES / 9 PHASES</p>
            <h1>The complete HFT core-systems path.</h1>
            <p>
              Search the syllabus, choose a dependency, and leave every phase with a public
              artifact. The order is intentional: measurement before optimization, correctness
              before lock-free code, and operations before “production-ready”.
            </p>
          </div>
          <dl className="page-hero-stats">
            <div><dt>Topics</dt><dd>96</dd></div>
            <div><dt>Exit gates</dt><dd>09</dd></div>
            <div><dt>Capstone</dt><dd>Tick → trade</dd></div>
          </dl>
        </section>

        <section className="how-to-use" aria-labelledby="how-to-use-heading">
          <div className="page-width">
            <h2 id="how-to-use-heading">How to use this curriculum</h2>
            <ol>
              <li><span>01</span><p><strong>Watch</strong> the episode for the mental model.</p></li>
              <li><span>02</span><p><strong>Reproduce</strong> the benchmark or failure locally.</p></li>
              <li><span>03</span><p><strong>Record</strong> environment, result, and limitation.</p></li>
              <li><span>04</span><p><strong>Publish</strong> the phase artifact when its gate passes.</p></li>
            </ol>
          </div>
        </section>

        <div className="page-width curriculum-page-content">
          <CurriculumExplorer phases={phases} />

          <section className="curriculum-end">
            <div><p className="section-label">VIDEO + LAB + EVIDENCE</p><h2>Use YouTube for the lesson. Use this site for the work.</h2></div>
            <div className="primary-actions">
              <a className="action action-primary" href={youtubeUrl} target="_blank" rel="noreferrer">Subscribe on YouTube ↗</a>
              <Link className="action action-secondary" href="/projects">See the four projects →</Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

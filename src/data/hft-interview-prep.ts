/**
 * Original CppValley interview-readiness supplements.
 * These are project BRIEFS and mock rubrics, not released videos, runnable judges,
 * certified completions or actual proprietary interview questions.
 * Aligned to public role descriptions and official interview-prep guidance.
 */
export type HftProjectStage = "C1" | "C2" | "C3" | "C4";
export type HftProject = {
 stage:HftProjectStage; id:string; title:string; brief:string;
 deliverables:string[]; acceptance:string[]; defense:string; stretch:string;
};
export type HftSkillLane = {id:string;title:string;course:string;gap:string;topics:string[];proof:string};
export type HftMock = {id:string;title:string;duration:string;format:string;tasks:string[];score:string};
export type HftFirm = {name:string;signal:string;link:string};
export const hftProjectStages = [
  {
    "code": "C1",
    "title": "C++ object model & algorithms",
    "range": "Weeks 1–6",
    "intro": "Language correctness, complexity and code that survives review."
  },
  {
    "code": "C2",
    "title": "Concurrency & memory ordering",
    "range": "Weeks 7–12",
    "intro": "Correct progress guarantees, ownership and reproducible race testing."
  },
  {
    "code": "C3",
    "title": "Linux, CPU & network performance",
    "range": "Weeks 13–18",
    "intro": "Measure and explain the machine beneath your implementation."
  },
  {
    "code": "C4",
    "title": "Trading systems & hiring defense",
    "range": "Weeks 19–26",
    "intro": "Build a safe trading pipeline and defend it as requirements change."
  }
] as const;
export const hftProjects: HftProject[] = [
  {
    "stage": "C1",
    "id": "cpp-lifetime-audit",
    "title": "C++ lifetime & UB clinic",
    "brief": "Repair a deliberately buggy packet-processing library with dangling views, iterator invalidation, accidental copies and aliasing traps.",
    "deliverables": [
      "Provide a minimal failing reproducer for each bug",
      "Produce a corrected library with clear ownership contracts"
    ],
    "acceptance": [
      "Sanitizer and regression suite covers each failure",
      "Explain which bugs sanitizers cannot prove absent"
    ],
    "defense": "Which expressions are undefined behavior, and why?",
    "stretch": "Defend ABI stability and exception safety when adding a new wire field."
  },
  {
    "stage": "C1",
    "id": "cpp-fixed-vector",
    "title": "Fixed-capacity vector and invalidation tests",
    "brief": "Implement a bounded container with explicit overflow semantics and carefully defined iterator invalidation.",
    "deliverables": [
      "Capacity-checked push/erase/emplace and iterator API",
      "A table of invalidation, lifetime and exception guarantees"
    ],
    "acceptance": [
      "Differential tests against std::vector where semantics overlap",
      "Object-lifetime stress tests with throwing/move-only types"
    ],
    "defense": "Would a small-vector optimization help or hurt this workload?",
    "stretch": "Add constexpr support without changing runtime behavior."
  },
  {
    "stage": "C1",
    "id": "cpp-fixed-point",
    "title": "Strongly typed price, quantity & notional",
    "brief": "Implement integer tick/lot money types instead of fragile floating-point price calculations.",
    "deliverables": [
      "Safe arithmetic with distinct Price, Quantity and Notional types",
      "Validation for tick size, sign, overflow and rounding policy"
    ],
    "acceptance": [
      "Boundary and overflow tests with deterministic outcomes",
      "Fuzz parser-to-price round trips"
    ],
    "defense": "When is decimal floating point acceptable versus fixed point?",
    "stretch": "Support instruments with different tick scales safely."
  },
  {
    "stage": "C1",
    "id": "cpp-memory-pool",
    "title": "Bounded arena and slab allocator",
    "brief": "Build an allocator used by an object-heavy market-event workload, with clear ownership and exhaustion policy.",
    "deliverables": [
      "Arena/slab allocation and release behavior",
      "Benchmark vs baseline allocator with workload and CPU details"
    ],
    "acceptance": [
      "No use-after-free on randomized allocation sequences",
      "Report throughput and p99, including allocation failure"
    ],
    "defense": "How do free lists, locality and fragmentation trade off?",
    "stretch": "Compare std::pmr integration and cross-thread ownership."
  },
  {
    "stage": "C1",
    "id": "cpp-binary-codec",
    "title": "Portable binary protocol codec",
    "brief": "Define a byte-order-safe variable-length frame format with no untrusted out-of-bounds reads.",
    "deliverables": [
      "Decoder/encoder with versioned messages and partial-input handling",
      "Property-based tests and reproducible fuzz corpus"
    ],
    "acceptance": [
      "Round trips across valid inputs and reject malformed lengths",
      "ASan/UBSan-clean fuzz runs with captured seeds"
    ],
    "defense": "Why is reinterpret_cast of a network buffer dangerous?",
    "stretch": "Add backward-compatible optional fields without allocations."
  },
  {
    "stage": "C1",
    "id": "cpp-bounded-cache",
    "title": "Interview-style bounded memoization cache",
    "brief": "Build an LRU/FIFO cache from a minimal spec, then evolve it collaboratively when requirements change.",
    "deliverables": [
      "Correct bounded-cache API and complexity analysis",
      "A code-review note for eviction and reference-lifetime pitfalls"
    ],
    "acceptance": [
      "Deterministic eviction tests and adversarial duplicate keys",
      "Explain memory usage and complexity for each operation"
    ],
    "defense": "How would you change this live when the interviewer requests TTL and thread safety?",
    "stretch": "Add TTL with a pluggable clock and discuss cache stampede."
  },
  {
    "stage": "C2",
    "id": "cpp-spsc-ring",
    "title": "SPSC ring buffer correctness campaign",
    "brief": "Derive a fixed-capacity ring buffer from producer/consumer invariants and prove ownership boundaries.",
    "deliverables": [
      "Cache-aligned C++ atomic implementation",
      "Annotated happens-before diagram and benchmark harness"
    ],
    "acceptance": [
      "No lost, duplicated or reordered items in stress runs",
      "TSan where applicable plus rationale for memory ordering"
    ],
    "defense": "Where is the publication linearization point?",
    "stretch": "Compare relaxed vs acquire/release and detect false sharing."
  },
  {
    "stage": "C2",
    "id": "cpp-mpmc-queue",
    "title": "Bounded MPMC queue with sequence counters",
    "brief": "Implement a multi-producer multi-consumer queue with bounded memory and explicit full/empty behavior.",
    "deliverables": [
      "Sequence-counter algorithm and documented progress guarantees",
      "Competing producer/consumer stress and latency reports"
    ],
    "acceptance": [
      "Unique IDs consumed exactly once under randomized pressure",
      "Explain CAS failure ordering, wraparound and ABA assumptions"
    ],
    "defense": "Why is this not automatically wait-free?",
    "stretch": "Add exponential backoff and compare p99/p99.9 under contention."
  },
  {
    "stage": "C2",
    "id": "cpp-order-dispatch",
    "title": "Concurrent event-dispatch pipeline",
    "brief": "Model a bounded feed-to-strategy message pipeline and experiment with backpressure policies.",
    "deliverables": [
      "Single-thread and queued variants with instrumentation",
      "A policy for queue-full, shutdown and cancellation"
    ],
    "acceptance": [
      "Deterministic shutdown without lost ownership",
      "Property tests for per-symbol order and capacity invariants"
    ],
    "defense": "When is a single-threaded event loop preferable to threads?",
    "stretch": "Add CPU pinning and explain jitter vs throughput trade-offs."
  },
  {
    "stage": "C2",
    "id": "cpp-snapshot-reclaim",
    "title": "Immutable snapshots and reclamation",
    "brief": "Publish versioned risk-configuration snapshots to readers without dangling pointers.",
    "deliverables": [
      "Reference-counted baseline and epoch/RCU-style prototype",
      "Ownership, quiescence and reclamation state diagrams"
    ],
    "acceptance": [
      "Readers never observe partial updates",
      "Stress tests bound retired-memory growth"
    ],
    "defense": "What does quiescence mean, and when can reclamation stall?",
    "stretch": "Compare versioned seqlock reads for small copyable payloads."
  },
  {
    "stage": "C2",
    "id": "cpp-pool-shutdown",
    "title": "Thread-pool and cancellation under load",
    "brief": "Implement a minimal task executor that is safe on exception, cancellation and shutdown.",
    "deliverables": [
      "Task submission/future or callback API",
      "Bounded queue and stop/drain shutdown modes"
    ],
    "acceptance": [
      "Exactly defined outcome for every accepted task",
      "Concurrent stop/submission race tests"
    ],
    "defense": "What happens if a task waits on another task in the same pool?",
    "stretch": "Add work stealing and fair scheduling with no busy loop."
  },
  {
    "stage": "C2",
    "id": "cpp-litmus-lab",
    "title": "Memory-order litmus & bug-hunt lab",
    "brief": "Create small concurrent programs illustrating publish/consume, stale visibility, torn invariants and invalid fences.",
    "deliverables": [
      "One minimal experiment per invariant and a corrected version",
      "A written explanation of C++ memory-model guarantees"
    ],
    "acceptance": [
      "Tests can reproduce common implementation faults under controlled injection",
      "Clearly separate observed hardware behavior from language-level proof"
    ],
    "defense": "Why does x86 passing a stress test not establish portable correctness?",
    "stretch": "Use model checking for bounded schedules."
  },
  {
    "stage": "C3",
    "id": "linux-epoll-service",
    "title": "Epoll-framed TCP service",
    "brief": "Implement a nonblocking framed service that handles partial IO, overload and connection churn.",
    "deliverables": [
      "Reactor and per-client state machine",
      "Load generator that records throughput and p50/p99"
    ],
    "acceptance": [
      "Correct on fragmented reads and short writes",
      "No unbounded buffers or spin on disconnect"
    ],
    "defense": "What changes with edge-triggered epoll?",
    "stretch": "Compare io_uring and epoll with a fair workload."
  },
  {
    "stage": "C3",
    "id": "linux-multicast-replay",
    "title": "UDP multicast receiver & gap recovery",
    "brief": "Build a receiver that validates sequence numbers and combines snapshots with replayed deltas.",
    "deliverables": [
      "Receiver simulator and packet loss/reorder injector",
      "Sequence-state machine with recovery modes"
    ],
    "acceptance": [
      "Repeated/late packets cannot corrupt book state",
      "Snapshot-delta continuity proven by deterministic replay"
    ],
    "defense": "What breaks when recovery arrives out of order?",
    "stretch": "Prototype packet capture/replay on a dedicated lab machine."
  },
  {
    "stage": "C3",
    "id": "linux-cache-lab",
    "title": "Cache and branch-prediction experiments",
    "brief": "Use synthetic AoS/SoA, pointer chasing and branching workloads to quantify CPU behavior.",
    "deliverables": [
      "Reproducible CMake benchmark suite",
      "Perf counter/disassembly evidence for a specific change"
    ],
    "acceptance": [
      "Document CPU, governor, affinity and compiler flags",
      "Results include variance and a causal hypothesis"
    ],
    "defense": "Why is a faster benchmark not proof of a faster trading path?",
    "stretch": "Investigate TLB misses and huge-page trade-offs."
  },
  {
    "stage": "C3",
    "id": "linux-nic-path",
    "title": "Kernel vs userspace packet-path comparison",
    "brief": "Measure a standard UDP path and design a hardware-dependent optional DPDK/AF_XDP extension.",
    "deliverables": [
      "Portable UDP baseline with per-stage counters",
      "Architecture note on copy, DMA, RSS and NIC queues"
    ],
    "acceptance": [
      "No fake kernel-bypass performance claims",
      "If specialized hardware is absent, mark the comparison unmeasured"
    ],
    "defense": "When are extra bypass dependencies not worth the complexity?",
    "stretch": "On suitable hardware, implement a small AF_XDP/DPDK receiver."
  },
  {
    "stage": "C3",
    "id": "linux-clock-lab",
    "title": "Monotonic clocks, TSC and timestamp provenance",
    "brief": "Compare measured intervals from system clocks and calibrated TSC while tracking timebase assumptions.",
    "deliverables": [
      "Clock-source comparison and calibration utility",
      "Measurement note for drift, migration and cross-core effects"
    ],
    "acceptance": [
      "Never subtract timestamps from incompatible clock domains",
      "Document interpolation uncertainty and timing overhead"
    ],
    "defense": "How would PTP hardware timestamps change attribution?",
    "stretch": "Integrate supported NIC hardware timestamps if available."
  },
  {
    "stage": "C3",
    "id": "linux-tail-regression",
    "title": "Tail-latency regression guard",
    "brief": "Build a repeatable performance gate that resists misleading single-run microbenchmarks.",
    "deliverables": [
      "Dataset and environment manifest for each run",
      "Variance-aware p50/p99/p99.9 comparison report"
    ],
    "acceptance": [
      "Gate tests capture warmup, outliers and sample count",
      "Regression explanation includes counters or traces"
    ],
    "defense": "What would you trust when mean improves but p99 degrades?",
    "stretch": "Add CI comparison across compiler/configuration variants."
  },
  {
    "stage": "C4",
    "id": "hft-matching",
    "title": "Price-time priority matching engine",
    "brief": "Implement an in-memory L3 limit order matching simulator with strict price-time ordering.",
    "deliverables": [
      "ADD, CANCEL, MODIFY, MATCH and deterministic trade events",
      "Invariant model and unit/property tests"
    ],
    "acceptance": [
      "Price-time FIFO and volume conservation hold",
      "No execution at an invalid price, qty or session state"
    ],
    "defense": "Explain storage layout and O(log N) vs O(1) trade-offs.",
    "stretch": "Add auction states and a bounded cancel-all."
  },
  {
    "stage": "C4",
    "id": "hft-recovery",
    "title": "Market data feed arbitration & recovery",
    "brief": "Normalize a synthetic binary market feed into L2 book state across gaps, duplicates and channel failover.",
    "deliverables": [
      "Protocol decoder, sequencer and recovered state",
      "Repeatable corruption, delay and loss fixtures"
    ],
    "acceptance": [
      "Post-recovery state matches a clean reference run",
      "Never publish a book as valid while gap remains unresolved"
    ],
    "defense": "Why can a snapshot plus deltas still be inconsistent?",
    "stretch": "Simulate redundant A/B feed arbitrations."
  },
  {
    "stage": "C4",
    "id": "hft-order-gateway",
    "title": "Order entry gateway & lifecycle",
    "brief": "Model an exchange-style order gateway that safely tracks new, ack, fill, reject, cancel and replace.",
    "deliverables": [
      "Explicit order state machine and session handling",
      "Deterministic event journal and idempotent client IDs"
    ],
    "acceptance": [
      "Invalid transitions rejected without corrupting position",
      "Reconnect and duplicate responses reconcile correctly"
    ],
    "defense": "What if a cancel and fill cross on the wire?",
    "stretch": "Add a resend/recovery protocol with stable IDs."
  },
  {
    "stage": "C4",
    "id": "hft-fix-session",
    "title": "FIX-like session protocol simulator",
    "brief": "Create an educational tag-value session with heartbeats, sequence numbers and resend rules.",
    "deliverables": [
      "Encoder/decoder and session state with test fixtures",
      "Heartbeat, test-request, logout and recovery flows"
    ],
    "acceptance": [
      "Reject malformed tags/checksums and invalid sequence transitions",
      "Document which actual FIX features are intentionally excluded"
    ],
    "defense": "What belongs to session layer versus business logic?",
    "stretch": "Compare tagged messages with SBE-style binary schemas."
  },
  {
    "stage": "C4",
    "id": "hft-risk",
    "title": "Pre-trade risk engine & kill switch",
    "brief": "Guard simulated order flow with fixed limits, fat-finger controls, stale-market checks and cancel-all.",
    "deliverables": [
      "Risk API with per-symbol limits and exposure tracking",
      "Fail-closed behavior and audit trail for rejected orders"
    ],
    "acceptance": [
      "Forbidden orders never reach the simulated gateway",
      "Kill switch has a deterministic precedence policy"
    ],
    "defense": "Can a lock-free risk snapshot still be correct during a limit change?",
    "stretch": "Add multi-account policies and concurrency tests."
  },
  {
    "stage": "C4",
    "id": "hft-smart-router",
    "title": "Multi-venue quote & routing simulator",
    "brief": "Combine venue quotes into consolidated state, then select a route using spread, fees and capacity.",
    "deliverables": [
      "Venue-normalization and quote validity rules",
      "Deterministic routing decisions and reason codes"
    ],
    "acceptance": [
      "Never route to a stale or non-tradable venue",
      "Compare order cost inclusive of disclosed fee assumptions"
    ],
    "defense": "What assumptions make the displayed best quote non-executable?",
    "stretch": "Simulate partial fills and changing venue status."
  },
  {
    "stage": "C4",
    "id": "hft-drop-copy",
    "title": "Drop-copy reconciliation & position ledger",
    "brief": "Reconcile executions, cancels and disconnects into an auditable per-instrument ledger.",
    "deliverables": [
      "Execution deduplication and event-sourced position view",
      "Replay and mismatch reporting utility"
    ],
    "acceptance": [
      "Duplicate/missing reports do not silently alter positions",
      "Replay from checkpoint yields same ledger"
    ],
    "defense": "Which state is authoritative after an exchange disconnect?",
    "stretch": "Add end-of-day reconciliation and incident reporting."
  },
  {
    "stage": "C4",
    "id": "hft-market-replay",
    "title": "Deterministic exchange and strategy sandbox",
    "brief": "Create a simulated trading session that applies timestamped market events and order responses in a stable order.",
    "deliverables": [
      "Clock abstraction, deterministic input stream and trace log",
      "Replay comparator and invariant assertions"
    ],
    "acceptance": [
      "Same input and seed always yield identical outputs",
      "Explicit behavior for ties, pauses, halts and backlog"
    ],
    "defense": "How does processing order affect apparent strategy performance?",
    "stretch": "Introduce adversarial packet delays and random seeds."
  },
  {
    "stage": "C4",
    "id": "hft-tick-trade",
    "title": "Integrated tick-to-trade system capstone",
    "brief": "Integrate the market feed, book, signal boundary, risk checks and order gateway with bounded queues and replay.",
    "deliverables": [
      "Architecture, CMake build, tests and latency attribution",
      "Evidence portfolio: README, traces, p50/p99, failure report"
    ],
    "acceptance": [
      "No unbounded hot-path allocations after warmup where claimed",
      "Fault injection preserves recovery and risk invariants"
    ],
    "defense": "Defend the slowest dependency and next requirement change.",
    "stretch": "Add a separate management/control plane and rollback plan."
  },
  {
    "stage": "C4",
    "id": "hft-onsite-change",
    "title": "Evolving-spec engineering onsite simulation",
    "brief": "Take an existing engine, receive an unexpected requirement, implement it and review a teammate's patch.",
    "deliverables": [
      "Written 20-minute design, coded change, code-review notes",
      "Explicit assumptions, risk list and rollback strategy"
    ],
    "acceptance": [
      "New requirement passes baseline and negative tests",
      "Defend maintainability, naming, edge cases and time trade-offs"
    ],
    "defense": "What would you deliberately not implement in a short onsite?",
    "stretch": "Try the same change in pair-programming format."
  }
];
export const hftSkillLanes: HftSkillLane[] = [
  {
    "id": "algorithmic",
    "title": "Algorithms & collaborative coding",
    "course": "Parallel with C1–C4",
    "gap": "LeetCode fluency is necessary for many screens, but rehearsed patterns alone are insufficient.",
    "topics": [
      "Complexities, arrays/strings, heaps and hash maps",
      "Trees, graphs, shortest paths, interval/search techniques",
      "Sliding windows, DP and adversarial test design",
      "Open-ended extensions, clear coding and speaking while solving"
    ],
    "proof": "Two 45-minute C++ mocks per week with tests, a narrated complexity argument and one changed requirement."
  },
  {
    "id": "cpp",
    "title": "C++ language mastery & debugging",
    "course": "C1",
    "gap": "Make obscure correctness failures explainable, not just memorized.",
    "topics": [
      "Object lifetime, UB, alignment, aliasing and ABI",
      "Iterator/reference invalidation, move/noexcept, exception guarantees",
      "Allocators, polymorphism, virtual calls and template deduction",
      "ASan/UBSan, gdb, heap/stack reconstruction, code review"
    ],
    "proof": "Fix five distinct C++ bugs with minimal reproducers and written ownership contracts."
  },
  {
    "id": "concurrency",
    "title": "Concurrency correctness & code review",
    "course": "C2",
    "gap": "Prove why an algorithm works and how it fails.",
    "topics": [
      "Happens-before and acquire/release; relaxed versus sequential consistency",
      "Lock-free progress, ABA, reclamation and publication safety",
      "Linearizability, queue capacity, shutdown and backpressure",
      "TSan limits, litmus tests and workload-specific benchmarks"
    ],
    "proof": "Explain a queue implementation line by line, run adversarial tests and identify one unsafe reorder."
  },
  {
    "id": "systems",
    "title": "Linux, networking & CPU evidence",
    "course": "C3",
    "gap": "Turn performance intuition into experiments and production diagnostics.",
    "topics": [
      "CPU cache/TLB, branch prediction, NUMA, false sharing and disassembly",
      "TCP framing, UDP multicast, kernel networking, packet gaps",
      "epoll, syscalls, CPU affinity, packet-path/kernel-bypass trade-offs",
      "perf, p99 tail diagnosis, clocks, NIC queues and reproducibility"
    ],
    "proof": "Publish a before/after benchmark with system metadata, counters, distributions and caveats."
  },
  {
    "id": "trading",
    "title": "Market data, orders, risk & recovery",
    "course": "C4",
    "gap": "Demonstrate safe implementation of exchange-facing logic.",
    "topics": [
      "L1/L2/L3 books, price-time priority and market microstructure",
      "FIX/SBE/ITCH/OUCH-style protocol concepts (educational simulators)",
      "OMS, cancels/fills/rejects, pre-trade risk and kill switch",
      "Gap recovery, replay, drop copy, time provenance and incident response"
    ],
    "proof": "Replay an end-to-end synthetic trading session and prove deterministic state plus controlled recovery."
  },
  {
    "id": "defense",
    "title": "Onsite design, review & communication",
    "course": "All four courses",
    "gap": "Experienced-hire onsites increasingly test evolving design decisions and reviewing imperfect code.",
    "topics": [
      "Clarifying incomplete requirements and stating assumptions",
      "Interface design with changing load, safety and failure constraints",
      "Readable implementation, line-by-line review and rollback planning",
      "Collaboration, prioritization, operational stories and concise defense"
    ],
    "proof": "Complete one 4-stage mock: design → implement → code review → changing requirements."
  },
  {
    "id": "math",
    "title": "Optional quant-facing extension (NOT SWE core)",
    "course": "Only for quant developer/research/trading roles",
    "gap": "Math expectations vary sharply by role; do not mislabel this as a universal software-engineer requirement.",
    "topics": [
      "Probability: conditional expectations, Bayes and distributions",
      "Combinatorics, estimation, expectation and variance",
      "Statistics: sampling, bias, regression and backtest leakage",
      "Basic inventory, adverse selection and market-making intuition"
    ],
    "proof": "Write derivations and run a small data experiment; prioritize only for roles whose descriptions request quantitative work."
  }
];
export const hftMockLoops: HftMock[] = [
  {
    "id": "screen",
    "title": "Timed algorithm screen",
    "duration": "45 minutes",
    "format": "C++ coding + extension",
    "tasks": [
      "Clarify input/edge cases and state algorithm + complexity",
      "Write compilable C++ with tests while narrating choices",
      "Handle a mid-round constraint change"
    ],
    "score": "Correctness / complexity / clarity / adaptation"
  },
  {
    "id": "lifetime",
    "title": "C++ bug-hunt & code review",
    "duration": "60 minutes",
    "format": "Inspect and repair unsafe code",
    "tasks": [
      "Find lifetime, aliasing and iterator invalidation risks",
      "Reproduce one fault, patch it and add regression tests",
      "Explain correctness that sanitizers alone cannot establish"
    ],
    "score": "Language semantics / minimal fixes / reasoning / tests"
  },
  {
    "id": "concurrency",
    "title": "Lock-free and synchronization defense",
    "duration": "60 minutes",
    "format": "Debug a queue under load",
    "tasks": [
      "Identify publication, ordering and shutdown races",
      "Explain memory order and linearization point",
      "Choose a safer design if proof obligations exceed budget"
    ],
    "score": "Proof / progress guarantees / trade-offs / humility"
  },
  {
    "id": "systems",
    "title": "Low-latency incident response",
    "duration": "60 minutes",
    "format": "Logs, perf and measurement",
    "tasks": [
      "Explain a p99 regression despite a faster average",
      "Form hypotheses and choose CPU/network counters",
      "Recommend rollback criteria and follow-up experiment"
    ],
    "score": "Measurement / causal reasoning / operational safety"
  },
  {
    "id": "collaborative",
    "title": "Open-ended pair-programming interview",
    "duration": "60 minutes",
    "format": "Shared editor and live design evolution",
    "tasks": [
      "Implement a bounded cache or rate limiter",
      "Respond to changed requirements without abandoning tests",
      "Code-review for naming, API safety and complexity"
    ],
    "score": "Collaboration / correctness / extendibility / communication"
  },
  {
    "id": "onsite",
    "title": "Four-stage HFT engineering onsite",
    "duration": "4–5 hours",
    "format": "Design → implement → review → evolve",
    "tasks": [
      "Scope a feed/order service and state assumptions",
      "Build working C++ core and automated tests",
      "Review trade-offs and implement one new constraint",
      "Defend failure, risk and deployment behavior"
    ],
    "score": "End-to-end quality / design judgment / code review / trade-offs"
  }
];
export const hftFirmSignals: HftFirm[] = [
  {
    "name": "Citadel Securities",
    "signal": "Published experienced-engineer process emphasizes a coding screen plus a 4–5 hour evolving problem covering design, implementation, review and decisions.",
    "link": "https://www.citadelsecurities.com/careers/career-perspectives/our-engineering-interview-process/"
  },
  {
    "name": "Jane Street",
    "signal": "Official SWE guide prioritizes collaborative live programming in a language you know. Low-latency engineering listings emphasize computer architecture; most trading code is OCaml rather than C++.",
    "link": "https://www.janestreet.com/preparing-for-a-software-engineering-interview/"
  },
  {
    "name": "Tower Research Capital",
    "signal": "Tower says C++ supports latency-sensitive market data, execution and infrastructure; also emphasizes robust shared platforms, Linux fundamentals and communication.",
    "link": "https://tower-research.com/ask-tower-anything-questions-and-answers-for-quants-engineers-and-other-prospective-employees/"
  },
  {
    "name": "Graviton Research Capital",
    "signal": "A published Gurugram C++ engineering listing asks for algorithms, C/C++, Linux, latency optimization, deployment ownership and communication; role/experience requirements vary.",
    "link": "https://job-boards.greenhouse.io/gravitonresearchcapital/jobs/4004920002"
  }
];

/** One CppValley course for each distinct engineering competency.
 * A course is not a YouTube playlist: multiple original playlists may
 * contribute to a single curriculum. Existing URLs/slugs are preserved.
 */
export type EliteTrack = "Foundations" | "Algorithms" | "Systems" | "Advanced";
export type EliteCourse = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  track: EliteTrack;
  level: string;
  status: "recording" | "curriculum";
  focus: string[];
  modules: string[];
  priority: number;
  icon: string;
  color: string;
};

export const eliteCourses: EliteCourse[] = [
  {
    slug: "core-cpp-interviews",
    title: "C++ Fundamentals, Memory & STL",
    shortTitle: "C++ Fundamentals",
    summary: "Understand the C++ object model, ownership, memory, STL and language correctness.",
    description: "Build precise C++ fundamentals from translation units and type systems to object lifetime, RAII, exception safety, standard-library containers, algorithms, iterator invalidation and debugging. Learn why code is correct—not just how to make it compile.",
    track: "Foundations", level: "Beginner → Advanced", status: "curriculum", priority: 3,
    icon: "C++", color: "blue",
    focus: ["Object lifetime", "RAII & ownership", "STL internals", "Undefined behavior"],
    modules: [
      "Compilation, Types & the C++ Language Model",
      "Object Lifetime, Storage & Memory",
      "RAII, Smart Pointers & Ownership",
      "Copy/Move Semantics & Exception Safety",
      "Classes, Polymorphism & Object Layout",
      "Sequence Containers & Iterator Validity",
      "Associative Containers & STL Algorithms",
      "Strings, Views, I/O & Error Handling",
      "Generic Programming Foundations",
      "Debugging, Testing & Core C++ Interviews",
    ],
  },
  {
    slug: "dsa-algorithms-cpp",
    title: "Data Structures & Algorithms in C++",
    shortTitle: "DSA in C++",
    summary: "From algorithmic invariants to graphs and DP, with rigorous C++ implementations.",
    description: "A pattern-based DSA course covering complexity proofs, hashing, prefix sums, sliding windows, binary search, heaps, trees, graphs, dynamic programming, greedy methods and advanced range-query data structures. Includes a separate 26-week, 300-question external LeetCode preparation track.",
    track: "Algorithms", level: "Beginner → Advanced", status: "curriculum", priority: 4,
    icon: "{ }", color: "green",
    focus: ["Algorithmic reasoning", "Trees & graphs", "Dynamic programming", "C++ implementation"],
    modules: [
      "Complexity, Invariants & Amortized Analysis",
      "Arrays, Hashing & Prefix Sums",
      "Two Pointers & Sliding Windows",
      "Stacks, Queues & Monotonic Structures",
      "Linked Lists & Data Structure Design",
      "Binary Search, Sorting & Selection",
      "Binary Trees & Search Trees",
      "Heaps, Top-K & Scheduling",
      "Graph Traversal, Shortest Paths & DSU",
      "Greedy Algorithms, Intervals & Sweep Line",
      "Dynamic Programming & State Design",
      "Backtracking, Tries, Bits & Range Queries",
    ],
  },
  {
    slug: "advanced-modern-cpp",
    title: "Modern C++: C++17, C++20 & C++23",
    shortTitle: "Modern C++",
    summary: "Use modern language and library features with accurate lifetime and portability reasoning.",
    description: "An advanced standards-aware course on value categories, perfect forwarding, templates, constexpr, concepts, ranges, coroutines, std::expected, std::mdspan, modern library design and portability. Includes a clearly marked C++26 preview; draft or compiler-dependent features are not presented as universally available.",
    track: "Advanced", level: "Intermediate → Expert", status: "curriculum", priority: 7,
    icon: "⌥", color: "pink",
    focus: ["C++17/20/23", "Templates & concepts", "Ranges & coroutines", "Modern standard library"],
    modules: [
      "Type Deduction & Value Categories",
      "Move Semantics & Perfect Forwarding",
      "Templates, Packs & Metaprogramming",
      "C++17 Language & Library Features",
      "C++20 Concepts, Constraints & Ranges",
      "C++20 Coroutines & Runtime Facilities",
      "C++23 Language & Library Features",
      "Modern Library Design & Performance",
      "Portability, Standards Evolution & C++26 Preview",
    ],
  },
  {
    slug: "cpp-concurrency-lockfree-systems",
    title: "C++ Concurrency, Atomics & Lock-Free Programming",
    shortTitle: "C++ Concurrency",
    summary: "Master threads, synchronization, the C++ memory model and lock-free algorithms.",
    description: "A correctness-first journey from std::thread, mutexes and condition variables to C++ atomics, happens-before, progress guarantees, concurrent containers, SPSC/MPMC queues, ABA, safe memory reclamation, stress testing and performance analysis. Informed by the 38-topic concurrency and 26-topic lock-free source curricula.",
    track: "Advanced", level: "Intermediate → Expert", status: "recording", priority: 1,
    icon: "⧉", color: "violet",
    focus: ["Threads & locking", "Happens-before", "Atomics & CAS", "Lock-free queues"],
    modules: [
      "Threads, Lifetimes & Concurrency Foundations",
      "Shared Data, Mutexes & Deadlock Avoidance",
      "Condition Variables, Futures & Coordination",
      "Memory Ordering, Atomics & Progress Guarantees",
      "Thread-Safe Containers & Lock Granularity",
      "Task Scheduling, Cancellation & Parallel Performance",
      "Lock-Free Stacks, Ring Buffers & Queues",
      "ABA, Reclamation & Advanced Lock-Free Design",
      "Testing, Debugging & Proving Concurrent Correctness",
    ],
  },
  {
    slug: "stl-patterns-lld-cpp-design",
    title: "C++ Design Patterns & Low-Level Design",
    shortTitle: "C++ Design & LLD",
    summary: "Design testable, ownership-safe C++ APIs, components and interview systems.",
    description: "Learn object relationships, API contracts, SOLID, policy-based design, type erasure, creational/structural/behavioral patterns and practical low-level design. Build caches, schedulers, logging systems, memory arenas, event dispatchers, connection pools and binary parsers.",
    track: "Advanced", level: "Intermediate → Advanced", status: "curriculum", priority: 5,
    icon: "◇", color: "purple",
    focus: ["API contracts", "SOLID & patterns", "Ownership-safe design", "LLD interview systems"],
    modules: [
      "C++ API & Object-Oriented Design Foundations",
      "Design Patterns in Modern C++",
      "Low-Level Design: Implement Real Systems",
      "Testing, Refactoring & Defending Design Choices",
    ],
  },
  {
    slug: "linux-os-networking-systems-engineers",
    title: "Linux, Networking & C++ Performance Engineering",
    shortTitle: "Linux & Performance",
    summary: "Connect C++ programs to operating systems, networks, caches and measurable performance.",
    description: "A systems course covering Linux processes, scheduling, virtual memory, syscalls, IPC, TCP/UDP, multicast, epoll and event loops, then CPU cache behavior, branch prediction, NUMA, allocators, perf, flame graphs and reproducible latency measurement.",
    track: "Systems", level: "Beginner → Advanced", status: "curriculum", priority: 6,
    icon: "⌘", color: "cyan",
    focus: ["Linux internals", "Sockets & epoll", "CPU caches & NUMA", "Profiling & benchmarks"],
    modules: [
      "Linux Processes, Toolchain & Runtime",
      "Scheduling, Threads & Affinity",
      "Virtual Memory, Paging & TLB",
      "Files, System Calls & IPC",
      "TCP, Stream Framing & Backpressure",
      "UDP, Multicast & Packet Recovery",
      "Nonblocking I/O, epoll & Event Loops",
      "CPU Caches, Coherence & Memory Layout",
      "Microarchitecture, Allocators & CPU Tuning",
      "Debugging, Profiling & Tail-Latency Benchmarks",
    ],
  },
  {
    slug: "low-latency-cpp-hft-systems",
    title: "Low-Latency C++ & Trading Systems",
    shortTitle: "Low-Latency C++",
    summary: "Engineer low-latency applications and build a reliable electronic trading stack.",
    description: "The existing 96-lesson specialization in measurement, cache-aware C++, Linux and network paths, market microstructure, market data, order books, exchange protocols, order entry, risk, replay and deterministic production safety. It applies broader C++ skills to trading—not the other way around.",
    track: "Systems", level: "Intermediate → Expert", status: "recording", priority: 2,
    icon: "⌁", color: "amber",
    focus: ["Latency measurement", "Market data & order books", "Order routing & risk", "Production reliability"],
    modules: [
      "Latency Measurement & Benchmark Methodology",
      "CPU, Cache, Memory & Data Layout",
      "Linux Scheduling & Runtime Determinism",
      "Networks, Kernel I/O & Packet Processing",
      "Low-Latency C++ Implementation Patterns",
      "Concurrency & Lock-Free Fast Paths",
      "Market Microstructure & Trading Infrastructure",
      "Operational Safety, Recovery & Observability",
      "Integrated Trading-System Capstone",
    ],
  },
];

export const eliteCoursesBySlug = new Map(eliteCourses.map(course => [course.slug, course]));
export const eliteTrackNames: EliteTrack[] = ["Foundations", "Algorithms", "Advanced", "Systems"];
export const legacyCourseRedirects: Record<string, string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "cpp-concurrency-lockfree-systems",
  "student-roadmap-lessons": "core-cpp-interviews",
  "third-year-cpp-eda-hft": "core-cpp-interviews",
  "trading-systems-market-microstructure": "low-latency-cpp-hft-systems",
};

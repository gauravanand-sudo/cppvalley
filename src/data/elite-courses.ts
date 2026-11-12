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
    slug: "cpp-concurrency-lockfree-systems",
    title: "C++ Concurrency Mastery",
    shortTitle: "C++ Concurrency",
    summary: "From std::thread to lock-free queues and the C++ memory model.",
    description: "A deep, correctness-first path through threads, synchronization, atomics, memory ordering, memory reclamation, and practical concurrent data structures.",
    track: "Advanced", level: "Intermediate → Expert", status: "recording", priority: 1,
    icon: "⧉", color: "violet",
    focus: ["Threads & locks", "Atomics", "Memory ordering", "Lock-free algorithms"],
    modules: ["Threads and lifecycle", "Synchronization and communication", "Futures and tasks",
      "The C++ memory model", "Atomic algorithms", "Thread-safe data structures",
      "Lock-free algorithms", "Parallelism and performance", "Testing and debugging"],
  },
  {
    slug: "low-latency-cpp-hft-systems",
    title: "C++ HFT Systems Mastery",
    shortTitle: "Low-Latency C++",
    summary: "Measure latency, understand the machine, and build reliable trading infrastructure.",
    description: "The existing 96-lesson engineering curriculum: benchmarks, CPU and memory, Linux, networking, modern C++, concurrency, market data, execution and risk.",
    track: "Systems", level: "Intermediate → Expert", status: "recording", priority: 2,
    icon: "⌁", color: "amber",
    focus: ["CPU & cache", "Linux tuning", "Market data", "Trading systems"],
    modules: ["Measurement before optimization", "CPU and memory systems",
      "Linux determinism", "Network datapaths", "Low-latency C++",
      "Concurrency and lock-free engineering", "Electronic trading systems",
      "Production safety and operations", "Capstone and hiring conversion"],
  },
  {
    slug: "core-cpp-interviews",
    title: "Core C++ & STL Mastery",
    shortTitle: "Core C++",
    summary: "Ownership, lifetime, object model, STL, and real interview-level C++.",
    description: "Develop an exact mental model of how C++ objects are constructed, owned, moved, destroyed, and represented in memory.",
    track: "Foundations", level: "Beginner → Advanced", status: "curriculum", priority: 3,
    icon: "C++", color: "blue",
    focus: ["RAII", "Smart pointers", "STL", "C++ object model"],
    modules: ["Compilation and translation units", "Object lifetime and RAII", "Pointers and ownership",
      "Copy and move semantics", "Object model and polymorphism", "STL containers",
      "Algorithms, iterators and ranges", "Errors, exceptions and undefined behavior",
      "Templates introduction", "Interview practice"],
  },
  {
    slug: "dsa-algorithms-cpp",
    title: "Data Structures & Algorithms in C++",
    shortTitle: "DSA in C++",
    summary: "Master algorithmic patterns and implement them cleanly in modern C++.",
    description: "A structured problem-solving course covering arrays, strings, hashing, stacks, queues, trees, heaps, graphs, dynamic programming and advanced techniques.",
    track: "Algorithms", level: "Beginner → Advanced", status: "curriculum", priority: 4,
    icon: "{ }", color: "green",
    focus: ["Arrays", "Trees & graphs", "Dynamic programming", "Complexity"],
    modules: ["Time and space complexity", "Arrays and two pointers", "Strings and hashing",
      "Stacks and monotonic structures", "Linked lists and queues", "Binary search and sorting",
      "Trees and traversals", "Heaps and priority queues", "Graphs and shortest paths",
      "Greedy algorithms", "Dynamic programming", "Advanced problem patterns"],
  },
  {
    slug: "stl-patterns-lld-cpp-design",
    title: "C++ Design Patterns & Low-Level Design",
    shortTitle: "C++ Design & LLD",
    summary: "Design maintainable C++ systems with clear ownership and interfaces.",
    description: "Apply strategy, observer, factory, state, command, object pools, composition, SOLID and lifetime-safe design to realistic systems.",
    track: "Advanced", level: "Intermediate → Advanced", status: "curriculum", priority: 5,
    icon: "◇", color: "purple",
    focus: ["SOLID", "Patterns", "LLD interviews", "Safe ownership"],
    modules: ["C++ design foundations", "SOLID and API contracts", "Creational patterns",
      "Structural patterns", "Behavioral patterns", "Ownership-aware design",
      "Caching, pools and resource management", "Event-driven architectures",
      "Low-level design interviews"],
  },
  {
    slug: "linux-os-networking-systems-engineers",
    title: "Linux, OS & Networking for C++ Engineers",
    shortTitle: "Linux & Networking",
    summary: "Get comfortable with processes, syscalls, sockets and profiling.",
    description: "A systems-oriented path through Linux process management, virtual memory, threads, I/O, TCP/UDP, epoll and debugging.",
    track: "Systems", level: "Beginner → Advanced", status: "curriculum", priority: 6,
    icon: "⌘", color: "cyan",
    focus: ["Linux processes", "Virtual memory", "TCP/UDP", "Profiling"],
    modules: ["Linux environment and tooling", "Processes and threads",
      "Scheduling and synchronization", "Virtual memory", "System calls and files",
      "Signals and IPC", "TCP networking", "UDP and multicast",
      "Asynchronous I/O and epoll", "Debugging and observability"],
  },
  {
    slug: "advanced-modern-cpp",
    title: "Advanced Modern C++ Mastery",
    shortTitle: "Modern C++",
    summary: "Templates, forwarding, constexpr, concepts and powerful abstractions.",
    description: "Get beyond language syntax and master type deduction, value categories, generic programming, constraints, type erasure and modern API design.",
    track: "Advanced", level: "Intermediate → Expert", status: "curriculum", priority: 7,
    icon: "⌥", color: "pink",
    focus: ["Templates", "Forwarding", "Concepts", "Type erasure"],
    modules: ["Types and deduction", "Value categories and references",
      "Perfect forwarding and overload resolution", "Template metaprogramming",
      "constexpr and compile-time evaluation", "Concepts and constraints",
      "Modern library abstractions", "Type erasure and polymorphism",
      "Performance-conscious API design"],
  },
];

export const eliteCoursesBySlug = new Map(eliteCourses.map(course => [course.slug, course]));
export const eliteTrackNames: EliteTrack[] = ["Foundations", "Algorithms", "Systems", "Advanced"];
export const legacyCourseRedirects: Record<string, string> = {
  "core-cpp-interview-series": "core-cpp-interviews",
  "concurrency-low-latency-lessons": "cpp-concurrency-lockfree-systems",
  "student-roadmap-lessons": "core-cpp-interviews",
  "third-year-cpp-eda-hft": "core-cpp-interviews",
  "trading-systems-market-microstructure": "low-latency-cpp-hft-systems",
};

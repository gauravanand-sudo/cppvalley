export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  pillar: "C++ Core" | "Systems" | "EDA / CAD" | "GPU / AI" | "Roadmap";
  level: string;
  duration: string;
  href: string;
  tags: string[];
  modules: string[];
  priority: number;
};

export const courses: Course[] = [
  {
    slug: "core-cpp-interviews",
    title: "Core C++ for Interviews",
    shortTitle: "Core C++",
    description:
      "Memory, RAII, smart pointers, move semantics, STL, object model, templates, debugging and interview-ready C++ reasoning.",
    longDescription:
      "A focused Core C++ curriculum for students and engineers preparing for serious C++ interviews. It emphasizes ownership, lifetime, STL trade-offs, object model details, templates, undefined behavior, debugging and small build-from-scratch exercises.",
    pillar: "C++ Core",
    level: "Beginner → Advanced",
    duration: "10 modules",
    href: "/courses/core-cpp-interviews",
    tags: ["C++", "Interviews", "RAII", "STL", "Templates"],
    modules: [
      "Build model, compilation and translation units",
      "Memory model basics, object lifetime and ownership",
      "RAII and deterministic resource management",
      "Smart pointers and ownership design",
      "Copy, move semantics and special member functions",
      "Object model, virtual dispatch, vptr and vtable intuition",
      "Templates, type deduction and generic code",
      "STL containers, iterators, algorithms and invalidation",
      "Undefined behavior, sanitizers, debugging and tooling",
      "Performance-aware C++ interview revision"
    ],
    priority: 1,
  },
  {
    slug: "advanced-modern-cpp",
    title: "Advanced Modern C++",
    shortTitle: "Advanced C++",
    description:
      "Type deduction, value categories, perfect forwarding, concepts, constexpr, type erasure and advanced modern C++ API design.",
    longDescription:
      "A curriculum-only track for learners who already know C++ fundamentals and want deeper fluency with modern language features, generic programming and high-quality API design.",
    pillar: "C++ Core",
    level: "Intermediate → Advanced",
    duration: "8 modules",
    href: "/courses/advanced-modern-cpp",
    tags: ["Modern C++", "Templates", "Concepts", "API design"],
    modules: [
      "auto, decltype and type deduction rules",
      "lvalues, rvalues and value categories",
      "Forwarding references and perfect forwarding",
      "constexpr, consteval and compile-time computation",
      "Concepts and constrained templates",
      "CRTP, policies and zero-overhead abstractions",
      "Type erasure and runtime polymorphism trade-offs",
      "Modern API design and maintainability"
    ],
    priority: 2,
  },
  {
    slug: "stl-patterns-lld-cpp-design",
    title: "STL, Patterns, LLD and C++ Design",
    shortTitle: "STL + LLD",
    description:
      "Effective STL, container trade-offs, design patterns, SOLID, clean interfaces and C++ low-level design practice.",
    longDescription:
      "A curriculum-only track connecting practical STL knowledge with low-level design and maintainable C++ architecture.",
    pillar: "C++ Core",
    level: "Intermediate",
    duration: "8 modules",
    href: "/courses/stl-patterns-lld-cpp-design",
    tags: ["STL", "LLD", "Design patterns", "Architecture"],
    modules: [
      "Choosing containers by complexity and memory layout",
      "Iterator invalidation and algorithm correctness",
      "Effective use of algorithms, comparators and ranges",
      "Factories, strategies, observers and dependency boundaries",
      "SOLID principles in practical C++",
      "Value semantics, ownership and interface design",
      "Low-level design prompts in C++",
      "Design review and trade-off explanation"
    ],
    priority: 3,
  },
  {
    slug: "cpp-concurrency-lockfree-systems",
    title: "C++ Multithreading, Concurrency and Lock-Free Systems",
    shortTitle: "C++ Concurrency",
    description:
      "Threads, mutexes, condition variables, atomics, memory ordering, false sharing, queues and lock-free system design.",
    longDescription:
      "A curriculum-only track for learning concurrent C++ with a focus on correctness, contention, memory ordering and performance reasoning.",
    pillar: "C++ Core",
    level: "Intermediate → Advanced",
    duration: "9 modules",
    href: "/courses/cpp-concurrency-lockfree-systems",
    tags: ["Concurrency", "Atomics", "Lock-free", "Performance"],
    modules: [
      "Threads, ownership and joining rules",
      "Mutexes, locks and scoped synchronization",
      "Condition variables and producer-consumer systems",
      "Futures, promises and task-style concurrency",
      "Atomics and the C++ memory model",
      "Relaxed, acquire-release and sequential consistency",
      "False sharing, cache lines and coherence effects",
      "Bounded queues, ring buffers and lock-free basics",
      "Thread pools and concurrency interview design"
    ],
    priority: 4,
  },
  {
    slug: "linux-os-networking-systems-engineers",
    title: "Linux, OS and Networking for Systems Engineers",
    shortTitle: "Linux + Networking",
    description:
      "Processes, threads, scheduling, memory, syscalls, files, sockets, TCP/UDP, epoll, signals, perf and gdb.",
    longDescription:
      "A curriculum-only systems foundation for C++, HFT, backend, EDA and AI infrastructure roles.",
    pillar: "Systems",
    level: "Beginner → Intermediate",
    duration: "10 modules",
    href: "/courses/linux-os-networking-systems-engineers",
    tags: ["Linux", "OS", "Networking", "Debugging"],
    modules: [
      "Linux shell, files, permissions and processes",
      "Threads, scheduling and context switches",
      "Virtual memory, paging and memory-mapped files",
      "System calls, signals and process control",
      "Filesystems, buffering and I/O paths",
      "TCP, UDP and socket programming",
      "epoll and event-driven servers",
      "gdb, strace, ltrace and debugging workflows",
      "perf, flame graphs and profiling basics",
      "Systems interview revision"
    ],
    priority: 5,
  },
  {
    slug: "low-latency-cpp-hft-systems",
    title: "Low-Latency C++ and HFT Systems",
    shortTitle: "Low-Latency HFT",
    description:
      "CPU, Linux, networking, concurrency, latency measurement, market data, execution, risk and tick-to-trade systems.",
    longDescription:
      "A complete HFT systems curriculum covering measurement, probability basics, CPU and memory behavior, Linux, networking, low-latency C++, concurrency, market microstructure, market data, execution, risk and production preparation.",
    pillar: "Systems",
    level: "Intermediate → Advanced",
    duration: "96 lessons",
    href: "/curriculum",
    tags: ["HFT", "Low latency", "Linux", "Networking", "C++"],
    modules: [
      "Measurement and probability basics",
      "CPU and memory systems",
      "Linux for low latency",
      "Networking and packet paths",
      "Low-latency C++",
      "Concurrency and lock-free engineering",
      "Market microstructure",
      "Market data, execution and risk",
      "Tick-to-trade production systems",
      "HFT interview preparation"
    ],
    priority: 6,
  },
  {
    slug: "trading-systems-market-microstructure",
    title: "Trading Systems and Market Microstructure",
    shortTitle: "Trading Systems",
    description:
      "Order books, exchanges, market data, order lifecycle, sequencing, replay, risk checks and matching-engine concepts.",
    longDescription:
      "A curriculum-only domain track for software engineers entering trading systems and HFT infrastructure.",
    pillar: "Systems",
    level: "Intermediate",
    duration: "8 modules",
    href: "/courses/trading-systems-market-microstructure",
    tags: ["Order book", "Market data", "Trading", "Risk"],
    modules: [
      "Markets, venues, instruments and participants",
      "Limit order books and price-time priority",
      "Market orders, limit orders, cancels and fills",
      "Market data feeds, snapshots and incremental updates",
      "Sequence gaps, replay and deterministic reconstruction",
      "Order entry, acknowledgements, rejects and replace flows",
      "Pre-trade risk checks and kill-switch design",
      "Matching engine and trading-system architecture"
    ],
    priority: 7,
  },
  {
    slug: "eda-cad-software-engineering",
    title: "EDA / CAD Software Engineering",
    shortTitle: "EDA / CAD",
    description:
      "Parsers, netlists, graph algorithms, simulation, timing, placement/routing intuition and optimization-heavy C++ software.",
    longDescription:
      "A curriculum-only track for students and engineers targeting EDA, CAD and semiconductor software roles.",
    pillar: "EDA / CAD",
    level: "Intermediate",
    duration: "9 modules",
    href: "/courses/eda-cad-software-engineering",
    tags: ["EDA", "CAD", "Graphs", "Semiconductor"],
    modules: [
      "Where C++ fits in EDA and semiconductor software",
      "Parsing design files and building internal representations",
      "Netlists, graphs and connectivity queries",
      "Topological ordering and timing-graph basics",
      "Logic simulation and event-driven propagation",
      "Placement and routing intuition",
      "Geometry, intervals and spatial data structures",
      "Optimization heuristics and constraint thinking",
      "EDA interview projects and explanations"
    ],
    priority: 8,
  },
  {
    slug: "cuda-gpu-programming",
    title: "CUDA and GPU Programming",
    shortTitle: "CUDA + GPU",
    description:
      "GPU architecture, CUDA kernels, blocks, warps, memory hierarchy, shared memory, streams, synchronization and profiling.",
    longDescription:
      "A curriculum-only GPU programming track for C++ engineers moving into CUDA, acceleration and performance engineering.",
    pillar: "GPU / AI",
    level: "Intermediate → Advanced",
    duration: "9 modules",
    href: "/courses/cuda-gpu-programming",
    tags: ["CUDA", "GPU", "Parallel", "Performance"],
    modules: [
      "GPU architecture and SIMT execution",
      "CUDA programming model: grids, blocks and threads",
      "Writing and launching kernels",
      "Global, shared, constant and register memory",
      "Warps, divergence and occupancy",
      "Tiling, shared memory and matrix multiplication",
      "Streams, events and asynchronous execution",
      "Profiling with Nsight-style workflows",
      "GPU performance interview preparation"
    ],
    priority: 9,
  },
  {
    slug: "ai-systems-engineering",
    title: "AI Systems Engineering",
    shortTitle: "AI Systems",
    description:
      "LLM serving, tokenization, batching, KV cache, RAG, vector search, model gateways, evals and observability.",
    longDescription:
      "A curriculum-only systems-first AI engineering track focused on production inference, RAG, vector search and reliable AI infrastructure.",
    pillar: "GPU / AI",
    level: "Intermediate",
    duration: "9 modules",
    href: "/courses/ai-systems-engineering",
    tags: ["LLM", "RAG", "Serving", "Evals"],
    modules: [
      "LLM systems overview: training, inference and serving",
      "Tokenization, context windows and prompt flow",
      "Batching, scheduling and throughput/latency trade-offs",
      "KV cache and memory pressure",
      "Embeddings and vector search",
      "RAG pipelines and retrieval quality",
      "Model gateways, routing and rate limits",
      "Evaluation, observability and incident debugging",
      "AI systems design interview practice"
    ],
    priority: 10,
  },
  {
    slug: "distributed-systems-ai-backend-infrastructure",
    title: "Distributed Systems for AI / Backend Infrastructure",
    shortTitle: "Distributed AI Infra",
    description:
      "Service design, queues, caching, storage, consistency, reliability, observability and infrastructure patterns for AI/backend systems.",
    longDescription:
      "A curriculum-only distributed systems track for backend and AI infrastructure preparation.",
    pillar: "GPU / AI",
    level: "Intermediate → Senior",
    duration: "9 modules",
    href: "/courses/distributed-systems-ai-backend-infrastructure",
    tags: ["Distributed systems", "Backend", "AI infra", "Reliability"],
    modules: [
      "Service boundaries, APIs and dependency design",
      "Load balancing, rate limiting and backpressure",
      "Caching, invalidation and data freshness",
      "Queues, streams and async workflows",
      "Storage, indexing and query paths",
      "Replication, consistency and failure handling",
      "Observability: metrics, logs, traces and dashboards",
      "Deployments, rollbacks and production readiness",
      "System design interviews for AI/backend infrastructure"
    ],
    priority: 11,
  },
  {
    slug: "third-year-cpp-eda-hft",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    shortTitle: "Student Roadmap",
    description:
      "A practical roadmap for students targeting C++ systems internships, EDA software, semiconductor tooling and HFT engineering.",
    longDescription:
      "A student-friendly roadmap that connects C++, DSA, OS/Linux, computer architecture, EDA software basics, HFT systems basics, portfolio projects and interview preparation.",
    pillar: "Roadmap",
    level: "Student → Internship-ready",
    duration: "8 modules",
    href: "/courses/third-year-cpp-eda-hft",
    tags: ["Students", "C++", "EDA", "HFT", "Projects"],
    modules: [
      "Modern C++ that companies test",
      "DSA for systems roles",
      "OS, Linux and tooling",
      "Computer architecture and performance",
      "EDA and semiconductor software basics",
      "HFT and low-latency basics",
      "Portfolio projects",
      "Resume and interview loop"
    ],
    priority: 12,
  },
];

export const coursePillars = Array.from(new Set(courses.map((course) => course.pillar)));

export const coursePages = courses.filter(
  (course) => course.href === `/courses/${course.slug}` && course.slug !== "third-year-cpp-eda-hft"
);

export const featuredCourses = courses.filter((course) => [
  "core-cpp-interviews",
  "low-latency-cpp-hft-systems",
  "cuda-gpu-programming",
  "ai-systems-engineering",
].includes(course.slug));

export const courseStats = {
  totalCourses: courses.length,
  pillars: coursePillars.length,
};

export const coursesBySlug = new Map(courses.map((course) => [course.slug, course]));

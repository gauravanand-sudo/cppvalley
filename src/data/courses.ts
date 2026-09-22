export type CourseStatus = "Live" | "Building" | "Planned";

export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  pillar: "C++ Core" | "Systems / Infra" | "GPU / AI" | "Career";
  level: string;
  duration: string;
  lessons: string;
  status: CourseStatus;
  href: string;
  coverImage: string;
  coverCode: string;
  coverIcon: string;
  coverGradient: [string, string];
  tags: string[];
  modules: string[];
  outcomes: string[];
  projects: string[];
  launchPhase: "Phase 1" | "Phase 2" | "Phase 3";
  priority: number;
};

const courseCover = (slug: string) => `/course-cover/${slug}`;

export const courses: Course[] = [
  {
    slug: "core-cpp-interviews",
    title: "Core C++ for Interviews",
    shortTitle: "Core C++",
    description:
      "C++ fundamentals, memory, RAII, smart pointers, move semantics, STL, object model, tooling and interview-ready projects.",
    longDescription:
      "The flagship cppvalley C++ course. It takes a learner from practical fundamentals to the topics that repeatedly appear in serious C++ interviews: memory, ownership, lifetime, RAII, smart pointers, STL, object model, templates, undefined behavior, debugging and build-from-scratch projects.",
    pillar: "C++ Core",
    level: "Beginner → Advanced",
    duration: "10 weeks",
    lessons: "97 lessons",
    status: "Live",
    href: "/courses/core-cpp-interviews",
    coverImage: courseCover("core-cpp-interviews"),
    coverCode: "C++",
    coverIcon: "{}",
    coverGradient: ["#0056d2", "#003b8f"],
    tags: ["C++", "Interviews", "RAII", "STL"],
    modules: ["Build model", "Memory and lifetime", "RAII", "Smart pointers", "Move semantics", "Object model", "Templates", "STL", "Undefined behavior", "Tooling"],
    outcomes: ["Explain C++ ownership clearly", "Solve interview-level C++ questions", "Build small library components from scratch"],
    projects: ["unique_ptr from scratch", "small vector", "RAII file/socket wrapper", "benchmark harness"],
    launchPhase: "Phase 1",
    priority: 1,
  },
  {
    slug: "advanced-modern-cpp",
    title: "Advanced Modern C++",
    shortTitle: "Advanced Modern C++",
    description:
      "Type deduction, value categories, perfect forwarding, concepts, CRTP, compile-time techniques and advanced API design.",
    longDescription:
      "A deeper Modern C++ track for engineers who already know the basics and want to reason about templates, value categories, type deduction, compile-time abstractions and clean high-performance C++ APIs.",
    pillar: "C++ Core",
    level: "Intermediate → Advanced",
    duration: "7 weeks",
    lessons: "Planned",
    status: "Planned",
    href: "/courses/advanced-modern-cpp",
    coverImage: courseCover("advanced-modern-cpp"),
    coverCode: "T<>" ,
    coverIcon: "λ",
    coverGradient: ["#4f46e5", "#7c3aed"],
    tags: ["Templates", "Concepts", "API design", "Modern C++"],
    modules: ["auto and decltype", "value categories", "forwarding references", "perfect forwarding", "concepts", "CRTP", "constexpr", "type erasure"],
    outcomes: ["Debug template-heavy code", "Design better modern C++ APIs", "Explain advanced language mechanics in interviews"],
    projects: ["type-safe event bus", "policy-based cache", "compile-time registry"],
    launchPhase: "Phase 3",
    priority: 11,
  },
  {
    slug: "stl-patterns-lld-cpp-design",
    title: "STL, Patterns, LLD and C++ Design",
    shortTitle: "STL + LLD",
    description:
      "Effective STL, container trade-offs, iterator invalidation, algorithms, design patterns, SOLID and C++ low-level design.",
    longDescription:
      "This course connects library-level C++ knowledge with low-level design. Learners practice choosing containers, reasoning about algorithms and building extensible C++ designs without overengineering.",
    pillar: "C++ Core",
    level: "Intermediate → Senior",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Building",
    href: "/courses/stl-patterns-lld-cpp-design",
    coverImage: courseCover("stl-patterns-lld-cpp-design"),
    coverCode: "STL",
    coverIcon: "▦",
    coverGradient: ["#0f766e", "#115e59"],
    tags: ["STL", "Design patterns", "LLD", "Architecture"],
    modules: ["Container choice", "iterator invalidation", "algorithms", "comparators", "erase-remove", "SOLID", "patterns", "type erasure", "LLD prompts"],
    outcomes: ["Choose the right STL tools", "Design clean C++ components", "Handle LLD rounds with C++ trade-offs"],
    projects: ["LRU cache", "logger framework", "parser registry", "document editor core"],
    launchPhase: "Phase 2",
    priority: 7,
  },
  {
    slug: "cpp-concurrency-lockfree-systems",
    title: "C++ Multithreading, Concurrency and Lock-Free Systems",
    shortTitle: "C++ Concurrency",
    description:
      "Threads, mutexes, condition variables, futures, atomics, memory ordering, false sharing, lock-free queues and thread pools.",
    longDescription:
      "A hands-on concurrency course for C++ engineers. The focus is not just API usage; it is reasoning about correctness, contention, memory ordering, latency and performance.",
    pillar: "C++ Core",
    level: "Intermediate → Senior",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Building",
    href: "/courses/cpp-concurrency-lockfree-systems",
    coverImage: courseCover("cpp-concurrency-lockfree-systems"),
    coverCode: "ATOMIC",
    coverIcon: "⇄",
    coverGradient: ["#b45309", "#7c2d12"],
    tags: ["Threads", "Atomics", "Lock-free", "Performance"],
    modules: ["std::thread", "mutexes", "condition variables", "futures", "atomics", "memory order", "false sharing", "queues", "thread pools"],
    outcomes: ["Write correct concurrent C++", "Explain memory ordering", "Measure and reduce contention"],
    projects: ["thread pool", "bounded queue", "SPSC ring buffer", "sharded cache"],
    launchPhase: "Phase 2",
    priority: 5,
  },
  {
    slug: "linux-os-networking-systems-engineers",
    title: "Linux, OS and Networking for Systems Engineers",
    shortTitle: "Linux + Networking",
    description:
      "Processes, threads, scheduling, memory, syscalls, files, sockets, TCP/UDP, epoll, signals, perf and gdb.",
    longDescription:
      "The systems foundation course for C++, HFT, backend, EDA and AI infrastructure roles. It teaches enough operating systems and networking to debug real systems and perform well in interviews.",
    pillar: "Systems / Infra",
    level: "Beginner → Intermediate",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Building",
    href: "/courses/linux-os-networking-systems-engineers",
    coverImage: courseCover("linux-os-networking-systems-engineers"),
    coverCode: "LINUX",
    coverIcon: "$_",
    coverGradient: ["#111827", "#374151"],
    tags: ["Linux", "OS", "Sockets", "Debugging"],
    modules: ["processes", "threads", "scheduler", "virtual memory", "syscalls", "files", "signals", "TCP/UDP", "epoll", "perf/gdb"],
    outcomes: ["Debug Linux programs", "Explain OS and networking trade-offs", "Build socket-based services"],
    projects: ["TCP echo server", "epoll chat server", "mini shell", "perf debugging lab"],
    launchPhase: "Phase 2",
    priority: 6,
  },
  {
    slug: "low-latency-cpp-hft-systems",
    title: "Low-Latency C++ and HFT Systems",
    shortTitle: "Low-Latency HFT",
    description:
      "Cache behavior, branch prediction, NUMA, memory pools, ring buffers, benchmarking, tick-to-trade and latency analysis.",
    longDescription:
      "A performance-focused HFT engineering course covering the low-level mechanics behind fast systems: CPU, memory, Linux, networking, queues, allocation, parsing and latency measurement.",
    pillar: "Systems / Infra",
    level: "Intermediate → Advanced",
    duration: "10 weeks",
    lessons: "96 lessons",
    status: "Live",
    href: "/curriculum",
    coverImage: courseCover("low-latency-cpp-hft-systems"),
    coverCode: "P99",
    coverIcon: "↯",
    coverGradient: ["#7c2d12", "#dc2626"],
    tags: ["Low latency", "HFT", "Linux", "Performance"],
    modules: ["measurement", "CPU/cache", "Linux tuning", "networking", "low-latency C++", "concurrency", "market data", "execution", "risk"],
    outcomes: ["Measure latency correctly", "Design low-latency C++ components", "Explain tick-to-trade architecture"],
    projects: ["latency histogram", "ring buffer", "feed handler", "tick-to-trade capstone"],
    launchPhase: "Phase 1",
    priority: 3,
  },
  {
    slug: "trading-systems-market-microstructure",
    title: "Trading Systems and Market Microstructure",
    shortTitle: "Trading Systems",
    description:
      "Exchanges, order books, market data, sequencing, replay, order lifecycle, risk checks, OMS/EMS and matching-engine concepts.",
    longDescription:
      "A domain course for software engineers entering trading systems. It teaches the vocabulary and mechanics behind market data, order entry, matching, risk and exchange-facing infrastructure.",
    pillar: "Systems / Infra",
    level: "Intermediate",
    duration: "7 weeks",
    lessons: "Planned",
    status: "Building",
    href: "/courses/trading-systems-market-microstructure",
    coverImage: courseCover("trading-systems-market-microstructure"),
    coverCode: "LOB",
    coverIcon: "↕",
    coverGradient: ["#047857", "#064e3b"],
    tags: ["Order book", "Market data", "Risk", "Trading"],
    modules: ["venues", "orders", "matching", "market data", "sequence gaps", "order lifecycle", "risk", "replay", "OMS/EMS"],
    outcomes: ["Understand trading-system vocabulary", "Build deterministic order-book logic", "Explain market-data and order-entry flows"],
    projects: ["matching engine", "order book replay", "risk gate", "simulated order gateway"],
    launchPhase: "Phase 2",
    priority: 8,
  },
  {
    slug: "eda-cad-software-engineering",
    title: "EDA / CAD Software Engineering",
    shortTitle: "EDA / CAD Software",
    description:
      "Parsers, graph algorithms, simulation, timing, placement/routing intuition, optimization and large C++ codebases for EDA roles.",
    longDescription:
      "A niche systems course for students and engineers targeting EDA/CAD software roles. It connects C++ with compiler-like tooling, graphs, geometry, simulation, timing and optimization-heavy software.",
    pillar: "Systems / Infra",
    level: "Intermediate",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Planned",
    href: "/courses/eda-cad-software-engineering",
    coverImage: courseCover("eda-cad-software-engineering"),
    coverCode: "EDA",
    coverIcon: "⌁",
    coverGradient: ["#0e7490", "#155e75"],
    tags: ["EDA", "CAD", "Graphs", "Semiconductor"],
    modules: ["EDA landscape", "parsers", "netlists", "graphs", "timing intuition", "placement/routing", "simulation", "optimization"],
    outcomes: ["Explain where C++ fits in EDA", "Build graph-heavy CAD mini tools", "Prepare for EDA software interviews"],
    projects: ["netlist parser", "logic simulator", "timing graph toy", "placement heuristic visualizer"],
    launchPhase: "Phase 3",
    priority: 9,
  },
  {
    slug: "cuda-gpu-programming",
    title: "CUDA and GPU Programming",
    shortTitle: "CUDA + GPU",
    description:
      "GPU architecture, CUDA kernels, warps, occupancy, memory hierarchy, shared memory, streams, synchronization and profiling.",
    longDescription:
      "A practical GPU programming course for C++ engineers moving into CUDA, acceleration and performance engineering. Learners build and profile kernels instead of only reading architecture diagrams.",
    pillar: "GPU / AI",
    level: "Intermediate → Advanced",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Planned",
    href: "/courses/cuda-gpu-programming",
    coverImage: courseCover("cuda-gpu-programming"),
    coverCode: "CUDA",
    coverIcon: "▣",
    coverGradient: ["#15803d", "#065f46"],
    tags: ["CUDA", "GPU", "Performance", "C++"],
    modules: ["GPU architecture", "kernels", "thread blocks", "warps", "memory hierarchy", "shared memory", "streams", "profiling", "optimization"],
    outcomes: ["Write CUDA kernels", "Analyze occupancy and memory access", "Profile and tune GPU code"],
    projects: ["vector add to GEMM path", "parallel reductions", "streaming pipeline", "CUDA profiler lab"],
    launchPhase: "Phase 3",
    priority: 10,
  },
  {
    slug: "ai-systems-engineering",
    title: "AI Systems Engineering",
    shortTitle: "AI Systems",
    description:
      "LLM serving, batching, KV cache, RAG, vector search, model gateways, evals, observability and latency/throughput trade-offs.",
    longDescription:
      "A systems-first AI engineering course focused on production architecture: inference, RAG, vector search, serving, evaluation, reliability, cost and observability.",
    pillar: "GPU / AI",
    level: "Intermediate → Architect",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Building",
    href: "/courses/ai-systems-engineering",
    coverImage: courseCover("ai-systems-engineering"),
    coverCode: "LLM",
    coverIcon: "✦",
    coverGradient: ["#6d28d9", "#1d4ed8"],
    tags: ["LLM", "RAG", "Serving", "Evals"],
    modules: ["LLM systems", "tokenization", "batching", "KV cache", "RAG", "vector DBs", "serving", "evals", "observability"],
    outcomes: ["Design AI infrastructure", "Explain latency and throughput trade-offs", "Build reliable RAG and serving systems"],
    projects: ["RAG service", "embedding pipeline", "inference gateway", "eval dashboard"],
    launchPhase: "Phase 1",
    priority: 4,
  },
  {
    slug: "distributed-systems-ai-backend-infra",
    title: "Distributed Systems for AI / Backend Infrastructure",
    shortTitle: "Distributed AI Infra",
    description:
      "System design, storage, queues, caches, consistency basics, scaling, reliability and AI/backend deployment patterns.",
    longDescription:
      "A system design and backend infrastructure course for learners targeting AI infra, platform engineering and backend roles. It connects classic distributed-systems concepts with modern AI serving patterns.",
    pillar: "GPU / AI",
    level: "Intermediate → Senior",
    duration: "8 weeks",
    lessons: "Planned",
    status: "Planned",
    href: "/courses/distributed-systems-ai-backend-infra",
    coverImage: courseCover("distributed-systems-ai-backend-infra"),
    coverCode: "SYS",
    coverIcon: "⛓",
    coverGradient: ["#1d4ed8", "#0f172a"],
    tags: ["Distributed systems", "Backend", "AI infra", "Reliability"],
    modules: ["system design", "storage", "queues", "caches", "consistency", "scaling", "fault tolerance", "AI deployment", "observability"],
    outcomes: ["Design scalable services", "Discuss reliability trade-offs", "Connect AI systems to backend infrastructure"],
    projects: ["job queue", "feature store toy", "rate limiter", "AI serving control plane"],
    launchPhase: "Phase 3",
    priority: 12,
  },
  {
    slug: "third-year-cpp-eda-hft",
    title: "3rd / 4th Year Student Roadmap: C++ → EDA / HFT / AI Systems",
    shortTitle: "Student Roadmap",
    description:
      "A semester-friendly roadmap from C++ foundations to OS, projects, EDA, HFT, AI systems, resume proof and interview planning.",
    longDescription:
      "A highly shareable student roadmap for 3rd and 4th year learners. It organizes C++, DSA, OS, computer architecture, projects, EDA, HFT and AI systems into a path that can lead to internships and new-grad roles.",
    pillar: "Career",
    level: "College student → Internship-ready",
    duration: "12 weeks",
    lessons: "8 modules",
    status: "Live",
    href: "/courses/third-year-cpp-eda-hft",
    coverImage: courseCover("third-year-cpp-eda-hft"),
    coverCode: "ROADMAP",
    coverIcon: "⌁",
    coverGradient: ["#0891b2", "#0056d2"],
    tags: ["Students", "Roadmap", "EDA", "HFT", "AI systems"],
    modules: ["Modern C++", "DSA", "Linux and OS", "computer architecture", "EDA basics", "HFT basics", "AI systems overview", "resume/interviews"],
    outcomes: ["Know what to study in order", "Build resume-worthy systems projects", "Prepare for EDA/HFT/AI systems interviews"],
    projects: ["order book", "netlist parser", "memory pool", "logic simulator", "RAG mini system"],
    launchPhase: "Phase 1",
    priority: 2,
  },
];

export const coursesBySlug = new Map(courses.map((course) => [course.slug, course]));

export const coursePillars = ["C++ Core", "Systems / Infra", "GPU / AI", "Career"] as const;

export const featuredCourseIds = [
  "core-cpp-interviews",
  "third-year-cpp-eda-hft",
  "low-latency-cpp-hft-systems",
  "ai-systems-engineering",
] as const;

export const featuredCourses = featuredCourseIds
  .map((slug) => coursesBySlug.get(slug))
  .filter((course): course is Course => Boolean(course));

export const courseStats = {
  totalCourses: courses.length,
  liveOrBuilding: courses.filter((course) => course.status !== "Planned").length,
  pillars: coursePillars.length,
};

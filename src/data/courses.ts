export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  pillar: "C++ Core" | "Systems" | "Career" | "Video";
  level: string;
  duration: string;
  lessons: string;
  href: string;
  tags: string[];
  modules: string[];
  outcomes: string[];
  projects: string[];
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
      "A focused Core C++ track for students and engineers preparing for serious C++ interviews. It emphasizes ownership, lifetime, STL trade-offs, object model details, templates, undefined behavior, debugging and small build-from-scratch exercises.",
    pillar: "C++ Core",
    level: "Beginner → Advanced",
    duration: "10 modules",
    lessons: "Course outline",
    href: "/courses/core-cpp-interviews",
    tags: ["C++", "Interviews", "RAII", "STL", "Templates"],
    modules: [
      "Build model and compilation",
      "Memory and object lifetime",
      "RAII and resource ownership",
      "Smart pointers and ownership design",
      "Copy, move semantics and special members",
      "Object model and virtual dispatch",
      "Templates and type deduction",
      "STL containers, iterators and algorithms",
      "Undefined behavior, sanitizers and debugging",
      "Performance-aware C++ interview practice"
    ],
    outcomes: [
      "Explain C++ ownership and lifetime clearly",
      "Answer common C++ interview questions with trade-offs",
      "Build small library-style components from scratch"
    ],
    projects: ["RAII file wrapper", "unique_ptr from scratch", "small vector sketch", "benchmark harness"],
    priority: 1,
  },
  {
    slug: "third-year-cpp-eda-hft",
    title: "3rd/4th Year C++ → EDA/HFT Roadmap",
    shortTitle: "Student Roadmap",
    description:
      "A practical roadmap for students targeting C++ systems internships, EDA software, semiconductor tooling and HFT engineering.",
    longDescription:
      "A student-friendly roadmap that connects C++, DSA, OS/Linux, computer architecture, EDA software basics, HFT systems basics, portfolio projects and interview preparation.",
    pillar: "Career",
    level: "Student → Internship-ready",
    duration: "8 modules",
    lessons: "Roadmap",
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
    outcomes: [
      "Know what to learn first for systems internships",
      "Build projects that fit EDA and HFT interviews",
      "Turn project work into resume and interview proof"
    ],
    projects: ["Order book", "Netlist parser", "Memory pool", "Logic simulator"],
    priority: 2,
  },
  {
    slug: "low-latency-cpp-hft-systems",
    title: "Low-Latency C++ and HFT Systems",
    shortTitle: "HFT Systems",
    description:
      "CPU, Linux, networking, concurrency, latency measurement, market data, execution, risk and tick-to-trade systems.",
    longDescription:
      "A complete HFT systems curriculum covering measurement, probability basics, CPU and memory behavior, Linux, networking, low-latency C++, concurrency, market microstructure, market data, execution, risk and production preparation.",
    pillar: "Systems",
    level: "Intermediate → Advanced",
    duration: "96 lessons",
    lessons: "96 lessons",
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
    outcomes: [
      "Measure latency with histograms and percentiles",
      "Explain the tick-to-trade path clearly",
      "Design C++ components for low-latency systems"
    ],
    projects: ["Latency histogram", "Ring buffer", "Order book", "Tick-to-trade capstone"],
    priority: 3,
  },
  {
    slug: "cpp-systems-video-courses",
    title: "C++ Systems Video Lessons",
    shortTitle: "Video Lessons",
    description:
      "Embedded cppvalley videos on virtual functions, destructors, constructors, unique_ptr, atomics, cache coherence and false sharing.",
    longDescription:
      "A curated video library for learning C++ systems topics with practical explanations and code-oriented examples.",
    pillar: "Video",
    level: "Beginner → Intermediate",
    duration: "8 videos",
    lessons: "8 videos",
    href: "/youtube",
    tags: ["Videos", "C++", "Concurrency", "Interviews"],
    modules: [
      "Virtual functions and vtables",
      "Virtual destructors",
      "Constructors and object lifetime",
      "Default constructors",
      "unique_ptr internals",
      "CPU cache and atomics",
      "False sharing and MESI",
      "Self-joining thread patterns"
    ],
    outcomes: [
      "Review difficult C++ topics visually",
      "Connect videos to interview questions",
      "Build intuition for systems-level C++"
    ],
    projects: ["unique_ptr walkthrough", "atomics experiment", "false-sharing benchmark"],
    priority: 4,
  },
];

export const coursePillars = Array.from(new Set(courses.map((course) => course.pillar)));

export const coursePages = courses.filter((course) => course.href === `/courses/${course.slug}`);

export const featuredCourses = courses.slice(0, 3);

export const courseStats = {
  totalCourses: courses.length,
  pillars: coursePillars.length,
  publicTracks: courses.length,
};

export const coursesBySlug = new Map(courses.map((course) => [course.slug, course]));

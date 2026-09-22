export type YoutubeVideo = {
  title: string;
  videoId: string;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  intent: string;
};

export type YoutubeSeries = {
  slug: string;
  title: string;
  audience: string;
  description: string;
  seoKeywords: string[];
  videos: YoutubeVideo[];
};

export const youtubeChannelUrl = "https://www.youtube.com/@cppvalley";

export const youtubeSeries: YoutubeSeries[] = [
  {
    slug: "core-cpp-interviews",
    title: "Core C++ Interview Series",
    audience: "Students and engineers preparing for Adobe-level C++ interview depth.",
    description:
      "Deep C++ interview explanations around virtual functions, virtual destructors, constructors, default constructors and ownership. Best paired with the Core C++ interview course.",
    seoKeywords: [
      "C++ interview videos",
      "virtual functions C++",
      "virtual destructor C++",
      "default constructor C++",
      "unique_ptr deep dive",
    ],
    videos: [
      {
        title: "C++ Interview Series #1 | Virtual Functions (vptr, vtable, ASM) | Adobe-Level Depth",
        videoId: "oYw_u0B54DM",
        topic: "Object model",
        level: "Intermediate",
        duration: "36:27",
        intent: "Explain virtual dispatch, vptr, vtable and assembly-level intuition for C++ interviews.",
      },
      {
        title: "C++ Interview Series #2 | Why 1 Missing Word Crashes Adobe Interview | Virtual Destructor C++",
        videoId: "J1tm3wxtAUA",
        topic: "Virtual destructor",
        level: "Intermediate",
        duration: "35:10",
        intent: "Show why base classes need virtual destructors when deleting through base pointers.",
      },
      {
        title: "C++ Interview Series #3 | The Word You Can't Add To A Constructor | Adobe C++ Interview",
        videoId: "JzpqG_9WTAc",
        topic: "Constructors",
        level: "Intermediate",
        duration: "9:39",
        intent: "Clarify constructor rules and common traps in C++ interviews.",
      },
      {
        title: "C++ Interview Series #4 | Default Constructor (Generated vs Deleted) | Adobe-Level Depth",
        videoId: "R2UIXXUBfpY",
        topic: "Special member functions",
        level: "Intermediate",
        duration: "24:06",
        intent: "Teach when default constructors are generated, deleted or user-provided.",
      },
      {
        title: "Understanding unique_ptr by Building It (C++ Deep Dive)",
        videoId: "0wb01KTkKDo",
        topic: "Ownership and RAII",
        level: "Intermediate",
        duration: "1:14:37",
        intent: "Connect smart-pointer theory to implementation by building unique_ptr from scratch.",
      },
    ],
  },
  {
    slug: "concurrency-low-latency",
    title: "Concurrency, Atomics and Low-Latency C++",
    audience: "Learners preparing for C++ multithreading, HFT and performance-heavy systems interviews.",
    description:
      "Videos on self-joining threads, CPU cache, memory model, false sharing, MESI and cache coherence — the bridge between modern C++ and low-latency systems.",
    seoKeywords: [
      "C++ atomics",
      "C++ memory model",
      "false sharing C++",
      "MESI cache coherence",
      "low latency C++",
      "self joining thread C++",
    ],
    videos: [
      {
        title: "You Can’t Understand Atomics Without This | CPU Cache & Memory Model (C++)",
        videoId: "5XIaRaqfaOI",
        topic: "Atomics and memory model",
        level: "Advanced",
        duration: "1:05:44",
        intent: "Prepare learners for atomics by first explaining CPU cache and the memory model.",
      },
      {
        title: "Systems Mastery Series #1 | False Sharing, MESI, Cache Coherence | C++ Low Latency",
        videoId: "1lBMzmeOja8",
        topic: "Cache coherence",
        level: "Advanced",
        duration: "32:29",
        intent: "Explain false sharing, MESI and cache coherence for systems and HFT-style interviews.",
      },
      {
        title: "Stop std::terminate | Simple Self-Joining Thread in C++ @cppvalley",
        videoId: "ulEAwVvm7bM",
        topic: "Thread RAII",
        level: "Intermediate",
        duration: "15:44",
        intent: "Show how RAII can make thread ownership safer and avoid std::terminate.",
      },
    ],
  },
  {
    slug: "student-roadmap",
    title: "Student Roadmap: C++ → EDA/HFT",
    audience: "3rd/4th year students exploring C++, EDA, HFT and systems roles.",
    description:
      "A curated path that points students to the most relevant existing videos first, then connects them to the EDA/HFT roadmap and project pages.",
    seoKeywords: [
      "C++ roadmap for college students",
      "EDA software engineer roadmap",
      "HFT internship preparation",
      "C++ systems internship",
    ],
    videos: [
      {
        title: "Understanding unique_ptr by Building It (C++ Deep Dive)",
        videoId: "0wb01KTkKDo",
        topic: "Modern C++ foundation",
        level: "Intermediate",
        duration: "1:14:37",
        intent: "Recommended first long-form project-style video for students building C++ depth.",
      },
      {
        title: "You Can’t Understand Atomics Without This | CPU Cache & Memory Model (C++)",
        videoId: "5XIaRaqfaOI",
        topic: "Architecture foundation",
        level: "Advanced",
        duration: "1:05:44",
        intent: "Use as the bridge from C++ to architecture, HFT and performance engineering.",
      },
    ],
  },
];

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

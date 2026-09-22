export type YoutubeVideo = {
  title: string;
  videoId: string;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
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
    slug: "start-here",
    title: "Start Here: C++ Interview Direction",
    audience: "Students deciding whether to target C++, EDA, HFT or systems roles.",
    description:
      "Roadmaps, preparation order, portfolio advice and what to learn before jumping into advanced systems topics.",
    seoKeywords: ["C++ roadmap", "C++ interview preparation", "HFT roadmap", "EDA career"],
    videos: [
      {
        title: "Add your first roadmap video",
        videoId: "",
        topic: "Roadmap",
        level: "Beginner",
        intent: "Use for broad discovery traffic and new visitors.",
      },
    ],
  },
  {
    slug: "core-cpp",
    title: "Core C++ for Interviews",
    audience: "Learners building C++ fundamentals for interviews and project work.",
    description:
      "RAII, smart pointers, move semantics, STL, object model, templates, undefined behavior and performance-aware C++.",
    seoKeywords: ["modern C++", "RAII", "smart pointers", "move semantics", "STL interview"],
    videos: [
      {
        title: "Add your Core C++ video",
        videoId: "",
        topic: "Modern C++",
        level: "Intermediate",
        intent: "Match with the Core C++ course and internal lesson pages.",
      },
    ],
  },
  {
    slug: "hft-low-latency",
    title: "HFT and Low-Latency Systems",
    audience: "Engineers targeting HFT, trading systems and performance-critical C++ roles.",
    description:
      "CPU, cache, Linux, networking, latency measurement, market data, order books, execution, risk and tick-to-trade systems.",
    seoKeywords: ["HFT systems", "low latency C++", "trading systems", "market data", "order book"],
    videos: [
      {
        title: "Add your HFT systems video",
        videoId: "",
        topic: "HFT Systems",
        level: "Advanced",
        intent: "Support HFT curriculum traffic and interview searches.",
      },
    ],
  },
  {
    slug: "eda-systems",
    title: "C++ for EDA and Semiconductor Software",
    audience: "3rd/4th year students exploring EDA CAD, semiconductor software and C++ systems roles.",
    description:
      "C++ software used around compilers, simulators, placement/routing tools, graph algorithms, parsers and performance-heavy EDA workflows.",
    seoKeywords: ["EDA software", "C++ EDA", "semiconductor software", "VLSI CAD", "EDA interview"],
    videos: [
      {
        title: "Add your EDA/C++ video",
        videoId: "",
        topic: "EDA Systems",
        level: "Intermediate",
        intent: "Attract students searching for EDA and C++ career paths.",
      },
    ],
  },
  {
    slug: "ai-systems",
    title: "AI Systems Engineering",
    audience: "Builders who want to understand RAG, serving, agents and production AI systems.",
    description:
      "Vector search, RAG pipelines, inference serving, batching, evaluation, observability, latency and cost-aware AI architecture.",
    seoKeywords: ["AI systems", "RAG", "vector database", "model serving", "AI engineering interview"],
    videos: [
      {
        title: "Add your AI systems video",
        videoId: "",
        topic: "AI Systems",
        level: "Intermediate",
        intent: "Create a bridge between C++/systems traffic and modern AI systems traffic.",
      },
    ],
  },
];

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

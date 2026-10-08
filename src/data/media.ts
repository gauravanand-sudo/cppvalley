export const heroImages = [
  "/generated/hero.svg",
  "/generated/systems.svg",
  "/generated/eda-cad.svg",
];

export const catalogHeroImage = "/generated/cpp-core.svg";
export const blogHeroImage = "/generated/hero.svg";

const pillarFallbacks: Record<string, string> = {
  "C++ Core": "/generated/cpp-core.svg",
  Systems: "/generated/systems.svg",
  "EDA / CAD": "/generated/eda-cad.svg",
  "GPU / AI": "/generated/eda-cad.svg",
  Roadmap: "/generated/hero.svg",
};

const courseImages: Record<string, string> = {
  "core-cpp-interviews": "/generated/cpp-core.svg",
  "advanced-modern-cpp": "/generated/cpp-core.svg",
  "stl-patterns-lld-cpp-design": "/generated/cpp-core.svg",
  "cpp-concurrency-lockfree-systems": "/generated/cpp-core.svg",
  "core-cpp-interview-series": "/generated/cpp-core.svg",

  "linux-os-networking-systems-engineers": "/generated/systems.svg",
  "low-latency-cpp-hft-systems": "/generated/hft.svg",
  "trading-systems-market-microstructure": "/generated/hft.svg",
  "concurrency-low-latency-lessons": "/generated/hft.svg",

  "eda-cad-software-engineering": "/generated/eda-cad.svg",

  "cuda-gpu-programming": "/generated/eda-cad.svg",
  "ai-systems-engineering": "/generated/eda-cad.svg",
  "distributed-systems-ai-backend-infrastructure": "/generated/systems.svg",

  "third-year-cpp-eda-hft": "/generated/hero.svg",
  "student-roadmap-lessons": "/generated/hero.svg",
};

export function imageForCourse(slug: string, pillar: string) {
  return courseImages[slug] ?? pillarFallbacks[pillar] ?? heroImages[0];
}

const blogImages: Record<string, string> = {
  "cpp-hft-actor-messaging-fast-send-3370ns-to-30ns": "/generated/hft.svg",
  "roadmap-to-cracking-hft-in-120-days": "/generated/hero.svg",
};

export function imageForBlog(slug: string) {
  return blogImages[slug] ?? blogHeroImage;
}

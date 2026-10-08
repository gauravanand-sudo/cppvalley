const unsplash = (photoId: string, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=82`;

export const heroImages = [
  unsplash("photo-1722681983715-5a4630e6c08d", 1400),
  unsplash("photo-1558494949-ef010cbdcc31", 1100),
  unsplash("photo-1518770660439-4636190af475", 1100),
];

export const catalogHeroImage = unsplash("photo-1555066931-4365d14bab8c", 1600);
export const blogHeroImage = unsplash("photo-1611974789855-9c2a0a7236a3", 1600);

const pillarFallbacks: Record<string, string> = {
  "C++ Core": unsplash("photo-1515879218367-8466d910aaa4"),
  Systems: unsplash("photo-1558494949-ef010cbdcc31"),
  "EDA / CAD": unsplash("photo-1518770660439-4636190af475"),
  "GPU / AI": unsplash("photo-1591799264318-7e6ef8ddb7ea"),
  Roadmap: unsplash("photo-1531297484001-80022131f5a1"),
};

const courseImages: Record<string, string> = {
  "core-cpp-interviews": unsplash("photo-1515879218367-8466d910aaa4"),
  "advanced-modern-cpp": unsplash("photo-1555066931-4365d14bab8c"),
  "stl-patterns-lld-cpp-design": unsplash("photo-1722681983715-5a4630e6c08d"),
  "cpp-concurrency-lockfree-systems": unsplash("photo-1591799264318-7e6ef8ddb7ea"),
  "core-cpp-interview-series": unsplash("photo-1673022566624-c8315b87267c"),
  "linux-os-networking-systems-engineers": unsplash("photo-1544197150-b99a580bb7a8"),
  "low-latency-cpp-hft-systems": unsplash("photo-1611974789855-9c2a0a7236a3"),
  "trading-systems-market-microstructure": unsplash("photo-1611974789855-9c2a0a7236a3"),
  "concurrency-low-latency-lessons": unsplash("photo-1558494949-ef010cbdcc31"),
  "eda-cad-software-engineering": unsplash("photo-1550751827-4bd374c3f58b"),
  "cuda-gpu-programming": unsplash("photo-1591799264318-7e6ef8ddb7ea"),
  "ai-systems-engineering": unsplash("photo-1451187580459-43490279c0fa"),
  "distributed-systems-ai-backend-infrastructure": unsplash("photo-1558494949-ef010cbdcc31"),
  "third-year-cpp-eda-hft": unsplash("photo-1516321318423-f06f85e504b3"),
  "student-roadmap-lessons": unsplash("photo-1531297484001-80022131f5a1"),
};

export function imageForCourse(slug: string, pillar: string) {
  return courseImages[slug] ?? pillarFallbacks[pillar] ?? heroImages[0];
}

const blogImages: Record<string, string> = {
  "cpp-hft-actor-messaging-fast-send-3370ns-to-30ns": unsplash("photo-1558494949-ef010cbdcc31", 1500),
  "roadmap-to-cracking-hft-in-120-days": unsplash("photo-1611974789855-9c2a0a7236a3", 1500),
};

export function imageForBlog(slug: string) {
  return blogImages[slug] ?? blogHeroImage;
}

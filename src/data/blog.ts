export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime?: string;
  topics?: string[];
  sections: BlogSection[];
};

/*
  Daily publishing workflow:
  1. Add a new object to blogPosts.
  2. Use YYYY-MM-DD for publishedAt.
  3. Keep each post focused on one engineering idea.

  Example shape:
  {
    slug: "why-tail-latency-matters",
    title: "Why tail latency matters",
    excerpt: "A short summary shown on the blog index.",
    publishedAt: "2026-08-21",
    readingTime: "4 min read",
    topics: ["Latency", "Performance"],
    sections: [
      {
        heading: "The average hides the problem",
        paragraphs: ["Your paragraph here."],
        bullets: ["Optional bullet point"],
      },
    ],
  },
*/
export const blogPosts: BlogPost[] = [];

export const blogPostsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

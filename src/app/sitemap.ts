import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { lessons } from "@/data/curriculum";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-22");

  const corePages: MetadataRoute.Sitemap = [
    {
      url: "https://cppvalley.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://cppvalley.com/courses",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://cppvalley.com/courses/third-year-cpp-eda-hft",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://cppvalley.com/curriculum",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://cppvalley.com/blog",
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://cppvalley.com/interviews",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://cppvalley.com/youtube",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://cppvalley.com/projects",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://cppvalley.com/books",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://cppvalley.com/conferences",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const lessonPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `https://cppvalley.com/curriculum/${lesson.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://cppvalley.com/blog/${post.slug}`,
    lastModified: new Date(`${post.publishedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...corePages, ...lessonPages, ...blogPages];
}

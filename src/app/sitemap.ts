import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";
import { lessons } from "@/data/curriculum";
import { interviewSets } from "@/data/interviews";
import { youtubeSeries } from "@/data/youtube";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-23");

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
      priority: 0.98,
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
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://cppvalley.com/youtube",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
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
  ];

  const coursePages: MetadataRoute.Sitemap = courses
    .filter((course) => course.href.startsWith("/courses/"))
    .map((course) => ({
      url: `https://cppvalley.com${course.href}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.86,
    }));

  const videoCoursePages: MetadataRoute.Sitemap = youtubeSeries.map((series) => ({
    url: `https://cppvalley.com/youtube/${series.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.84,
  }));

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
    priority: 0.72,
  }));

  const interviewPages: MetadataRoute.Sitemap = interviewSets.map((set) => ({
    url: `https://cppvalley.com/interviews/${set.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  return [...corePages, ...coursePages, ...videoCoursePages, ...lessonPages, ...blogPages, ...interviewPages];
}

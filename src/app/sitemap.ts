import type { MetadataRoute } from "next";
import { lessons } from "@/data/curriculum";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-16");

  const corePages: MetadataRoute.Sitemap = [
    {
      url: "https://cppvalley.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://cppvalley.com/curriculum",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const lessonPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `https://cppvalley.com/curriculum/${lesson.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...corePages, ...lessonPages];
}

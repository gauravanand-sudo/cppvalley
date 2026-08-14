import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-14");

  return [
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
    {
      url: "https://cppvalley.com/projects",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://cppvalley.com/proof",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

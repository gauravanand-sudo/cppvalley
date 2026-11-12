import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { eliteCourses } from "@/data/elite-courses";
import { problemBank } from "@/data/problem-bank";
export default function sitemap():MetadataRoute.Sitemap{
 const base="https://cppvalley.com";
 const statics=["","/problems","/study-plans","/courses","/videos","/blog"].map((path,i)=>({url:base+path,changeFrequency:"weekly" as const,priority:i===0?1:0.85}));
 const courses=eliteCourses.map(c=>({url:base+"/courses/"+c.slug,changeFrequency:"monthly" as const,priority:0.75}));
 const problems=problemBank.filter(p=>p.status==="runnable").map(p=>({url:base+"/problems/"+p.slug,changeFrequency:"monthly" as const,priority:0.8}));
 const posts=blogPosts.map(p=>({url:base+"/blog/"+p.slug,lastModified:new Date(p.publishedAt+"T00:00:00Z"),changeFrequency:"monthly" as const,priority:0.72}));
 return [...statics,...courses,...problems,...posts];
}

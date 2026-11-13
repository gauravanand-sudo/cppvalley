import type { MetadataRoute } from "next";
import { assertContentIntegrity } from "@/lib/practice/content-audit";
import { blogPosts } from "@/data/blog";
import { eliteCourses } from "@/data/elite-courses";
import { careerPaths } from "@/data/career-paths";
import { problemBank } from "@/data/problem-bank";
export default function sitemap():MetadataRoute.Sitemap{
 assertContentIntegrity();
 const base="https://cppvalley.com";
 const statics=["","/career-paths","/problems","/study-plans","/courses","/projects","/videos","/blog"].map((path,i)=>({url:base+path,changeFrequency:"weekly" as const,priority:i===0?1:0.85}));
 const courses=eliteCourses.map(c=>({url:base+"/courses/"+c.slug,changeFrequency:"monthly" as const,priority:0.75}));
 const paths=careerPaths.map(p=>({url:base+"/career-paths/"+p.slug,changeFrequency:"monthly" as const,priority:0.85}));
 const problems=problemBank.filter(p=>p.status==="runnable").map(p=>({url:base+"/problems/"+p.slug,changeFrequency:"monthly" as const,priority:0.8}));
 const posts=blogPosts.map(p=>({url:base+"/blog/"+p.slug,lastModified:new Date(p.publishedAt+"T00:00:00Z"),changeFrequency:"monthly" as const,priority:0.72}));
 return [...statics,...paths,...courses,...problems,...posts];
}

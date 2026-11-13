import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProblemsCatalog } from "@/components/ProblemsCatalog";
export const metadata:Metadata={title:"400 C++ Problem Topics — Verified Coding Challenges",description:"Browse 400 curated original C++ problem concepts across Core C++, Concurrency, HFT Systems and Design Patterns. See which challenges are fully runnable.",alternates:{canonical:"/problems"}};
export default async function ProblemsPage({searchParams}:{searchParams:Promise<{q?:string;category?:string;difficulty?:string;status?:string}>}){
 const p=await searchParams;
 return <><SiteHeader/><main className="cv-subpage"><ProblemsCatalog initialQuery={p.q} initialCategory={p.category} initialDifficulty={p.difficulty} initialStatus={p.status}/></main><SiteFooter/></>;
}

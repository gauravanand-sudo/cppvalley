import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PracticeWorkspace } from "@/components/PracticeWorkspace";
import { getPracticeProblem } from "@/data/practice";
import { problemBank, getBankProblem } from "@/data/problem-bank";
import { lessonsForProblem } from "@/data/course-lessons";
import { eliteCoursesBySlug } from "@/data/elite-courses";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return problemBank.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const p=getBankProblem(slug);
 if(!p)return {title:"Problem not found"};
 return {title:p.title+" — C++ Coding Challenge",description:p.summary,alternates:{canonical:"/problems/"+slug},robots:p.status==="runnable"?{index:true,follow:true}:{index:false,follow:true}};
}
export default async function ProblemDetails({params}:Props){
 const {slug}=await params;const problem=getBankProblem(slug);if(!problem)notFound();
 const ready=getPracticeProblem(slug);
 if(ready)return <><SiteHeader/><main className="pv-workspace-main cv-workspace-main"><PracticeWorkspace problem={ready}/></main></>;
 const related=lessonsForProblem(slug);
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell cv-draft-page">
  <nav className="cv-mini-breadcrumb"><Link href="/problems">← Problem library</Link><span>/</span><span>{problem.category}</span></nav>
  <div className="cv-draft-layout"><article className="cv-white-card cv-draft-main"><span className="cv-review cv-availability">Editorial review</span><h1>{problem.title}</h1>
   <div className="cv-draft-tags"><span className={"cv-level cv-"+problem.difficulty.toLowerCase()}>{problem.difficulty}</span><span>{problem.category}</span>{problem.tags.map(t=><span key={t}>{t}</span>)}</div>
   <h2>Challenge overview</h2><p>This topic has been selected for the CppValley C++ practice bank. The exact input/output contract, sample cases, reference implementation, and automated judge fixtures are still being authored and independently reviewed.</p>
   <h2>What will be assessed?</h2><ul><li>Clear reasoning about the underlying C++ or systems concept</li><li>Correct handling of boundary conditions and complexity constraints</li><li>A solution that can be checked reproducibly by automated tests</li></ul>
   <div className="cv-editorial-note"><strong>Not judge-ready yet.</strong><p>This is an editorial preview, not a runnable problem. We don't provide a fake editor or a fabricated Accepted verdict while its specification is incomplete.</p></div>
   <Link className="cv-btn cv-btn-primary" href="/problems?status=runnable">Solve verified problems →</Link>
  </article><aside className="cv-draft-related"><div className="cv-white-card"><h2>Related course lessons</h2>{related.length?related.map(l=><Link key={l.courseSlug+l.slug} href={"/courses/"+l.courseSlug+"/lessons/"+l.slug}><strong>{l.title}</strong><small>{eliteCoursesBySlug.get(l.courseSlug)?.shortTitle}</small></Link>):<p>Course recommendations are being reviewed.</p>}</div><Link href="/study-plans" className="cv-btn cv-btn-secondary">Browse study plans →</Link></aside></div>
 </div></main><SiteFooter/></>;
}

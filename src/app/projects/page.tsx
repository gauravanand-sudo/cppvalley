import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths } from "@/data/career-paths";
import { eliteCourses } from "@/data/elite-courses";

export const metadata:Metadata={
 title:"Engineering Projects — HFT · CUDA · AI Systems",
 description:"Career-aligned capstone project briefs for Quant/HFT, CUDA, AI infrastructure and architecture.",
 alternates:{canonical:"/projects"},
};

export default function ProjectsPage() {
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
   <header className="cv-focus-heading"><span className="cv-eyebrow">BUILD</span>
     <h1>Projects</h1><p>Choose a capstone for your target role.</p>
   </header>
   <section className="cv-focus-project-grid">
     {careerPaths.map(path=><Link href={"/career-paths/"+path.slug} className="cv-focus-project-card" key={path.slug}>
       <span className="cv-focus-path-symbol">{path.icon}</span>
       <h2>{path.shortTitle}</h2>
       <p>{path.project}</p>
       <strong>View capstone →</strong>
     </Link>)}
   </section>
   <details className="cv-focus-compact-details">
     <summary>Course-level projects ({eliteCourses.length})</summary>
     <div>{eliteCourses.map(c=><Link href={"/courses/"+c.slug} key={c.slug}><span>{c.code} · {c.title}</span><span>→</span></Link>)}</div>
   </details>
   <p className="cv-focus-footnote">Project briefs describe planned assessments; they are not completed certifications.</p>
 </div></main><SiteFooter/></>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths } from "@/data/career-paths";
import { eliteCoursesBySlug } from "@/data/elite-courses";

export const metadata:Metadata={
 title:"Career Paths — Quant/HFT · GPU/CUDA · AI Systems · AI Architect",
 description:"Pick a job outcome and follow its ordered engineering courses.",
 alternates:{canonical:"/career-paths"},
};

export default function CareerPathsPage() {
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
   <div className="cv-focus-heading"><span className="cv-eyebrow">START HERE</span>
     <h1>Choose your career path</h1>
     <p>Pick a role to see exactly what to learn, practice and build.</p>
   </div>
   <div className="cv-focus-path-index">
     {careerPaths.map(path=><Link key={path.slug} href={"/career-paths/"+path.slug}>
       <span className="cv-focus-path-symbol">{path.icon}</span>
       <div><h2>{path.title}</h2><p>{path.tagline}</p>
         <small>{path.courseSlugs.map(slug=>eliteCoursesBySlug.get(slug)?.code||"").join(" → ")} · {path.courseSlugs.length} courses</small>
       </div>
       <span aria-hidden="true">→</span>
     </Link>)}
   </div>
   <p className="cv-focus-footnote">Career paths are learning roadmaps, not job guarantees. Lessons and assessments are published progressively.</p>
 </div></main><SiteFooter/></>;
}

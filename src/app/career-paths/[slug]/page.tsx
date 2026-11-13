import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CareerPathTabs, type CourseStep } from "@/components/CareerPathTabs";
import { careerPaths, careerPathsBySlug } from "@/data/career-paths";
import { eliteCoursesBySlug } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return careerPaths.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const path=careerPathsBySlug.get((await params).slug);
 return {title:path?.title||"Career Path",description:path?.tagline,alternates:path?{canonical:"/career-paths/"+path.slug}:undefined};
}
function toStep(slug:string):CourseStep|null {
 const c=eliteCoursesBySlug.get(slug);
 return c?{slug:c.slug,code:c.code,title:c.title,summary:c.summary,lessons:(lessonsByCourse.get(c.slug)||[]).length}:null;
}
export default async function CareerPathDetails({params}:Props){
 const path=careerPathsBySlug.get((await params).slug);if(!path)notFound();
 const courses=path.courseSlugs.map(toStep).filter((c):c is CourseStep=>c!==null);
 const electives=path.optionalCourseSlugs.map(toStep).filter((c):c is CourseStep=>c!==null);
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
   <Link href="/career-paths" className="cv-focus-back">← Career paths</Link>
   <header className="cv-focus-path-hero">
     <span className="cv-eyebrow">{path.code}</span>
     <h1>{path.title}</h1><p>{path.tagline}</p>
     <div className="cv-focus-meta"><span><strong>{courses.length} courses</strong> in order</span><span>{courses.map(c=>c.code).join(" → ")}</span></div>
   </header>
   <CareerPathTabs path={path} courses={courses} electives={electives}/>
   <p className="cv-focus-footnote">Starting point: {path.entry}</p>
 </div></main><SiteFooter/></>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CourseDetailTabs, type LinkedCourse } from "@/components/CourseDetailTabs";
import { eliteCourses, eliteCoursesBySlug, legacyCourseRedirects } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";
import { problemBankBySlug } from "@/data/problem-bank";
import { pathsForCourse } from "@/data/career-paths";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return eliteCourses.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const slug=(await params).slug;const c=eliteCoursesBySlug.get(slug);
 if(!c)return {title:"Course"};
 return {title:c.title,description:c.description,alternates:{canonical:"/courses/"+c.slug},keywords:c.focus};
}
function linkedCourse(slug:string):LinkedCourse|null{
 const c=eliteCoursesBySlug.get(slug);
 return c?{slug:c.slug,code:c.code,title:c.title}:null;
}
export default async function CourseDetails({params}:Props){
 const slug=(await params).slug;
 if(slug==="dsa-algorithms-cpp")permanentRedirect("/study-plans/cpp-algorithms-75");
 const redirect=legacyCourseRedirects[slug];if(redirect)permanentRedirect("/courses/"+redirect);
 const course=eliteCoursesBySlug.get(slug);if(!course)notFound();
 const lessons=lessonsByCourse.get(course.slug)||[];
 const first=lessons[0];
 const specialty=["C5","C6","C7","C8","C9","C10"].includes(course.code);
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
   <Link href="/courses" className="cv-focus-back">← Courses</Link>
   <header className="cv-focus-course-hero">
     <span className="cv-focus-path-symbol">{course.icon}</span>
     <div>
       <span className="cv-eyebrow">{course.code} · {course.track}</span>
       <h1>{course.title}</h1>
       <p>{course.summary}</p>
       <div className="cv-focus-meta">
         <span>{course.modules.length} modules</span><span>{lessons.length} lesson outlines</span>
         <span>{specialty?"2 lab briefs":"3 C++ practice topics"} per lesson</span>
       </div>
       <div className="cv-focus-price-note"><strong>₹{course.priceInr.toLocaleString("en-IN")}</strong><span>Planned introductory price · Not on sale yet</span></div>
       {first&&<Link className="cv-btn cv-btn-primary" href={"/courses/"+course.slug+"/lessons/"+first.slug}>Start lesson 01 →</Link>}
     </div>
   </header>
   <CourseDetailTabs slug={course.slug} modules={course.modules} lessons={lessons.map(l=>({
      slug:l.slug,title:l.title,number:l.number,moduleNumber:l.moduleNumber,
      ready:l.problemSlugs.filter(s=>problemBankBySlug.get(s)?.status==="runnable").length,
    }))}
    summary={course.summary} entry={course.entryKnowledge}
    owns={course.owns} excludes={course.excludes}
    required={course.required.map(linkedCourse).filter((c):c is LinkedCourse=>c!==null)}
    recommended={course.recommended.map(linkedCourse).filter((c):c is LinkedCourse=>c!==null)}
    capstone={course.capstone} specialty={specialty}
    paths={pathsForCourse(course.slug).map(p=>({slug:p.slug,shortTitle:p.shortTitle}))}/>
   <p className="cv-focus-footnote">Course material is being developed; lesson outlines do not indicate published video availability.</p>
 </div></main><SiteFooter/></>;
}

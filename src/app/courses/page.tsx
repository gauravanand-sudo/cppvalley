import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CourseCatalogTabs, type CourseCard } from "@/components/CourseCatalogTabs";
import { eliteCourses, eliteCoursesBySlug } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";

export const metadata:Metadata={
 title:"Courses — C++ · HFT · CUDA · AI Systems",
 description:"Ten focused engineering courses with clear prerequisites and role-based learning paths.",
 alternates:{canonical:"/courses"},
};

const cards:CourseCard[]=eliteCourses.map((course):CourseCard=>({
  code:course.code,slug:course.slug,title:course.title,summary:course.summary,priceInr:course.priceInr,
  group:Number(course.code.slice(1))<=4?"cpp":Number(course.code.slice(1))<=6?"gpu":Number(course.code.slice(1))<=9?"ai":"architecture",
  lessons:(lessonsByCourse.get(course.slug)||[]).length,
  required:course.required.length
    ?"After "+course.required.map(id=>eliteCoursesBySlug.get(id)?.code||id).join(", ")
    :"No course prerequisite",
}));

export default function CoursesPage(){
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
   <div className="cv-focus-heading">
     <span className="cv-eyebrow">LEARN</span>
     <h1>Courses</h1>
     <p>Ten focused courses. Filter by specialization or <Link href="/career-paths" style={{color:"var(--cv-ruby)",fontWeight:800}}>follow a career path →</Link></p>
   </div>
   <CourseCatalogTabs courses={cards}/>
 </div></main><SiteFooter/></>;
}

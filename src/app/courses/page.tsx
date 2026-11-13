import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { eliteCourses, eliteTrackNames, eliteCoursesBySlug } from "@/data/elite-courses";
import { getCourseProblemCounts } from "@/data/course-lessons";
import { careerPaths } from "@/data/career-paths";

export const metadata: Metadata={
  title:"10 Engineering Courses — C++ · Quant/HFT · CUDA · AI Systems",
  description:"Ten bounded courses with explicit prerequisites and capstones, progressing toward Quant/HFT C++, GPU engineering, AI inference and AI architecture.",
  alternates:{canonical:"/courses"},
};

export default function CoursesPage(){
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
  <header className="cv-page-intro cv-compact-intro">
    <span className="cv-eyebrow">CPPVALLEY ENGINEERING CURRICULUM</span>
    <h1>Ten courses. No overlapping promises.</h1>
    <p>Every course owns a defined part of the stack. Choose a career path for the recommended order, or explore a single specialization. Outline availability never means a finished paid course.</p>
    <div className="cv-hero-actions"><Link className="cv-btn cv-btn-primary" href="/career-paths">Choose your career path →</Link><Link className="cv-btn cv-btn-secondary" href="/problems">Practice C++</Link></div>
  </header>
  <div className="cv-courses-summary"><div><b>10</b><span>Distinct courses</span></div><div><b>{careerPaths.length}</b><span>Role-specific paths</span></div><div><b>{eliteCourses.reduce((s,c)=>s+c.modules.length,0)}</b><span>Curated modules</span></div></div>
  {eliteTrackNames.map(track=>{
   const items=eliteCourses.filter(c=>c.track===track).sort((a,b)=>a.priority-b.priority);
   return <section key={track} className="cv-course-track-section">
     <div className="cv-section-head"><div><span className="cv-eyebrow">CURRICULUM DOMAIN</span><h2>{track}</h2></div><span className="cv-muted">{items.length} {items.length===1?"course":"courses"}</span></div>
     <div className="cv-course-list">{items.map(c=>{
       const stats=getCourseProblemCounts(c.slug);
       const specialty=c.code==="C5"||c.code==="C6"||c.code==="C7"||c.code==="C8"||c.code==="C9"||c.code==="C10";
       return <Link href={"/courses/"+c.slug} key={c.slug} className={"cv-course-list-item cv-tile-"+c.color}>
        <span className="cv-course-list-icon">{c.icon}</span>
        <div><div className="cv-course-list-kicker">{c.code} · {c.level}</div><h3>{c.title}</h3><p>{c.summary}</p>
          <div className="cv-course-list-meta"><span>{stats.lessonCount} lesson outlines</span><span>{c.modules.length} modules</span>
           <span>{specialty?stats.specialtyLabs+" GPU/AI lab briefs":stats.uniqueProblems+" linked C++ topics"}</span></div>
          <div className="cv-course-prereq-inline"><b>Required:</b> {c.required.length
           ?c.required.map(s=>eliteCoursesBySlug.get(s)?.code).filter(Boolean).join(", ")
           :"No earlier CppValley course"}</div>
        </div>
        <div className="cv-course-list-aside"><span className="cv-course-status">{c.status==="recording"?"In development":"Outline available"}</span><b>Explore →</b></div>
       </Link>;
     })}</div>
   </section>;
  })}
  <div className="cv-editorial-note"><b>Course outlines vs production lessons.</b>
   <p>These curricula are scoped and sequenced, but many lesson videos, interactive labs and capstone reviews are still in development. The GPU/AI briefs have no GPU-grade judge yet; the C++ problem bank shows runnable availability separately.</p>
   <Link href="/career-paths">Compare the four career paths →</Link>
  </div>
 </div></main><SiteFooter/></>;
}

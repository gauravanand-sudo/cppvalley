import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths, careerPathsBySlug } from "@/data/career-paths";
import { eliteCoursesBySlug } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";

type Props = { params: Promise<{slug:string}> };
export function generateStaticParams(){return careerPaths.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const path=careerPathsBySlug.get((await params).slug);
  return {title:path?.title||"Career Path",description:path?.tagline,alternates:path?{canonical:"/career-paths/"+path.slug}:undefined};
}
export default async function CareerPathDetails({params}:Props){
 const path=careerPathsBySlug.get((await params).slug);if(!path)notFound();
 const courses=path.courseSlugs.map(slug=>eliteCoursesBySlug.get(slug)).filter(c=>c!==undefined);
 const electives=path.optionalCourseSlugs.map(slug=>eliteCoursesBySlug.get(slug)).filter(c=>c!==undefined);
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell cv-path-details">
  <nav className="cv-mini-breadcrumb"><Link href="/career-paths">← Career paths</Link><span>/</span>{path.shortTitle}</nav>
  <header className="cv-path-hero">
    <div><span className="cv-eyebrow">{path.code} · TARGET ROLE</span><h1>{path.title}</h1><p>{path.tagline}</p>
    <div className="cv-path-role-tags">{path.targetRoles.map(r=><span key={r}>{r}</span>)}</div>
    <div className="cv-hero-actions"><Link className="cv-btn cv-btn-primary" href={"/courses/"+courses[0]?.slug}>Begin with course 1 →</Link><Link href="/problems" className="cv-btn cv-btn-secondary">Open C++ practice</Link></div>
    </div><div className="cv-path-entry"><b>Who this is for</b><p>{path.audience}</p><b>Before you begin</b><p>{path.entry}</p></div>
  </header>
  <div className="cv-path-layout">
   <main>
    <div className="cv-section-head"><div><span className="cv-eyebrow">REQUIRED PROGRESSION</span><h2>Learn in this order</h2><p>Each course has a separate subject boundary. Later courses assume the concepts from earlier ones.</p></div></div>
    <ol className="cv-path-steps">{courses.map((course,i)=>{
      const lessonCount=lessonsByCourse.get(course.slug)?.length||0;
      return <li key={course.slug}>
        <Link href={"/courses/"+course.slug} className="cv-path-step">
          <span className="cv-path-step-number">{i+1}</span>
          <div><span className="cv-eyebrow">{course.code} · {course.track}</span><h3>{course.title}</h3><p>{course.summary}</p>
          <div className="cv-path-step-meta"><span>{lessonCount} outlines</span><span>{course.modules.length} modules</span><span>{course.status==="recording"?"In development":"Outline available"}</span></div></div>
          <span className="cv-path-step-arrow">↗</span>
        </Link>
      </li>;
    })}</ol>
    {electives.length>0?<section className="cv-white-card cv-path-electives"><h2>Optional deep dives</h2><p>Helpful for specializations, but not mandatory for this career route.</p>{electives.map(c=><Link href={"/courses/"+c.slug} key={c.slug}><span>{c.code} · {c.title}</span><b>Explore →</b></Link>)}</section>:null}
    <section className="cv-white-card cv-path-capstone">
      <span className="cv-eyebrow">PORTFOLIO CAPSTONE</span><h2>Prove you can build the system</h2><p>{path.project}</p>
      <h3>Expected evidence</h3><ul>{path.evidence.map(e=><li key={e}>{e}</li>)}</ul>
      <p className="cv-muted">Capstone brief and review criteria are an editorial specification, not an automated certification or guarantee of employment.</p>
    </section>
   </main>
   <aside className="cv-path-sidebar">
    <section className="cv-white-card"><span className="cv-eyebrow">INTERVIEW READINESS</span><h2>What to practice</h2>
      <ul>{path.interviewTopics.map(t=><li key={t}>{t}</li>)}</ul>
      <Link className="cv-btn cv-btn-secondary" href="/study-plans">Browse practice plans →</Link>
    </section>
    <section className="cv-white-card"><span className="cv-eyebrow">HOW TO USE CPPVALLEY</span><p>Study the modules, complete the connected practice tasks, document your capstone and review the interview topics. CPU C++ tasks run in the private pilot; GPU/AI labs are clearly marked as draft.</p><Link href="/practice-labs">Browse GPU & AI labs →</Link></section>
   </aside>
  </div>
 </div></main><SiteFooter/></>;
}

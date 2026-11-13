import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { eliteCourses, eliteCoursesBySlug, legacyCourseRedirects } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";
import { problemBankBySlug } from "@/data/problem-bank";
import { imageForCourse } from "@/data/media";
import { pathsForCourse } from "@/data/career-paths";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return eliteCourses.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const slug=(await params).slug;const c=eliteCoursesBySlug.get(slug);
 if(!c)return {title:"Course"};
 return {title:c.title,description:c.description,alternates:{canonical:"/courses/"+c.slug},keywords:c.focus};
}
export default async function CourseDetails({params}:Props){
 const slug=(await params).slug;
 if(slug==="dsa-algorithms-cpp")permanentRedirect("/study-plans/cpp-algorithms-75");
 const redirect=legacyCourseRedirects[slug];
 if(redirect)permanentRedirect("/courses/"+redirect);
 const c=eliteCoursesBySlug.get(slug);if(!c)notFound();
 const lessons=lessonsByCourse.get(c.slug)||[],first=lessons[0];
 const specialized=["C5","C6","C7","C8","C9","C10"].includes(c.code);
 const paths=pathsForCourse(c.slug);
 return <><SiteHeader/><main className="cv-subpage cv-course-detail"><div className="cv-shell">
  <nav className="cv-mini-breadcrumb"><Link href="/courses">← All courses</Link><span>/</span>{c.track}</nav>
  <section className="cv-course-hero">
   <div><span className="cv-eyebrow">{c.code} · {c.track.toUpperCase()} · {c.status==="recording"?"IN DEVELOPMENT":"OUTLINE AVAILABLE"}</span>
    <h1>{c.title}</h1><p>{c.description}</p>
    <div className="cv-course-facts"><span>◎ {c.level}</span><span>▤ {lessons.length} lesson outlines</span><span>⌁ {specialized?"2 specialty labs":"3 C++ practice topics"} per lesson</span></div>
    <div className="cv-course-topic-tags">{c.focus.map(t=><span key={t}>{t}</span>)}</div>
    <div className="cv-hero-actions">
     {first?<Link className="cv-btn cv-btn-primary" href={"/courses/"+c.slug+"/lessons/"+first.slug}>Open Lesson 01 →</Link>:null}
     <Link className="cv-btn cv-btn-secondary" href={specialized?"/practice-labs":"/problems"}>{specialized?"View systems labs":"Practice C++"}</Link>
    </div>
   </div>
   <div className={"cv-course-hero-art cv-tile-"+c.color}>
    <div><span>{c.icon}</span><small>CPPVALLEY · {c.code}</small><strong>{c.shortTitle}</strong></div>
    <img src={imageForCourse(c.slug,"Systems")} alt="" loading="lazy"/>
   </div>
  </section>
  <section className="cv-course-boundaries" aria-label="Course scope and prerequisites">
   <div className="cv-white-card"><span className="cv-eyebrow">ENTRY REQUIREMENTS</span><h2>What you need first</h2><p>{c.entryKnowledge}</p>
    {c.required.length>0?<><b>Required courses</b><ul>{c.required.map(slug=>{const x=eliteCoursesBySlug.get(slug);return x?<li key={slug}><Link href={"/courses/"+slug}>{x.code} · {x.title} ↗</Link></li>:null;})}</ul></>:<p className="cv-course-open-entry">No mandatory CppValley course prerequisite.</p>}
    {c.recommended.length>0?<><b>Helpful, not required</b><ul>{c.recommended.map(slug=>{const x=eliteCoursesBySlug.get(slug);return x?<li key={slug}><Link href={"/courses/"+slug}>{x.code} · {x.shortTitle} ↗</Link></li>:null;})}</ul></>:null}
   </div>
   <div className="cv-white-card"><span className="cv-eyebrow">COURSE OWNERSHIP</span><h2>Exactly what you master</h2><ul>{c.owns.map(t=><li key={t}>{t}</li>)}</ul></div>
   <div className="cv-white-card"><span className="cv-eyebrow">CLEAR BOUNDARY</span><h2>Not repeated here</h2><ul>{c.excludes.map(t=><li key={t}>{t}</li>)}</ul></div>
  </section>
  {paths.length>0&&<div className="cv-course-role-strip"><strong>Part of these career paths:</strong>{paths.map(p=><Link href={"/career-paths/"+p.slug} key={p.slug}>{p.shortTitle} ↗</Link>)}</div>}
  <div className="cv-course-detail-grid">
   <section className="cv-course-curriculum">
    <div className="cv-section-head"><div><span className="cv-eyebrow">COURSE CONTENT</span><h2>Course modules & lessons</h2>
      <p>Concepts progress from prerequisites to implementation, diagnostics and engineering evidence. Every practice brief links back to this course.</p></div><span className="cv-course-count">{lessons.length} outlines</span></div>
    {c.modules.map((module,index)=>{
     const moduleLessons=lessons.filter(l=>l.moduleNumber===index);if(!moduleLessons.length)return null;
     return <details key={module} className="cv-module-accordion" open={index===0}>
      <summary><span className="cv-module-number">{String(index+1).padStart(2,"0")}</span><span><b>{module}</b><small>{moduleLessons.length} lessons</small></span><span className="cv-module-chevron">⌄</span></summary>
      <ol>{moduleLessons.map(lesson=>{
       const ready=lesson.problemSlugs.filter(s=>problemBankBySlug.get(s)?.status==="runnable").length;
       return <li key={lesson.slug}><Link href={"/courses/"+c.slug+"/lessons/"+lesson.slug}>
        <span className="cv-lesson-number">{String(lesson.number).padStart(2,"0")}</span>
        <span><strong>{lesson.title}</strong><small>{specialized?"2 lab briefs · outline status":"3 related C++ topics · "+ready+" runnable"}</small></span><span>↗</span>
       </Link></li>;
      })}</ol>
     </details>;
    })}
   </section>
   <aside className="cv-course-side">
    <div className="cv-white-card"><span className="cv-eyebrow">CAPSTONE</span><h3>Build, measure and defend</h3><p>{c.capstone}</p><p className="cv-side-fineprint">Capstone is a planned assessment brief. It is not an awarded credential.</p>{first?<Link className="cv-btn cv-btn-primary" href={"/courses/"+c.slug+"/lessons/"+first.slug}>Start the curriculum →</Link>:null}</div>
    <div className="cv-white-card cv-course-side-resource"><b>Practice infrastructure</b><p>{specialized?"GPU, AI and architecture labs are discoverable outlines, not CPU-judge submissions.":"Published C++ tasks run in the isolated C++ judge; other topics are clearly marked in review."}</p><Link href={specialized?"/practice-labs":"/problems"}>Explore related practice →</Link></div>
    <div className="cv-white-card"><span className="cv-eyebrow">PUBLICATION STATUS</span><p>Curriculum titles are planned teaching outlines. Full lesson videos, notes, labs and production assessments have not all been published or verified.</p></div>
   </aside>
  </div>
 </div></main><SiteFooter/></>;
}

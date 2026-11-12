import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { eliteCourses, eliteCoursesBySlug, legacyCourseRedirects } from "@/data/elite-courses";
import { lessonsByCourse } from "@/data/course-lessons";
import { problemBankBySlug } from "@/data/problem-bank";
import { imageForCourse } from "@/data/media";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return eliteCourses.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const slug=(await params).slug;const c=eliteCoursesBySlug.get(slug);if(!c)return {title:"Course"};
 return {title:c.title,description:c.description,alternates:{canonical:"/courses/"+c.slug},keywords:c.focus};
}
export default async function CourseDetails({params}:Props){
 const slug=(await params).slug;const redirect=legacyCourseRedirects[slug];if(redirect)permanentRedirect("/courses/"+redirect);
 const c=eliteCoursesBySlug.get(slug);if(!c)notFound();
 const lessons=lessonsByCourse.get(c.slug)||[];const first=lessons[0];
 return <><SiteHeader/><main className="cv-subpage cv-course-detail"><div className="cv-shell">
  <nav className="cv-mini-breadcrumb"><Link href="/courses">← All courses</Link><span>/</span>{c.track}</nav>
  <section className="cv-course-hero"><div><span className="cv-eyebrow">{c.track.toUpperCase()} · {c.status==="recording"?"IN DEVELOPMENT":"CURRICULUM OUTLINE"}</span><h1>{c.title}</h1><p>{c.description}</p><div className="cv-course-facts"><span>◎ {c.level}</span><span>▤ {lessons.length} lessons</span><span>⌁ 3 linked practice topics per lesson</span></div><div className="cv-course-topic-tags">{c.focus.map(t=><span key={t}>{t}</span>)}</div><div className="cv-hero-actions">{first?<Link className="cv-btn cv-btn-primary" href={"/courses/"+c.slug+"/lessons/"+first.slug}>Open Lesson 01 →</Link>:null}<Link className="cv-btn cv-btn-secondary" href="/problems">Practice C++</Link></div></div>
    <div className={"cv-course-hero-art cv-tile-"+c.color}><div><span>{c.icon}</span><small>CPPVALLEY LEARNING</small><strong>{c.shortTitle}</strong></div><img src={imageForCourse(c.slug,"C++ Core")} alt="" loading="lazy"/></div>
  </section>
  <div className="cv-course-detail-grid">
   <section className="cv-course-curriculum"><div className="cv-section-head"><div><span className="cv-eyebrow">COURSE CONTENT</span><h2>Course curriculum</h2><p>Explore each lesson and its three related practice recommendations.</p></div><span className="cv-course-count">{lessons.length} lessons</span></div>
    {c.modules.map((module,index)=>{
     const moduleLessons=lessons.filter(l=>l.moduleNumber===index);if(!moduleLessons.length)return null;
     return <details key={module} className="cv-module-accordion" open={index===0}>
      <summary><span className="cv-module-number">{String(index+1).padStart(2,"0")}</span><span><b>{module}</b><small>{moduleLessons.length} lessons</small></span><span className="cv-module-chevron">⌄</span></summary>
      <ol>{moduleLessons.map(lesson=>{const ready=lesson.problemSlugs.filter(s=>problemBankBySlug.get(s)?.status==="runnable").length;return <li key={lesson.slug}><Link href={"/courses/"+c.slug+"/lessons/"+lesson.slug}><span className="cv-lesson-number">{String(lesson.number).padStart(2,"0")}</span><span><strong>{lesson.title}</strong><small>3 practice topics · {ready} runnable</small></span><span>↗</span></Link></li>})}</ol>
     </details>;
    })}
   </section>
   <aside className="cv-course-side"><div className="cv-white-card"><span className="cv-eyebrow">WHAT YOU'LL LEARN</span><h3>One concept at a time.</h3><p>{c.summary}</p><div className="cv-course-side-count"><strong>{lessons.length}</strong><small>structured lessons</small></div><p className="cv-side-fineprint">Video availability varies. This outline does not imply paid enrollment, completed video recordings or full lesson publication.</p>{first?<Link className="cv-btn cv-btn-primary" href={"/courses/"+c.slug+"/lessons/"+first.slug}>Start the curriculum →</Link>:null}</div>
    <div className="cv-white-card cv-course-side-resource"><b>Practice while you learn</b><p>Every lesson shares the same curated problem catalog. Solve published tasks in the editor; follow the roadmap for upcoming challenges.</p><Link href="/problems">Open problem bank →</Link></div>
   </aside>
  </div>
 </div></main><SiteFooter/></>;
}

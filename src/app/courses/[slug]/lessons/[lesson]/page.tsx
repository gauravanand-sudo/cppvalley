import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LessonProgressButton } from "@/components/LessonProgressButton";
import { eliteCourses, eliteCoursesBySlug } from "@/data/elite-courses";
import { courseLessons, lessonsByCourse, getCourseLesson } from "@/data/course-lessons";
import { problemBankBySlug } from "@/data/problem-bank";
import { specialtyLabsForLesson } from "@/data/specialty-practice";
type Props={params:Promise<{slug:string;lesson:string}>};
export function generateStaticParams(){return courseLessons.map(l=>({slug:l.courseSlug,lesson:l.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug,lesson}=await params;const item=getCourseLesson(slug,lesson);
 return {title:item?.title||"Lesson",description:item?"Lesson outline and related C++ practice: "+item.title:"",robots:{index:false,follow:true}};
}
export default async function LessonDetails({params}:Props){
 const {slug,lesson:lessonSlug}=await params;const c=eliteCoursesBySlug.get(slug);const l=getCourseLesson(slug,lessonSlug);if(!c||!l)notFound();
 const lessons=lessonsByCourse.get(slug)||[];const i=lessons.findIndex(item=>item.slug===lessonSlug);const prev=lessons[i-1],next=lessons[i+1];
 const specialty=l.practiceKind==="specialty-labs";const labBriefs=specialty?specialtyLabsForLesson(slug,lessonSlug):[];
 return <><SiteHeader/><main className="cv-lesson-shell"><div className="cv-lesson-layout">
   <aside className="cv-lesson-sidebar"><div className="cv-lesson-sidebar-head"><Link href={"/courses/"+slug}>← {c.shortTitle}</Link><div><strong>Course content</strong><span>{lessons.length} lessons</span></div></div>
    <nav aria-label="Course lesson navigation">{c.modules.map((m,idx)=>{const section=lessons.filter(item=>item.moduleNumber===idx);if(!section.length)return null;return <details key={m} open={idx===l.moduleNumber}><summary>{String(idx+1).padStart(2,"0")}. {m}<span>⌄</span></summary>{section.map(item=><Link className={item.slug===l.slug?"cv-current-lesson":""} aria-current={item.slug===l.slug?"page":undefined} key={item.slug} href={"/courses/"+slug+"/lessons/"+item.slug}><span>{String(item.number).padStart(2,"0")}</span><b>{item.title}</b></Link>)}</details>})}</nav>
   </aside>
   <article className="cv-lesson-article">
    <nav className="cv-mini-breadcrumb"><Link href="/courses">Courses</Link><span>/</span><Link href={"/courses/"+slug}>{c.shortTitle}</Link><span>/</span>Lesson {l.number}</nav>
    <span className="cv-eyebrow">LESSON {String(l.number).padStart(2,"0")} OF {lessons.length}</span><h1>{l.title}</h1><p className="cv-lesson-deck">{l.moduleTitle} · {c.level}</p>
    {l.videoId?<div className="cv-lesson-video"><iframe src={"https://www.youtube-nocookie.com/embed/"+l.videoId} title={l.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>:<div className="cv-lesson-notice"><b>Structured lesson outline</b><span>This lesson's video and full tutorial are not yet published. The learning objectives and exercises below outline what the finished lesson will cover.</span></div>}
    <section className="cv-lesson-section"><h2>Learning objectives</h2><p>Focus on the underlying model and the engineering decisions rather than memorizing a single code snippet.</p><ul className="cv-objectives">{l.objectives.map((goal,n)=><li key={goal}><span>{String(n+1).padStart(2,"0")}</span><p>{goal}</p></li>)}</ul></section>
    <section className="cv-lesson-section"><h2>Hands-on exercise</h2><p>{l.lab}</p><div className="cv-lesson-takeaway"><b>What a good result looks like</b><p>{l.outcome}</p></div></section>
    <section className="cv-lesson-section">
      <div className="cv-section-head"><div><span className="cv-eyebrow">APPLY WHAT YOU LEARN</span><h2>{specialty?"Specialty practice labs":"C++ practice problems"}</h2></div>
        <span className="cv-muted">{specialty?"2 original lab briefs":"3 related C++ topics"}</span></div>
      <div className="cv-lesson-problems">
        {specialty?labBriefs.map((lab,index)=><Link key={lab.slug} href={"/practice-labs/"+lab.slug}>
          <span className="cv-lesson-pnum">{String(index+1).padStart(2,"0")}</span><span><strong>{lab.title}</strong><small>{lab.type} · proposed acceptance criteria</small></span><span className="cv-availability cv-review">Outline</span>
        </Link>):l.problemSlugs.map((key,index)=>{const p=problemBankBySlug.get(key);if(!p)return null;return <Link key={p.slug} href={"/problems/"+p.slug}>
          <span className="cv-lesson-pnum">{String(index+1).padStart(2,"0")}</span><span><strong>{p.title}</strong><small>{p.category} · {p.difficulty}</small></span><span className={p.status==="runnable"?"cv-availability cv-available":"cv-availability cv-review"}>{p.status==="runnable"?"Solve now":"In review"}</span>
        </Link>})}
      </div>
      <p className="cv-lesson-fineprint">{specialty
        ?"GPU/AI outlines are not currently judged by the CPU-only C++17 runner. Verified GPU hardware and human/rubric-based reviews are planned."
        :"In-review topics are curriculum-linked challenge plans, not yet complete runnable tasks."}</p>
      {specialty?<Link className="cv-lesson-labs-link" href="/practice-labs">Browse all GPU & AI labs →</Link>:null}
    </section>
    <div className="cv-lesson-bottom-actions"><LessonProgressButton id={slug+"/"+lessonSlug} hasVideo={Boolean(l.videoId)}/><span>Progress is saved on this device.</span></div>
    <div className="cv-lesson-pagination"><div>{prev?<Link href={"/courses/"+slug+"/lessons/"+prev.slug}>← Previous lesson <strong>{prev.title}</strong></Link>:<span/>}</div><div>{next?<Link href={"/courses/"+slug+"/lessons/"+next.slug}>Next lesson → <strong>{next.title}</strong></Link>:<Link href={"/courses/"+slug}>View entire course →</Link>}</div></div>
   </article>
  </div></main><SiteFooter/></>;
}

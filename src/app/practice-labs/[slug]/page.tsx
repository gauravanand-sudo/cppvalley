import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { specialtyLabsBySlug } from "@/data/specialty-practice";
import { eliteCoursesBySlug } from "@/data/elite-courses";

export const dynamic="force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const lab=specialtyLabsBySlug.get((await params).slug);
  return {title:lab?.title||"Practice Lab",description:lab?.brief,robots:{index:false,follow:true}};
}
export default async function LabBriefPage({params}:Props) {
  const lab=specialtyLabsBySlug.get((await params).slug);if(!lab)notFound();
  const course=eliteCoursesBySlug.get(lab.courseSlug);
  return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell cv-lab-detail">
    <nav className="cv-mini-breadcrumb"><Link href="/practice-labs">← Systems labs</Link><span>/</span><Link href={"/courses/"+lab.courseSlug}>{course?.shortTitle}</Link><span>/</span>{lab.type}</nav>
    <div className="cv-lab-detail-grid"><article className="cv-white-card">
      <div className="cv-path-role-tags"><span>{lab.courseCode} · {lab.type}</span><span>Outline — not yet graded</span></div>
      <h1>{lab.title}</h1><p className="cv-lab-lead">{lab.brief}</p>
      <section><h2>Proposed acceptance criteria</h2><p>A reviewer should be able to examine the following evidence before this lab is marked complete.</p>
        <ul>{lab.acceptance.map(a=><li key={a}>{a}</li>)}</ul></section>
      <section><h2>Tooling and evaluation status</h2><p>This is an instructional exercise brief, not a downloadable solution or verified test harness. GPU work needs isolated GPU hardware and numerical validation; distributed workloads need controlled clusters; architecture exercises need human or rubric-based review. The existing C++17 CPU judge does not execute this task.</p></section>
      <Link href={"/courses/"+lab.courseSlug+"/lessons/"+lab.lessonSlug} className="cv-btn cv-btn-primary">Study the related lesson →</Link>
    </article>
    <aside className="cv-white-card"><span className="cv-eyebrow">CONTEXT</span><h2>{course?.title}</h2>
      <p><b>Module:</b> {lab.moduleTitle}</p><p><b>Lesson:</b> {lab.lessonTitle}</p>
      <Link href={"/courses/"+lab.courseSlug}>View course curriculum →</Link>
      <Link href="/practice-labs">All GPU & AI labs →</Link>
    </aside></div>
  </div></main><SiteFooter/></>;
}

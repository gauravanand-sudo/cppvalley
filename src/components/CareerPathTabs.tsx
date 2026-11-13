"use client";

import Link from "next/link";
import { useState } from "react";
import type { CareerPath } from "@/data/career-paths";

export type CourseStep={slug:string;code:string;title:string;summary:string;lessons:number};
type Props={path:CareerPath;courses:CourseStep[];electives:CourseStep[]};
const tabs=[["courses","Courses"],["interviews","Interview prep"],["project","Capstone"]] as const;
type Tab=typeof tabs[number][0];

export function CareerPathTabs({path,courses,electives}:Props){
  const [active,setActive]=useState<Tab>("courses");
  return <section className="cv-focus-path-body">
    <div className="cv-focus-tabs" role="tablist" aria-label="Career path details">
      {tabs.map(([id,label])=><button key={id} type="button" role="tab"
        id={"path-tab-"+id} aria-controls="path-panel" aria-selected={active===id}
        tabIndex={active===id?0:-1} className={active===id?"is-active":""}
        onClick={()=>setActive(id)}
        onKeyDown={e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
          e.preventDefault();const i=tabs.findIndex(t=>t[0]===active);
          const n=(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
          setActive(tabs[n][0]);document.getElementById("path-tab-"+tabs[n][0])?.focus();
        }}}>{label}</button>)}
    </div>
    <div role="tabpanel" tabIndex={0} id="path-panel" aria-labelledby={"path-tab-"+active}>
      {active==="courses"&&<div className="cv-focus-sequence">
        {courses.map((course,i)=><Link key={course.slug} href={"/courses/"+course.slug} className="cv-focus-step">
          <span className="cv-focus-step-index">{i+1}</span>
          <div><small>{course.code} · {course.lessons} lessons</small><h2>{course.title}</h2><p>{course.summary}</p></div>
          <span aria-hidden="true">→</span>
        </Link>)}
        {electives.length>0&&<details className="cv-focus-electives"><summary>Optional specializations ({electives.length})</summary>
          <div>{electives.map(c=><Link href={"/courses/"+c.slug} key={c.slug}>{c.code} · {c.title} →</Link>)}</div>
        </details>}
      </div>}
      {active==="interviews"&&<div className="cv-focus-panel">
        <h2>What to prepare</h2><ul>{path.interviewTopics.map(t=><li key={t}>{t}</li>)}</ul>
        <Link className="cv-btn cv-btn-primary" href="/study-plans">Open interview prep →</Link>
      </div>}
      {active==="project"&&<div className="cv-focus-panel">
        <h2>Career capstone</h2><p>{path.project}</p>
        <h3>Evidence to demonstrate</h3><ul>{path.evidence.map(t=><li key={t}>{t}</li>)}</ul>
        <Link href="/projects" className="cv-btn cv-btn-secondary">Browse project briefs →</Link>
        <small>These are planned project rubrics, not awarded certifications.</small>
      </div>}
    </div>
  </section>;
}

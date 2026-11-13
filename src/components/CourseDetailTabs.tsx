"use client";

import Link from "next/link";
import { useState } from "react";

export type CourseLessonRow={slug:string;title:string;number:number;moduleNumber:number;ready:number};
export type LinkedCourse={slug:string;code:string;title:string};
export type LinkedPath={slug:string;shortTitle:string};

type Props={
  slug:string;modules:string[];lessons:CourseLessonRow[];summary:string;
  entry:string;owns:string[];excludes:string[];required:LinkedCourse[];recommended:LinkedCourse[];
  capstone:string;specialty:boolean;paths:LinkedPath[];
};
const tabs=[["curriculum","Curriculum"],["overview","Overview"],["project","Project"]] as const;
type Tab=typeof tabs[number][0];

export function CourseDetailTabs(props:Props) {
  const [active,setActive]=useState<Tab>("curriculum");
  const first=props.lessons[0];
  return <section className="cv-focus-course-body">
    <div className="cv-focus-tabs" role="tablist" aria-label="Course content">
      {tabs.map(([id,label])=><button key={id} type="button" role="tab"
        id={"course-detail-tab-"+id} aria-controls="course-detail-panel"
        aria-selected={active===id} tabIndex={active===id?0:-1}
        className={active===id?"is-active":""} onClick={()=>setActive(id)}
        onKeyDown={e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
          e.preventDefault();const i=tabs.findIndex(t=>t[0]===active);
          const n=(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
          setActive(tabs[n][0]);document.getElementById("course-detail-tab-"+tabs[n][0])?.focus();
        }}}>{label}</button>)}
    </div>
    <div role="tabpanel" id="course-detail-panel" aria-labelledby={"course-detail-tab-"+active} tabIndex={0}>
      {active==="curriculum"&&<div className="cv-focus-modules">
        {props.modules.map((module,index)=>{
          const rows=props.lessons.filter(lesson=>lesson.moduleNumber===index);
          if(!rows.length)return null;
          return <details key={module} open={index===0?undefined:undefined}>
            <summary><span className="cv-focus-number">{String(index+1).padStart(2,"0")}</span><strong>{module}</strong><small>{rows.length} lessons</small><span aria-hidden="true" className="cv-focus-chevron">⌄</span></summary>
            <ol>{rows.map(row=><li key={row.slug}><Link href={"/courses/"+props.slug+"/lessons/"+row.slug}>
              <span>{String(row.number).padStart(2,"0")}</span><strong>{row.title}</strong><small>{props.specialty?"2 labs":row.ready?row.ready+" runnable":"Outline"}</small><span aria-hidden="true">→</span>
            </Link></li>)}</ol>
          </details>;
        })}
      </div>}
      {active==="overview"&&<div className="cv-focus-overview">
        <section><h2>Before you start</h2><p>{props.entry}</p>
          {props.required.length>0&&<div className="cv-focus-simple-links"><span>Required:</span>{props.required.map(c=><Link href={"/courses/"+c.slug} key={c.slug}>{c.code} · {c.title}</Link>)}</div>}
          {props.recommended.length>0&&<div className="cv-focus-simple-links"><span>Optional:</span>{props.recommended.map(c=><Link href={"/courses/"+c.slug} key={c.slug}>{c.code} · {c.title}</Link>)}</div>}
        </section>
        <section><h2>You will learn</h2><ul>{props.owns.map(x=><li key={x}>{x}</li>)}</ul></section>
        <section><h2>Covered elsewhere</h2><ul>{props.excludes.map(x=><li key={x}>{x}</li>)}</ul></section>
        {props.paths.length>0&&<section><h2>Career paths</h2><div className="cv-focus-simple-links">{props.paths.map(p=><Link key={p.slug} href={"/career-paths/"+p.slug}>{p.shortTitle} →</Link>)}</div></section>}
      </div>}
      {active==="project"&&<div className="cv-focus-project-panel">
        <span className="cv-eyebrow">COURSE CAPSTONE</span><h2>Build something real.</h2><p>{props.capstone}</p>
        <div className="cv-focus-project-actions">
          <Link href={props.specialty?"/practice-labs":"/problems"} className="cv-btn cv-btn-primary">{props.specialty?"Explore lab briefs":"Open C++ practice"} →</Link>
          {first&&<Link href={"/courses/"+props.slug+"/lessons/"+first.slug} className="cv-btn cv-btn-secondary">Start lesson 01</Link>}
        </div>
        <small>Project evaluation and full course materials are still in development.</small>
      </div>}
    </div>
  </section>;
}

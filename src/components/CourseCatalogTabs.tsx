"use client";

import Link from "next/link";
import { useState } from "react";

export type CourseCard = {
  code:string;
  slug:string;
  title:string;
  summary:string;
  group:"cpp"|"gpu"|"ai"|"architecture";
  lessons:number;
  required:string;
};

const tabs=[
  {id:"all",label:"All courses",count:10},
  {id:"cpp",label:"C++ & HFT",count:4},
  {id:"gpu",label:"CUDA & GPU",count:2},
  {id:"ai",label:"AI Systems",count:3},
  {id:"architecture",label:"AI Architecture",count:1},
] as const;
type TabId=typeof tabs[number]["id"];

export function CourseCatalogTabs({courses}:{courses:CourseCard[]}) {
  const [active,setActive]=useState<TabId>("all");
  const visible=active==="all"?courses:courses.filter(course=>course.group===active);
  return <section className="cv-focus-catalog" aria-label="Browse courses by specialization">
    <div className="cv-focus-tabs" role="tablist" aria-label="Course specialization">
      {tabs.map(tab=><button type="button" key={tab.id} role="tab"
        id={"course-tab-"+tab.id} aria-controls="course-catalog-panel"
        aria-selected={active===tab.id} tabIndex={active===tab.id?0:-1}
        className={active===tab.id?"is-active":""}
        onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
          e.preventDefault();
          const index=tabs.findIndex(t=>t.id===active);
          const next=(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
          setActive(tabs[next].id);
          document.getElementById("course-tab-"+tabs[next].id)?.focus();
        }}}
        onClick={()=>setActive(tab.id)}>{tab.label}<small>{tab.count}</small></button>)}
    </div>
    <div id="course-catalog-panel" role="tabpanel" aria-labelledby={"course-tab-"+active} tabIndex={0}>
      <div className="cv-focus-course-grid">
        {visible.map(course=><Link className="cv-focus-course-card" key={course.slug} href={"/courses/"+course.slug}>
          <div className="cv-focus-course-card-top"><span className="cv-focus-code">{course.code}</span><span className="cv-focus-draft">Outline</span></div>
          <h2>{course.title}</h2>
          <p>{course.summary}</p>
          <div className="cv-focus-course-card-bottom"><span>{course.lessons} lessons</span><span>{course.required}</span><b aria-hidden="true">→</b></div>
        </Link>)}
      </div>
    </div>
    <p className="cv-focus-footnote">Curricula are outlines. Published exercises are labeled separately.</p>
  </section>;
}

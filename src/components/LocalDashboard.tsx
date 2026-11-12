"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons, lessonsByCourse } from "@/data/course-lessons";
import { problemBank, problemBankStats } from "@/data/problem-bank";
export function LocalDashboard(){
 const [solved,setSolved]=useState<string[]>([]);
 const [reviewed,setReviewed]=useState<string[]>([]);
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{
  try{const p=JSON.parse(localStorage.getItem("cppvalley-practice-solved-v1")||"[]");if(Array.isArray(p))setSolved(p.filter(x=>typeof x==="string"));}catch{}
  try{const l=JSON.parse(localStorage.getItem("cppvalley-lesson-progress-v1")||"[]");if(Array.isArray(l))setReviewed(l.filter(x=>typeof x==="string"));}catch{}
  setHydrated(true);
 },[]);
 const validSolved=problemBank.filter(p=>p.status==="runnable"&&solved.includes(p.slug));
 const validReviewed=courseLessons.filter(l=>reviewed.includes(l.courseSlug+"/"+l.slug));
 return <div className="cv-shell"><div className="cv-page-intro"><span className="cv-eyebrow">MY CPPVALLEY</span><h1>Your learning dashboard</h1><p>Keep track of your C++ practice and the lesson outlines you've reviewed.</p></div>
   <div className="cv-dashboard-alert"><strong>Local progress only.</strong> This dashboard reads this browser's storage. Account registration and cross-device, server-backed submissions are not live yet. Clearing browser data removes these local marks.</div>
   <div className="cv-dashboard-stats"><div><span>Verified problems solved</span><strong>{hydrated?validSolved.length:"—"}<small> / {problemBankStats.runnable}</small></strong></div><div><span>Lesson outlines reviewed</span><strong>{hydrated?validReviewed.length:"—"}<small> / {courseLessons.length}</small></strong></div><div><span>Curated problem topics</span><strong>{problemBankStats.total}</strong></div></div>
   <div className="cv-section-head"><div><span className="cv-eyebrow">COURSE PROGRESS</span><h2>Your seven learning paths</h2></div><Link href="/courses">Browse courses →</Link></div>
   <div className="cv-dashboard-courses">{eliteCourses.map(c=>{const lessons=lessonsByCourse.get(c.slug)||[];const done=lessons.filter(l=>reviewed.includes(l.courseSlug+"/"+l.slug)).length;const pct=lessons.length?100*done/lessons.length:0;
    return <Link className="cv-dashboard-course" href={"/courses/"+c.slug} key={c.slug}><span className="cv-course-list-icon">{c.icon}</span><div><h3>{c.title}</h3><span>{done} of {lessons.length} reviewed</span><div className="cv-progress-bar"><i style={{width:pct+"%"}}/></div></div><span>→</span></Link>;
   })}</div>
   <div className="cv-section-head"><div><span className="cv-eyebrow">SOLVED CHALLENGES</span><h2>Recent achievements</h2></div><Link href="/problems?status=runnable">Solve a problem →</Link></div>
   <div className="cv-dashboard-achievements">{validSolved.length?validSolved.map(p=><Link key={p.slug} href={"/problems/"+p.slug}><span>✓</span><strong>{p.title}</strong><small>{p.difficulty}</small></Link>):<p>Nothing solved on this device yet. Start with a verified challenge in the problem library.</p>}</div>
 </div>;
}

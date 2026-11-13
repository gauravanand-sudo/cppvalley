"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { specialtyLabs } from "@/data/specialty-practice";
import { eliteCourses } from "@/data/elite-courses";

const PAGE_SIZE=25;
const specialties=eliteCourses.filter(c=>["C5","C6","C7","C8","C9","C10"].includes(c.code));

export function SpecialtyLabsCatalog() {
  const [query,setQuery]=useState("");
  const [course,setCourse]=useState("");
  const [page,setPage]=useState(1);
  const filtered=useMemo(()=>specialtyLabs.filter(lab=>
    (!course||lab.courseSlug===course)&&
    (!query||[lab.title,lab.lessonTitle,lab.moduleTitle,lab.type].join(" ").toLowerCase().includes(query.toLowerCase().trim()))
  ),[query,course]);
  const pageCount=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const activePage=Math.min(page,pageCount);
  return <div className="cv-shell cv-lab-library">
    <div className="cv-focus-heading">
      <span className="cv-eyebrow">GPU & AI PRACTICE</span>
      <h1>Systems labs</h1>
      <p>Explore CUDA, inference and architecture exercises. <strong>Outline only—not graded yet.</strong> <Link href="/problems" style={{color:"var(--cv-ruby)",fontWeight:750}}>C++ problems →</Link></p>
    </div>
    <div className="cv-lab-filter-row">
      <label>Course <select value={course} onChange={e=>{setCourse(e.target.value);setPage(1)}}>
        <option value="">All six GPU/AI courses</option>
        {specialties.map(c=><option value={c.slug} key={c.slug}>{c.code} — {c.shortTitle}</option>)}
      </select></label>
      <label>Find a lab <input type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="e.g. KV cache, NCCL, CUDA tiling" /></label>
      <span>{filtered.length} outline briefs</span>
    </div>
    <div className="cv-lab-table cv-white-card">
      {filtered.slice((activePage-1)*PAGE_SIZE,activePage*PAGE_SIZE).map(lab=><Link key={lab.slug} href={"/practice-labs/"+lab.slug} className="cv-lab-row">
        <span className="cv-lab-kind">{lab.courseCode}</span>
        <span><strong>{lab.title}</strong><small>{lab.type} · {lab.moduleTitle}</small></span>
        <span className="cv-availability cv-review">Outline</span>
        <b>↗</b>
      </Link>)}
      {!filtered.length&&<div className="cv-no-results">No labs match your filters.</div>}
    </div>
    <div className="cv-lab-pagination">
      <button type="button" disabled={activePage<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>← Previous</button>
      <span>Page {activePage} of {pageCount}</span>
      <button type="button" disabled={activePage>=pageCount} onClick={()=>setPage(p=>Math.min(pageCount,p+1))}>Next →</button>
    </div>
  </div>;
}

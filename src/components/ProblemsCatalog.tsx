"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { problemBank, problemBankStats, type BankProblem } from "@/data/problem-bank";
import { practiceCategories, practiceDifficulties, type PracticeCategory, type PracticeDifficulty } from "@/data/practice";
type Status = "all"|"runnable"|"in-review";
type Props={initialQuery?:string;initialCategory?:string;initialDifficulty?:string;initialStatus?:string};
const PAGE_SIZE=25;
export function ProblemsCatalog({initialQuery="",initialCategory="",initialDifficulty="",initialStatus=""}:Props){
 const [query,setQuery]=useState(initialQuery);
 const [category,setCategory]=useState(initialCategory);
 const [difficulty,setDifficulty]=useState(initialDifficulty);
 const [status,setStatus]=useState<Status>(initialStatus==="runnable"?"runnable":initialStatus==="in-review"?"in-review":"all");
 const [sort,setSort]=useState("recommended");
 const [page,setPage]=useState(1);
 const [solved,setSolved]=useState<string[]>([]);
 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem("cppvalley-practice-solved-v1")||"[]");if(Array.isArray(x))setSolved(x.filter(k=>typeof k==="string"));}catch{}},[]);
 const filtered=useMemo(()=>{
  const search=query.trim().toLowerCase();
  const all=problemBank.filter(p=>
   (category===""||category===p.category)&&
   (difficulty===""||difficulty===p.difficulty)&&
   (status==="all"||status===p.status)&&
   (!search||[p.title,p.category,p.difficulty,...p.tags].join(" ").toLowerCase().includes(search)));
  if(sort==="title")all.sort((a,b)=>a.title.localeCompare(b.title));
  else if(sort==="difficulty")all.sort((a,b)=>practiceDifficulties.indexOf(a.difficulty)-practiceDifficulties.indexOf(b.difficulty));
  else all.sort((a,b)=>(a.status==="runnable"?0:1)-(b.status==="runnable"?0:1));
  return all;
 },[query,category,difficulty,status,sort]);
 const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
 const safePage=Math.min(page,totalPages);
 const rows=filtered.slice((safePage-1)*PAGE_SIZE,safePage*PAGE_SIZE);
 function setFilter<T>(setter:(value:T)=>void,value:T){setter(value);setPage(1);}
 return <div className="cv-shell cv-problems-shell">
  <div className="cv-page-intro cv-compact-intro"><span className="cv-eyebrow">THE CPPVALLEY PROBLEM BANK</span><h1>Problems</h1><p>Original C++ challenges, organized from foundational algorithms to concurrency and systems engineering. Verified problems have a working C++ judge; others are transparently marked as in review.</p></div>
  <div className="cv-bank-stats">
    <div><strong>{problemBankStats.total}</strong><span>Curated topics</span></div><div><strong>{problemBankStats.runnable}</strong><span>Runnable now</span></div><div><strong>{problemBankStats.inReview}</strong><span>Specifications in review</span></div>
    <div className="cv-stats-progress"><span>Published & verified</span><div><i style={{width:100*problemBankStats.runnable/problemBankStats.total+"%"}}/></div><small>{Math.round(100*problemBankStats.runnable/problemBankStats.total)}% of bank</small></div>
  </div>
  <div className="cv-problems-layout">
   <aside className="cv-filter-sidebar" aria-label="Filter coding problems">
    <h2>Explore topics</h2>
    <button className={category===""?"cv-category-active":""} onClick={()=>setFilter(setCategory,"")}>All topics<span>{problemBank.length}</span></button>
    {practiceCategories.map(c=><button className={category===c?"cv-category-active":""} key={c} onClick={()=>setFilter(setCategory,c)}>{c}<span>{problemBank.filter(p=>p.category===c).length}</span></button>)}
    <div className="cv-sidebar-divider"/>
    <h2>Difficulty</h2>
    {(["",...practiceDifficulties] as string[]).map(d=><button key={d||"all"} className={difficulty===d?"cv-category-active":""} onClick={()=>setFilter(setDifficulty,d)}>{d||"All levels"}{d?<span className={"cv-level cv-"+d.toLowerCase()}>{d}</span>:null}</button>)}
    <div className="cv-sidebar-divider"/>
    <Link className="cv-sidebar-link" href="/study-plans">↗ Structured study plans</Link>
    <Link className="cv-sidebar-link" href="/courses">↗ Learn with courses</Link>
   </aside>
   <section className="cv-library-main">
    <div className="cv-library-toolbar">
      <div className="cv-library-tabs" role="group" aria-label="Filter publication status">
        {([["all","All 400"],["runnable","Runnable"],["in-review","In review"]] as const).map(([value,label])=><button key={value} className={status===value?"cv-tab-active":""} onClick={()=>setFilter(setStatus,value)}>{label}</button>)}
      </div>
      <label className="cv-search-input"><span>⌕</span><input value={query} onChange={e=>setFilter(setQuery,e.target.value)} placeholder="Search 400 topics…" type="search" aria-label="Search all problems" /></label>
    </div>
    <div className="cv-table-controls"><span><strong>{filtered.length}</strong> matching topics · {solved.length} solved on this device</span><label>Sort <select value={sort} onChange={e=>setFilter(setSort,e.target.value)}><option value="recommended">Runnable first</option><option value="difficulty">Difficulty</option><option value="title">Title A–Z</option></select></label></div>
    <div className="cv-problem-table-wrap">
      <table className="cv-problem-table"><thead><tr><th>Status</th><th>Title</th><th>Difficulty</th><th>Category</th><th>Availability</th></tr></thead><tbody>
       {rows.map(p=><tr key={p.slug}><td className="cv-status-cell">{solved.includes(p.slug)?<span title="Solved on this device" className="cv-check">✓</span>:<span className="cv-unchecked">○</span>}</td>
        <td><Link className="cv-problem-link" href={"/problems/"+p.slug}>{p.title}</Link><small>{p.tags.slice(0,2).join(" · ")||p.category}</small></td>
        <td><span className={"cv-level cv-"+p.difficulty.toLowerCase()}>{p.difficulty}</span></td><td className="cv-category-text">{p.category}</td>
        <td><span className={"cv-availability "+(p.status==="runnable"?"cv-available":"cv-review")}>{p.status==="runnable"?"Solve now":"In review"}</span></td></tr>)}
      </tbody></table>
      {rows.length===0?<div className="cv-no-results"><strong>No matching problems.</strong><p>Clear your filters to view the complete library.</p><button onClick={()=>{setQuery("");setCategory("");setDifficulty("");setStatus("all");setPage(1);}}>Clear filters</button></div>:null}
    </div>
    <div className="cv-pagination"><span>Showing {rows.length?(safePage-1)*PAGE_SIZE+1:0}–{(safePage-1)*PAGE_SIZE+rows.length} of {filtered.length}</span><div><button disabled={safePage===1} onClick={()=>setPage(safePage-1)}>← Previous</button><span>{safePage} / {totalPages}</span><button disabled={safePage===totalPages} onClick={()=>setPage(safePage+1)}>Next →</button></div></div>
    <p className="cv-library-footnote">In-review entries are curated future exercises, not completed problems. Only entries marked “Solve now” include a full statement and working judge tests.</p>
   </section>
  </div>
 </div>;
}

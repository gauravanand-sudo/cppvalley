import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import { eliteCourses, eliteTrackNames } from "@/data/elite-courses";
import { getCourseProblemCounts } from "@/data/course-lessons";
export const metadata:Metadata={title:"7 C++ Courses — Fundamentals to Elite Systems",description:"Seven focused C++ curricula covering core C++, algorithms, concurrency, design patterns, Linux, modern C++ and HFT.",alternates:{canonical:"/courses"}};
export default function CoursesPage(){
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
  <div className="cv-page-intro"><span className="cv-eyebrow">CPPVALLEY LEARN</span><h1>Master C++, one deep lesson at a time.</h1><p>Seven focused learning paths. Every lesson links three relevant topics from the same curated problem library.</p></div>
  <div className="cv-courses-summary"><div><b>07</b><span>Course paths</span></div><div><b>04</b><span>Learning tracks</span></div><div><b>∞</b><span>Room to improve</span></div></div>
  {eliteTrackNames.map(track=>{const items=eliteCourses.filter(c=>c.track===track);return <section key={track} className="cv-course-track-section"><div className="cv-section-head"><div><span className="cv-eyebrow">COURSE TRACK</span><h2>{track}</h2></div><span className="cv-muted">{items.length} {items.length===1?"course":"courses"}</span></div><div className="cv-course-list">{items.map(c=>{const stats=getCourseProblemCounts(c.slug);return <Link href={"/courses/"+c.slug} key={c.slug} className={"cv-course-list-item cv-tile-"+c.color}><span className="cv-course-list-icon">{c.icon}</span><div><h3>{c.title}</h3><p>{c.summary}</p><div className="cv-course-list-meta"><span>{c.level}</span><span>{stats.lessonCount} lessons</span><span>{stats.uniqueProblems} linked topics</span></div></div><div className="cv-course-list-aside"><span className="cv-course-status">{c.status==="recording"?"In development":"Outline available"}</span><b>Explore →</b></div></Link>})}</div></section>})}
  <div className="cv-editorial-note"><b>Availability matters.</b><p>These are lesson curricula with linked practice topics, not a claim that every video or paid course has been released. Published video lessons remain accessible in the video library.</p><Link href="/videos">Watch published lessons →</Link></div>
 </div></main><SiteFooter/></>;
}

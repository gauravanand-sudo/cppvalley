import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons, getCourseProblemCounts } from "@/data/course-lessons";
import { problemBank, problemBankStats } from "@/data/problem-bank";
export const metadata:Metadata = {
  title:"Elite C++ Coding Practice, Study Plans & Courses",
  description:"Learn core C++, DSA, Linux, concurrency, design patterns and HFT engineering. Solve original C++ coding problems with a proper editor.",
  alternates:{canonical:"/"},
};
const examples=problemBank.filter(problem=>problem.status==="runnable").slice(0,6);
export default function Home(){
  return <><SiteHeader/><main className="cv-home"><div className="cv-shell">
    <section className="cv-home-hero">
      <div className="cv-home-copy"><span className="cv-eyebrow"><i className="cv-green-dot"/> ENGINEER YOUR EDGE</span>
        <h1>Think deeply.<br/><span>Code precisely.</span></h1>
        <p>The focused home for serious C++ engineers. Solve original coding challenges, master the language, and understand the systems behind high-performance software.</p>
        <div className="cv-hero-actions"><Link href="/problems" className="cv-btn cv-btn-primary">Start solving <span>→</span></Link><Link href="/courses" className="cv-btn cv-btn-secondary">Explore courses</Link></div>
        <div className="cv-hero-meta"><span><b>{problemBankStats.total}</b> curated topics</span><i/><span><b>{eliteCourses.length}</b> courses</span><i/><span><b>{courseLessons.length}</b> lesson outlines</span></div>
      </div>
      <div className="cv-hero-terminal" aria-label="C++ code editor illustration">
        <div className="cv-terminal-header"><span>● ● ●</span><b>ring_buffer.cpp</b><span>C++17</span></div>
        <div className="cv-terminal-lines"><span>01</span><code><em>#include</em> &lt;atomic&gt;</code><span>02</span><code><em>#include</em> &lt;thread&gt;</code><span>03</span><code> </code><span>04</span><code><strong>struct</strong> RingBuffer &#123;</code><span>05</span><code>  std::atomic&lt;size_t&gt; head&#123;0&#125;;</code><span>06</span><code>  std::atomic&lt;size_t&gt; tail&#123;0&#125;;</code><span>07</span><code>  <i>// Reason about memory ordering</i></code><span>08</span><code>&#125;;</code></div>
        <div className="cv-terminal-result"><b>✓ Accepted</b><span>Correctness first. Performance second.</span></div>
      </div>
    </section>
    <section className="cv-home-belt">
      {([["⌘","Core C++","Memory, ownership, STL"],["◎","Concurrency","Atomics to lock-free"],["↗","Algorithms","Reasoning & complexity"],["⌁","Systems","Linux to low latency"]] as const).map(([icon,name,sub])=><div key={name}><span>{icon}</span><b>{name}<small>{sub}</small></b></div>)}
    </section>
    <section className="cv-home-grid">
      <div><div className="cv-section-head"><div><span className="cv-eyebrow">START HERE</span><h2>Pick a challenge</h2></div><Link href="/problems">All {problemBankStats.total} topics →</Link></div>
        <div className="cv-white-card cv-home-problems"><div className="cv-home-problems-bar"><span>Verified coding exercises</span><span>{problemBankStats.runnable} runnable · {problemBankStats.inReview} in review</span></div>
          {examples.map((p,i)=><Link key={p.slug} className="cv-home-problem-row" href={"/problems/"+p.slug}><span className="cv-home-numeral">{String(i+1).padStart(2,"0")}</span><span className="cv-home-problem-name">{p.title}<small>{p.category}</small></span><span className={"cv-level cv-"+p.difficulty.toLowerCase()}>{p.difficulty}</span><span className="cv-home-row-arrow">↗</span></Link>)}
          <Link href="/problems" className="cv-home-table-link">View the entire challenge library →</Link>
        </div>
      </div>
      <aside><div className="cv-section-head"><div><span className="cv-eyebrow">PROGRESS WITH PURPOSE</span><h2>Follow a study plan</h2></div></div>
        <div className="cv-white-card cv-plan-spotlight"><span>STRUCTURED LEARNING</span><h3>From syntax to systems.</h3><p>Master the concepts in order. Learn the theory, apply it through code, and track your improvement.</p><Link className="cv-btn cv-btn-primary" href="/study-plans">Explore study plans →</Link></div>
        <div className="cv-white-card cv-home-side-info"><b>Not just HFT.</b><p>CppValley begins with C++ itself—algorithms, STL, language mechanics, software design, and concurrent systems.</p></div>
      </aside>
    </section>
    <section className="cv-course-section"><div className="cv-section-head"><div><span className="cv-eyebrow">LEARNING LIBRARY</span><h2>Seven courses. One clear progression.</h2><p>Structured lessons, each connected to three practice topics.</p></div><Link href="/courses">Explore courses →</Link></div>
      <div className="cv-course-grid">{eliteCourses.map(c=>{const info=getCourseProblemCounts(c.slug);return <Link key={c.slug} className={"cv-course-tile cv-tile-"+c.color} href={"/courses/"+c.slug}><div className="cv-course-top"><span className="cv-course-icon">{c.icon}</span><span className="cv-course-status">{c.status==="recording"?"In development":"Curriculum outline"}</span></div><span className="cv-course-track">{c.track}</span><h3>{c.title}</h3><p>{c.summary}</p><div className="cv-course-bottom"><span>{info.lessonCount} lessons</span><span>{info.uniqueProblems} linked topics</span><b>↗</b></div></Link>})}</div>
    </section>
    <section className="cv-home-bottom"><div><span className="cv-eyebrow">ENGINEERING NOTES</span><h2>Read deeply. Build deliberately.</h2><p>Explore original writing on C++, concurrency, CPU behaviour and systems engineering.</p></div><Link className="cv-btn cv-btn-secondary" href="/blog">Read articles →</Link></section>
  </div></main><SiteFooter/></>;
}

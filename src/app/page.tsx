import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons, getCourseProblemCounts } from "@/data/course-lessons";
import { problemBank, problemBankStats } from "@/data/problem-bank";
import { careerPaths } from "@/data/career-paths";
export const metadata:Metadata = {
  title:"Quant/HFT C++ · CUDA/GPU · AI Systems & Architecture",
  description:"Role-focused engineering programs for Quant/HFT C++ developers, CUDA/GPU performance engineers, AI inference infrastructure engineers and AI architects.",
  alternates:{canonical:"/"},
};
const examples=problemBank.filter(problem=>problem.status==="runnable").slice(0,6);
export default function Home(){
  return <><SiteHeader/><main className="cv-home"><div className="cv-shell">
    <section className="cv-home-hero">
      <div className="cv-home-copy"><span className="cv-eyebrow"><i className="cv-green-dot"/> HIGH-PERFORMANCE ENGINEERING · CAREER-FOCUSED</span>
        <h1>Build the systems<br/><span>behind the breakthroughs.</span></h1>
        <p>Prepare for demanding Quant/HFT C++ roles, CUDA and GPU performance engineering, AI inference infrastructure, and AI technical architecture. Learn the mechanisms, build the systems, and defend your decisions.</p>
        <div className="cv-hero-actions"><Link href="/career-paths" className="cv-btn cv-btn-primary">Choose your career path <span>→</span></Link><Link href="/courses" className="cv-btn cv-btn-secondary">Explore courses</Link></div>
        <div className="cv-hero-meta"><span><b>{problemBankStats.total}</b> curated topics</span><i/><span><b>{eliteCourses.length}</b> distinct courses</span><i/><span><b>{courseLessons.length}</b> lesson outlines</span></div>
      </div>
      <div className="cv-hero-terminal" aria-label="C++ code editor illustration">
        <div className="cv-terminal-header"><span>● ● ●</span><b>ring_buffer.cpp</b><span>C++17</span></div>
        <div className="cv-terminal-lines"><span>01</span><code><em>#include</em> &lt;atomic&gt;</code><span>02</span><code><em>#include</em> &lt;thread&gt;</code><span>03</span><code> </code><span>04</span><code><strong>struct</strong> RingBuffer &#123;</code><span>05</span><code>  std::atomic&lt;size_t&gt; head&#123;0&#125;;</code><span>06</span><code>  std::atomic&lt;size_t&gt; tail&#123;0&#125;;</code><span>07</span><code>  <i>// Reason about memory ordering</i></code><span>08</span><code>&#125;;</code></div>
        <div className="cv-terminal-result"><b>✓ Accepted</b><span>Correctness first. Performance second.</span></div>
      </div>
    </section>

    <section className="cv-home-belt">
      {([["⌁","Quant / HFT","C++ trading systems"],["▦","CUDA / GPU","Kernel performance"],["◈","AI Infrastructure","Inference & distributed AI"],["◇","AI Architecture","Technical leadership"]] as const)
        .map(([icon,name,sub])=><div key={name}><span>{icon}</span><b>{name}<small>{sub}</small></b></div>)}
    </section>
    <section className="cv-home-careers">
      <div className="cv-section-head"><div><span className="cv-eyebrow">ROLE-ALIGNED LEARNING</span><h2>Four destinations. Four clear roadmaps.</h2>
        <p>Start at your role, not at a random playlist. Each path has prerequisites, interviews, labs and a portfolio capstone.</p>
      </div><Link href="/career-paths">View all paths →</Link></div>
      <div className="cv-home-career-grid">{careerPaths.map(p=><Link href={"/career-paths/"+p.slug} key={p.slug} className="cv-home-career">
        <span className="cv-eyebrow">{p.code}</span><span className="cv-home-career-symbol">{p.icon}</span>
        <h3>{p.title}</h3><p>{p.tagline}</p><small>{p.courseSlugs.length} ordered courses · capstone & interviews</small><b>Explore roadmap →</b>
      </Link>)}</div>
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
        <div className="cv-white-card cv-home-side-info"><b>Not every role needs the same stack.</b><p>HFT focuses on trading infrastructure, CUDA on GPU kernels, AI infrastructure on serving and scaling, and architects on decisions, security and reliability.</p></div>
      </aside>
    </section>
    <section className="cv-course-section"><div className="cv-section-head"><div><span className="cv-eyebrow">LEARNING LIBRARY</span><h2>Ten distinct courses. Role-specific progression.</h2><p>Defined prerequisites, non-overlapping topics and scoped capstones. Two GPU/AI lab briefs or three C++ practice topics per lesson.</p></div><Link href="/courses">Explore courses →</Link></div>
      <div className="cv-course-grid">{eliteCourses.map(c=>{const info=getCourseProblemCounts(c.slug);return <Link key={c.slug} className={"cv-course-tile cv-tile-"+c.color} href={"/courses/"+c.slug}><div className="cv-course-top"><span className="cv-course-icon">{c.icon}</span><span className="cv-course-status">{c.status==="recording"?"In development":"Curriculum outline"}</span></div><span className="cv-course-track">{c.track}</span><h3>{c.title}</h3><p>{c.summary}</p><div className="cv-course-bottom"><span>{info.lessonCount} lessons</span><span>{info.specialtyLabs?info.specialtyLabs+" GPU/AI lab outlines":info.uniqueProblems+" C++ practice topics"}</span><b>↗</b></div></Link>})}</div>
    </section>
    <section className="cv-home-bottom"><div><span className="cv-eyebrow">ENGINEERING NOTES</span><h2>Read deeply. Build deliberately.</h2><p>Explore original writing on C++, concurrency, GPU performance, AI infrastructure and low-latency engineering.</p></div><Link className="cv-btn cv-btn-secondary" href="/blog">Read articles →</Link></section>
  </div></main><SiteFooter/></>;
}

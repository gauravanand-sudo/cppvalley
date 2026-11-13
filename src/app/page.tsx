import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths } from "@/data/career-paths";
import { eliteCourses } from "@/data/elite-courses";
import { problemBankStats } from "@/data/problem-bank";

export const metadata:Metadata={
 title:"Quant/HFT C++ · CUDA/GPU · AI Systems & Architecture",
 description:"Choose a career path in Quant/HFT C++, CUDA/GPU, AI infrastructure or AI architecture. Follow focused courses and practical engineering projects.",
 alternates:{canonical:"/"},
};

export default function Home() {
 return <><SiteHeader/><main className="cv-subpage cv-focus-home"><div className="cv-shell">
  <section className="cv-focus-hero">
   <div>
    <span className="cv-eyebrow">CPPVALLEY · ENGINEERING CAREER PATHS</span>
    <h1>Pick your path.<br/><em>Build real systems.</em></h1>
    <p>Quant/HFT C++, CUDA/GPU, AI infrastructure and AI architecture—taught through focused courses and projects.</p>
    <div className="cv-hero-actions">
      <Link className="cv-btn cv-btn-primary" href="/career-paths">Choose a path →</Link>
      <Link className="cv-btn cv-btn-secondary" href="/courses">Browse {eliteCourses.length} courses</Link>
    </div>
   </div>
   <div className="cv-focus-hero-art" aria-hidden="true">
     <small>CPPVALLEY / SYSTEMS ENGINEERING</small>
     <code><b>#include</b> &lt;atomic&gt;{"\n"}<b>#include</b> &lt;thread&gt;{"\n\n"}// correctness first{"\n"}// measure what matters</code>
     <span>C++ · GPU · AI Systems</span>
   </div>
  </section>
  <section className="cv-focus-section">
   <div className="cv-focus-section-head"><h2>What do you want to become?</h2><Link href="/career-paths">Compare paths →</Link></div>
   <div className="cv-focus-path-grid">
     {careerPaths.map(path=><Link href={"/career-paths/"+path.slug} key={path.slug} className="cv-focus-path-card">
       <span className="cv-focus-path-symbol">{path.icon}</span>
       <h3>{path.title}</h3>
       <p>{path.tagline}</p>
       <small>{path.courseSlugs.length} courses · View path →</small>
     </Link>)}
   </div>
  </section>
  <section className="cv-focus-practice-bar">
    <div><h2>Prefer to start coding?</h2><p>{problemBankStats.runnable} runnable C++ problems · {problemBankStats.total} curated topics</p></div>
    <div className="cv-focus-practice-actions">
      <Link href="/problems" className="cv-btn cv-btn-primary">Open Practice →</Link>
      <Link href="/practice-labs">GPU / AI labs →</Link>
    </div>
  </section>
  <p className="cv-focus-footnote">Course lessons and specialist labs are still being developed. Published practice is labeled clearly.</p>
 </div></main><SiteFooter/></>;
}

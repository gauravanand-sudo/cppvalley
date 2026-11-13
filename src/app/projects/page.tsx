import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths } from "@/data/career-paths";
import { eliteCourses } from "@/data/elite-courses";

export const metadata:Metadata={
 title:"Engineering Capstones — Quant/HFT, CUDA, AI Systems & Architecture",
 description:"Evidence-based engineering project outlines with requirements, failure tests and performance or architecture deliverables.",
 alternates:{canonical:"/projects"},
};
export default function ProjectsPage() {
 return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
  <header className="cv-page-intro cv-compact-intro"><span className="cv-eyebrow">BUILD · MEASURE · DEFEND</span>
   <h1>Portfolio projects that demonstrate engineering judgment.</h1>
   <p>One career capstone per target role, with course-level projects beneath it. The briefs define expected evidence; they are not automated certificates or completed tutorials.</p></header>
  <div className="cv-project-grid">{careerPaths.map(path=><article className="cv-white-card cv-project-card" key={path.slug}>
    <span className="cv-eyebrow">{path.code} · CAREER CAPSTONE</span><h2>{path.title}</h2><p>{path.project}</p>
    <h3>What the reviewer should inspect</h3><ul>{path.evidence.map(item=><li key={item}>{item}</li>)}</ul>
    <Link className="cv-btn cv-btn-secondary" href={"/career-paths/"+path.slug}>Open career roadmap →</Link>
  </article>)}</div>
  <div className="cv-section-head"><div><span className="cv-eyebrow">TEN COURSE CHECKPOINTS</span><h2>Smaller capstones along the way</h2></div><Link href="/courses">All courses →</Link></div>
  <div className="cv-project-course-list">{eliteCourses.map(c=><Link href={"/courses/"+c.slug} key={c.slug}>
    <span className="cv-course-list-kicker">{c.code}</span><span><strong>{c.title}</strong><small>{c.capstone}</small></span><b>↗</b>
  </Link>)}</div>
  <div className="cv-editorial-note"><b>Publication status</b><p>These are detailed portfolio briefs, not verified student submissions or completed learning artifacts. The review rubrics and GPU execution infrastructure will be developed alongside the curricula.</p></div>
 </div></main><SiteFooter/></>;
}

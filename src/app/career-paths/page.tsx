import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { careerPaths } from "@/data/career-paths";
import { eliteCoursesBySlug } from "@/data/elite-courses";

export const metadata: Metadata = {
  title: "Career Paths — Quant/HFT C++, CUDA/GPU, AI Infrastructure & Architecture",
  description: "Four role-specific engineering roadmaps: prerequisites, sequenced courses, interview domains and evidence-based capstone projects.",
  alternates: {canonical:"/career-paths"},
};

export default function CareerPathsPage() {
  return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
    <section className="cv-page-intro cv-compact-intro cv-paths-intro">
      <span className="cv-eyebrow">ROLE-BASED ENGINEERING ROADMAPS</span>
      <h1>Choose the role. Follow the engineering path.</h1>
      <p>Four destinations with distinct prerequisites and capstones. You do not need CUDA to become an AI architect, or trading protocols to build inference systems.</p>
    </section>
    <section className="cv-paths-grid" aria-label="Engineering career paths">
      {careerPaths.map(path=><Link href={"/career-paths/"+path.slug} className={"cv-path-card cv-path-"+path.accent} key={path.slug}>
        <div className="cv-path-card-header"><span className="cv-path-card-icon">{path.icon}</span><small>{path.code} · {path.courseSlugs.length} required courses</small></div>
        <h2>{path.title}</h2>
        <p>{path.tagline}</p>
        <div className="cv-path-course-stack">{path.courseSlugs.map((slug,index)=>{
          const c=eliteCoursesBySlug.get(slug);
          if(!c)return null;
          return <span key={slug}><b>{index+1}</b>{c.shortTitle}</span>;
        })}</div>
        <div className="cv-path-card-bottom"><span>{path.targetRoles.slice(0,2).join(" · ")}</span><b>View roadmap →</b></div>
      </Link>)}
    </section>
    <div className="cv-editorial-note cv-path-disclaimer">
      <b>Built for engineering evidence, not job guarantees.</b>
      <p>Courses are structured curricula. Capstones, interview assessments, and GPU-backed evaluation are staged features. Choose the path aligned with your current background and intended role; mastery comes from verified work and professional experience.</p>
    </div>
  </div></main><SiteFooter/></>;
}

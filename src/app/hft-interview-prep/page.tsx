import type { Metadata } from "next";
import "./hft.css";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HftInterviewPrep } from "@/components/HftInterviewPrep";
import { hftProjects, hftSkillLanes } from "@/data/hft-interview-prep";

export const metadata:Metadata={
  title:"HFT C++ Interview Prep — Citadel, Graviton, Tower, Jane Street",
  description:"A role-specific C++ systems interview companion: 28 original project briefs, core C++/concurrency/Linux/trading skills and six graded mock interview formats.",
  alternates:{canonical:"/hft-interview-prep"},
};
export default function HftInterviewPrepPage(){
  return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell">
    <Link className="cv-focus-back" href="/career-paths/quant-hft-cpp">← HFT career path</Link>
    <header className="cv-focus-heading">
      <span className="cv-eyebrow">QUANT / HFT C++ · INTERVIEW BRIDGE</span>
      <h1>HFT interview readiness</h1>
      <p>Go beyond lessons and LeetCode. Practice designing, debugging, benchmarking and defending real systems for demanding C++ trading-infrastructure interviews.</p>
    </header>
    <div className="cv-hft-counts" aria-label="Preparation inventory">
      <span><strong>4</strong> prerequisite courses</span>
      <span><strong>{hftSkillLanes.length}</strong> interview skill lanes</span>
      <span><strong>{hftProjects.length}</strong> original project briefs</span>
      <span><strong>6</strong> mock interview formats</span>
    </div>
    <HftInterviewPrep/>
    <p className="cv-focus-footnote">Educational roadmap and planned assessments, not a firm-sponsored prep program, completed teaching content, live judge or hiring guarantee.</p>
  </div></main><SiteFooter/></>;
}

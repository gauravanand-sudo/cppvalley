import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata:Metadata={title:"C++ Coding Contests — Planned",robots:{index:false,follow:true}};
export default function Contests(){return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell cv-coming-soon"><span className="cv-eyebrow">COMPETITIVE PRACTICE</span><h1>Contests are in development.</h1><p>Ranked contests require trusted submissions, consistent evaluation, authenticated profiles and clear anti-cheat rules. We're building those foundations first.</p><div className="cv-white-card"><h2>What we're preparing</h2><p>Timed C++ challenges, concurrency correctness rounds, systems design puzzles, and transparent performance judging on controlled hardware.</p><Link className="cv-btn cv-btn-primary" href="/problems?status=runnable">Practice available problems →</Link></div></div></main><SiteFooter/></>;}

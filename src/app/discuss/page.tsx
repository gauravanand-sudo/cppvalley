import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata:Metadata={title:"C++ Engineering Discussions — Planned",robots:{index:false,follow:true}};
export default function Discuss(){return <><SiteHeader/><main className="cv-subpage"><div className="cv-shell cv-coming-soon"><span className="cv-eyebrow">COMMUNITY</span><h1>Deep discussions deserve great moderation.</h1><p>We're preparing solution discussions and topic forums. Public posting will open after accounts, reporting and moderation are available; no fabricated community threads.</p><div className="cv-white-card"><h2>In the meantime</h2><p>Read original C++ engineering notes, review course lesson outlines and experiment with published coding problems.</p><Link className="cv-btn cv-btn-primary" href="/blog">Read engineering articles →</Link></div></div></main><SiteFooter/></>;}

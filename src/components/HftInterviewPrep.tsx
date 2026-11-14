"use client";

import Link from "next/link";
import { useState } from "react";
import {
  hftProjects, hftProjectStages, hftSkillLanes, hftMockLoops, hftFirmSignals,
  type HftProjectStage,
} from "@/data/hft-interview-prep";

type Tab = "skills" | "projects" | "mocks";
const tabs: {id:Tab;label:string}[] = [
  {id:"skills",label:"Skills & 26-week plan"},
  {id:"projects",label:"28 project briefs"},
  {id:"mocks",label:"Mock interview loops"},
];

export function HftInterviewPrep() {
  const [active,setActive]=useState<Tab>("skills");
  const [stage,setStage]=useState<HftProjectStage>("C1");
  const projects=hftProjects.filter(project=>project.stage===stage);
  const selected=hftProjectStages.find(item=>item.code===stage);

  return <section className="cv-hft-workspace">
    <div className="cv-focus-tabs" role="tablist" aria-label="HFT interview preparation">
      {tabs.map(({id,label})=><button type="button" role="tab" key={id}
        id={"hft-tab-"+id} aria-controls="hft-tab-panel" aria-selected={active===id}
        tabIndex={active===id?0:-1} className={active===id?"is-active":""}
        onClick={()=>setActive(id)}
        onKeyDown={event=>{
          if(event.key==="ArrowRight"||event.key==="ArrowLeft"){
            event.preventDefault();
            const next=(tabs.findIndex(tab=>tab.id===active)+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
            setActive(tabs[next].id);
            document.getElementById("hft-tab-"+tabs[next].id)?.focus();
          }
        }}>{label}</button>)}
    </div>
    <div role="tabpanel" tabIndex={0} id="hft-tab-panel" aria-labelledby={"hft-tab-"+active}>
      {active==="skills"&&<>
        <p className="cv-hft-intro">The C1–C4 course sequence teaches the systems. These interview drills run alongside it, especially timed algorithms, code review and explaining your design.</p>
        <div className="cv-hft-roadmap">
          {hftProjectStages.map(s=><div key={s.code} className="cv-hft-roadmap-step">
            <span className="cv-focus-code">{s.code}</span><small>{s.range}</small>
            <strong>{s.title}</strong><p>{s.intro}</p>
          </div>)}
        </div>
        <div className="cv-hft-section-heading"><h2>Readiness gaps to close</h2><span>7 skill lanes · select to expand</span></div>
        <div className="cv-hft-accordion">
          {hftSkillLanes.map((lane,i)=><details key={lane.id} open={undefined}>
            <summary><div><small>{lane.course}</small><strong>{lane.title}</strong></div><span aria-hidden="true">+</span></summary>
            <div className="cv-hft-detail-body"><p>{lane.gap}</p><ul>{lane.topics.map(t=><li key={t}>{t}</li>)}</ul>
              <div className="cv-hft-proof"><b>Evidence target</b><p>{lane.proof}</p></div>
            </div>
          </details>)}
        </div>
        <p className="cv-focus-footnote">LeetCode remains a parallel practice habit; no number of solved problems guarantees an offer. Prioritize correctness, explanation and unfamiliar variations.</p>
        <Link href="/study-plans" className="cv-hft-text-link">Open existing C++ practice plans →</Link>
      </>}
      {active==="projects"&&<>
        <div className="cv-hft-section-heading"><div><h2>Build and defend real systems</h2><p>Original briefs, not executable assignments or graded certificates.</p></div><span>{hftProjects.length} briefs</span></div>
        <div className="cv-hft-stage-tabs" aria-label="Filter projects by course">
          {hftProjectStages.map(s=><button key={s.code} type="button"
            aria-pressed={stage===s.code} onClick={()=>setStage(s.code)} className={stage===s.code?"is-active":""}>
            {s.code}<small>{hftProjects.filter(p=>p.stage===s.code).length} projects</small>
          </button>)}
        </div>
        <p className="cv-hft-intro"><strong>{selected?.title}</strong> · {selected?.range}. Start with one project in this phase, then complete its acceptance checks before moving on.</p>
        <div className="cv-hft-accordion cv-hft-projects">
          {projects.map((project,i)=><details key={project.id}>
            <summary>
              <span className="cv-hft-project-num">{String(i+1).padStart(2,"0")}</span>
              <div><strong>{project.title}</strong><small>{project.brief}</small></div><span aria-hidden="true">+</span>
            </summary>
            <div className="cv-hft-detail-body">
              <div className="cv-hft-rubric-grid">
                <section><h3>Build</h3><ul>{project.deliverables.map(t=><li key={t}>{t}</li>)}</ul></section>
                <section><h3>Pass criteria</h3><ul>{project.acceptance.map(t=><li key={t}>{t}</li>)}</ul></section>
              </div>
              <div className="cv-hft-proof"><b>Interview defense</b><p>{project.defense}</p></div>
              <p className="cv-hft-stretch"><b>Stretch:</b> {project.stretch}</p>
            </div>
          </details>)}
        </div>
        <p className="cv-focus-footnote">Use synthetic market data and simulation only; these project descriptions do not provide live trading access. Performance claims require measurements from your own machine.</p>
      </>}
      {active==="mocks"&&<>
        <p className="cv-hft-intro">These are original practice formats informed by public engineering guidance, not leaked questions or a promise of any company&apos;s exact interview.</p>
        <div className="cv-hft-accordion">
          {hftMockLoops.map(loop=><details key={loop.id}>
            <summary><div><small>{loop.duration} · {loop.format}</small><strong>{loop.title}</strong></div><span aria-hidden="true">+</span></summary>
            <div className="cv-hft-detail-body"><ol>{loop.tasks.map(t=><li key={t}>{t}</li>)}</ol>
              <div className="cv-hft-proof"><b>Score on</b><p>{loop.score}</p></div>
            </div>
          </details>)}
        </div>
        <div className="cv-hft-section-heading"><h2>Employer signals and original sources</h2></div>
        <div className="cv-hft-source-grid">
          {hftFirmSignals.map(firm=><div key={firm.name} className="cv-hft-source-card">
            <h3>{firm.name}</h3><p>{firm.signal}</p>
            <a href={firm.link} target="_blank" rel="noopener noreferrer">Read public source ↗</a>
          </div>)}
        </div>
        <p className="cv-focus-footnote">Interview formats depend on role, team, level and hiring cycle. Jane Street software engineering is not exclusively C++; its low-latency listings explicitly say its main language is OCaml. Probability/trading puzzles are not universal SWE rounds.</p>
      </>}
    </div>
  </section>;
}

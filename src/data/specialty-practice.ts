import { courseLessons } from "./course-lessons";
import { eliteCoursesBySlug } from "./elite-courses";

export type SpecialtyLab = {
  slug: string;
  courseSlug: string;
  lessonSlug: string;
  courseCode: string;
  title: string;
  lessonTitle: string;
  moduleTitle: string;
  type: "GPU coding" | "Runtime experiment" | "AI application" | "Distributed infrastructure" | "Architecture case";
  brief: string;
  acceptance: string[];
  status: "outline";
};

/**
 * Practice briefs are *not* executable judging tasks. GPU labs need a GPU
 * sandbox; architecture evaluations need human/structured rubrics. This index
 * makes them discoverable next to the verified C++ problem bank without
 * falsely suggesting that the CPU-only C++17 judge can assess them.
 */
function makeExercises(courseCode:string,title:string,module:string) {
  const topic = title.replace(/^Capstone:\s*/,"");
  if (courseCode==="C5") return [
    {suffix:"implementation",type:"GPU coding" as const,title:"CUDA implementation — "+topic,
      brief:"Implement a minimal CUDA C++ experiment demonstrating "+topic+". Compare output with an independent CPU or mathematical reference.",
      acceptance:["Correct CUDA result on representative and boundary inputs","Memory and synchronization checks documented","GPU device and CUDA version recorded"]},
    {suffix:"diagnostics",type:"GPU coding" as const,title:"Correctness and profiling — "+topic,
      brief:"Construct one failure or edge-case test for "+topic+" and measure the behavior with CUDA events or Nsight tooling.",
      acceptance:["Reproducible inputs and failure cases","CPU/GPU timings distinguished from transfer overhead","Explanation of expected hardware behavior"]},
  ];
  if (courseCode==="C6") return [
    {suffix:"optimize",type:"GPU coding" as const,title:"Optimize a kernel — "+topic,
      brief:"Implement or tune a single-GPU kernel for "+topic+" against a clearly stated numerical baseline and workload.",
      acceptance:["Reference correctness and precision tolerance","Bandwidth/occupancy/roofline hypothesis","Hardware-specific latency and throughput measurements"]},
    {suffix:"tradeoffs",type:"GPU coding" as const,title:"Kernel trade-off study — "+topic,
      brief:"Compare two architectures or tuning choices for "+topic+" and analyze why observed performance differs.",
      acceptance:["Repeatable benchmark methodology","GPU/driver/clock details","Quantified performance and numerical trade-offs"]},
  ];
  if (courseCode==="C7") return [
    {suffix:"simulate",type:"Runtime experiment" as const,title:"Inference-runtime experiment — "+topic,
      brief:"Implement a simulator, measurable prototype or workload experiment for "+topic+" below the model API.",
      acceptance:["Explicit request/workload model","Correctness or scheduling invariants","Measurable TTFT, ITL, throughput or memory evidence"]},
    {suffix:"load-test",type:"Runtime experiment" as const,title:"Serving reliability case — "+topic,
      brief:"Design a load and failure test that reveals the performance or capacity limits associated with "+topic+".",
      acceptance:["SLO assumptions and admission limits","Burst/failure scenarios","Observed metrics and mitigation rationale"]},
  ];
  if (courseCode==="C8") return [
    {suffix:"application",type:"AI application" as const,title:"Build an application slice — "+topic,
      brief:"Build a narrow, testable LLM application feature based on "+topic+". Use deterministic mocks where external model responses are unreliable.",
      acceptance:["API contract and trust boundaries","Golden tests and evaluation data","Security and privacy constraints"]},
    {suffix:"evaluate",type:"AI application" as const,title:"RAG/agent evaluation — "+topic,
      brief:"Create a regression or adversarial scenario for "+topic+" and explain the mitigation and rollout gate.",
      acceptance:["Reproducible failure case","Quality, safety or reliability rubric","Versioning and monitoring plan"]},
  ];
  if (courseCode==="C9") return [
    {suffix:"design",type:"Distributed infrastructure" as const,title:"Cluster experiment — "+topic,
      brief:"Model, configure or simulate a multi-GPU/distributed workload investigating "+topic+".",
      acceptance:["Topology, network and capacity assumptions","Measurable communication or scheduling behavior","Repeatable experiment instructions"]},
    {suffix:"failure",type:"Distributed infrastructure" as const,title:"Failure drill — "+topic,
      brief:"Design a partial-failure, resource exhaustion or recovery test for "+topic+" with explicit SLO impacts.",
      acceptance:["Fault injection and detection criteria","Rollback or recovery conditions","Operational metrics and cost impact"]},
  ];
  return [
    {suffix:"decision",type:"Architecture case" as const,title:"Architecture decision — "+topic,
      brief:"Prepare an architecture decision record for "+topic+", comparing at least three feasible approaches and their constraints.",
      acceptance:["Requirements and architectural assumptions","Cost, security and quality trade-off matrix","Justified decision and alternatives rejected"]},
    {suffix:"review",type:"Architecture case" as const,title:"Design review — "+topic,
      brief:"Review a system design affected by "+topic+" and produce a risk register, SLOs, launch gates and mitigation plan.",
      acceptance:["Threat/failure model and trust boundaries","Measurable acceptance criteria and SLOs","Review questions, ownership and rollout plan"]},
  ];
}

export const specialtyLabs: SpecialtyLab[] = courseLessons
  .filter(lesson=>lesson.practiceKind==="specialty-labs")
  .flatMap(lesson=>{
    const course=eliteCoursesBySlug.get(lesson.courseSlug);
    if(!course)return [];
    return makeExercises(course.code,lesson.title,lesson.moduleTitle).map(task=>({
      slug:lesson.courseSlug+"-"+lesson.slug+"-"+task.suffix,
      courseSlug:lesson.courseSlug,
      lessonSlug:lesson.slug,
      courseCode:course.code,
      title:task.title,
      lessonTitle:lesson.title,
      moduleTitle:lesson.moduleTitle,
      type:task.type,
      brief:task.brief,
      acceptance:task.acceptance,
      status:"outline" as const,
    }));
  });

export const specialtyLabsBySlug = new Map(specialtyLabs.map(task=>[task.slug,task]));
export function specialtyLabsForLesson(courseSlug:string,lessonSlug:string) {
  return specialtyLabs.filter(task=>task.courseSlug===courseSlug&&task.lessonSlug===lessonSlug);
}

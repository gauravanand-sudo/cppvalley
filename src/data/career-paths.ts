import { eliteCoursesBySlug } from "./elite-courses";

/** A career outcome is a sequenced, role-specific program, not a course bundle. */
export type CareerPath = {
  slug: string;
  code: string;
  title: string;
  shortTitle: string;
  tagline: string;
  targetRoles: string[];
  audience: string;
  entry: string;
  courseSlugs: string[];
  optionalCourseSlugs: string[];
  interviewTopics: string[];
  project: string;
  evidence: string[];
  icon: string;
  accent: string;
};

export const careerPaths: CareerPath[] = [
  {
    slug:"quant-hft-cpp",code:"PATH 01",title:"Quant / HFT C++ Engineer",
    shortTitle:"Quant/HFT C++",tagline:"From correct C++ to the exchange execution path.",
    targetRoles:["Quant Developer (C++)","HFT Software Engineer","Trading Infrastructure Engineer"],
    audience:"C++ developers preparing for quant trading and low-latency infrastructure interviews.",
    entry:"Comfort with programming and basic data structures. Prior finance experience is not required.",
    courseSlugs:["core-cpp-interviews","cpp-concurrency-lockfree-systems","linux-os-networking-systems-engineers","low-latency-cpp-hft-systems"],
    optionalCourseSlugs:[],
    interviewTopics:["C++ object lifetime and undefined behavior","Algorithms and complexity","Lock-free correctness and memory ordering","Linux processes, networking and CPU behavior","Order books, feed handling, order routing and risk","Trade-off and latency-debugging interviews"],
    project:"A testable exchange-feed simulator, order book, order-routing gateway, pre-trade risk engine and deterministic replay pipeline.",
    evidence:["Data-race and property-based tests","Binary feed parser with gap recovery","Order-matching invariant proofs","p50/p99 tail-latency and throughput report","Resilience and failure-injection demonstration"],
    icon:"⌁",accent:"ruby",
  },
  {
    slug:"cuda-gpu-performance",code:"PATH 02",title:"CUDA / GPU Performance Engineer",
    shortTitle:"CUDA/GPU",tagline:"From CUDA correctness to architecture-aware kernel speed.",
    targetRoles:["CUDA Kernel Engineer","GPU Performance Engineer","Accelerated Computing Engineer"],
    audience:"Engineers aiming to implement and optimize GPU workloads rather than only call frameworks.",
    entry:"C/C++ pointers and arrays, linear algebra, basic performance measurement and access to GPU hardware.",
    courseSlugs:["core-cpp-interviews","cuda-gpu-programming","gpu-kernel-performance-engineering"],
    optionalCourseSlugs:["linux-os-networking-systems-engineers","ai-inference-engines"],
    interviewTopics:["SIMT execution and warps","GPU memory, synchronization and correctness","Reductions and scans","Shared-memory tiling and Tensor Cores","Occupancy, roofline and instruction analysis","CUDA/Triton kernel design and numerical precision"],
    project:"A correctness-tested library of reductions, scans, GEMM and fused attention kernels, benchmarked against CPU and established GPU baselines.",
    evidence:["GPU sanitizer test reports","Bandwidth and arithmetic-intensity model","Nsight profiling artifacts","Accuracy and numerical-error budget","Kernel-regression performance dashboard"],
    icon:"▦",accent:"purple",
  },
  {
    slug:"ai-systems-infrastructure",code:"PATH 03",title:"AI Systems / Inference Engineer",
    shortTitle:"AI Infrastructure",tagline:"Engineer inference services and distributed GPU systems.",
    targetRoles:["AI Inference Engineer","LLM Runtime Engineer","Distributed AI Engineer","AI Platform SRE"],
    audience:"Backend, ML platform and infrastructure developers working below the model API.",
    entry:"Python, ML fundamentals, Transformers, Linux/networking and a working understanding of GPU resources.",
    courseSlugs:["ai-inference-engines","distributed-ai-gpu-infrastructure"],
    optionalCourseSlugs:["cuda-gpu-programming","gpu-kernel-performance-engineering","linux-os-networking-systems-engineers"],
    interviewTopics:["KV caches, prefill and decoding","Batching, fairness and request scheduling","Serving TTFT, ITL and throughput","NCCL and multi-GPU topology","Fault tolerance, GPU OOM and recovery","Capacity planning and scaling design"],
    project:"A KV-aware inference scheduler deployed on a measured multi-GPU service with failure recovery and capacity controls.",
    evidence:["Inference-load benchmark with SLOs","KV-cache and batching simulation","GPU communication profile","Node-failure recovery exercise","Cost/capacity and incident report"],
    icon:"▧",accent:"blue",
  },
  {
    slug:"ai-architect-tech-lead",code:"PATH 04",title:"AI Systems Architect / Technical Lead",
    shortTitle:"AI Architect",tagline:"Make and defend production AI architecture decisions.",
    targetRoles:["AI Systems Architect","AI Tech Lead","Principal AI Platform Engineer"],
    audience:"Experienced engineers building toward ownership of enterprise AI systems, platforms and technical decisions.",
    entry:"Hands-on backend/cloud experience, Python, database and API design, and basic ML/LLM knowledge. Advanced CUDA or C++ is optional.",
    courseSlugs:["production-llm-rag-agents","ai-inference-engines","distributed-ai-gpu-infrastructure","ai-systems-architecture"],
    optionalCourseSlugs:["cuda-gpu-programming","linux-os-networking-systems-engineers"],
    interviewTopics:["RAG and agent trust boundaries","Multi-tenant platform design","Model selection and cost/performance analysis","Evals, quality gates and observability","Security, governance and reliability","Architecture decision records and technical leadership"],
    project:"An enterprise AI platform proposal plus a working, access-controlled reference service, with ADRs, evals, threat model, budget and incident playbook.",
    evidence:["Architecture design review","Threat model and tenant isolation review","Model and inference cost forecast","Evaluation and release criteria","SLOs, incident drills and trade-off defense"],
    icon:"◇",accent:"amber",
  },
];
export const careerPathsBySlug = new Map(careerPaths.map(path=>[path.slug,path]));
export function pathsForCourse(slug: string) {
  return careerPaths.filter(path=>path.courseSlugs.includes(slug));
}
export function coursesForPath(slug:string) {
  const path=careerPathsBySlug.get(slug);
  return path ? path.courseSlugs.map(key=>eliteCoursesBySlug.get(key)).filter((c):c is NonNullable<typeof c>=>Boolean(c)) : [];
}

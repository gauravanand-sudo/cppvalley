/** CppValley career-focused curriculum. Existing published course URLs remain stable. */
export type EliteTrack = "C++ Foundations" | "Quant / HFT" | "GPU / CUDA" | "AI Systems" | "AI Architecture";
export type EliteCourse = {
  code: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  track: EliteTrack;
  level: string;
  status: "recording" | "curriculum";
  focus: string[];
  modules: string[];
  priority: number;
  icon: string;
  color: string;
  required: string[];
  recommended: string[];
  entryKnowledge: string;
  owns: string[];
  excludes: string[];
  capstone: string;
  targetRoles: string[];
};

export const eliteCourses: EliteCourse[] = [
  {
    code:"C1",slug:"core-cpp-interviews",title:"Modern C++ & Software Engineering",
    shortTitle:"Modern C++",summary:"From the object model to maintainable, performance-conscious C++ APIs.",
    description:"The shared C++ foundation: lifetime, RAII, STL internals, C++17/20/23, templates, testing, exception safety, API design and correct object-oriented design. This is not a concurrency, kernel or trading course.",
    track:"C++ Foundations",level:"Foundation → Advanced",status:"curriculum",priority:1,icon:"C++",color:"blue",
    focus:["RAII & ownership","STL & object model","C++17/20/23","Testing & C++ API design"],
    modules:["Compilation, Types & Object Lifetime","RAII, Ownership & Exception Safety","Classes, Polymorphism & API Contracts","STL Containers, Iterators & Algorithms","Templates, Deduction & Value Categories","Move Semantics & Perfect Forwarding","Modern C++17 Features","C++20 Concepts, Ranges & Coroutines","C++23 Library Evolution & Portability","Performance-Aware Library Design","Testing, Debugging & Low-Level Design Foundations","Capstone: Reliable C++ Component"],
    required:[],recommended:[],entryKnowledge:"Basic programming experience; no HFT, GPU or ML knowledge required.",
    owns:["C++ language rules and standards","object lifetime, ownership and RAII","STL and generic programming","C++ API design and correctness"],
    excludes:["thread coordination and memory-order proofs (C2)","Linux/CPU tuning (C3)","trading protocols (C4)","GPU programming and AI systems (C5–C10)"],
    capstone:"Build a portable C++17/20 binary-message library with fuzz tests, error handling, CMake CI, sanitizers and benchmark evidence.",
    targetRoles:["C++ Software Engineer","Systems C++ Engineer","C++ Interview Candidate"],
  },
  {
    code:"C2",slug:"cpp-concurrency-lockfree-systems",title:"C++ Concurrency, Atomics & Lock-Free Systems",
    shortTitle:"Concurrency & Lock-Free",summary:"Reason about thread safety, the memory model and concurrent progress.",
    description:"Correct concurrent C++ from thread lifetimes and mutexes to happens-before, atomic orders, concurrent containers, memory reclamation, lock-free queues, work stealing and stress verification. No market-feed or AI-framework material.",
    track:"C++ Foundations",level:"Intermediate → Expert",status:"recording",priority:2,icon:"⧉",color:"violet",
    focus:["Threads & synchronization","Happens-before","CAS & atomics","SPSC/MPMC & reclamation"],
    modules:["Threads, Lifetimes & Concurrency Foundations","Shared Data, Mutexes & Deadlock Avoidance","Condition Variables, Futures & Coordination","Memory Ordering, Atomics & Progress Guarantees","Thread-Safe Containers & Lock Granularity","Task Scheduling, Cancellation & Parallel Performance","Lock-Free Stacks, Ring Buffers & Queues","ABA, Reclamation & Advanced Lock-Free Design","Testing, Debugging & Proving Concurrent Correctness"],
    required:["core-cpp-interviews"],recommended:["linux-os-networking-systems-engineers"],
    entryKnowledge:"Comfort with RAII, references, templates and the standard library.",
    owns:["C++ threads and synchronization","C++ memory-model correctness","atomic algorithms and memory reclamation","concurrent data structure verification"],
    excludes:["Linux kernel and packet paths (C3)","order books and exchange protocols (C4)","CUDA memory model (C5)"],
    capstone:"Implement a bounded SPSC/MPMC messaging library and task scheduler, demonstrate linearizability assumptions, sanitizer coverage and controlled scalability measurements.",
    targetRoles:["Concurrent C++ Engineer","Quant/HFT C++ Engineer","Low-Level Systems Engineer"],
  },
  {
    code:"C3",slug:"linux-os-networking-systems-engineers",title:"Linux, Networking & CPU Performance Engineering",
    shortTitle:"Linux & CPU Performance",summary:"Understand how your C++ code interacts with the OS, network and processor.",
    description:"Processes, scheduling, virtual memory, sockets, TCP/UDP, epoll, cache coherence, NUMA, branch prediction, Linux profiling and reproducible tail-latency measurements. Teaches systems mechanisms, not trading business rules.",
    track:"C++ Foundations",level:"Intermediate → Advanced",status:"curriculum",priority:3,icon:"⌘",color:"cyan",
    focus:["Linux syscalls","TCP/UDP & epoll","Caches, NUMA & SIMD","perf & tail latency"],
    modules:["Linux Toolchain, Processes & Runtime","Threads, Scheduling & CPU Affinity","Virtual Memory, Paging & NUMA","System Calls, Files & IPC","TCP, Stream Framing & Backpressure","UDP, Multicast & Packet Recovery","Nonblocking I/O, epoll & Event Loops","Cache Hierarchy, Layout & Coherence","CPU Pipelines, SIMD & Allocators","Profiling, Benchmarking & Network-Server Capstone"],
    required:["core-cpp-interviews"],recommended:[],entryKnowledge:"Modern C++ fundamentals and familiarity with command-line development.",
    owns:["operating-system and network primitives","CPU microarchitecture and memory hierarchy","C++ performance measurement","Linux production debugging"],
    excludes:["C++ lock-free algorithm proof (C2)","market-data semantics and order routing (C4)","GPU device optimization (C5–C6)"],
    capstone:"Build a nonblocking C++ network service and document throughput, p50/p99 latency, failure behavior and perf evidence.",
    targetRoles:["Systems Engineer","HFT Infrastructure Engineer","C++ Performance Engineer"],
  },
  {
    code:"C4",slug:"low-latency-cpp-hft-systems",title:"Quant/HFT C++ & Low-Latency Trading Systems",
    shortTitle:"Quant/HFT C++",summary:"Apply C++ systems expertise to exchange connectivity and the trading execution path.",
    description:"An applied 96-lesson trading specialization: market microstructure, binary exchange feeds, order books, gateways, order entry, pre-trade risk, deterministic replay, operational safety and tail-latency evidence. Early modules reinforce prerequisite concepts using trading-specific laboratories rather than replacing C1–C3.",
    track:"Quant / HFT",level:"Advanced → Expert",status:"recording",priority:4,icon:"⌁",color:"amber",
    focus:["Market microstructure","Market data & order books","Order routing & risk","Deterministic replay"],
    modules:["Trading Latency & Measurement Laboratories","CPU and Memory in the Exchange Data Path","Linux Determinism for Trading Hosts","Exchange Feed Networking & Multicast","Binary Protocol and Order-Book Engineering","Concurrent Trading Pipelines","Market Microstructure, Matching & Execution","Trading Risk, Recovery & Operations","Exchange-to-Order Capstone & Interview Defense"],
    required:["core-cpp-interviews","cpp-concurrency-lockfree-systems","linux-os-networking-systems-engineers"],recommended:[],
    entryKnowledge:"Solid C++, concurrency, Linux networking and basic profiling. Financial markets knowledge starts here.",
    owns:["exchange protocols and market microstructure","order books, order routing and pre-trade risk","trading-specific low-latency system design","deterministic replay, failure recovery and production readiness"],
    excludes:["generic C++ syntax and STL fundamentals (C1)","CUDA/GPU kernel internals (C5–C6)","LLM and AI architecture (C7–C10)"],
    capstone:"Build a deterministic exchange-feed simulator, order book, risk gateway and order-execution path with replay tests and measured p99 latency.",
    targetRoles:["Quant Developer (C++)","HFT Software Engineer","Trading Infrastructure Engineer"],
  },
  {
    code:"C5",slug:"cuda-gpu-programming",title:"CUDA C++ & GPU Programming",
    shortTitle:"CUDA Foundations",summary:"Program GPUs correctly: SIMT execution, memory, synchronization and kernels.",
    description:"NVIDIA GPU execution fundamentals, CUDA C++ toolchains, grids, warps, device memory, host transfers, coalescing, shared memory, basic reductions, streams, events and correctness tools. Advanced GEMM/attention optimization belongs in C6.",
    track:"GPU / CUDA",level:"Beginner GPU → Intermediate",status:"curriculum",priority:5,icon:"▦",color:"green",
    focus:["CUDA kernels & grids","SIMT & warps","Device memory","Correctness & profiling"],
    modules:["CUDA Environment, Execution Model & Grid Geometry","GPU Memory, Host Transfers & Data Layout","Warp Execution, Synchronization & Atomics","Parallel Patterns: Reductions, Scans & Stencils","Streams, Events & Asynchronous Pipelines","CUDA Debugging, Profiling & Foundation Capstone"],
    required:[],recommended:["core-cpp-interviews"],
    entryKnowledge:"C or C++ fundamentals, arrays, pointers and basic linear algebra. GPU access is needed for practical labs.",
    owns:["GPU architecture basics and CUDA C++ correctness","host/device and memory lifecycle","kernel launch and core parallel patterns","foundational GPU profiling and testing"],
    excludes:["architecture-tuned GEMM and attention kernels (C6)","inference schedulers (C7)","multi-GPU communication (C9)"],
    capstone:"Build and test CUDA reduction, scan, histogram and stencil kernels; compare GPU/CPU timings and validate memory correctness.",
    targetRoles:["CUDA C++ Developer","Junior GPU Engineer","Accelerated Computing Engineer"],
  },
  {
    code:"C6",slug:"gpu-kernel-performance-engineering",title:"GPU Kernel Performance Engineering",
    shortTitle:"GPU Kernel Optimization",summary:"Make kernels demonstrably fast with roofline analysis, tiling and numerical discipline.",
    description:"Advanced GPU optimization: arithmetic intensity, memory transactions, register pressure, shared-memory banking, Tensor Cores, CUTLASS, Triton, custom PyTorch operators, fused kernels, numerical precision and reproducible benchmarking. Assumes C5 correctness foundations.",
    track:"GPU / CUDA",level:"Advanced → Expert",status:"curriculum",priority:6,icon:"▥",color:"purple",
    focus:["Roofline & occupancy","Tensor Core GEMM","Triton & CUTLASS","Profiling & kernel fusion"],
    modules:["Roofline Modeling, Memory and Occupancy","Warp Pipelines, Shared Memory & PTX Analysis","Tensor Cores, GEMM & Mixed Precision","Triton, CUTLASS & PyTorch Operators","Kernel Fusion, Attention & Numerical Validation","GPU Optimization Benchmark Capstone"],
    required:["cuda-gpu-programming"],recommended:["linux-os-networking-systems-engineers"],
    entryKnowledge:"Comfort writing correct CUDA kernels, and ability to profile on NVIDIA GPU hardware.",
    owns:["single-GPU kernel optimization and profiling","tiling, vectorization, Tensor Core computation","performance/correctness trade-offs and numerics","benchmark methodology for GPU kernels"],
    excludes:["CUDA introductory syntax (C5)","LLM request scheduling and KV-cache policy (C7)","cross-node networking and NCCL orchestration (C9)"],
    capstone:"Optimize GEMM and attention building blocks with CUDA/Triton, publish correctness, roofline and latency/throughput reports.",
    targetRoles:["GPU Performance Engineer","CUDA Kernel Engineer","AI Accelerator Engineer"],
  },
  {
    code:"C7",slug:"ai-inference-engines",title:"LLM Inference Engines & Model Serving",
    shortTitle:"LLM Inference",summary:"Understand inference runtimes, KV memory, batching and serving SLOs.",
    description:"The internals of production LLM inference: transformer compute path, prefill/decode, KV-cache layouts, paging, continuous batching, speculative decoding, quantization, model serving, TTFT, ITL, throughput and admission control. This course operates beneath the model API, not inside RAG apps.",
    track:"AI Systems",level:"Intermediate → Advanced",status:"curriculum",priority:7,icon:"◈",color:"blue",
    focus:["Prefill & decode","KV cache & batching","Quantization","Inference serving SLOs"],
    modules:["Transformer Compute Path & Inference Metrics","KV Cache, Paged Attention & Memory Budgets","Batching, Scheduling & Speculative Decoding","Quantization, Engine Selection & Deployment","Serving Reliability, Load Testing & Observability","Inference Scheduler Capstone"],
    required:[],recommended:["cuda-gpu-programming","linux-os-networking-systems-engineers"],
    entryKnowledge:"Python, tensor/transformer basics, Linux and networking. CUDA kernel expertise is optional.",
    owns:["model runtime behavior and server scheduling","KV-cache management and batching policies","inference latency, throughput and observability","engine-level design and benchmark trade-offs"],
    excludes:["optimizing individual GPU kernels (C6)","retrieval, prompts and agents (C8)","multi-node GPU orchestration (C9)"],
    capstone:"Build a toy KV-aware request scheduler plus a measured inference service; explain TTFT, inter-token latency, capacity and cost.",
    targetRoles:["AI Inference Engineer","LLM Runtime Engineer","Model Serving Engineer"],
  },
  {
    code:"C8",slug:"production-llm-rag-agents",title:"Production LLM Applications, RAG & Agents",
    shortTitle:"RAG & Agents",summary:"Build reliable products using models, retrieval, tools and evaluation.",
    description:"Model APIs, context and structured outputs, document ingestion, embeddings, hybrid retrieval, reranking, secure RAG, agent workflows, MCP tools, permissions, prompt-injection defense, evaluation, testing and rollout. API-facing application engineering is distinct from inference engine internals.",
    track:"AI Systems",level:"Intermediate → Advanced",status:"curriculum",priority:8,icon:"◎",color:"pink",
    focus:["RAG & evaluation","Agents & tool use","Security & tenancy","Production reliability"],
    modules:["LLM APIs, Context Engineering & Structured Outputs","Retrieval, Chunking, Embeddings & Reranking","RAG Grounding, Evaluation & Access Control","Agents, Tools, MCP & Durable Workflows","Application Security, Evals & Reliability","Production RAG/Agent Platform Capstone"],
    required:[],recommended:["ai-inference-engines"],
    entryKnowledge:"Python or TypeScript backend experience, databases, API design and basic ML/LLM understanding.",
    owns:["LLM application and tool orchestration","RAG ingestion, retrieval and grounded answer evaluation","agent workflows and trust boundaries","application integration and delivery quality"],
    excludes:["GPU kernels (C5–C6)","inference engine request scheduling (C7)","enterprise-wide architecture governance (C10)"],
    capstone:"Deliver an access-controlled, evaluated RAG + tool-using service with traceable answers, human approval flows and regression tests.",
    targetRoles:["LLM Application Engineer","Agentic AI Engineer","AI Platform Developer"],
  },
  {
    code:"C9",slug:"distributed-ai-gpu-infrastructure",title:"Distributed AI Systems & GPU Infrastructure",
    shortTitle:"Distributed AI",summary:"Scale model workloads across GPU nodes while engineering for failure.",
    description:"GPU/CPU topology, NCCL and collectives, tensor/pipeline/data parallelism, cross-node transfers, cluster scheduling, multi-tenant capacity, resilience, inference deployment, observability and recovery. This owns the distributed infrastructure layer rather than single-kernel optimization.",
    track:"AI Systems",level:"Advanced → Expert",status:"curriculum",priority:9,icon:"▧",color:"cyan",
    focus:["Multi-GPU communication","NCCL collectives","Cluster scheduling","Failure & recovery"],
    modules:["Distributed Systems & GPU Topology","NCCL, Collectives & Communication Overlap","Distributed Training and Inference Parallelism","GPU Scheduling, Kubernetes & Resource Isolation","Reliability, Observability & Capacity Planning","Multi-GPU Deployment and Failure Capstone"],
    required:["ai-inference-engines"],recommended:["cuda-gpu-programming","gpu-kernel-performance-engineering"],
    entryKnowledge:"Python, networking, containers, model-serving basics and some GPU concepts.",
    owns:["multi-GPU and multi-node infrastructure","collective communication and parallel execution","GPU capacity, scheduling and cluster observability","resilience under partial failure"],
    excludes:["single-device kernel optimization (C6)","application prompts/RAG (C8)","executive architecture decision records (C10)"],
    capstone:"Deploy and benchmark a multi-GPU serving workload, profile communication, simulate worker failure and document recovery.",
    targetRoles:["Distributed AI Engineer","GPU Infrastructure Engineer","AI Platform SRE"],
  },
  {
    code:"C10",slug:"ai-systems-architecture",title:"AI Systems Architecture & Technical Leadership",
    shortTitle:"AI Architecture",summary:"Design, review and lead secure, cost-aware AI platforms.",
    description:"Architect-level engineering for application and infrastructure decisions: requirements, ML/LLM platform patterns, multi-tenancy, privacy, evaluation governance, model routing, SLOs, observability, security, cost modeling, build-versus-buy, incident leadership and technical communication. This course does not make you a lead without experience; it trains measurable architecture skills.",
    track:"AI Architecture",level:"Senior → Architect",status:"curriculum",priority:10,icon:"◇",color:"amber",
    focus:["AI system design","Security & governance","FinOps & SLOs","Architecture leadership"],
    modules:["Requirements, Quality Attributes & Architecture Review","Model Selection, Build-vs-Buy & Platform Boundaries","Secure Multi-Tenant AI and Governance","Evaluation, SLOs, Observability & FinOps","Distributed Architecture, Resilience & Operations","Technical Leadership, ADRs & Architecture Capstone"],
    required:["production-llm-rag-agents"],recommended:["ai-inference-engines","distributed-ai-gpu-infrastructure"],
    entryKnowledge:"Experienced backend development, Python, cloud architecture, databases, security basics and hands-on AI applications.",
    owns:["system-level AI architecture and design trade-offs","reliability and security governance","cost, evaluation, risk and multi-team operations","technical leadership evidence and architecture communication"],
    excludes:["rebuilding CUDA kernels (C5–C6)","implementing a specific LLM runtime (C7)","application-level tutorial loops (C8)"],
    capstone:"Defend an enterprise multi-tenant AI platform with an ADR pack, threat model, evaluation plan, cost/SLO budget, failure drill and working reference service.",
    targetRoles:["AI Systems Architect","AI Tech Lead","Principal AI Platform Engineer"],
  },
];

export const eliteCoursesBySlug = new Map(eliteCourses.map(course=>[course.slug,course]));
export const eliteTrackNames: EliteTrack[] = ["C++ Foundations","Quant / HFT","GPU / CUDA","AI Systems","AI Architecture"];
/* Published URLs from earlier catalog versions should not turn into 404s. */
export const legacyCourseRedirects: Record<string,string> = {
  "core-cpp-interview-series":"core-cpp-interviews",
  "advanced-modern-cpp":"core-cpp-interviews",
  "stl-patterns-lld-cpp-design":"core-cpp-interviews",
  "concurrency-low-latency-lessons":"cpp-concurrency-lockfree-systems",
  "student-roadmap-lessons":"core-cpp-interviews",
  "third-year-cpp-eda-hft":"core-cpp-interviews",
  "trading-systems-market-microstructure":"low-latency-cpp-hft-systems",
  "ai-systems-engineering":"ai-inference-engines",
  "distributed-systems-ai-backend-infrastructure":"distributed-ai-gpu-infrastructure",
};

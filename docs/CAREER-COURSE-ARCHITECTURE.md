# CppValley — Career-Focused Curriculum Architecture

**Current architecture:** 10 courses → 4 role-specific career paths → coursework → practice → evidence-backed capstones.
**Positioning:** Prepare for demanding **Quant/HFT C++**, **CUDA/GPU performance**, **AI inference & distributed infrastructure**, and **AI systems architecture / technical leadership** roles.

This document supersedes the *seven-course* taxonomy described in `docs/CURRICULUM-2026-ACADEMIC-MAP.md`. The 538-topic owner workbook and the 26-week / 300-LeetCode tracker remain research inputs rather than published video content.

## Role-based course graph

| Target role | Required course sequence | Optional deep dives |
|---|---|---|
| Quant/HFT C++ Engineer | C1 → C2 → C3 → C4 | DSA interview preparation |
| CUDA/GPU Performance Engineer | C1 → C5 → C6 | C3, C7 |
| AI Inference / Infrastructure Engineer | C7 → C9 | C3, C5, C6 |
| AI Systems Architect / Tech Lead | C8 → C7 → C9 → C10 | C3, C5 |

**Paths are role-specific:** a CUDA engineer does not require order book knowledge, and an AI architect does not require a CUDA kernel optimization course. C7/C8 have Python/ML/backend entry requirements rather than silently imposing C++ prerequisites.

## The ten course boundaries

| Code | Course | What it owns | What it explicitly leaves out |
|---|---|---|---|
| C1 | Modern C++ & Software Engineering | Language, object model, RAII, STL, C++17/20/23, API design | Deep thread/OS/GPU/trading behavior |
| C2 | C++ Concurrency, Atomics & Lock-Free Systems | Thread safety, atomic memory model, queues and reclamation | Linux internals and market protocols |
| C3 | Linux, Networking & CPU Performance Engineering | Syscalls, sockets, epoll, caches, NUMA, perf and benchmarking | Trading business logic and GPU kernels |
| C4 | Quant/HFT C++ & Low-Latency Trading Systems | Exchange feeds, order books, matching/routing, risk and replay | Generic C++ or CUDA/AI infrastructure |
| C5 | CUDA C++ & GPU Programming | GPU execution, memory, synchronization, correct kernel patterns | Advanced single-kernel tuning or inference serving |
| C6 | GPU Kernel Performance Engineering | Roofline, Tensor Cores, tiling, Triton/CUTLASS and kernel speed | Inference scheduling and multi-GPU orchestration |
| C7 | LLM Inference Engines & Model Serving | Prefill/decode, KV caches, batching, quantization and serving SLOs | RAG apps, individual CUDA kernel optimization |
| C8 | Production LLM Applications, RAG & Agents | Retrieval, application agents, tool security, evals, product reliability | Model runtime internals and cluster scheduling |
| C9 | Distributed AI Systems & GPU Infrastructure | NCCL, multi-GPU workloads, cluster scheduling, fault recovery | Single-device kernel tuning and RAG application UX |
| C10 | AI Systems Architecture & Technical Leadership | Requirements, architecture decisions, governance, security, SLOs and FinOps | Tutorial-level code or lower-level algorithm implementation |

The course detail page presents **required prerequisites**, **recommended but optional courses**, **scope**, **exclusions**, **capstone**, and **related role paths**. Each career path has ordered courses, interview domains, a portfolio project and reviewable evidence. The course numbering is stable and prerequisite links are checked at build time.

## Separate practice infrastructure

- **Original CPU C++ practice:** 400 curated C++ topics in four categories, of which **31 have runnable original C++17 challenges**. The other 369 remain in editorial review. Existing CPU-judge resources and URLs are preserved.
- **GPU/AI specialty practice:** C5–C10 lessons each have **two original lab briefs** indexed in `/practice-labs` and linked directly from each lesson. They are intentionally marked **Outline** until an appropriate GPU runner, cluster test environment or design-review rubric is operational.
- **Interview practice:** Existing C++ DSA practice and study plans remain available under `/study-plans`, with role-specific links from `/career-paths`. The owner's external 300-question LeetCode tracker is not portrayed as CppValley-owned executable content.
- **Projects:** `/projects` contains four career capstone briefs and one course capstone per course. No completion certificates are claimed.

## Content integrity and publication policy

- The build checks ten unique courses, required prerequisites, four valid career paths, 400 unique C++ topics, runnable C++ fixtures, legal module references, three recommended CPU topics per C++ lesson, and two GPU/AI lab outlines per specialty lesson.
- **Structured lesson outlines do not imply recorded video lectures, finished manuscripts or executable grading.**
- Existing published URLs are preserved where sensible: old Advanced Modern C++ and C++ Design catalog URLs route to the consolidated C1 foundation; old DSA course catalog routes to the DSA study plan. HFT's existing 96 lesson outlines remain intact.
- For CUDA grading, use isolated GPU hardware with strict quotas, numerical reference checks and workload-specific performance protocols. The current C++17 CPU judge must not run CUDA or score architecture cases.
- AI architecture courses teach judgment and evidence. They do not confer seniority or professional leadership experience by themselves.

## Release dependencies

1. Review each source-derived lecture title for technical accuracy, especially standards-version and NVIDIA architecture portability.
2. Supply explanations, code exercises, references, and reviewed expected results before marking lessons Published.
3. Review 2-3 proposed practice tasks per lesson for topical relevance and provide verified harnesses/rubrics before scoring.
4. Complete account authentication, private cases, quotas, queues, billing controls, privacy and monitoring for public judging.
5. Rotate previously exposed Redis tokens before any broad release; verify server-only configuration.
6. Maintain the original CppValley infinity logo and ruby/charcoal brand across all pages.
7. Merge the foundation and overhaul PRs only after production-readiness review. This branch remains a developer preview.

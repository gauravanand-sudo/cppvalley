# HFT / Quant C++ Engineering Interview Readiness

## Scope and honest status

This is an **interview companion** to the **existing C1 → C2 → C3 → C4** Quant/HFT C++ Engineer path. It is **not** a fifth paid HFT course, not a new certificate, not a claim that all 28 projects have starter code or judge fixtures, and not a promise of an offer.

- **C1:** modern C++, ownership, undefined behavior, STL, testing and low-level design.
- **C2:** concurrency, atomics, memory ordering, queues and memory reclamation.
- **C3:** Linux, networking, cache architecture, profiling, timebases, kernel-bypass concepts.
- **C4:** market feeds, order books, risk, OMS, session lifecycle, exchange simulation and deterministic replay.
- **Interview bridge:** timed algorithms, live collaboration, ambiguous requirements, code review, debug-on-sight, operational judgment, interview defense. Do not copy C1–C4 lesson material here.

The original 444 course outlines, 400-topic C++ bank, 31 currently runnable CPU problems, 366 AI/GPU lab briefs and all course prices remain unchanged. HFT interview project briefs are **editorial rubrics**, not runnable or graded challenges. The C++ judge remains off by default for untrusted public code.

## Why the bridge exists

Observed public sources (checked Nov 2026):

1. [Citadel Securities — Experienced Professionals Engineering Interview Process](https://www.citadelsecurities.com/careers/career-perspectives/our-engineering-interview-process/): technical coding screen and an onsite centered on changing one engineering problem through design, implementation, code review and discussion.
2. [Citadel Securities — Internship & New Graduates Engineering Interview Process](https://www.citadelsecurities.com/careers/career-perspectives/internship-and-new-graduates-engineering-interview-process/): emphasis on DSA, programming and explaining problem-solving. Senior format should not be assumed for all applicants.
3. [Jane Street — Preparing for a Software Engineering Interview](https://www.janestreet.com/preparing-for-a-software-engineering-interview/): collaborative, real-language programming and clear reasoning rather than memorized brainteasers.
4. [Jane Street — Software Engineering Mock Interview](https://www.janestreet.com/mock-interview/): timeboxing, communicating and testing code. Its [low-latency engineering role](https://www.janestreet.com/join-jane-street/position/6254435002/) emphasizes architecture, profiling and packet handling; Jane Street says its core systems are primarily OCaml, not C++.
5. [Tower Research — Ask Tower Anything](https://tower-research.com/ask-tower-anything-questions-and-answers-for-quants-engineers-and-other-prospective-employees/): C++ for latency-sensitive execution and market data; Python for research; Rust for parts of infrastructure; architectural and operational trade-offs.
6. [Graviton Research Capital — Software Engineer (C++) listing](https://job-boards.greenhouse.io/gravitonresearchcapital/jobs/4004920002): C++, algorithms, Linux, performance, multi-exchange systems, testing/ownership and communication. A specific senior listing is not a universal interview blueprint.

These sources describe *roles and processes*, not alleged leaked interview questions. Interview scope varies by office, level and team. Qualifying for a high-paying role depends on prior experience, skill, hiring conditions, location and negotiation.

## Suggested progression

| Period | Primary course | Interview practice | Portfolio target |
|---|---|---|---|
| Weeks 1–6 | C1 | C++ DSA and ownership/code-review drills | 2–3 C1 briefs |
| Weeks 7–12 | C2 | concurrency correctness and memory-order defense | 2–3 C2 briefs |
| Weeks 13–18 | C3 | Linux/perf troubleshooting and networking | 2–3 C3 briefs |
| Weeks 19–26 | C4 | HFT state-machine design, risk and changing-spec onsite | integrated tick-to-trade + 2 C4 briefs |

This 26-week plan assumes prior programming experience and serious weekly practice; it is **not** a guaranteed six-month conversion. Advanced readiness takes longer for some candidates.

Do LeetCode in C++ **in parallel**: easy/medium fluency first, then timed and open-ended extensions. Target a balanced mastery of strings, arrays, binary search, heaps, maps, graphs, trees, recursion, DP and complexity. A practical habit is 4–6 focused problem sessions weekly plus at least one spoken mock, emphasizing revisiting mistakes rather than arbitrary problem counts.

## Portfolio requirements

Each selected project should have:
- clearly documented API and edge-case contracts;
- buildable C++ source, unit/negative/property tests where appropriate;
- instrumented failure cases (packet loss, duplicates, race, allocation failure, cancel/fill cross);
- sanitizer/fuzz results for memory-sensitive components; state which hazards sanitizer tools *cannot* prove absent;
- reproducible CPU/perf methodology and meaningful percentile/throughput data **only when measured**;
- a one-page design trade-off and live five-minute walkthrough;
- one tested "new requirement" extension or review exercise.

A good interview-ready portfolio might be **6–9 well-proven projects**, not all 28. The 28 briefs offer choices across roles and levels; do not spend six months making 28 shallow repos.

## Primary capstone

The C4 "Integrated tick-to-trade system" project connects input feed → normalized book → strategy boundary → risk check → order lifecycle → deterministic journal/replay. It is a **simulator with synthetic inputs**, no real exchange connectivity or financial advice.

A strong defense includes correct protocol framing and sequencing, bounded memory/queues, safe risk behavior, realistic timestamp boundaries, p50/p99 with environment details and failure-injection evidence.

## Distinct role expectations

- **Low-latency C++ SWE / HFT infrastructure:** C1–C4 + algorithms, low-level problem solving and interview bridge.
- **Broader SWE at trading firms:** may value collaborative programming, maintainable APIs and production reliability even when it is not a trading hot path.
- **Quant researcher / quantitative trader:** often requires deeper probability, statistics, mathematical modeling and market intuition; an optional math skill lane is provided but **this C++ path is not sufficient** for those jobs.

## Content readiness gate

The prep route is an **editorially curated set of briefs**. Before claiming "runnable", each task needs a dedicated original specification, checked reference implementation, randomized/adversarial fixtures, an isolated execution environment and review. Hardware-sensitive tasks need test infrastructure and honest hardware-dependent measurements. Do not state that the site has 28 implemented starter projects or a verified offer success rate.

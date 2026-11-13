> **Historical editorial plan (seven courses).** This document is preserved to explain how the original spreadsheets were analyzed. The active site now uses ten non-overlapping courses and four career paths. See [Career Course Architecture](CAREER-COURSE-ARCHITECTURE.md) for current course names, module ownership, 444 lesson outlines and 366 GPU/AI lab briefs.

# CppValley — Academic Course Taxonomy and Naming Standard

**Editorial working baseline:** November 2026. The two user-provided planning sheets are curriculum inputs, **not published content**:
- `cppvalley_16_series_deep_interview_academic_curriculum.xlsx`: 16 planned playlists and 538 planned episode topics.
- `hft_cpp_300_leetcode_26_week_master_tracker.xlsx`: 300 distinct LeetCode IDs/URLs across 25 weeks (12/week) plus a revision/mock week.

The website presents **seven courses**, not 16 standalone paid classes. CppValley is an **elite C++ platform**, with only one HFT/trading specialization.

## Official course names

1. **C++ Fundamentals, Memory & STL** — 10 modules, 40 structured lessons.
2. **Data Structures & Algorithms in C++** — 12 modules, 48 structured lessons.
3. **Modern C++: C++17, C++20 & C++23** — 9 modules, 36 structured lessons (including a labeled C++26 preview).
4. **C++ Concurrency, Atomics & Lock-Free Programming** — 9 modules, **64 structured lessons**.
5. **C++ Design Patterns & Low-Level Design** — 4 modules, **30 structured lessons**.
6. **Linux, Networking & C++ Performance Engineering** — 10 modules, 40 structured lessons.
7. **Low-Latency C++ & Trading Systems** — 9 phases, **96 existing structured lessons**, preserved.

**Total:** 354 structured lesson outlines. Each outline links three practice-bank topics. A structured outline is not necessarily a recorded or fully written lecture; publication status must be established independently.

### Why these names?

- **Fundamentals** teaches object lifetime, ownership, containers, STL algorithms and correctness, not advanced standards catalogs.
- **DSA** teaches algorithmic thinking in C++ and links to externally published practice through a separate consented preparation track.
- **Modern C++** teaches language and library evolution with emphasis on standards, feature-test macros, portability and real APIs.
- **Concurrency** combines thread synchronization with atomics, formal memory-order reasoning, lock-free structures and reclamation. These subjects belong together.
- **Design** teaches real C++ APIs, ownership contracts and low-level systems instead of a language-neutral pattern list.
- **Linux / Performance** teaches operating systems, sockets and hardware-level performance as a *general* C++ systems skill, not HFT-only tuning.
- **Low Latency / Trading** is the specialist capstone that reuses skills taught in the other six courses.

## Reconciliation of the 16-series workbook

| Source playlist in workbook | Planned episodes | Where the topics belong |
|---|---:|---|
| Modern C++ Interview Blueprint | 99 | Fundamentals + Modern C++; avoid duplicating the same topic under different names |
| C++ Concurrency & Multithreading for Interviews | 38 | Concurrency (first 38 topic inputs) |
| Modern C++ Design Patterns & LLD | 30 | Design & LLD (30 named topics) |
| Systems C++: Hardware & Performance | 31 | Linux / Networking / Performance (cache, TLB, branch prediction, allocators, perf) |
| Lock-Free C++: High Performance & Atomics | 26 | Concurrency (remaining 26 topic inputs) |
| Production HFT & Trading Systems Design | 32 | Trading course: topic-coverage reference, deduplicate against existing 96 lessons |
| C++ Interview Traps (Shorts) | 24 | Short educational clips associated with related lessons; **not an eighth course** |
| 5 AI playlists, 2 GPU playlists, 2 architecture playlists | 258 | Keep outside the seven-course elite C++ catalog; optional future channels |

The 16 planned series sum to 538 topics; the seven C++-adjacent series sum to 280, including 24 Shorts. These are **source topics and backlog references**, not 280 finished videos.

## DSA plan from the second workbook

The 300-question sheet contains **300 unique external LeetCode references**, not 300 original CppValley questions or CppValley-judge test sets. It is a preparation playlist and should be attributed and linked externally. Distribution in the supplied sheet: **38 Easy, 194 Medium, 68 Hard**. No claim is made that these exact questions were asked by named trading firms.

Pattern progression:
1. Arrays and hash maps
2. Prefix sums and intervals
3. Two pointers and sliding windows
4. Monotonic windows and deques
5. Binary search invariants
6. Binary search on answers
7. Heaps / top-K
8. Streaming and intervals
9. Stacks and parsing
10. Linked lists
11–12. Data-structure design
13–14. Binary trees and BSTs
15–16. Graphs and shortest paths
17–19. Dynamic programming
20. Greedy scheduling
21. Backtracking and tries
22. Bit manipulation
23. Strings and parsing
24. Segment trees and range queries
25. Concurrency and difficult mixed challenges
26. No new questions: mocks, review and self-assessment.

The CppValley DSA course condenses these 25 study themes into 12 instructional modules. A future **26-week DSA 300 study plan** should link to the original URLs and keep separate progress for external problems. It must not display LeetCode solutions as judge-ready in CppValley.

## Topic and lesson naming standards

- One teachable idea per title: **"Condition Variables, Predicates and Spurious Wakeups"**, not generic "Multithreading Part 6."
- Name the actual interface or contract: **"std::vector Growth, Capacity and Iterator Invalidation"**.
- Include correctness issues when central: **"CAS Retry Loops and Failure Ordering"**.
- Avoid claiming language support before verification: **"C++26 Preview: Contracts, Reflection and SIMD"**.
- Distinguish fundamentals from advanced design, and generic C++ performance from HFT.
- Keep course URLs stable even when course marketing names change.
- If a course lesson title or module title is rewritten in a later release, add a redirect from any previously published slug.
- Attach two or three *editorially relevant* practice problems per lesson. The current automatic recommendation algorithm has not been individually reviewed for relevance.
- Mark the 369 remaining incomplete CppValley practice topics **in review** until statements, reference implementations and judge fixtures have been validated.

## Source usage and publishing gate

Do not present the workbook references, objectives or assignments as production-ready lecture manuscripts. Each published lesson still requires source-backed explanations, executable examples, a correctness review, learning outcomes, meaningful lab directions, and verified sample/problem associations. Review the C++ Standard, the C++ Core Guidelines, and cppreference coverage appropriate to the supported compiler standard. The built-in pilot judge currently targets C++17, so C++20/23 material needs a standards-aware compiler/testing plan before executable assessments can claim coverage.

No names or actual material for the non-C++ source playlists have been deleted from the original spreadsheet; they are simply not promoted as paid flagship courses on CppValley.

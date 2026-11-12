# CppValley Practice — early access

This feature is implemented **inside the existing Next.js application** at:

- \`/practice\` — searchable catalog with category and difficulty filters
- \`/practice/[slug]\` — responsive split-screen statement + C++ editor
- \`/api/practice/run\` — opt-in server-side adapter for an isolated Judge0 service

## Current features

- Eight original seed problems in HFT Systems, Concurrency, Core C++, and Design Patterns.
- Each published problem has a full statement, input/output contract, constraints, starter code, at least one sample, and three server-side judge fixtures.
- Desktop split screen with a description-width slider; mobile stacked layout.
- Editor supports local draft persistence, Tab indentation, reset, and synchronized line numbers.
- Run/Submit controls call a server endpoint; it explicitly reports unavailability until an isolated judge is configured.
- On successful judged submission, solved state is stored locally in this browser.
- Problem metadata and hidden tests are separate files; never expose server fixture files in client bundles.
- Practice catalog is linked in global navigation, footer, and sitemap.

## Judge: disabled by default

**Do not enable public C++ execution in production without authentication, distributed rate limits, quotas, monitoring, and a dedicated isolated runner.**

Provision a patched, independently hosted Judge0 deployment and set the following **server-side** environment variables:

- \`CPPVALLEY_PRACTICE_JUDGE_ENABLED=true\`
- \`JUDGE0_BASE_URL=https://your-trusted-judge.example\`
- \`JUDGE0_CPP17_LANGUAGE_ID=54\` (verify your installed language IDs: not guaranteed to be 54)
- \`JUDGE0_AUTH_TOKEN=...\` if the judge instance requires it

The API creates a submission for each fixture and polls the judge, never compiling arbitrary code inside the Next.js/Vercel process. At present, the feature is **a development integration**, not a public-grade judge. It has no distributed rate limiter or user authentication. It should remain disabled for production until those are built.

A proper scaled submission service should also use a durable queue, separate unprivileged sandbox workers or microVMs, output caps, CPU/memory quotas, no network access, per-user cost quotas, persisted verdicts, repeatable golden tests, and abuse controls. Concurrency grading needs repeatable stress schedules and sanitizer jobs; a handful of passing stdin/stdout tests is insufficient proof of thread safety.

## Problem bank editorial pipeline

The content target is **at least 100 verified problems per track**, distributed across Easy, Medium, and Hard, for **400+** published problems total. This is a publishing target, not a fabricated inventory.

Recommended starting balance per track: 25 Easy, 45 Medium, 30 Hard. Later subtopics may justify more.

- **Core C++:** lifetime/RAII, STL, move semantics, polymorphism, templates, allocators, memory, object model, parsing, debugging.
- **Concurrency:** thread ownership, mutex/deadlocks, condition variables, futures, atomics, memory ordering, SPSC/MPMC queues, thread pools, lock-free memory reclamation, verification.
- **HFT Systems:** market data parsing, sequence gaps, order books, price-time matching, FIX-style messages, risk limits, event replay, TCP/UDP, low-latency data structures, benchmarking.
- **Design Patterns:** strategy, observer, factory, state, command, builder, adapter, decorator, object pool, ownership-aware architecture.

Every proposed problem should pass this editorial checklist **before** becoming available in the catalog:

1. Original, accurate prompt and precise I/O or class interface.
2. Realistic constraints and a documented difficulty rationale.
3. Working starter code and an independent reference solution.
4. Verified public and hidden tests, including edge cases.
5. Complexity analysis, solution explanation, and reviewer approval.
6. Relevant tags; company tags only when supported by a credible source, otherwise label as *preparation relevance*.
7. For concurrency problems, separate functional tests from sanitizer/stress tests.
8. For latency problems, benchmark on controlled dedicated hardware; never use arbitrary cloud timing as an HFT ranking.

### Curated candidate backlogs (400 ideas)

These are **editorial candidates**, not publicly runnable questions:

- [100 HFT Systems ideas](practice-backlog/hft-systems.md)
- [100 Concurrency ideas](practice-backlog/concurrency.md)
- [100 Core C++ ideas](practice-backlog/core-cpp.md)
- [100 Design Patterns / LLD ideas](practice-backlog/design-patterns.md)

Each list is organized as **25 Easy, 45 Medium, and 30 Hard** problems. Expand the verified, executable bank iteratively.

## Next engineering milestones

1. Integrate a production code editor (Monaco or CodeMirror) with syntax highlighting, C++ completion, themes, and multi-file templates.
2. Add authentication, persistence of submissions/solutions/profiles, and a database-backed problem CMS.
3. Build a secure, quota-enforced grading service and monitored execution queue.
4. Add company-preparation filters, curated tracks, public profiles, and verified leaderboards.
5. Expand the verified content bank in reviewed batches rather than bulk-publishing inaccurate generated prompts.

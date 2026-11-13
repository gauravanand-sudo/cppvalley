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
- Run/Submit controls call a guarded server endpoint that explicitly reports unavailability until an isolated judge is configured.
- On successful judged submission, solved state is stored locally in this browser.
- Problem metadata and hidden tests are separate files; never expose server fixture files in client bundles.
- Practice catalog is linked in global navigation, footer, and sitemap.

## Step 1: Monaco editor integration

- `MonacoCppEditor.tsx` adds C++ token highlighting, line numbers, bracket matching, editor suggestions, and accessible fallback to a text area.
- Keyboard shortcuts: **Ctrl/Cmd+Enter** runs the sample; **Ctrl/Cmd+Shift+Enter** submits the solution; **Ctrl/Cmd+S** keeps editor focus (drafts are auto-saved).
- The editor toolbar controls light/dark themes and 12–20 px font sizes; preferences persist locally.
- Existing local draft persistence, sample case tabs, and split pane remain intact.
- The Monaco 0.52.2 AMD assets and workers are **loaded from a version-pinned Cloudflare CDN** so this step does not introduce npm dependency or lockfile changes. The app remains dependent on that external CDN while advanced editing is active; blocked CDN/network requests transparently leave a working textarea.
- **Production hardening:** self-host the editor assets and worker scripts, implement a strict CSP, verify accessibility and responsive behavior in real browsers, and consider bundled Monaco/CodeMirror for long-term maintenance.
- Monaco only edits text. **No code runs in the browser** or in the Next.js application: the isolated backend judge is a separate future milestone.

## Step 2: isolated C++ judge integration

The Run/Submit API now includes an asynchronous Judge0 adapter, sample and custom-input execution, compiler/runtime diagnostics, and client-side verdict display.

**The execution feature remains OFF by default** until you provision and approve an isolated judge, secure pilot key, and shared Redis quota service. It is not yet a publicly usable online judge.

The **preferred native backend** and private-preview activation instructions are in [Vercel Sandbox compiler setup](practice-vercel-sandbox.md). A separate [Judge0 integration guide](practice-judge-setup.md) remains available if you choose to maintain an external judge. Do not enable either backend in Production.

Important: the existing validation fixtures are excluded from browser bundles, but CppValley uses a public GitHub repository. Until test fixtures move to private storage, they cannot be considered secret anti-cheating tests.

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

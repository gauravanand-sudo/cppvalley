# CppValley Elite C++ — Release Readiness

**Release branch:** `feature/elite-cpp-platform-overhaul` (draft PR #10; base: `feature/practice-workspace-mvp`).
**Production release:** NOT APPROVED. Treat this as a developer / editorial preview until all hard blockers pass.

## Implemented, verified in the feature branch

- **Seven flagship course catalogs:** Core C++ & STL, DSA in C++, Concurrency, HFT Systems, C++ Design Patterns / LLD, Linux / Networking, and Advanced Modern C++.
- **354 structured lesson outlines:** including the pre-existing 96-lesson HFT curriculum, 64 combined concurrency/lock-free lessons and 30 dedicated C++ design lessons. Every lesson links to three entries in the unified practice bank. These are *not* 326 completed video tutorials.
- **400 curated topic cards:** exactly 100 each in Core C++, Concurrency, Design Patterns, HFT Systems. The bank tracks publication status independently.
- **31 runnable original coding problems:** 8 previously present + 23 new input/output problems. The remaining **369** topics are **in review** with no implied Accepted verdict.
- 69 new validation fixtures checked against an independent oracle; existing seed fixtures are present. All runnable problems have at least three server fixtures, sample(s), constraints, and C++17 code starters.
- Main routes: `/problems`, `/study-plans`, `/courses`, `/courses/[slug]/lessons/[lesson]`, `/videos`, `/blog`, `/login`, `/dashboard`, and opt-in `/u/[username]`.
- Compact split-screen coding view: syntax-highlighted Monaco editor, keyboard shortcuts, Run/Submit, sample/custom input, resizable description and console, editor focus mode, light/dark theme, draft persistence, problem prev/next and lesson cross-links.
- `/practice` now permanently redirects to `/problems`; the original published practice slugs also redirect to canonical problem URLs.
- Content graph assertion runs as part of Next.js sitemap generation. Broken lesson links, invalid fixture availability or wrong core counts cause a build error.
- Protected preview compiler uses isolated, network-denied Vercel Sandbox instances, atomic Redis pilot quota, and restricted Preview settings. **Production code execution is disabled.**

## Hard blockers before a public production launch

- [ ] **Publish and verify all 400 runnable tasks, or publicly describe a staged rollout**. A list of 400 titles is not 400 completed coding problems. Every task requires independently reviewed statement, reference solution, test generator, hidden cases, performance constraints and editorial.
- [ ] **Rotate the previously exposed Upstash Redis write and read-only tokens** in Upstash and Vercel. Do not paste replacements into chat or Git. Audit any sessions or unusual usage.
- [ ] **Apply and review** `supabase/migrations/20261112_cppvalley_practice.sql` in the intended Supabase project, verify RLS, trigger behavior and indexes. Migration has not been applied by this PR.
- [ ] Configure `SUPABASE_SERVICE_ROLE_KEY` in Vercel securely **server-side only** if authenticated submission persistence is desired; ensure it is not in `NEXT_PUBLIC_*`. Validate Supabase Auth allowlists, email confirmation/recovery and callback URLs in preview.
- [ ] Move competitive hidden tests from the **public GitHub repository** into private test storage, with a full suite of randomized/edge-case inputs and reviewed reference solutions.
- [ ] Replace private Preview SSO pilot judging with **real site-user authentication**, per-user budgets, durable queues, central submission history, abuse detection, monitoring and strict regional sandbox isolation.
- [ ] Validate subprocess cleanup, source output caps, memory/CPU accounting, sanitizer/stress test harnesses for actual multithreaded C++ tasks and failure isolation under load.
- [ ] Add Vercel budget alerts and monitor execution costs before removing preview rate limits.
- [ ] Verify cross-device accepted verdict persistence against Supabase RLS and rejected client-forged Accepted rows.
- [ ] Complete copyrighted-content review for all lessons, solutions, illustrations and branding. Use original CppValley design and materials; avoid copying LeetCode assets, layouts pixel-for-pixel, and question text.
- [ ] Audit accessibility, mobile UX, navigation, security headers, content and canonical redirects, and confirm existing blog/video URLs are preserved.
- [ ] Add CI quality gates: TypeScript compile, ESLint, unit tests for reference solutions, judge integration tests, production-preview smoke tests and security checks.

## Course availability and monetization

Only label completed materials as published. Both flagship courses are shown as in development; other course lesson pages are structured outlines, not full recorded lessons. Do not accept paid orders or promise course access until verified entitlements, complete checkout/webhooks, content delivery, refunds, and payment-policy requirements exist. Course pricing is a **hypothesis** until validated.

## What to test on the current preview

1. Visit `/problems`, filter by Core C++, Concurrency, HFT Systems and Design Patterns; verify each shows exactly 100 topics.
2. Filter by `Runnable`; verify 31 actual challenges. Open a newly published task and compare sample input/output.
3. Visit each of the seven course pages, open Lesson 01, and verify exactly three linked practice topics.
4. Follow a practice problem link back into its related course lesson.
5. Check the responsive problem workspace in desktop and mobile sizes. Verify editor focus, split ratio, console size, saved drafts, keyboard shortcuts and reset.
6. Test local progress with browser storage on/off; verify Supabase-connected progress only after DB migration.
7. Register a user in preview, confirm email flow, and test public-profile opt-in and RLS privacy once the database migration is installed.
8. Validate Preview judge actual Run/Submit behavior, including invalid C++, TLE, wrong answer, large input, retry and rate limits.
9. Confirm production `cppvalley.com` remains unchanged until reviewed PRs are merged.

## Rollout plan

1. Merge PR #9 (sandbox/Monaco foundation) only after tests; then merge PR #10 (editor-first platform).
2. Release a **transparent public beta** with the runnable subset and openly labeled upcoming tasks, if desired.
3. Scale reviewed problems toward all 400; enable public submissions only after user auth, private fixtures and per-user quota work.
4. Activate courses, payments, profiles, company preparation and rated contests progressively as corresponding features become real.

The product should emphasize **elite C++ mastery** across STL, algorithms, object lifetime, templates, concurrency, systems engineering and low-latency/HFT—not just trading.

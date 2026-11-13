# CppValley — Production Readiness Checklist

**Release branch:** `feature/elite-cpp-platform-overhaul` (draft PR #10, based on the practice compiler PR #9).
**Release approval:** NOT GRANTED. This is a developer preview, not a public production release.

## Verified implementation goals

- Ten separate courses (C1–C10), four role-based career paths, explicit course prerequisites, ownership boundaries, exclusions and capstones. See `docs/CAREER-COURSE-ARCHITECTURE.md`.
- Structured lesson outlines linked in the courses and four career paths. Lesson outline != complete recorded/verified lecture.
- Original 400 curated CPU C++ topics still preserved: 31 runnable with server fixtures, 369 in editorial review.
- Two additional draft GPU/AI practice briefs per specialty lesson, available via `/practice-labs`. They are NOT executable in the CPU-only C++17 judge.
- Four career capstones plus one capstone brief per course, available via `/projects`.
- Original CppValley infinity logo and ruby/charcoal styling preserved. User/login and draft API paths are unchanged.
- A content-integrity assertion during the Next.js sitemap build validates course count, prerequisites, career links, topic references and judged fixtures.

## Mandatory gates before production launch

### Security / account and judging
- [ ] Rotate previously exposed Upstash Redis REST read-only and write tokens, update all Vercel secrets, investigate unusual usage and test failure-closed quotas.
- [ ] Review and apply `supabase/migrations/20261112_cppvalley_practice.sql` to the intended Supabase database, then verify RLS policies, signup/login, profile opt-in and submission persistence from separate accounts.
- [ ] Provide real account-based judging, per-user and global budgets, quotas, central job queues, abuse controls and audit logs. Do not enable a shared preview-only access gate in production.
- [ ] Store genuine anti-cheating judge fixtures outside the public GitHub repository. Review randomized/edge-case correctness, reference implementations, resource caps and stderr handling.
- [ ] Verify isolated GPU-backed sandboxes for CUDA kernel tasks before permitting GPU submissions; implement numerics/reference tests and resource/cost controls.
- [ ] Establish human or well-specified rubric reviews for LLM platform and architecture cases; don't invent automated Accepted verdicts.
- [ ] Set Vercel/GPU usage alerts, error dashboards and incident policies. Audit legal, licensing and personal-data obligations.

### Course content and publishing
- [ ] Write real lesson explanations, code samples, exercises, references and proofs; outline counts are not completion claims.
- [ ] Individually review automatic related-problem recommendations for topical relevance, especially Linux/HFT CPU practice cross-links.
- [ ] Create verified exercise harnesses and evaluation criteria before flipping status from Outline to Runnable.
- [ ] Review C++17/20/23 feature compatibility and CUDA toolkit/compute capability requirements for every GPU lab.
- [ ] Publish video/notes only with verified availability. Do not accept course payments without payment, access, receipts, refunds and support workflows.
- [ ] Convert the owner-uploaded 300-question external LeetCode tracker into attributed study-plan links, not copied problem statements or a fake CppValley judge bank.

### Website and release QA
- [ ] Validate all ten course pages and modules, four career paths and every lesson link in desktop/mobile browsers.
- [ ] Smoke-test Monaco editing, Run, Submit, wrong answers, compilation errors, timeouts, invalid auth and Redis quota limits on a protected preview.
- [ ] Confirm old course URLs redirect correctly and original articles and video links remain live.
- [ ] Review responsive navigation at tablet/mobile widths, keyboard controls, screen-reader labels, OG previews, sitemap and canonical URLs.
- [ ] Add automated end-to-end tests for onboarding, account progress, profile privacy and course lesson navigation.
- [ ] Complete threat modeling and operational security review; then only merge PR #9 followed by PR #10 after review.

## Release strategy

1. **Editorial preview:** ten career-scoped course outlines, legacy CPU bank, specialty lab briefs and role capstones. No public grading claims.
2. **Transparent C++ beta:** real account sessions, 31+ verified C++ challenges and working submissions with safe quotas, publicly indicating future problem availability.
3. **GPU/AI learning release:** completed CUDA and AI instructional labs with specialized GPU/cluster/rubric evaluation.
4. **Career portfolio release:** evaluated projects and interview assessments with verified human or automated criteria, plus operational maturity.

This release is designed for **Quant/HFT C++**, **CUDA/GPU performance**, **AI inference infrastructure**, and **AI systems architecture / technical leadership**. It does not claim that taking a course guarantees hiring or seniority.

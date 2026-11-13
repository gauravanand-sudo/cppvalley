# CppValley Practice — private C++ judge pilot (Step 2)

**Status:** Integration code is present, but runtime execution is **OFF** until a hardened third-party or separately hosted Judge0 service and an Upstash Redis REST database are configured. Do not merge or enable for public users before review.

## Architecture

Browser Monaco editor → Next.js POST \`/api/practice/run\` → pilot bearer-key check → atomic Redis quota → authenticated HTTPS Judge0 API → isolated worker compiles and executes C++ → poll verdict → return summarized results to browser.

Next.js/Vercel must **never** run \`g++\`, \`clang++\`, shell commands or user-provided executables.

## Prerequisites

1. Choose a managed Judge0 service or provision Judge0 on independent dedicated infrastructure. Self-host only with a recent **patched** release (Judge0 v1.13.1 or newer patched release; review current security advisories), strong API authentication, restricted inbound access, independent network boundaries, and sandbox networking disabled.
2. Keep the code execution machine **separate** from the application, database, and core business infrastructure. Do not expose Redis or PostgreSQL publicly.
3. Confirm your runner supports C++17 and query \`GET /languages\` to identify the actual C++17 language ID. Judge0 language IDs can vary by deployment; never assume 54 without checking.
4. Create an Upstash Redis database with a **server-side Standard REST token**, to enforce a shared execution quota across Vercel serverless instances.
5. Generate a long random pilot access key with a local cryptographic random generator. Do not share it in chat, URLs, source control, or public docs.
6. Add all environment variables to your **Vercel Preview environment only** (not Production), then redeploy that preview.

| Server-only variable | Purpose |
|---|---|
| \`CPPVALLEY_PRACTICE_JUDGE_ENABLED=true\` | Explicit opt-in; unset / false disables |
| \`CPPVALLEY_PRACTICE_PREVIEW_KEY\` | Private pilot key, 32+ characters; entered in the preview UI, never hardcoded |
| \`JUDGE0_BASE_URL\` | HTTPS base URL of trusted patched Judge0, e.g. \`https://judge.example.com\` |
| \`JUDGE0_ALLOWED_HOSTNAME\` | Exact Judge0 hostname, e.g. \`judge.example.com\` |
| \`JUDGE0_AUTH_TOKEN\` | Judge0 \`X-Auth-Token\`; required |
| \`JUDGE0_CPP17_LANGUAGE_ID\` | Verified language ID from that particular Judge0 host |
| \`UPSTASH_REDIS_REST_URL\` | HTTPS REST endpoint for shared quota |
| \`UPSTASH_REDIS_REST_TOKEN\` | Server-side Upstash Redis REST Standard token |

The endpoint refuses to execute code if **any required item is missing**. Do not use \`NEXT_PUBLIC_\` for secrets. There is no production account authentication yet.

### Pilot guardrails

- Every POST requires a bearer pilot key, checked in constant time.
- An atomic Redis Lua script caps the entire pilot at **12 executions/minute**, shared across all instances. It fails closed if Redis is offline.
- Source length at most 25,000 characters; custom stdin at most 8,000 characters.
- Public Run executes up to 5 statement examples; Submit executes up to 10 server fixtures, stopping at the first failure.
- Judge0 jobs are asynchronously created with \`wait=false\`, then polled.
- Each runner execution requests a 2s CPU limit, 6s wall limit, 128 MiB memory address-space limit, 64 KiB file limit, 16 process/thread limit and \`enable_network=false\`. The **Judge0 administrator must also enforce maximums**.
- Sample/custom runs show stdout, stderr, compiler output, time and memory. Submissions never return hidden-test input or expected output. Compiler diagnostics are visible.
- Browser workspace stores local drafts only; acceptance is locally marked in the current browser. There is no user account or durable leaderboard yet.

**Security caution:** This is a guarded pilot, *not* a finished public online judge. Shared pilot-key authentication is unsuitable for public signup. Before public launch add per-account authentication, per-user quotas, abuse detection, a durable submission queue, controlled worker concurrency, proper private test storage, audit logs, error monitoring, and process/VM-level isolation audits. It is essential to review Judge0's known 2024 sandbox-escape advisories and any later fixes.

### Test before use

- Execute \`node scripts/check-practice-judge.mjs\` **from a trusted local environment** after configuring the Judge0 environment. This tests actual remote compilation with the configured host, not the Next.js UI.
- In the preview, visit \`/practice/trade-notional\`. The status should show *Private C++ judge pilot*. Enter the pilot key in the password field.
- Run a correct C++17 program against public samples and verify stdout.
- Run a deliberate syntax error and confirm compilation diagnostics.
- Use custom stdin and verify stdout is returned without a correctness comparison.
- Submit a known correct solution; verify acceptance is based on all configured server fixtures.
- Check invalid keys, large source bodies, and rate limiting return 401/413/429 as appropriate.
- Confirm none of the Judge0 credentials appear in client-side JS or browser network logs.

### Test-data limitation

The eight starter problems' server fixtures are intentionally kept out of client bundles, **but this is a public GitHub repository**. Anyone who reads the repository can inspect \`src/data/practice-judge-cases.ts\`; those examples are therefore **not secret anti-cheating tests**. Store genuine hidden judge fixtures in a private test service or protected database before public competitions or leaderboards.

### Future improvements

- User account sessions instead of shared pilot keys (Step 3).
- Database-backed submission records and immutable verdicts (Step 4).
- Durable queue, retry and workload isolation policies; class-interface test harnesses for C++ design questions.
- Sanitizer/stress schedules for concurrency; dedicated, reproducible benchmark hardware for HFT latency challenges.

Official references:
- https://github.com/judge0/judge0
- https://github.com/judge0/judge0/security
- https://github.com/judge0/judge0/blob/master/docs/api/submissions/create_a_submission.md
- https://upstash.com/docs/redis/features/restapi

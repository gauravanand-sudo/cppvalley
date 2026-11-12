# CppValley Practice — Vercel Sandbox compiler setup

**Preferred pilot backend:** Vercel Sandbox (GCC, C++17), not an always-on Judge0 server.

## What has been verified

On November 12, 2026 a temporary Vercel Sandbox running the managed Arch image had GCC 16.2.1 available. A C++17 source file compiled successfully, and the program accepted input "2 4" and printed "6". The VM's outbound network policy was deny-all. The sandbox session was stopped after this test.

The Next.js implementation now imports the version-pinned Vercel Sandbox SDK and uses a backend selector so either Vercel Sandbox or external Judge0 can process requests.

This proves the **isolated compiler** works. It does not yet prove the **browser → secured API → sandbox** request flow with live credentials.

## Architecture

Monaco browser editor → Next.js /api/practice/run → pilot key authentication → Redis quota → Vercel Sandbox (one temporary Firecracker microVM) → compile once → run tests → JSON verdicts → browser.

The C++ program runs inside a dedicated ephemeral VM. No user C++ is executed inside Vercel Functions. The VM uses a pinned Arch image digest, 1 vCPU, deny-all outbound networking, an overall 40-second session timeout, compiler limits, execution timeouts, memory limits, a process limit, and output file-size limits. The sandbox is stopped in a finally block.

## Activate the private preview pilot

The feature is OFF by default, and production deployments are not allowed to enable it.

1. Keep the feature branch on a Vercel preview deployment with Vercel Authentication enabled.
2. Connect an Upstash Redis REST database to the project, preferably only for the Preview environment. Review pricing and usage alerts before doing so.
3. Generate a unique, random private pilot key (at least 32 characters).
4. In Vercel Project Settings → Environment Variables, add the following server-only variables scoped to Preview, preferably restricted to the feature/practice-workspace-mvp branch:

| Variable | Required value |
|---|---|
| CPPVALLEY_PRACTICE_JUDGE_ENABLED | true |
| CPPVALLEY_PRACTICE_JUDGE_BACKEND | sandbox |
| CPPVALLEY_PRACTICE_PREVIEW_KEY | Random secret (at least 32 characters) |
| UPSTASH_REDIS_REST_URL | HTTPS REST base URL |
| UPSTASH_REDIS_REST_TOKEN | Private REST token |

No Judge0 credentials are required for the Sandbox backend. Vercel Functions use platform OIDC authentication to create a Sandbox; the token is not injected into the sandbox.

**Never expose the pilot key or Redis token through NEXT_PUBLIC variables, GitHub, frontend code, or chat.**

The API remains disabled if a required setting is absent and fails closed if Redis is unavailable. Its shared atomic rate limit is 12 requests per minute. The private pilot key is entered into the editor UI and kept only in React component state.

## Browser smoke test

1. Open the protected preview problem /practice/trade-notional.
2. Confirm the status says Private C++ judge pilot, then enter your private access key.
3. Run a correct C++17 program. Confirm public sample test output and pass/fail status.
4. Run with custom input and confirm stdout is shown independently of expected results.
5. Introduce a syntax error; confirm GCC compilation errors appear.
6. Submit a correct program; confirm all server-side validation cases pass and the solved status updates.
7. Submit incorrect code, test a deliberate infinite loop, use a wrong key, and exceed quotas. Verify rejection or timeout verdicts.
8. Confirm no application secrets, hidden tests, or credentials are sent to the VM or browser.

## Known limitations and mandatory public-launch work

The current tests are not hidden from repository readers because the source repository is public. Do not use them for competitive leaderboards. Private tests must move to a protected backend before public launch.

For a public service, add real user authentication, per-user quotas, durable submission records and a queue, reviewable audit logs, isolated per-test execution when needed, better concurrency-specific testing, and operational budget controls. Running C++17 code with correct stdout is not evidence that a lock-free algorithm is data-race-free or performs well under load.

**Status:** The coding integration is pushed, and the Vercel preview builds successfully. Real browser-to-compiler execution still requires the Preview secrets and Redis connection above. Do not label the end-to-end flow verified before running the browser smoke test.

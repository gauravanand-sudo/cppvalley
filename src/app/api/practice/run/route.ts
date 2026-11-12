import { NextRequest, NextResponse } from "next/server";
import { getPracticeProblem } from "@/data/practice";
import { practiceJudgeCases } from "@/data/practice-judge-cases";
import {
  consumePilotQuota,
  pilotJudgeConfig,
  validPreviewKey,
} from "@/lib/practice/judge-access";
import { executeJudge0, type JudgeVerdict } from "@/lib/practice/judge0";
import { executeSandboxCases } from "@/lib/practice/sandbox-judge";

export const runtime = "nodejs";
export const maxDuration = 45;

type JudgeMode = "run" | "submit";
type JudgeRequest = { slug: string; source: string; mode: JudgeMode; customInput?: string };
type InputCase = { input: string; expected?: string };

function json(payload: Record<string, unknown>, status = 200, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

export async function GET() {
  const config = pilotJudgeConfig();
  const enabled = config !== null;
  return json({
    enabled,
    authRequired: config?.authMode === "pilot-key",
    message: !enabled
      ? "Real C++ execution is not configured. Code editing and local drafts remain available."
      : config.authMode === "vercel-preview"
        ? "Private C++ judge pilot is available to authenticated members of this protected Vercel preview."
        : "Private C++ judge pilot is available. Enter your temporary access key to run code.",
  });
}

export async function POST(request: NextRequest) {
  const config = pilotJudgeConfig();
  if (!config) {
    return json({
      message: "The isolated C++ judge is not configured or is disabled. Drafts are saved locally.",
      code: "JUDGE_DISABLED",
    }, 503);
  }

  // Pilot credentials are never accepted for production deployments.
  // A protected-preview mode is permitted only on the exact feature branch,
  // under Vercel's SSO-protected *.vercel.app hostname.
  if (config.authMode === "pilot-key") {
    if (!validPreviewKey(request.headers.get("authorization"), config.previewKey)) {
      return json({ message: "A valid pilot access key is required to execute code.", code: "UNAUTHORIZED" }, 401);
    }
  } else {
    const hostname = request.nextUrl.hostname.toLowerCase();
    if (!hostname.endsWith(".vercel.app") || hostname === "vercel.app" ||
        (process.env.VERCEL_GIT_COMMIT_REF &&
         process.env.VERCEL_GIT_COMMIT_REF !== "feature/practice-workspace-mvp")) {
      return json({
        message: "C++ execution is restricted to the authenticated feature-branch preview.",
        code: "PREVIEW_ONLY",
      }, 403);
    }
  }

  // Defence in depth: browser requests must originate from this deployment.
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return json({ message: "Cross-site judge requests are not allowed.", code: "ORIGIN_MISMATCH" }, 403);
  }

  // Atomic, shared quota is checked BEFORE processing source or calling the
  // runner. An outage fails closed, never bypassing the quota.
  try {
    if (!(await consumePilotQuota(config))) {
      return json({
        message: "The private judge has reached its shared execution quota. Try again after a minute.",
        code: "RATE_LIMITED",
      }, 429, { "Retry-After": "60" });
    }
  } catch {
    return json({
      message: "The shared execution quota service is unavailable; code execution is temporarily paused.",
      code: "QUOTA_UNAVAILABLE",
    }, 503);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 40000) return json({ message: "Submission is too large.", code: "TOO_LARGE" }, 413);

  let value: Partial<JudgeRequest>;
  try {
    const body: unknown = await request.json();
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      return json({ message: "Invalid JSON body." }, 400);
    }
    value = body as Partial<JudgeRequest>;
  } catch {
    return json({ message: "Invalid JSON body." }, 400);
  }

  if (
    typeof value.slug !== "string" ||
    typeof value.source !== "string" ||
    (value.mode !== "run" && value.mode !== "submit")
  ) {
    return json({ message: "Expected a problem, C++ source, and run/submit mode." }, 400);
  }
  if (value.source.length < 1 || value.source.length > 25000) {
    return json({ message: "C++ source must be between 1 and 25,000 characters." }, 400);
  }
  if (
    value.customInput !== undefined &&
    (typeof value.customInput !== "string" || value.customInput.length > 8000)
  ) {
    return json({ message: "Custom input must be at most 8,000 characters." }, 400);
  }
  if (value.mode === "submit" && value.customInput !== undefined) {
    return json({ message: "Custom input is only supported for Run." }, 400);
  }

  const problem = getPracticeProblem(value.slug);
  if (!problem) return json({ message: "Problem not found." }, 404);

  const custom = value.mode === "run" && value.customInput !== undefined;
  const cases: InputCase[] = custom
    ? [{ input: value.customInput as string }]
    : value.mode === "run"
      ? problem.examples.slice(0, 5).map(example => ({ input: example.input, expected: example.output }))
      : (practiceJudgeCases[problem.slug] || []).slice(0, 10);

  if (cases.length === 0) {
    return json({ message: "This problem has no verified test fixtures yet." }, 503);
  }

  const results: Array<{
    index: number;
    passed: boolean;
    status: string;
    stdout?: string;
    stderr?: string;
    expected?: string;
    compileOutput?: string;
    timeMs?: number;
    memoryKb?: number;
  }> = [];

  try {
    const verdicts: JudgeVerdict[] = [];
    if (config.backend === "sandbox") {
      // One temporary Firecracker VM compiles the source once, then runs
      // each case in a separate process, stopping after the first failure.
      verdicts.push(...await executeSandboxCases(value.source, cases));
    } else {
      // Legacy external Judge0 adapter, useful for teams with a managed runner.
      for (const testCase of cases) {
        const verdict = await executeJudge0(
          config, value.source, testCase.input, testCase.expected,
        );
        verdicts.push(verdict);
        if (!verdict.passed || verdict.compileOutput) break;
      }
    }

    for (let i = 0; i < verdicts.length; i++) {
      const testCase = cases[i];
      const verdict = verdicts[i];
      const detailsVisible = value.mode === "run";
      results.push({
        index: i + 1,
        passed: verdict.passed,
        status: verdict.status,
        ...(detailsVisible ? {
          stdout: verdict.stdout,
          stderr: verdict.stderr,
          ...(testCase.expected === undefined ? {} : { expected: testCase.expected }),
        } : {}),
        // Compiler errors do not contain protected fixture input; always show.
        ...(verdict.compileOutput ? { compileOutput: verdict.compileOutput } : {}),
        ...(verdict.timeMs === undefined ? {} : { timeMs: verdict.timeMs }),
        ...(verdict.memoryKb === undefined ? {} : { memoryKb: verdict.memoryKb }),
      });
      if (!verdict.passed || verdict.compileOutput) break;
    }

    const passedCount = results.filter(caseResult => caseResult.passed).length;
    const accepted = passedCount === cases.length;
    const message = custom
      ? (accepted ? "Custom input executed successfully. Output is shown below." : "Custom execution finished with an error.")
      : accepted
        ? (value.mode === "run" ? "All public sample cases passed." : "All configured validation cases passed.")
        : value.mode === "run"
          ? "A sample case failed. Compare actual and expected output."
          : "Submission did not pass all validation cases.";

    return json({
      message,
      mode: value.mode,
      ...(custom ? {} : { accepted }),
      passed: passedCount,
      total: cases.length,
      cases: results,
    });
  } catch {
    return json({
      message: "The isolated judge is unavailable or timed out. Your C++ draft was not lost.",
      code: "JUDGE_ERROR",
    }, 502);
  }
}

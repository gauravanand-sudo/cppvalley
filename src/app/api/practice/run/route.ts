import { NextRequest, NextResponse } from "next/server";
import { getPracticeProblem } from "@/data/practice";
import { practiceJudgeCases, type JudgeCase } from "@/data/practice-judge-cases";

export const runtime = "nodejs";
export const maxDuration = 30;

type Mode = "run" | "submit";
type JudgeReply = {
  token?: string;
  status?: { id: number; description: string };
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
};

function normalize(output: string) {
  return output.replace(/\r\n/g, "\n").trimEnd();
}

async function evaluate(source: string, test: JudgeCase, base: string, languageId: number, headers: HeadersInit): Promise<JudgeReply> {
  const created = await fetch(base + "/submissions?base64_encoded=false", {
    method: "POST",
    headers,
    body: JSON.stringify({
      source_code: source,
      language_id: languageId,
      stdin: test.input,
      cpu_time_limit: 2,
      wall_time_limit: 5,
      memory_limit: 131072,
      max_file_size: 1024,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!created.ok) throw new Error("Judge submission failed");
  const newJob = (await created.json()) as JudgeReply;
  if (!newJob.token || !/^[\w-]{5,128}$/.test(newJob.token)) throw new Error("Judge returned an invalid token");

  for (let i = 0; i < 16; i++) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const poll = await fetch(base + "/submissions/" + encodeURIComponent(newJob.token) + "?base64_encoded=false", {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!poll.ok) throw new Error("Judge polling failed");
    const output = (await poll.json()) as JudgeReply;
    if (typeof output.status?.id === "number" && output.status.id > 2) return output;
  }
  throw new Error("Judge processing timed out");
}

export async function POST(request: NextRequest) {
  // Intentionally opt-in: public access must not be enabled until production
  // authentication, distributed rate limiting, abuse protection and judge quotas exist.
  if (process.env.CPPVALLEY_PRACTICE_JUDGE_ENABLED !== "true") {
    return NextResponse.json({
      message: "Code execution is not enabled yet. Your editor and local drafts work; the isolated C++ judge will be connected after infrastructure and abuse controls are configured.",
    }, { status: 503 });
  }

  const baseUrl = process.env.JUDGE0_BASE_URL?.replace(/\/+$/, "");
  const languageId = Number(process.env.JUDGE0_CPP17_LANGUAGE_ID || "54");
  if (!baseUrl || !/^https:\/\//.test(baseUrl) || !Number.isInteger(languageId) || languageId <= 0) {
    return NextResponse.json({ message: "The judge backend is not configured." }, { status: 503 });
  }

  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 }); }
  if (!payload || typeof payload !== "object") return NextResponse.json({ message: "Invalid request." }, { status: 400 });

  const value = payload as Record<string, unknown>;
  const slug = value.slug;
  const source = value.source;
  const mode = value.mode;
  if (typeof slug !== "string" || typeof source !== "string" || (mode !== "run" && mode !== "submit")) {
    return NextResponse.json({ message: "Expected slug, C++ source, and run/submit mode." }, { status: 400 });
  }
  if (source.length < 1 || source.length > 25000) {
    return NextResponse.json({ message: "Source code must be between 1 and 25,000 characters." }, { status: 400 });
  }

  const problem = getPracticeProblem(slug);
  if (!problem) return NextResponse.json({ message: "Problem not found." }, { status: 404 });

  const modeValue: Mode = mode;
  const allCases = practiceJudgeCases[slug];
  if (!allCases?.length) return NextResponse.json({ message: "This problem has no verified judge cases yet." }, { status: 503 });
  const cases = modeValue === "run" ? allCases.slice(0, 1) : allCases;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.JUDGE0_AUTH_TOKEN) headers["X-Auth-Token"] = process.env.JUDGE0_AUTH_TOKEN;

  try {
    const results = [];
    for (let i = 0; i < cases.length; i++) {
      const output = await evaluate(source, cases[i], baseUrl, languageId, headers);
      const stdout = output.stdout ?? "";
      const passed = output.status?.id === 3 && normalize(stdout) === normalize(cases[i].expected);
      results.push({
        index: i + 1,
        passed,
        status: passed ? "Accepted" : (output.compile_output ? "Compilation error" : output.status?.description || "Wrong answer"),
        // Only reveal public sample output. Hidden test fixtures must stay server-side.
        ...(modeValue === "run" ? { stdout: output.compile_output || output.stderr || stdout, expected: cases[i].expected } : {}),
      });
      if (!passed && modeValue === "submit") break;
    }
    const passedCount = results.filter(result => result.passed).length;
    const accepted = passedCount === cases.length;
    return NextResponse.json({
      accepted,
      passed: passedCount,
      total: cases.length,
      message: accepted ? "All verified test cases passed." : "One or more test cases failed. Review your algorithm and edge cases.",
      cases: results,
    });
  } catch {
    return NextResponse.json({ message: "The isolated judge failed or exceeded its time limit. Please try again later." }, { status: 502 });
  }
}

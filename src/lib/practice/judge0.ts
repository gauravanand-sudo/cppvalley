import type { PilotJudgeConfig } from "./judge-access";

/**
 * Judge0 client. Runs code only on a separate, patched, authenticated service.
 * Vercel/Next.js never spawn a compiler or execute submitted source.
 *
 * Official protocol: POST /submissions?base64_encoded=true&wait=false,
 * followed by GET /submissions/{token}?base64_encoded=true.
 */
type Judge0RawResult = {
  token?: unknown;
  status?: { id?: number; description?: string };
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  time?: number | string | null;
  memory?: number | string | null;
};

export type JudgeVerdict = {
  status: string;
  passed: boolean;
  stdout: string;
  stderr: string;
  compileOutput: string;
  timeMs?: number;
  memoryKb?: number;
};

const MAX_DIAGNOSTIC_CHARS = 5000;
const MAX_POLLS = 20;
const POLL_INTERVAL_MS = 350;

function b64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}
function fromB64(value: string | null | undefined) {
  if (!value) return "";
  return Buffer.from(value, "base64").toString("utf8");
}
function normalizedOutput(value: string) {
  return value.replace(/\r\n?/g, "\n").trimEnd();
}
function safeNumber(value: number | string | null | undefined) {
  const number = Number(value);
  return value != null && Number.isFinite(number) && number >= 0 ? number : undefined;
}
function judgeHeaders(config: PilotJudgeConfig): Record<string, string> {
  return { "Content-Type": "application/json", "X-Auth-Token": config.judgeToken };
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function executeJudge0(
  config: PilotJudgeConfig,
  source: string,
  input: string,
  expected?: string,
): Promise<JudgeVerdict> {
  const created = await fetch(config.judgeBase + "/submissions?base64_encoded=true&wait=false", {
    method: "POST",
    headers: judgeHeaders(config),
    body: JSON.stringify({
      source_code: b64(source),
      language_id: config.languageId,
      stdin: b64(input),
      cpu_time_limit: 2,
      cpu_extra_time: 0.5,
      wall_time_limit: 6,
      memory_limit: 131072,
      stack_limit: 64000,
      max_file_size: 64,
      max_processes_and_or_threads: 16,
      enable_network: false,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(9000),
  });
  if (!created.ok) throw new Error("Judge rejected a submission.");
  const job = (await created.json()) as Judge0RawResult;
  if (typeof job.token !== "string" || !/^[\w-]{5,128}$/.test(job.token)) {
    throw new Error("Judge failed to return a valid token.");
  }

  let completed: Judge0RawResult | null = null;
  for (let attempt = 0; attempt < MAX_POLLS; attempt++) {
    await sleep(POLL_INTERVAL_MS);
    const response = await fetch(
      config.judgeBase + "/submissions/" + encodeURIComponent(job.token) + "?base64_encoded=true",
      {
        method: "GET",
        headers: judgeHeaders(config),
        cache: "no-store",
        signal: AbortSignal.timeout(9000),
      },
    );
    if (!response.ok) throw new Error("Could not read judge result.");
    const current = (await response.json()) as Judge0RawResult;
    if (typeof current.status?.id === "number" && current.status.id > 2) {
      completed = current;
      break;
    }
  }

  if (!completed) throw new Error("Judge did not finish before the polling deadline.");

  const stdout = fromB64(completed.stdout);
  const stderr = fromB64(completed.stderr);
  const compileOutput = fromB64(completed.compile_output);
  const message = fromB64(completed.message);
  const statusId = completed.status?.id;
  const success = statusId === 3;
  const passed = success && (expected === undefined || normalizedOutput(stdout) === normalizedOutput(expected));
  const status = statusId === 6
    ? "Compilation Error"
    : !success
      ? (completed.status?.description || message || "Execution failed")
      : passed
        ? (expected === undefined ? "Executed" : "Accepted")
        : "Wrong Answer";

  const seconds = safeNumber(completed.time);
  return {
    status,
    passed,
    stdout: stdout.slice(0, MAX_DIAGNOSTIC_CHARS),
    stderr: stderr.slice(0, MAX_DIAGNOSTIC_CHARS),
    compileOutput: compileOutput.slice(0, MAX_DIAGNOSTIC_CHARS),
    ...(seconds === undefined ? {} : { timeMs: Math.round(seconds * 1000) }),
    ...(safeNumber(completed.memory) === undefined ? {} : { memoryKb: safeNumber(completed.memory) }),
  };
}

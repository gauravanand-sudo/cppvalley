import { createHash, timingSafeEqual } from "node:crypto";

export type PilotAccessConfig = {
  redisUrl: string;
  redisToken: string;
  previewKey: string;
  authMode: "pilot-key" | "vercel-preview";
};
export type Judge0PilotConfig = PilotAccessConfig & {
  backend: "judge0";
  judgeBase: string;
  judgeToken: string;
  languageId: number;
};
export type SandboxPilotConfig = PilotAccessConfig & { backend: "sandbox" };
export type PilotJudgeConfig = Judge0PilotConfig | SandboxPilotConfig;

function secureHttpsEndpoint(raw: string, expectedHost?: string): string | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password || url.hash || url.search) return null;
    if (url.pathname !== "/" && url.pathname !== "") return null;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return null;
    // Prevent using loopback, link-local or private IP literals as remote targets.
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host.startsWith("[") || host.includes(":")) return null;
    if (expectedHost && host !== expectedHost.toLowerCase()) return null;
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * Private preview judge. Production execution is hard-disabled here.
 *
 * vercel-preview auth is permitted ONLY for the feature branch, on
 * Vercel-authenticated, non-custom preview hostnames (checked again per request).
 * The project MUST have Vercel Authentication enabled on preview deployments.
 * This is an internal pilot, not a substitute for real user accounts.
 */
export function pilotJudgeConfig(): PilotJudgeConfig | null {
  if (process.env.CPPVALLEY_PRACTICE_JUDGE_ENABLED !== "true") return null;
  // Vercel system env exposure is optional: VERCEL_ENV may be absent at runtime.
  // Restrict the pilot using an explicit flag scoped ONLY to this Preview branch
  // in Vercel settings, and reject production if VERCEL_ENV is available.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "preview") return null;
  if (process.env.CPPVALLEY_PRACTICE_PREVIEW_SCOPE !== "feature-practice") return null;

  const rawAuthMode = process.env.CPPVALLEY_PRACTICE_AUTH_MODE || "pilot-key";
  if (rawAuthMode !== "pilot-key" && rawAuthMode !== "vercel-preview") return null;
  // Vercel can omit git metadata from runtime system env. The three enable
  // flags are already scoped to this exact Preview branch in Vercel Settings.
  // If the ref is exposed, reject any mismatched branch.
  if (rawAuthMode === "vercel-preview" &&
      process.env.VERCEL_GIT_COMMIT_REF &&
      !["feature/practice-workspace-mvp", "feature/elite-cpp-platform-overhaul"].includes(process.env.VERCEL_GIT_COMMIT_REF)) return null;

  const previewKey = process.env.CPPVALLEY_PRACTICE_PREVIEW_KEY || "";
  if (rawAuthMode === "pilot-key" && previewKey.length < 32) return null;

  // Vercel KV / Upstash integrations use either naming convention.
  const redisUrl = secureHttpsEndpoint(
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "",
  );
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
  if (!redisUrl || !redisToken) return null;

  const common: PilotAccessConfig = { authMode: rawAuthMode, previewKey, redisUrl, redisToken };
  if (process.env.CPPVALLEY_PRACTICE_JUDGE_BACKEND === "sandbox") {
    return { ...common, backend: "sandbox" };
  }

  if (process.env.CPPVALLEY_PRACTICE_JUDGE_BACKEND !== "judge0") return null;

  const judgeToken = process.env.JUDGE0_AUTH_TOKEN || "";
  const allowedHost = process.env.JUDGE0_ALLOWED_HOSTNAME || "";
  const judgeBase = secureHttpsEndpoint(process.env.JUDGE0_BASE_URL || "", allowedHost);
  const languageId = Number(process.env.JUDGE0_CPP17_LANGUAGE_ID);
  if (!judgeBase || !allowedHost || judgeToken.length < 16 ||
    !Number.isInteger(languageId) || languageId < 1) return null;

  return { ...common, backend: "judge0", judgeBase, judgeToken, languageId };
}

export function validPreviewKey(header: string | null, actual: string) {
  const match = /^Bearer ([\x21-\x7e]+)$/.exec(header || "");
  if (!match) return false;
  const candidate = Buffer.from(match[1], "utf8");
  const expected = Buffer.from(actual, "utf8");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

type RateResponse = { result?: number | string; error?: string };
const FIXED_WINDOW_SECONDS = 60;
const PILOT_REQUESTS_PER_MINUTE = 12;

/**
 * Atomic fixed-window quota for the *entire pilot*, not per user.
 * Fail closed if Redis is unavailable. This is a protection against accidental
 * rapid usage, not a substitute for identity-specific quotas or a job queue.
 */
export async function consumePilotQuota(config: PilotAccessConfig) {
  const minuteBucket = Math.floor(Date.now() / (FIXED_WINDOW_SECONDS * 1000));
  const key = "cppvalley:practice:pilot:" + createHash("sha256")
    .update(config.previewKey || "vercel-preview:" + (process.env.VERCEL_GIT_COMMIT_REF || ""))
    .digest("hex").slice(0, 16) + ":" + minuteBucket;
  const command = [
    "EVAL",
    "local count=redis.call('INCR',KEYS[1]); if count==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]); end; return count;",
    "1",
    key,
    String(FIXED_WINDOW_SECONDS + 2),
  ];

  const response = await fetch(config.redisUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.redisToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error("Shared quota service unavailable.");
  const body = (await response.json()) as RateResponse;
  const count = typeof body.result === "number"
    ? body.result
    : typeof body.result === "string" && /^\d+$/.test(body.result)
      ? Number(body.result)
      : Number.NaN;
  if (body.error || !Number.isSafeInteger(count) || count < 1) {
    throw new Error("Shared quota service returned an invalid response.");
  }
  return count <= PILOT_REQUESTS_PER_MINUTE;
}

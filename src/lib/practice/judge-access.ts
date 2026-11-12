import { createHash, timingSafeEqual } from "node:crypto";

export type PilotJudgeConfig = {
  judgeBase: string;
  judgeToken: string;
  languageId: number;
  redisUrl: string;
  redisToken: string;
  previewKey: string;
};

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
 * No credentials or execution by default.
 * Enabled only for a short-lived private pilot with an external, authenticated
 * Judge0 installation AND a centrally shared Redis quota.
 *
 * The public version must replace previewKey with real account-based auth.
 */
export function pilotJudgeConfig(): PilotJudgeConfig | null {
  if (process.env.CPPVALLEY_PRACTICE_JUDGE_ENABLED !== "true") return null;

  const previewKey = process.env.CPPVALLEY_PRACTICE_PREVIEW_KEY || "";
  const judgeToken = process.env.JUDGE0_AUTH_TOKEN || "";
  const allowedHost = process.env.JUDGE0_ALLOWED_HOSTNAME || "";
  const judgeBase = secureHttpsEndpoint(process.env.JUDGE0_BASE_URL || "", allowedHost);
  const redisUrl = secureHttpsEndpoint(process.env.UPSTASH_REDIS_REST_URL || "");
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";
  const languageId = Number(process.env.JUDGE0_CPP17_LANGUAGE_ID);
  if (
    previewKey.length < 32 ||
    judgeToken.length < 16 ||
    !allowedHost ||
    !judgeBase ||
    !redisUrl ||
    !redisToken ||
    !Number.isInteger(languageId) ||
    languageId < 1
  ) return null;

  return { previewKey, judgeToken, judgeBase, languageId, redisUrl, redisToken };
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
export async function consumePilotQuota(config: PilotJudgeConfig) {
  const minuteBucket = Math.floor(Date.now() / (FIXED_WINDOW_SECONDS * 1000));
  const key = "cppvalley:practice:pilot:" + createHash("sha256")
    .update(config.previewKey).digest("hex").slice(0, 16) + ":" + minuteBucket;
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
  if (body.error || !Number.isFinite(Number(body.result))) {
    throw new Error("Shared quota service returned an invalid response.");
  }
  return Number(body.result) <= PILOT_REQUESTS_PER_MINUTE;
}

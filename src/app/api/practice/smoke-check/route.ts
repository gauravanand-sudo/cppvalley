import { NextRequest, NextResponse } from "next/server";
import { consumePilotQuota, pilotJudgeConfig } from "@/lib/practice/judge-access";
import { executeSandboxCases } from "@/lib/practice/sandbox-judge";

/** TEMPORARY one-shot test endpoint. Remove after integration verification. */
export const runtime = "nodejs";
export const maxDuration = 45;

export async function GET(request: NextRequest) {
  const config = pilotJudgeConfig();
  if (!config || config.backend !== "sandbox" ||
      !request.nextUrl.hostname.endsWith(".vercel.app") ||
      process.env.CPPVALLEY_PRACTICE_PREVIEW_SCOPE !== "feature-practice") {
    return NextResponse.json({ passed: false, message: "Not available" }, { status: 404 });
  }

  // A one-time Redis lock prevents repeated VM creation via this endpoint.
  try {
    const rateOkay = await consumePilotQuota(config);
    if (!rateOkay) return NextResponse.json({ passed: false, message: "Rate limited" }, { status: 429 });
    const lock = await fetch(config.redisUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + config.redisToken },
      body: JSON.stringify(["SET", "cppvalley:practice:private-smoketest:v2", "1", "EX", "3600", "NX"]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const body: unknown = await lock.json();
    if (!lock.ok || !body || typeof body !== "object" || !("result" in body) ||
        (body as {result: unknown}).result !== "OK") {
      return NextResponse.json({ passed: false, message: "Test already executed or Redis lock unavailable" }, { status: 409 });
    }

    const output = await executeSandboxCases(
      '#include <iostream>\nint main() { long long x,y; std::cin >> x >> y; std::cout << (x+y) << "\\n"; }\n',
      [{ input: "2 4\n", expected: "6\n" }],
    );
    return NextResponse.json({
      passed: output.length === 1 && output[0].passed,
      status: output[0]?.status || "No verdict",
      output: output[0]?.stdout || "",
      compileError: output[0]?.compileOutput?.slice(0, 500) || "",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const reason = error instanceof Error ? error.message.slice(0, 200) : "Unknown failure";
    console.error("[practice-smoketest]", reason);
    return NextResponse.json({ passed: false, message: reason }, { status: 502 });
  }
}

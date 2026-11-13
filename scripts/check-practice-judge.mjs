#!/usr/bin/env node
/**
 * Standalone smoke test for the external, isolated Judge0 service.
 *
 * Set JUDGE0_BASE_URL, JUDGE0_AUTH_TOKEN and JUDGE0_CPP17_LANGUAGE_ID in a
 * trusted shell or secret manager. Do NOT paste secrets into this repository.
 *
 * Run: node scripts/check-practice-judge.mjs
 */
import assert from "node:assert/strict";

const { JUDGE0_BASE_URL: rawBase, JUDGE0_AUTH_TOKEN: token, JUDGE0_CPP17_LANGUAGE_ID: rawId } = process.env;
if (!rawBase || !token || !rawId) {
  console.error("NOT TESTED: configure JUDGE0_BASE_URL, JUDGE0_AUTH_TOKEN and JUDGE0_CPP17_LANGUAGE_ID.");
  process.exitCode = 2;
} else {
  const base = rawBase.replace(/\/+$/, "");
  const url = new URL(base);
  assert.equal(url.protocol, "https:", "Runner must have HTTPS.");
  const languageId = Number(rawId);
  assert(Number.isInteger(languageId) && languageId > 0, "Set a valid C++17 language ID.");

  const headers = { "Content-Type": "application/json", "X-Auth-Token": token };

  async function run(source, input) {
    const created = await fetch(base + "/submissions?base64_encoded=true&wait=false", {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: Buffer.from(source).toString("base64"),
        language_id: languageId,
        stdin: Buffer.from(input).toString("base64"),
        cpu_time_limit: 2,
        wall_time_limit: 6,
        memory_limit: 131072,
        max_file_size: 64,
        max_processes_and_or_threads: 16,
        enable_network: false,
      }),
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(created.status, 201, "Judge0 should create the submission.");
    const job = await created.json();
    assert(typeof job.token === "string", "Judge0 should return a token.");

    for (let i = 0; i < 25; i++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      const response = await fetch(
        base + "/submissions/" + encodeURIComponent(job.token) + "?base64_encoded=true",
        { headers, signal: AbortSignal.timeout(10000) },
      );
      assert(response.ok, "Judge0 polling should succeed.");
      const output = await response.json();
      if (Number(output.status?.id) > 2) {
        return {
          statusId: output.status.id,
          status: output.status.description,
          stdout: Buffer.from(output.stdout || "", "base64").toString("utf8"),
          compileOutput: Buffer.from(output.compile_output || "", "base64").toString("utf8"),
          stderr: Buffer.from(output.stderr || "", "base64").toString("utf8"),
        };
      }
    }
    throw new Error("Judge did not finish within smoke-test polling window.");
  }

  try {
    const languages = await fetch(base + "/languages", {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    assert(languages.ok, "Could not retrieve Judge0's language catalog.");
    const catalog = await languages.json();
    const language = Array.isArray(catalog) && catalog.find(item => item.id === languageId);
    assert(language, "Configured language ID is not listed by this Judge0 service.");
    console.log("Runner language:", language.name);

    const valid = await run(
      "#include <iostream>\nint main(){long long a,b;std::cin>>a>>b;std::cout<<(a+b)<<'\\n';}\n",
      "2 4\n",
    );
    assert.equal(valid.statusId, 3, "Correct code must complete successfully.");
    assert.equal(valid.stdout.trim(), "6", "Correct code must produce 6.");
    console.log("PASS: C++ compilation and standard input/output.");

    const invalid = await run("int main() { this is not valid C++; }\n", "");
    assert.equal(invalid.statusId, 6, "Invalid code must report a compilation error.");
    assert(invalid.compileOutput.length > 0 || invalid.stderr.length > 0, "Compiler diagnostics must be returned.");
    console.log("PASS: Compiler diagnostics.");

    console.log("PASS: External Judge0 service passed smoke tests. Next test browser pilot auth/limits.");
  } catch (error) {
    console.error("FAIL: Judge0 integration smoke test:", error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

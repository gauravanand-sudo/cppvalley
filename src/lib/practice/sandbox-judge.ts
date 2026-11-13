import "server-only";

import { Sandbox } from "@vercel/sandbox";
import type { JudgeVerdict } from "./judge0";

export type SandboxInputCase = { input: string; expected?: string };

/**
 * Compile once, then run each case in its own process inside a temporary,
 * network-denied Firecracker VM. Never execute user C++ on Vercel Functions.
 *
 * The managed Arch image is pinned to an image digest tested with GCC 16.2.1
 * on November 12, 2026. Change it only after rerunning the smoke tests.
 */
const CPP_SANDBOX_IMAGE =
  "vercel/sandbox/arch@sha256:9dd04e0294a3711bdc071acd768748c3b1141751de19fa254eb99ae74f108bdc";

const ROOT = "/vercel";
const OUTPUT_LIMIT = 5000;
const SANDBOX_TIMEOUT_MS = 40000;
const COMPILE_COMMAND =
  "timeout -k 1s 8s prlimit --cpu=6 --as=805306368 --fsize=131072 --nproc=32 -- " +
  "g++ -std=c++17 -O2 -pipe -pthread -o /vercel/solution /vercel/main.cpp " +
  "> /vercel/compile.stdout 2> /vercel/compile.stderr";
const RUN_COMMAND =
  "timeout -k 1s 2s prlimit --cpu=2 --as=536870912 --fsize=65536 --nproc=16 -- " +
  "/vercel/solution < /vercel/stdin.txt " +
  "> /vercel/stdout.txt 2> /vercel/stderr.txt";

function normalize(output: string) {
  return output.replace(/\r\n?/g, "\n").trimEnd();
}

function classifyExit(exitCode: number | null, stage: "compile" | "run") {
  if (exitCode === 124) {
    return stage === "compile" ? "Compilation Time Limit Exceeded" : "Time Limit Exceeded";
  }
  if (exitCode === 137) {
    // SIGKILL can mean the timeout grace period expired or a resource kill.
    return stage === "compile" ? "Compilation Resource Limit Exceeded" : "Time or Memory Limit Exceeded";
  }
  if (stage === "compile") return "Compilation Error";
  if (exitCode === 0) return "Executed";
  return "Runtime Error";
}

function textOrEmpty(value: Buffer | null) {
  return value === null ? "" : value.toString("utf8");
}

export async function executeSandboxCases(
  source: string,
  cases: SandboxInputCase[],
): Promise<JudgeVerdict[]> {
  // No source is interpolated into shell commands. The only shell text
  // used below is fixed and authored in the server's code.
  const sandbox = await Sandbox.create({
    image: CPP_SANDBOX_IMAGE,
    networkPolicy: "deny-all",
    resources: { vcpus: 1 },
    persistent: false,
    timeout: SANDBOX_TIMEOUT_MS,
    tags: { purpose: "cppvalley-practice-judge" },
  });

  try {
    await sandbox.writeFiles([
      { path: "main.cpp", content: Buffer.from(source, "utf8") },
    ]);

    const compile = await sandbox.runCommand({
      cmd: "bash",
      args: ["-c", COMPILE_COMMAND],
      cwd: ROOT,
    });

    const compileErr = textOrEmpty(
      await sandbox.readFileToBuffer({ path: "compile.stderr" }),
    );
    const compileStdout = textOrEmpty(
      await sandbox.readFileToBuffer({ path: "compile.stdout" }),
    );

    if (compile.exitCode !== 0) {
      const diagnostics = (compileErr || compileStdout ||
        "Compilation failed without diagnostics.").slice(0, OUTPUT_LIMIT);
      return [{
        status: classifyExit(compile.exitCode, "compile"),
        passed: false,
        stdout: "",
        stderr: "",
        compileOutput: diagnostics,
      }];
    }

    const results: JudgeVerdict[] = [];

    for (const test of cases) {
      // A test is passed to the binary via stdin, NOT embedded in a script.
      await sandbox.writeFiles([
        { path: "stdin.txt", content: Buffer.from(test.input, "utf8") },
      ]);
      const startedAt = Date.now();
      const run = await sandbox.runCommand({
        cmd: "bash",
        args: ["-c", RUN_COMMAND],
        cwd: ROOT,
      });
      const elapsedMs = Date.now() - startedAt;

      // Read the full output to judge correctness. Only then truncate what
      // the UI receives. RLIMIT_FSIZE caps files written by the process.
      const stdout = textOrEmpty(
        await sandbox.readFileToBuffer({ path: "stdout.txt" }),
      );
      const stderr = textOrEmpty(
        await sandbox.readFileToBuffer({ path: "stderr.txt" }),
      );

      const completed = run.exitCode === 0;
      const passed = completed &&
        (test.expected === undefined ||
          normalize(stdout) === normalize(test.expected));
      const status = !completed
        ? classifyExit(run.exitCode, "run")
        : passed
          ? (test.expected === undefined ? "Executed" : "Accepted")
          : "Wrong Answer";

      results.push({
        status,
        passed,
        stdout: stdout.slice(0, OUTPUT_LIMIT),
        stderr: stderr.slice(0, OUTPUT_LIMIT),
        compileOutput: "",
        timeMs: elapsedMs,
      });

      if (!passed) break;
    }

    return results;
  } finally {
    // Sandbox.stop() is idempotent; never keep user code running after the
    // request finishes, fails, or exceeds an execution cap.
    await sandbox.stop();
  }
}

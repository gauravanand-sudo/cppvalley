#!/usr/bin/env node
/**
 * Smoke test for @vercel/sandbox. Requires authenticated Vercel OIDC.
 * Creates a temporary billable VM and stops it in finally.
 * Run: node scripts/check-practice-vercel-sandbox.mjs
 */
import assert from "node:assert/strict";
import { Sandbox } from "@vercel/sandbox";

const dir = "/vercel";
const image = "vercel/sandbox/arch@sha256:9dd04e0294a3711bdc071acd768748c3b1141751de19fa254eb99ae74f108bdc";
const sandbox = await Sandbox.create({
  image,
  resources: { vcpus: 1 },
  networkPolicy: "deny-all",
  persistent: false,
  timeout: 40000,
  tags: { purpose: "cppvalley-compiler-smoke-test" },
});
try {
  await sandbox.writeFiles([
    { path: "main.cpp", content: Buffer.from('#include <iostream>\nint main(){long long a,b;std::cin>>a>>b;std::cout<<a+b<<"\\n";}\n') },
    { path: "stdin.txt", content: Buffer.from("2 4\n") },
  ]);
  const compiler = await sandbox.runCommand({
    cmd: "bash",
    args: ["-c", "timeout -k 1s 8s prlimit --cpu=6 --as=805306368 --fsize=131072 --nproc=32 -- g++ -std=c++17 -O2 -pipe -pthread -o " + dir + "/solution " + dir + "/main.cpp"],
    cwd: dir,
  });
  assert.equal(compiler.exitCode, 0, "Compiler error: " + (await compiler.stderr()));
  const run = await sandbox.runCommand({
    cmd: "bash",
    args: ["-c", "timeout -k 1s 2s prlimit --cpu=2 --as=536870912 --fsize=65536 --nproc=16 -- " + dir + "/solution < " + dir + "/stdin.txt"],
    cwd: dir,
  });
  assert.equal(run.exitCode, 0);
  assert.equal((await run.stdout()).trim(), "6");
  console.log("PASS: C++17 compiler and standard input/output");
  await sandbox.writeFiles([
    { path: "main.cpp", content: Buffer.from("int main(){ deliberate invalid syntax; }\n") },
  ]);
  const bad = await sandbox.runCommand({
    cmd: "g++",
    args: ["-std=c++17", "-o", dir + "/bad", dir + "/main.cpp"],
    cwd: dir,
  });
  assert.notEqual(bad.exitCode, 0);
  assert.match(await bad.stderr(), /error:/);
  console.log("PASS: invalid C++ rejected with compiler diagnostics");
} finally {
  await sandbox.stop();
}

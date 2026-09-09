import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const allowedExtensions = new Set([".ts", ".tsx", ".css"]);
const forbidden = [
  { label: "O-LOVE", pattern: /O[-‑]LOVE/g },
  { label: "Q-SARANG", pattern: /Q-SARANG/g },
  { label: "legacy O-series label", pattern: />\s*O\.\{/g },
];

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (allowedExtensions.has(extname(entry.name))) files.push(path);
  }

  return files;
}

const files = await collect(sourceRoot);
const failures = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const check of forbidden) {
    if (check.pattern.test(content)) {
      failures.push(`${relative(root, file)}: ${check.label}`);
    }
    check.pattern.lastIndex = 0;
  }
}

if (failures.length) {
  console.error("Public Q-LOVE brand check failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Q-LOVE public brand check passed (${files.length} source files).`);

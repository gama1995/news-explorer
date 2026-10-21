import { copyFile, mkdir, writeFile } from "node:fs/promises";

const buildDirectory = new URL("../dist/", import.meta.url);

// Pages serves files, rather than rewriting requests to a React entry point.
// Provide an entry for the saved-news directory so direct visits and refreshes work.
await mkdir(new URL("saved-news/", buildDirectory), { recursive: true });
await copyFile(
  new URL("index.html", buildDirectory),
  new URL("saved-news/index.html", buildDirectory),
);
await writeFile(new URL(".nojekyll", buildDirectory), "");

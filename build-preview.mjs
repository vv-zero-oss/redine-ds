/* Generates preview.html from index.html + the CSS sources.
   The preview compiles Tailwind in the browser (@tailwindcss/browser), so it
   opens with no build step. index.html stays the production file.
   Run: node build-preview.mjs                                                */
import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const theme = readFileSync("src/theme.css", "utf8");
const components = readFileSync("src/components.css", "utf8");

const inlined = `  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
  <style type="text/tailwindcss">
${theme}
${components}
  </style>`;

const out = html
  .replace(
    /  <!-- Built by:[\s\S]*?<link rel="stylesheet" href="\.\/dist\/app\.css" \/>/,
    inlined
  )
  .replace("<title>Transitions — Refine design system</title>",
           "<title>Refine design system — preview</title>");

writeFileSync("preview.html", out);
console.log("preview.html written (" + out.length + " bytes)");

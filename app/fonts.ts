import localFont from "next/font/local";

/**
 * Self-hosted so there is no font CDN request and no FOUT: next/font emits the
 * @font-face and the CSS variable the `--font-sans` / `--font-mono` primitives
 * in src/theme.css read. Inter is the single UI face — the display role is the
 * same family at a larger size and tighter tracking.
 */
export const inter = localFont({
  src: [{ path: "./fonts/inter-latin-variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter-face",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const robotoMono = localFont({
  src: [{ path: "./fonts/roboto-mono-latin-variable.woff2", weight: "100 700", style: "normal" }],
  variable: "--font-roboto-mono-face",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "monospace"],
});

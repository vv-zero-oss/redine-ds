/**
 * Marks used across the landing page.
 *
 * Every glyph is stroked or filled with `currentColor` and sized by the caller,
 * so an icon always inherits the text token of the control it sits in — no icon
 * carries a color of its own. The few that are genuinely brand-colored
 * (LinkedIn's tile, the agent mark) read a `--cl-*` token instead of a literal.
 */
import type { SVGProps } from "react";

type Icon = SVGProps<SVGSVGElement>;

const s = {
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* -- Brand ----------------------------------------------------------------- */

export function ClusterMark(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...props}>
      <circle cx="10" cy="10" r="8.1" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.55" />
      <path
        d="M13.8 3.1a8.1 8.1 0 100 13.8A6.6 6.6 0 0113.8 3.1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowRight(props: Icon) {
  return (
    <svg viewBox="0 0 22 12" aria-hidden {...props}>
      <path d="M1 6h19M15.2 1.2L20 6l-4.8 4.8" {...s} strokeWidth="1.4" />
    </svg>
  );
}

export function ChevronDown(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <path d="M4 6.5L8 10.5l4-4" {...s} strokeWidth="1.5" />
    </svg>
  );
}

/* -- Data sources ---------------------------------------------------------- */

export function LinkedInGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M4.2 13.6H1.8V6h2.4v7.6zM3 4.9a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm11.2 8.7h-2.4V9.9c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v3.8H6.6V6H8.9v1h.04a2.5 2.5 0 012.3-1.3c2.5 0 2.9 1.6 2.9 3.7v4.2z" />
    </svg>
  );
}

export function HubspotGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <path d="M11.6 6.3V4.6a1.4 1.4 0 10-1.2 0v1.7a4 4 0 00-1.8.8L5 4.4a1.6 1.6 0 10-.8 1l3.5 2.6a3.4 3.4 0 103.9-1.7z" {...s} strokeWidth="1.2" />
      <circle cx="11" cy="10.2" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** The agent mark — an eight-point asterisk. Also used for running agents. */
export function AgentStar(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 1.2c.35 0 .63.28.63.63v3.1l2.2-2.2a.63.63 0 11.89.89l-2.2 2.2h3.1a.63.63 0 010 1.26h-3.1l2.2 2.2a.63.63 0 11-.89.89l-2.2-2.2v3.1a.63.63 0 11-1.26 0v-3.1l-2.2 2.2a.63.63 0 11-.89-.89l2.2-2.2h-3.1a.63.63 0 110-1.26h3.1l-2.2-2.2a.63.63 0 11.89-.89l2.2 2.2v-3.1c0-.35.28-.63.63-.63z" />
    </svg>
  );
}

export function CrunchbaseGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 20 16" fill="currentColor" aria-hidden {...props}>
      <text x="0" y="12.4" fontSize="11" fontWeight="700" fontFamily="inherit" letterSpacing="-0.03em">
        cb
      </text>
    </svg>
  );
}

export function ClearbitGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M2.5 2.5h6v6h-6z" opacity="0.85" />
      <path d="M8.5 8.5h5v5h-5z" opacity="0.5" />
    </svg>
  );
}

export function XGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M12.4 1.4h2.3L9.7 7.26 15.58 15h-4.6L7.36 10 3.23 15H.93l5.35-6.27L.64 1.4h4.73l3.26 4.42L12.4 1.4zm-.8 12.2h1.27L4.68 2.73H3.31l8.29 10.87z" />
    </svg>
  );
}

export function OpenAiGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <path
        d="M8 2.1c1.1-.9 2.7-.8 3.7.2.6.6.9 1.4.8 2.2 1 .4 1.6 1.4 1.6 2.5 0 .8-.4 1.6-1 2.1.2.8 0 1.7-.6 2.4-.8 1-2.2 1.3-3.3.7-.6.6-1.4.9-2.3.8-1.3-.1-2.3-1.1-2.5-2.3-1-.4-1.7-1.4-1.7-2.5 0-.8.4-1.6 1-2.1-.2-.8 0-1.7.6-2.4.8-1 2.2-1.3 3.3-.7z"
        {...s}
        strokeWidth="1.15"
      />
      <path d="M8 5.6L10.2 6.9v2.5L8 10.7 5.8 9.4V6.9L8 5.6z" {...s} strokeWidth="1.15" />
    </svg>
  );
}

export function CompassGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <circle cx="8" cy="8" r="6.2" {...s} strokeWidth="1.3" />
      <path d="M10.3 5.7L9.1 9.1 5.7 10.3l1.2-3.4 3.4-1.2z" {...s} strokeWidth="1.3" />
    </svg>
  );
}

/** Cursor's cube, as it appears on the highlighted signal card. */
export function CubeGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...props}>
      <path d="M10 2.2l6.6 3.8v7.6L10 17.4 3.4 13.6V6L10 2.2z" {...s} strokeWidth="1.5" />
      <path d="M3.6 6.1L10 9.8l6.4-3.7M10 17.2V9.8" {...s} strokeWidth="1.5" />
    </svg>
  );
}

export function LinearGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <circle cx="10" cy="10" r="8.6" opacity="0.18" />
      <path d="M3.1 11.9l5 5a8.6 8.6 0 002.4.5l-7.9-7.9c.1.8.2 1.6.5 2.4zM3 8.3l8.7 8.7c.6-.2 1.2-.4 1.7-.7L3.7 6.6c-.3.5-.5 1.1-.7 1.7zM5.2 5l9.8 9.8c.4-.4.8-.8 1.1-1.3L6.5 3.9c-.5.3-.9.7-1.3 1.1z" />
    </svg>
  );
}

export function SparkleGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path d="M10 2.4l1.5 4.1 4.1 1.5-4.1 1.5L10 13.6 8.5 9.5 4.4 8l4.1-1.5L10 2.4z" />
      <path d="M15.4 12.6l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
    </svg>
  );
}

/* -- Utility --------------------------------------------------------------- */

export function SearchGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <circle cx="7.2" cy="7.2" r="4.6" {...s} strokeWidth="1.4" />
      <path d="M10.6 10.6L14 14" {...s} strokeWidth="1.4" />
    </svg>
  );
}

export function PhoneGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M5.2 2.3c.4-.2.9 0 1.1.4l.9 1.9c.2.4.1.9-.2 1.2l-.7.6a7.4 7.4 0 003.3 3.3l.6-.7c.3-.3.8-.4 1.2-.2l1.9.9c.4.2.6.7.4 1.1l-.7 1.5c-.2.5-.7.7-1.2.6A11 11 0 012.5 4.2c-.1-.5.1-1 .6-1.2l1.5-.7z" />
    </svg>
  );
}

export function MailGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <rect x="1.8" y="3.4" width="12.4" height="9.2" rx="1.8" {...s} strokeWidth="1.3" />
      <path d="M2.4 4.8L8 8.6l5.6-3.8" {...s} strokeWidth="1.3" />
    </svg>
  );
}

export function GiftGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <path d="M2.4 7.4h11.2v5.2a1.4 1.4 0 01-1.4 1.4H3.8a1.4 1.4 0 01-1.4-1.4V7.4z" {...s} strokeWidth="1.3" />
      <path d="M1.6 4.9h12.8v2.5H1.6zM8 4.9v9.1" {...s} strokeWidth="1.3" />
      <path d="M8 4.9S7.2 2 5.6 2a1.4 1.4 0 000 2.9H8zm0 0s.8-2.9 2.4-2.9a1.4 1.4 0 010 2.9H8z" {...s} strokeWidth="1.3" />
    </svg>
  );
}

export function BarsGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <rect x="2" y="9.5" width="2.6" height="4.5" rx="0.8" />
      <rect x="6.7" y="6" width="2.6" height="8" rx="0.8" />
      <rect x="11.4" y="2.6" width="2.6" height="11.4" rx="0.8" />
    </svg>
  );
}

/** The pointer that marks an agent acting on the board. */
export function Cursor(props: Icon) {
  return (
    <svg viewBox="0 0 12 16" aria-hidden {...props}>
      <path
        d="M1 1l9.2 6.2-4 .7-1.8 3.9L1 1z"
        fill="#ffffff"
        stroke="rgb(0 0 0 / 0.35)"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -- Social ---------------------------------------------------------------- */

export function FacebookGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 .8a7.2 7.2 0 00-1.1 14.3v-5.1H5.1V8h1.8V6.5c0-1.8 1-2.8 2.7-2.8.8 0 1.6.14 1.6.14v1.7h-.9c-.9 0-1.2.56-1.2 1.13V8h2l-.3 2h-1.7v5.1A7.2 7.2 0 008 .8z" />
    </svg>
  );
}

export function InstagramGlyph(props: Icon) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden {...props}>
      <rect x="1.8" y="1.8" width="12.4" height="12.4" rx="3.6" {...s} strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3.1" {...s} strokeWidth="1.4" />
      <circle cx="11.7" cy="4.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* -- Customer wordmarks ----------------------------------------------------
   Drawn rather than imported: each is a simple mark plus its name, matching
   the weight and muting of the reference strip.                             */

export function MarkBars({ count = 6, ...props }: Icon & { count?: number }) {
  const bars = Array.from({ length: count }, (_, i) => i);
  return (
    <svg viewBox={`0 0 ${count * 3} 16`} fill="currentColor" aria-hidden {...props}>
      {bars.map((i) => (
        <rect
          key={i}
          x={i * 3}
          y={i % 2 === 0 ? 2 : 3.6}
          width="1.7"
          height={i % 2 === 0 ? 12 : 8.8}
          rx="0.5"
        />
      ))}
    </svg>
  );
}

export function MarkWave(props: Icon) {
  return (
    <svg viewBox="0 0 20 16" fill="currentColor" aria-hidden {...props}>
      <path d="M1 3.2c1.3 0 1.3 9.6 2.6 9.6S4.9 2 6.2 2s1.3 11.5 2.6 11.5S10.1 3.2 11.4 3.2s1.3 9.6 2.6 9.6S15.3 2 16.6 2s1.3 11.5 2.6 11.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MarkRipple(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...props}>
      <rect x="0.6" y="0.6" width="18.8" height="18.8" rx="5.4" fill="currentColor" opacity="0.14" />
      <circle cx="10" cy="10" r="4.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 5.6a4.4 4.4 0 014.4 4.4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0" />
    </svg>
  );
}

export function MarkClarity(props: Icon) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden {...props}>
      <path d="M15.6 4.9a7 7 0 100 10.2" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" />
      <rect x="12.2" y="8.4" width="3.2" height="3.2" rx="0.7" fill="currentColor" />
      <rect x="15.8" y="11.8" width="2.4" height="2.4" rx="0.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

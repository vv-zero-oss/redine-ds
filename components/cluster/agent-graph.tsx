import { cn } from "@/lib/utils";
import {
  AgentStar,
  ClearbitGlyph,
  CrunchbaseGlyph,
  Cursor,
  CubeGlyph,
  HubspotGlyph,
  LinkedInGlyph,
  MarkWave,
  OpenAiGlyph,
} from "./icons";

/**
 * The hero board.
 *
 * Laid out on a fixed 1420×460 stage and positioned in px, because it is a
 * diagram: the arcs, the trunk line and the nodes have to stay in register
 * with each other, which a flow layout cannot promise. The stage scales as a
 * whole below its design width rather than reflowing.
 *
 * Depth comes from one radial well behind the centre node plus the glass card
 * on the right — the card sits over the trunk line on purpose, so its blur has
 * something to bend.
 */

const NODE = { x: 710, y: 237, r: 50 };

/** Orbit radii, inner to outer, on each side of the node. */
const ORBITS = { left: [70, 86, 104], right: [68, 84] };

/**
 * An ~80° arc hugging one side of the node. The chord sits at cos(40°)·r from
 * the centre so the crescent stays open at top and bottom instead of closing
 * into a ring.
 */
function crescent(r: number, side: "left" | "right") {
  const dx = 0.766 * r;
  const dy = 0.643 * r;
  const x = side === "left" ? NODE.x - dx : NODE.x + dx;
  const sweep = side === "left" ? 0 : 1;
  return `M ${x} ${NODE.y - dy} A ${r} ${r} 0 0 ${sweep} ${x} ${NODE.y + dy}`;
}

type SourceProps = {
  name: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  dim?: boolean;
  tile?: boolean;
};

/* The six sources sit on an arc that opens toward the node, 88px apart, with
   Apollo landing on the trunk line. Salesforce is deliberately half off the
   frame — the list continues past the edge. */
const SOURCES: SourceProps[] = [
  { name: "Salesforce", x: -58, y: -34, icon: <MarkWave className="h-3.5 w-4" />, dim: true },
  { name: "Hubspot", x: 94, y: 54, icon: <HubspotGlyph className="size-4" />, dim: true },
  { name: "LinkedIn", x: 164, y: 142, icon: <LinkedInGlyph className="size-3.5" />, tile: true },
  { name: "Apollo", x: 182, y: 230, icon: <AgentStar className="size-4" /> },
  { name: "Crunchbase", x: 150, y: 318, icon: <CrunchbaseGlyph className="h-4 w-5" /> },
  { name: "Clearbit", x: 90, y: 406, icon: <ClearbitGlyph className="size-4" />, dim: true },
];

function Source({ name, x, y, icon, dim, tile }: SourceProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2.5 whitespace-nowrap",
        dim ? "text-cl-fg-faint" : "text-cl-fg",
      )}
      style={{ left: x, top: y }}
    >
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center",
          tile && "rounded-[6px] bg-white text-[#0a66c2]",
        )}
      >
        {icon}
      </span>
      <span className="text-[15px] leading-none">{name}</span>
    </div>
  );
}

function AgentPill({
  label,
  x,
  y,
  icon,
  cursor,
}: {
  label: string;
  x: number;
  y: number;
  icon?: React.ReactNode;
  /** Where the little agent pointer sits relative to the pill, if at all. */
  cursor?: { dx: number; dy: number };
}) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {cursor && (
        <span className="absolute" style={{ left: cursor.dx, top: cursor.dy }}>
          <Cursor className="h-4 w-3" />
        </span>
      )}
      <span className={cn("cl-agent-pill", !icon && "cl-agent-pill-plain")}>
        {icon}
        {label}
      </span>
    </div>
  );
}

function AgentMark({ tone = "accent" }: { tone?: "accent" | "plain" }) {
  return (
    <span
      className={cn(
        "grid size-[22px] shrink-0 place-items-center rounded-[6px]",
        tone === "accent" ? "text-white" : "bg-white text-cl-paper-fg",
      )}
      style={tone === "accent" ? { background: "var(--cl-accent)" } : undefined}
    >
      {tone === "accent" ? <AgentStar className="size-3.5" /> : <OpenAiGlyph className="size-3.5" />}
    </span>
  );
}

/** One row in the right-hand activity column. */
function Activity({
  title,
  detail,
  time,
  y,
  tile,
}: {
  title: string;
  detail: string;
  time: string;
  y: number;
  tile: React.ReactNode;
}) {
  return (
    <div className="absolute flex w-[300px] items-center gap-3" style={{ left: 1058, top: y }}>
      {tile}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[15px] leading-tight text-cl-fg">{title}</span>
          <span className="shrink-0 text-[13px] text-cl-fg-faint">{time}</span>
        </div>
        <p className="mt-1 truncate text-[13px] leading-tight text-cl-fg-subtle">{detail}</p>
      </div>
    </div>
  );
}

export function AgentGraph() {
  return (
    <div className="relative h-[460px] w-full overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[460px] w-[1420px] -translate-x-1/2">
        {/* A shallow well behind the node so the centre reads as recessed. Kept
            faint on purpose: at any real strength it becomes a halo, and the
            depth here comes from the orbit arcs, not from a vignette. */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: NODE.x - 210,
            top: NODE.y - 210,
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, rgb(0 0 0 / 0.3) 0%, rgb(0 0 0 / 0.14) 42%, transparent 72%)",
          }}
        />

        {/* Trunk lines + orbit arcs. One SVG so everything stays in register.
            The gradients are in user space, not object-bounding-box: a perfectly
            horizontal line has a zero-height box, and an objectBoundingBox
            gradient on one is degenerate — the line silently does not paint. */}
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 1420 460"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="cl-trunk-l" gradientUnits="userSpaceOnUse" x1="232" y1="0" x2="660" y2="0">
              <stop offset="0%" stopColor="rgb(255 255 255 / 0)" />
              <stop offset="22%" stopColor="rgb(255 255 255 / 0.85)" />
              <stop offset="100%" stopColor="rgb(255 255 255 / 0.85)" />
            </linearGradient>
            <linearGradient id="cl-trunk-r" gradientUnits="userSpaceOnUse" x1="760" y1="0" x2="1100" y2="0">
              <stop offset="0%" stopColor="rgb(255 255 255 / 0.85)" />
              <stop offset="72%" stopColor="rgb(255 255 255 / 0.7)" />
              <stop offset="100%" stopColor="rgb(255 255 255 / 0)" />
            </linearGradient>
            <linearGradient id="cl-arc" gradientUnits="userSpaceOnUse" x1="0" y1="90" x2="0" y2="384">
              <stop offset="0%" stopColor="rgb(255 255 255 / 0.02)" />
              <stop offset="50%" stopColor="rgb(255 255 255 / 0.45)" />
              <stop offset="100%" stopColor="rgb(255 255 255 / 0.02)" />
            </linearGradient>
            <linearGradient id="cl-rim" gradientUnits="userSpaceOnUse" x1="670" y1="190" x2="760" y2="290">
              <stop offset="0%" stopColor="rgb(255 255 255 / 0.02)" />
              <stop offset="100%" stopColor="rgb(255 255 255 / 0.16)" />
            </linearGradient>
            <radialGradient id="cl-well" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#141414" />
              <stop offset="100%" stopColor="rgb(20 20 20 / 0)" />
            </radialGradient>
          </defs>

          {/* The inbound trunk is a pair of rails, as in the reference. */}
          <path d={`M232 ${NODE.y - 2} H ${NODE.x - NODE.r - 6}`} stroke="url(#cl-trunk-l)" strokeWidth="1" />
          <path d={`M232 ${NODE.y + 2} H ${NODE.x - NODE.r - 6}`} stroke="url(#cl-trunk-l)" strokeWidth="1" />
          <path d={`M${NODE.x + NODE.r + 6} ${NODE.y} H 1100`} stroke="url(#cl-trunk-r)" strokeWidth="1" />

          {/* Orbits. Each is a ~100° crescent on one side of the node, never a
              ring: the arc has to read as a path passing the node, not as a halo
              around it. */}
          {ORBITS.left.map((r, i) => (
            <path key={`l${r}`} d={crescent(r, "left")} stroke="url(#cl-arc)" strokeWidth="1" opacity={0.85 - i * 0.2} />
          ))}
          {ORBITS.right.map((r, i) => (
            <path key={`r${r}`} d={crescent(r, "right")} stroke="url(#cl-arc)" strokeWidth="1" opacity={0.85 - i * 0.24} />
          ))}

          {/* The node itself: a well, not a disc with a border — the rim is one
              lit edge on the lower right, the way the reference lights it. */}
          <circle cx={NODE.x} cy={NODE.y} r={NODE.r + 16} fill="url(#cl-well)" />
          <circle cx={NODE.x} cy={NODE.y} r={NODE.r} fill="#141414" />
          <circle cx={NODE.x} cy={NODE.y} r={NODE.r} stroke="url(#cl-rim)" strokeWidth="1.2" />
        </svg>

        <span
          className="absolute grid place-items-center text-[17px] tracking-[-0.01em] text-cl-fg"
          style={{ left: NODE.x - NODE.r, top: NODE.y - 10, width: NODE.r * 2 }}
        >
          Cluster
        </span>

        {SOURCES.map((source) => (
          <Source key={source.name} {...source} />
        ))}

        <AgentPill label="Research agent" x={505} y={165} cursor={{ dx: 120, dy: -12 }} />
        <AgentPill
          label="Review agent"
          x={813}
          y={218}
          icon={<AgentMark />}
          cursor={{ dx: -20, dy: -22 }}
        />
        <AgentPill
          label="Outreach agent"
          x={717}
          y={340}
          icon={<AgentMark tone="plain" />}
          cursor={{ dx: -16, dy: -24 }}
        />

        <Activity
          y={122}
          title="Account qualified"
          detail="94% ICP fit · VP Sales found"
          time="5min"
          tile={
            <span
              className="size-11 shrink-0 rounded-[8px] bg-cl-fill-hover"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 34%, #6b5d52 0 22%, transparent 23%), linear-gradient(180deg, #4a4039, #332c27)",
              }}
            />
          }
        />

        {/* The highlighted signal: paper glass, sitting over the trunk line. */}
        <div
          className="absolute flex w-[310px] items-center gap-3 rounded-[14px] py-3 pl-3 pr-4 cl-glass-paper"
          style={{ left: 1073, top: 198 }}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-[9px] bg-white text-cl-paper-fg shadow-[0_1px_2px_rgb(0_0_0/0.18)]">
            <CubeGlyph className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-[15px] font-medium leading-tight text-cl-paper-fg">
                Signal detected
              </span>
              <span className="shrink-0 text-[13px] text-cl-paper-fg-muted">2min</span>
            </div>
            <p className="mt-1 truncate text-[13px] leading-tight text-cl-paper-fg-muted">
              Cursor is hiring GTM roles
            </p>
          </div>
        </div>

        <Activity
          y={300}
          title="Sequence drafted"
          detail="Intro message · Follow-up ready"
          time="Now"
          tile={
            <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-cl-blue text-white">
              <LinkedInGlyph className="size-5" />
            </span>
          }
        />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import { AgentStar, ClusterMark, LinearGlyph, SparkleGlyph } from "./icons";

/* -- Benchmark bars --------------------------------------------------------- */

/**
 * A benchmark bar. The bar is the measurement, so its width *is* the value and
 * the label sits immediately after it rather than in a column — a longer bar
 * pushes its own label right, which is what makes the comparison readable at a
 * glance.
 */
function Bar({
  width,
  tone,
  label,
  chip,
}: {
  width: number;
  tone: "dim" | "cream";
  label: string;
  chip?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* The bar keeps its measured width until the row runs out of room; then
          the label wraps beneath it rather than the bar lying about its value. */}
      <div
        className={cn("cl-bar max-w-full shrink-0", tone === "cream" ? "bg-cl-cream" : "bg-cl-fill-hover")}
        style={{ width }}
      />
      <span className="flex shrink-0 items-center gap-2 text-[13px] text-cl-fg">
        {tone === "dim" ? (
          <span
            className="grid size-[19px] place-items-center rounded-[5px] text-white"
            style={{ background: "var(--cl-accent)" }}
          >
            <AgentStar className="size-3" />
          </span>
        ) : (
          <span className="grid size-[19px] place-items-center rounded-[5px] bg-[#171614] text-cl-fg">
            <ClusterMark className="size-3" />
          </span>
        )}
        {label}
        {chip && <span className="cl-chip cl-chip-green">{chip}</span>}
      </span>
    </div>
  );
}

/* -- The agent board on the right ------------------------------------------- */

const BACKDROP = [
  { name: "Vercel", note: "Hiring enterprise AEs", top: 262 },
  { name: "Ramp", note: "Opened pricing twice", top: 330 },
  { name: "Notion", note: "New VP Sales", top: 398 },
  { name: "Shopify", note: "Switched CRM", top: 452 },
];

function AgentBoard() {
  return (
    <div className="cl-card relative h-[505px] w-full p-0">
      {/* The queue the agents are working through. It is deliberately dim and
          deliberately real: the glass panel and the card below both blur it,
          and a texture would not bend the same way. */}
      <div className="absolute inset-0 overflow-hidden text-cl-fg-faint opacity-30" aria-hidden>
        {BACKDROP.map((row) => (
          <div key={row.name} className="absolute left-6" style={{ top: row.top }}>
            <p className="text-[15px] leading-tight">{row.name}</p>
            <p className="mt-1 text-[14px] leading-tight">{row.note}</p>
          </div>
        ))}
        <div className="absolute right-8 top-[56px] text-right">
          <p className="text-[15px] leading-tight">Hubspot</p>
          <p className="mt-1 text-[14px] leading-tight">Syncing enterprise queue</p>
        </div>
        <div className="absolute right-7 top-[176px] text-right">
          <p className="text-[14px] leading-tight">Score</p>
        </div>
        <div className="absolute right-8 top-[300px] text-right">
          <p className="text-[15px] leading-tight">Account qualified</p>
          <p className="mt-1 text-[14px] leading-tight">91% ICP fit · Outreach ready</p>
        </div>
      </div>

      {/* Spine connecting the header chip, the reasoning panel and the result. */}
      <span
        className="absolute w-px bg-cl-line"
        style={{ left: 330, top: 118, height: 268 }}
        aria-hidden
      />

      <div className="absolute" style={{ left: 176, top: 95 }}>
        <span className="inline-flex h-[38px] items-center gap-2.5 rounded-[10px] px-2.5 cl-glass">
          <span className="grid size-[22px] place-items-center rounded-[6px] bg-[#151412] text-cl-fg">
            <ClusterMark className="size-3.5" />
          </span>
          <span className="cl-eyebrow">Research agents</span>
          <span className="cl-eyebrow ml-3">56 / 236 complete</span>
        </span>
      </div>

      <div
        className="absolute rounded-[14px] p-4 cl-glass"
        style={{ left: 176, top: 144, width: 307 }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-[42px] shrink-0 place-items-center rounded-[10px] bg-cl-fill-hover text-cl-fg">
            <LinearGlyph className="size-6" />
          </span>
          <div>
            <p className="text-[16px] leading-tight text-cl-fg">Linear</p>
            <p className="mt-1.5 text-[14px] leading-tight text-cl-fg-muted">Expanding sales team</p>
          </div>
        </div>

        <div className="mt-4 border-t border-cl-line-soft pt-3.5">
          <p className="cl-eyebrow">Agent resoning</p>
          <p className="mt-2 text-[14.5px] leading-[1.45] text-cl-fg">
            LinkedIn shows 2 AEs hired recently, indicating increased GTM investment.
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="cl-chip">LinkedIn</span>
            <span className="cl-chip">2 sources</span>
          </div>
        </div>
      </div>

      {/* The result, on paper glass, lifted off the queue behind it. */}
      <div
        className="absolute flex items-center gap-3.5 rounded-[16px] py-3 pl-3 pr-4 cl-glass-paper"
        style={{ left: 171, top: 360, width: 315 }}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-white text-cl-paper-fg shadow-[0_1px_2px_rgb(0_0_0/0.18)]">
          <SparkleGlyph className="size-5" />
        </span>
        <div>
          <p className="text-[16px] font-medium leading-tight text-cl-paper-fg">Account qualified</p>
          <p className="mt-1.5 text-[14px] leading-tight text-cl-paper-fg-muted">
            88% ICP fit · Contact verified
          </p>
        </div>
      </div>
    </div>
  );
}

/* -- Section ---------------------------------------------------------------- */

export function GtmPlays() {
  return (
    <section id="how-it-works" className="cl-gutter pt-[159px]">
      <Reveal className="text-center">
        <h2 className="cl-h2 mx-auto max-w-[860px]">
          Give your agents the tools
          <br />
          to execute GTM plays
        </h2>
        <p className="cl-lead mx-auto mt-5 max-w-[890px]">
          Go from prompting to agents that proactively find leads, draft sequences, and structure
          your data.
          <br />
          Cluster is the layer between frontier models and your pipeline.
        </p>
      </Reveal>

      <div className="mt-[74px] grid items-start gap-[84px] lg:grid-cols-[minmax(0,541px)_1fr]">
        <Reveal>
          <div className="cl-play-progress w-[290px]" style={{ ["--cl-play-progress" as string]: "62%" }} />

          <div className="pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="cl-h3">Faster, more accurate prospecting.</h3>
              <span className="shrink-0 text-[19px] tracking-[-0.02em] text-cl-fg">01</span>
            </div>
            <p className="cl-body mt-3 max-w-[520px] text-[15px]">
              Cluster runs hundreds of agents in parallel while keeping every lead&apos;s context
              separate, accurate, and easy to review.
            </p>

            <div className="mt-9 space-y-3">
              <p className="cl-eyebrow flex items-center gap-2">
                <span className="size-1 rounded-full bg-cl-fg-faint" />
                Completion speed
              </p>
              <Bar width={69} tone="dim" label="Vanilla Claude" />
              <Bar width={336} tone="cream" label="Cluster + Claude" chip="6.5x" />
            </div>

            <div className="mt-7 space-y-3">
              <p className="cl-eyebrow flex items-center gap-2">
                <span className="size-1 rounded-full bg-cl-fg-faint" />
                Lead yield
              </p>
              <Bar width={252} tone="dim" label="Vanilla Claude" />
              <Bar width={328} tone="cream" label="Cluster + Claude" chip="+36%" />
            </div>

            <p className="cl-eyebrow mt-7">* Results measured on internal prospecting benchmark</p>
          </div>

          <div className="mt-11 border-t border-cl-line pt-7">
            <div className="flex items-baseline justify-between gap-6 opacity-45">
              <h3 className="cl-h3">Connect to 50+ data providers</h3>
              <span className="shrink-0 text-[19px] tracking-[-0.02em] text-cl-fg">02</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <AgentBoard />
        </Reveal>
      </div>
    </section>
  );
}

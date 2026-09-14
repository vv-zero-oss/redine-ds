import { AgentGraph } from "./agent-graph";
import { CtaButton, Reveal } from "./primitives";
import { MarkBars, MarkClarity, MarkRipple, MarkWave } from "./icons";

const CUSTOMERS = [
  { name: "TAVI", mark: null, weight: "font-extrabold tracking-[-0.06em]" },
  { name: "Modern Industrials", mark: <MarkBars count={7} className="h-4 w-[21px]" />, weight: "font-medium" },
  { name: "Ripple", mark: <MarkRipple className="size-5" />, weight: "font-bold tracking-[-0.02em]" },
  { name: "Endurance", mark: <MarkWave className="h-4 w-5" />, weight: "font-normal tracking-[-0.01em]" },
  { name: "ClarityCare", mark: <MarkClarity className="size-5" />, weight: "font-bold tracking-[-0.02em]" },
] as const;

export function Hero() {
  return (
    <section>
      <div className="cl-gutter flex flex-col items-center pt-[92px] text-center">
        <Reveal className="flex items-center gap-2.5">
          <span className="cl-eyebrow">Backed by</span>
          <span className="flex items-baseline gap-1 text-[15px] text-cl-fg">
            <span className="font-semibold tracking-[-0.06em]">a16z</span>
            <span className="text-cl-fg-subtle">/</span>
            <span className="font-bold italic tracking-[-0.02em]">speedrun</span>
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="cl-display mt-4 max-w-[900px]">GTM tools for your agents</h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="cl-lead mt-5 max-w-[646px]">
            Cluster gives your agents access to 50+ GTM data sources, linkedin &amp; email sending
            infra and the ability to orchestrate hundreds of subagents in parallel so you can
            execute any GTM play
          </p>
        </Reveal>

        <Reveal delay={180} className="mt-8">
          <CtaButton />
        </Reveal>
      </div>

      <Reveal delay={240} className="mt-[1px] mb-[33px]">
        <AgentGraph />
      </Reveal>

      {/* Trusted-by strip — a ruled band with one divider after the label. It
          keeps its 85px height only while the row fits on one line. */}
      <div className="border-y border-cl-line">
        <div className="flex flex-col items-stretch lg:h-[85px] lg:flex-row">
          <div className="hidden shrink-0 items-center border-r border-cl-line pl-[60px] pr-10 lg:flex">
            <span className="text-[14px] whitespace-nowrap text-cl-fg-subtle">Trusted by teams at</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-9 gap-y-5 px-8 py-7 text-[#b4b0a8] lg:justify-around lg:py-0">
            {CUSTOMERS.map((customer) => (
              <span key={customer.name} className="flex items-center gap-2.5 whitespace-nowrap">
                {customer.mark}
                <span className={`text-[20px] leading-none ${customer.weight}`}>{customer.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

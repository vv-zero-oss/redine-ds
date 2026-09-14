import { CtaButton, Reveal } from "./primitives";
import { ClusterMark, FacebookGlyph, InstagramGlyph, LinkedInGlyph, XGlyph } from "./icons";

/* -- Mid-page cream band ---------------------------------------------------- */

export function CreamBand() {
  return (
    <Reveal className="relative mt-[214px] overflow-hidden bg-cl-cream">
      <span className="cl-grain" aria-hidden />
      <div className="relative flex h-[459px] flex-col items-center justify-center px-8 text-center">
        <h2 className="cl-h2 max-w-[880px] text-cl-cream-fg">
          Give your agents the building
          <br />
          blocks to build pipeline
        </h2>
        <div className="mt-9">
          <CtaButton tone="dark" />
        </div>
      </div>
    </Reveal>
  );
}

/* -- Testimonials ----------------------------------------------------------- */

const QUOTES = [
  {
    quote:
      "We created highly targeted campaigns that have ripped for us - all directly in Claude. I just wispr flow into Claude and it does all the work.",
    name: "Alejandro Zaniolo",
    role: "CEO @ Signals (YCW26)",
    tint: "linear-gradient(155deg, #6d5a48, #2e2723)",
  },
  {
    quote:
      "I spun up outbound campaigns directly from Codex and am shocked by how good it works. It found the right people, enriched them and wrote highly personalized copy that landed us meetings with our ICP",
    name: "Austin Mao",
    role: "CEO @ Modern Industrials (a16z speedrun)",
    tint: "linear-gradient(155deg, #7d8794, #343a41)",
  },
] as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="mt-[118px] border-y border-cl-line">
      <div className="grid md:grid-cols-2">
        {QUOTES.map((item, index) => (
          <Reveal
            key={item.name}
            delay={index * 80}
            className={`flex min-h-[382px] flex-col p-[60px] ${
              index === 0 ? "md:border-r md:border-cl-line" : ""
            }`}
          >
            <p className="cl-quote max-w-[560px]">“{item.quote}”</p>
            <div className="mt-auto flex items-center gap-3.5 pt-10">
              <span
                className="size-12 shrink-0 rounded-[10px]"
                style={{ background: item.tint }}
                aria-hidden
              />
              <span>
                <span className="block text-[15px] leading-tight text-cl-fg">{item.name}</span>
                <span className="mt-1 block text-[15px] leading-tight text-cl-fg-subtle">
                  {item.role}
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -- Closing CTA + footer --------------------------------------------------- */

const SOCIAL = [
  { label: "Facebook", icon: <FacebookGlyph className="size-[18px]" /> },
  { label: "Instagram", icon: <InstagramGlyph className="size-[18px]" /> },
  { label: "X", icon: <XGlyph className="size-4" /> },
  { label: "LinkedIn", icon: <LinkedInGlyph className="size-[18px]" /> },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-cl-cream text-cl-cream-fg">
      <span className="cl-grain" aria-hidden />

      <div className="cl-frame cl-frame-cream cl-gutter relative">
        <Reveal className="flex flex-col items-center pt-[104px] pb-[100px] text-center">
          <h2 className="cl-h2 max-w-[840px] text-cl-cream-fg">
            Turn your growth ideas
            <br />
            into reality today
          </h2>
          <p className="mt-5 max-w-[520px] text-[16px] leading-[1.6] text-cl-cream-fg-muted">
            Automated optimization, guided by real customer behavior and measured by revenue.
          </p>
          <div className="mt-9">
            <CtaButton tone="dark" />
          </div>
        </Reveal>
      </div>

      {/* The wordmark watermark, clipped by the page floor. */}
      <div className="relative border-t border-cl-cream-line">
        <span
          className="pointer-events-none absolute inset-x-0 -bottom-[58px] select-none whitespace-nowrap text-center leading-none"
          style={{
            fontSize: 465,
            fontWeight: 500,
            letterSpacing: "-0.035em",
            color: "var(--cl-cream-mark)",
          }}
          aria-hidden
        >
          Cluster
        </span>

        <div className="cl-frame cl-frame-cream cl-gutter relative flex flex-col gap-6 pt-[196px] pb-11 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="flex items-center gap-2 text-cl-cream-fg">
              <ClusterMark className="size-[18px]" />
              <span className="text-[19px] font-medium tracking-[-0.02em]">Cluster</span>
            </span>
            <p className="mt-3 text-[14px] text-cl-cream-fg-muted">
              ©2025 Cluster Software Inc. Handcrafted with ❤️ in 🗽
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <div className="flex items-center gap-5 text-cl-cream-fg">
              {SOCIAL.map((item) => (
                <a key={item.label} href="#" aria-label={item.label} className="opacity-90 hover:opacity-100">
                  {item.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-7 text-[14px] text-cl-cream-fg-muted">
              <a href="#" className="no-underline hover:text-cl-cream-fg">
                Terms of Service
              </a>
              <a href="#" className="no-underline hover:text-cl-cream-fg">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

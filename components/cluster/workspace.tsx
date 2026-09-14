import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";
import {
  AgentStar,
  BarsGlyph,
  CompassGlyph,
  Cursor,
  GiftGlyph,
  HubspotGlyph,
  LinkedInGlyph,
  MailGlyph,
  PhoneGlyph,
  SearchGlyph,
  XGlyph,
} from "./icons";

/* -- Shared card shell ------------------------------------------------------ */

function Card({
  title,
  body,
  children,
  className,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("cl-card flex h-[453px] flex-col p-8", className)}>
      <h3 className="cl-card-title">{title}</h3>
      <p className="cl-body mt-2 max-w-[480px]">{body}</p>
      <div className="relative mt-auto">{children}</div>
    </div>
  );
}

/* -- 1. Agentic prospecting ------------------------------------------------- */

const LEADS = [
  { company: "Cursor", signal: "Hiring GTM roles", buyer: "Founder", fit: "94%", contact: "phone", action: "Draft intro" },
  { company: "Lovable", signal: "Hosted 12 events", buyer: null, fit: "93%", contact: "mail", action: "Hackathon invite" },
  { company: null, signal: "Team growth", buyer: null, fit: null, contact: null, action: null },
  { company: null, signal: "Hiring engineers", buyer: null, fit: null, contact: null, action: null },
];

function Redacted({ w }: { w: number }) {
  return <span className="inline-block h-[13px] rounded-[3px] bg-cl-fill-hover" style={{ width: w }} />;
}

function ProspectingTable() {
  return (
    <div className="relative h-[268px]">
      {/* The list runs past the card's floor and is masked out, so it reads as
          a live table rather than a cropped screenshot. */}
      <div
        className="relative"
        style={{ maskImage: "linear-gradient(180deg, #000 62%, transparent 92%)", WebkitMaskImage: "linear-gradient(180deg, #000 62%, transparent 92%)" }}
      >
        <div className="grid grid-cols-[70px_136px_74px_50px_44px_1fr] items-center gap-3 pb-2.5 text-[12.5px] text-cl-fg">
          <span>Company</span>
          <span>Signal</span>
          <span>Buyer</span>
          <span>Fit</span>
          <span>Contact</span>
          <span>Action</span>
        </div>
        {LEADS.map((lead, i) => (
          <div
            key={i}
            className="grid grid-cols-[70px_136px_74px_50px_44px_1fr] items-center gap-3 border-t border-cl-line-soft py-2.5 text-[12.5px]"
          >
            <span className="text-cl-fg">{lead.company ?? <Redacted w={46} />}</span>
            <span className="text-cl-fg-subtle">{lead.signal}</span>
            <span className="text-cl-fg-subtle">{lead.buyer ?? <Redacted w={40} />}</span>
            <span>
              {lead.fit ? (
                <span className="cl-chip cl-chip-green tabular-nums">{lead.fit}</span>
              ) : (
                <Redacted w={30} />
              )}
            </span>
            <span>
              {lead.contact ? (
                <span className="grid size-[22px] place-items-center rounded-[5px] bg-cl-fill-hover text-cl-fg">
                  {lead.contact === "phone" ? (
                    <PhoneGlyph className="size-3" />
                  ) : (
                    <MailGlyph className="size-3" />
                  )}
                </span>
              ) : null}
            </span>
            <span>
              {lead.action ? (
                <span className="cl-chip cl-chip-strong">{lead.action}</span>
              ) : (
                <Redacted w={82} />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* An agent at work, mid-table. */}
      <div className="absolute left-[236px] top-[130px]">
        <Cursor className="absolute -left-3 -top-3 h-4 w-3" />
        <span className="cl-agent-pill">
          <span
            className="grid size-[22px] shrink-0 place-items-center rounded-[6px] text-white"
            style={{ background: "var(--cl-accent)" }}
          >
            <AgentStar className="size-3.5" />
          </span>
          Researching…
        </span>
      </div>

      {/* Glass search bar, floating over the fading rows. */}
      <div className="absolute inset-x-0 bottom-2 mx-auto flex h-[44px] w-[400px] items-center gap-3 rounded-pill px-4 cl-glass">
        <SearchGlyph className="size-4 shrink-0 text-cl-fg-muted" />
        <span className="flex-1 truncate text-[13.5px] text-cl-fg">
          Founders · Seed B2b · Hiring First AE
        </span>
        <span className="shrink-0 text-[13px] text-cl-fg-faint">63 sources</span>
      </div>
    </div>
  );
}

/* -- 2. Signals ------------------------------------------------------------- */

const CLOUD = [
  { t: "2 mins ago", x: 2, y: 6, r: -18, s: 12 },
  { t: "raised Series A", x: 30, y: 2, r: 12, s: 13 },
  { t: "hiring 4 AEs", x: 66, y: 10, r: -8, s: 12 },
  { t: "switched CRM", x: 8, y: 30, r: 22, s: 13 },
  { t: "new buying team", x: 40, y: 26, r: -14, s: 14 },
  { t: "3 mins ago", x: 74, y: 34, r: 16, s: 12 },
  { t: "posted on x.com", x: 4, y: 56, r: -10, s: 13 },
  { t: "opened pricing", x: 36, y: 60, r: 18, s: 12 },
  { t: "board hire", x: 70, y: 58, r: -20, s: 13 },
  { t: "visited 6 pages", x: 16, y: 80, r: 8, s: 12 },
  { t: "warm intro found", x: 52, y: 84, r: -16, s: 13 },
];

function SignalsBoard() {
  return (
    <div className="relative h-[268px]">
      {/* The cloud is what the glass panel blurs — without it the panel is just
          a translucent rectangle. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {CLOUD.map((word) => (
          <span
            key={word.t}
            className="absolute whitespace-nowrap text-cl-fg-faint"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              rotate: `${word.r}deg`,
              fontSize: word.s,
              opacity: 0.34,
            }}
          >
            {word.t}
          </span>
        ))}
      </div>

      <div className="relative ml-[52px] mr-[34px] mt-4 rounded-[14px] p-4 cl-glass">
        <p className="text-[15px] font-medium leading-tight text-cl-fg">In-market this week</p>
        <p className="mt-1.5 text-[13.5px] leading-tight text-cl-fg-muted">
          Accounts showing fresh buying signals across four categories.
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          <span className="cl-chip cl-chip-strong">18 accounts detected</span>
          <span className="cl-chip">9 hiring</span>
          <span className="cl-chip">5 funding</span>
          <span className="cl-chip">4 engagement</span>
        </div>
      </div>

      <p className="cl-eyebrow relative mt-8">Watched across 50+ sources</p>
      <div className="relative mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px] text-cl-fg">
        <span className="flex items-center gap-2">
          <CompassGlyph className="size-4 text-cl-fg-muted" /> Website visitors
        </span>
        <span className="flex items-center gap-2">
          <HubspotGlyph className="size-4 text-cl-fg-muted" /> Hubspot
        </span>
        <span className="flex items-center gap-2">
          <span className="grid size-[18px] place-items-center rounded-[4px] bg-white text-[#0a66c2]">
            <LinkedInGlyph className="size-2.5" />
          </span>
          LinkedIn
        </span>
        <span className="flex items-center gap-2">
          <XGlyph className="size-3.5" /> x.com
        </span>
      </div>
    </div>
  );
}

/* -- 3. Self-improving sequences -------------------------------------------- */

function SequenceBoard() {
  return (
    <div className="relative h-[268px]">
      <div className="w-[62%] space-y-2.5">
        <div className="cl-row">
          <span className="cl-tile">
            <MailGlyph className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] leading-tight text-cl-fg">Personalized Value Email</p>
            <p className="mt-1 text-[13px] leading-tight text-cl-fg-subtle">Drafted in your voice</p>
          </div>
        </div>

        {/* The winning touch, lifted onto paper. */}
        <div className="cl-paper relative z-10 flex min-h-[62px] items-center gap-3 rounded-2xl px-3">
          <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-cl-blue text-white">
            <LinkedInGlyph className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] leading-tight font-medium text-cl-paper-fg">
              DM Linkedin Post Engagers
            </p>
            <p className="mt-1 text-[13px] leading-tight text-cl-paper-fg-muted">
              Top-performing pattern
            </p>
          </div>
        </div>

        <div className="cl-row">
          <span className="cl-tile">
            <MailGlyph className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] leading-tight text-cl-fg">Email Follow-up</p>
            <p className="mt-1 text-[13px] leading-tight text-cl-fg-subtle">
              Pattern applied to 12 sequences
            </p>
          </div>
        </div>
      </div>

      {/* Outcomes, wired to the winning touch. */}
      <div className="absolute right-0 top-1/2 w-[42%] -translate-y-1/2 text-right">
        <p className="text-[13.5px] text-cl-fg-subtle">+12% Connect rate</p>
        <span className="cl-paper my-2.5 inline-flex h-[38px] items-center gap-2 rounded-pill px-4 text-[14px] font-medium">
          <BarsGlyph className="size-3.5" />
          +18% reply rate
        </span>
        <p className="text-[13.5px] text-cl-fg-subtle">−21% Time to reply</p>
      </div>
      <span
        className="absolute top-1/2 h-px"
        style={{
          left: "60%",
          right: "38%",
          background: "linear-gradient(90deg, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.15))",
        }}
      />
    </div>
  );
}

/* -- 4. Gifting ------------------------------------------------------------- */

function GiftingBoard() {
  return (
    <div className="relative h-[268px]">
      <div className="w-[74%] space-y-2.5">
        <div className="cl-row pr-2.5">
          <span className="cl-tile">
            <GiftGlyph className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-tight text-cl-fg">Gifting campaign launched</p>
            <p className="mt-1 text-[13px] leading-tight text-cl-fg-subtle">
              12 qualified prospects selected
            </p>
          </div>
          <span className="cl-chip cl-chip-green">LIVE</span>
        </div>

        <div className="cl-row pr-2.5">
          <span className="cl-tile text-[17px] leading-none">🧁</span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-tight text-cl-fg">Gift delivery scheduled</p>
            <p className="mt-1 text-[13px] leading-tight text-cl-fg-subtle">
              Cupcakes · Framer&apos;s office
            </p>
          </div>
          <span className="cl-chip">Arrives today</span>
        </div>
      </div>

      {/* The handwritten card, tilted out of the stack. */}
      <div
        className="absolute -right-4 -top-2 w-[210px] rotate-[7deg] rounded-[4px] p-4 text-[11px] leading-[1.9] italic"
        style={{
          color: "#4a463f",
          background: "linear-gradient(160deg, #efece4, #ddd9cf)",
          boxShadow: "var(--cl-shadow-float)",
        }}
        aria-hidden
      >
        <p>Dear Cursor team,</p>
        <p className="mt-2.5">
          Thought your team deserved something sweeter than another sales pitch.
        </p>
        <p className="mt-2.5">Enjoy!</p>
      </div>

      <div className="absolute left-[52px] bottom-[26px]">
        <Cursor className="absolute -left-3 -top-4 h-4 w-3" />
        <span className="cl-agent-pill cl-agent-pill-plain">Gifting agent</span>
      </div>
      <div className="absolute left-[232px] bottom-[-14px]">
        <Cursor className="absolute -left-4 -top-4 h-4 w-3" />
        <span className="cl-agent-pill cl-agent-pill-plain">Personalization agent</span>
      </div>
    </div>
  );
}

/* -- Section ---------------------------------------------------------------- */

export function Workspace() {
  return (
    <section id="features" className="cl-gutter pt-[134px]">
      <Reveal className="text-center">
        <h2 className="cl-h2 mx-auto max-w-[920px]">
          A complete workspace for outbound,
          <br />
          for agents and humans
        </h2>
        <p className="cl-lead mx-auto mt-5 max-w-[492px]">
          Agents do the grunt work. You review, steer, and take the meetings. Every step lives in
          one place.
        </p>
      </Reveal>

      <div className="mt-[8px] grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card
            title="Agentic prospecting"
            body="Cut list building from hours to minutes. Agents pull leads from 50+ sources, enrich, score them, and push to CRM with your guardrails and deduping logic."
          >
            <ProspectingTable />
          </Card>
        </Reveal>
        <Reveal delay={80}>
          <Card
            title="Signals"
            body="Social media engagement, funding, hiring, tool switches. Watch the web & third party data sources and tell you who's in-market this week, not last quarter."
          >
            <SignalsBoard />
          </Card>
        </Reveal>
        <Reveal delay={40}>
          <Card
            title="Self-Improving Campaign Sequences"
            body="Email and LinkedIn touches drafted based on your voice & proven copy. Agents pick up on winning patterns to proactively double down on what works."
          >
            <SequenceBoard />
          </Card>
        </Reveal>
        <Reveal delay={120}>
          <Card
            title="Gifting"
            body="Send cupcakes, cake, or cookies to a prospect's office. Same-day, hand-delivered, with a handwritten note. Agents launch the campaign and the courier shows up."
          >
            <GiftingBoard />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

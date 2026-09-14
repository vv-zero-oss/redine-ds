"use client";

import { useId, useState } from "react";
import { Reveal } from "./primitives";

const GROUPS = [
  {
    label: "Getting started",
    items: [
      {
        q: "How long does it take to set up?",
        a: "30 minutes to install, our team handles it for you.",
      },
      {
        q: "What platforms do you support?",
        a: "Anything with a public API and a CRM you already pay for — HubSpot, Salesforce, Attio, and the rest of the stack your team lives in.",
      },
    ],
  },
  {
    label: "Product & workflow",
    items: [
      {
        q: "What kind of results can I expect?",
        a: "Teams typically see a 6.5x faster list build and a third more qualified leads in the first month, measured against their own baseline.",
      },
      {
        q: "What if I don’t know what to test?",
        a: "Cluster proposes the plays. You approve the ones worth running and it queues the rest behind them.",
      },
      {
        q: "What if I already have ideas about what to test?",
        a: "Describe the play in plain language. Agents turn it into a sequence, a list, and a set of guardrails you can edit before anything sends.",
      },
      {
        q: "Can we tweak the variants?",
        a: "Every draft is editable — copy, timing, and the audience — and edits feed back into the patterns agents reuse.",
      },
    ],
  },
  {
    label: "Technical & performance",
    items: [
      {
        q: "Does Cluster slow down my site?",
        a: "No. Everything runs server-side against your data sources; nothing ships to your marketing site.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. The whole workspace is built for operators, and the agents write the queries for you.",
      },
      {
        q: "What if I don’t have a developer?",
        a: "Our team does the install and stays on call through the first two plays.",
      },
      {
        q: "What if I don’t have a designer?",
        a: "Sequences ship in your voice with proven copy patterns — no design work required.",
      },
    ],
  },
  {
    label: "Integrations",
    items: [
      {
        q: "Does it integrate with landing page builders?",
        a: "Yes — Framer, Webflow, and anything that can accept a webhook.",
      },
      {
        q: "What other apps does Cluster integrate with?",
        a: "50+ GTM data sources, LinkedIn and email sending infrastructure, plus your CRM and warehouse.",
      },
    ],
  },
] as const;

function Item({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const panelId = useId();

  return (
    <div className="cl-faq-item">
      <button
        type="button"
        className="cl-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{q}</span>
        <span className="cl-faq-sign" aria-hidden />
      </button>
      {/* The panel is always in the DOM and animates its own height through a
          collapsing grid row — no measuring, and no jump when it reflows. */}
      <div id={panelId} className="cl-faq-panel" data-open={open} role="region">
        <div>
          <p className="cl-body pb-6 max-w-[620px] text-[15px]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="cl-gutter pt-[106px] pb-[249px]">
      <Reveal>
        <h2 className="cl-h2">Frequently Asked Questions</h2>
      </Reveal>

      <div className="mt-[81px] space-y-14">
        {GROUPS.map((group, groupIndex) => (
          <Reveal key={group.label} className="grid gap-8 md:grid-cols-[442px_1fr] md:gap-0">
            <p className="cl-eyebrow pt-[26px]">{group.label}</p>
            <div>
              {group.items.map((item, index) => (
                <Item
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  defaultOpen={groupIndex === 0 && index === 0}
                />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";

const FEATURES = [
  "Up to 30 websites",
  "Cookieless tracking",
  "GDPR-ready (DPA included)",
  "3 years of data retention",
  "Realtime visitors map",
  "Funnels",
  "Conversions",
  "Custom events",
  "Revenue attribution",
  "UTM campaign and reports",
  "First-party collect hostname",
  "Traffic alerts",
  "Web Vitals & performance insights",
  "Data export and import",
  "Team access, agent API, and CLI",
  "Raycast extension",
  "Monthly email reports",
];

/* Monthly price per volume. Yearly is ten months' worth — "2 months free".
   Only the 100K figure was on the reference; the rest are placeholders. */
const TIERS = [
  { events: "100K", monthly: 9 },
  { events: "500K", monthly: 19 },
  { events: "1M", monthly: 29 },
  { events: "3M", monthly: 49 },
  { events: "5M", monthly: 69 },
  { events: "10M", monthly: 99 },
];

type Billing = "monthly" | "yearly";

/**
 * Pricing — every feature on the left, the event volume on the right. The
 * billing switch and the volume radios drive the price column and the
 * trial note under the CTA; nothing else changes between plans.
 */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [tier, setTier] = useState(0);
  const name = useId();
  const yearly = billing === "yearly";

  const price = (monthly: number) => (yearly ? monthly * 10 : monthly);
  const unit = yearly ? "/yr" : "/mo";
  const chosen = TIERS[tier];

  return (
    <div className="lp-pricing" id="pricing">
      <article className="lp-pricing-card">
        <h2 className="lp-pricing-title">
          <strong>Pricing.</strong> Same features on every plan; only the event volume changes.
          Nothing to pay today: start with a 15-day free trial, no credit card required, and pick
          your volume when the trial ends.
        </h2>
        <ul className="lp-pricing-features">
          {FEATURES.map((feature) => (
            <li key={feature} className="lp-pricing-feature">
              <svg className="lp-pricing-check" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 6.25 5 8.75l4.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </article>

      <article className="lp-pricing-card" aria-label="Choose a plan">
        <div className="lp-pricing-billing">
          <span className="lp-pricing-billing-label" data-active={!yearly || undefined}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly"
            className="lp-pricing-switch"
            onClick={() => setBilling(yearly ? "monthly" : "yearly")}
          >
            <span className="lp-pricing-switch-thumb" aria-hidden />
          </button>
          <span className="lp-pricing-billing-label" data-active={yearly || undefined}>
            Yearly
          </span>
          <span className="lp-pricing-badge">2 months free</span>
        </div>

        <fieldset className="lp-pricing-tiers">
          <legend className="lp-pricing-legend">Monthly event volume</legend>
          {TIERS.map((t, i) => (
            <label key={t.events} className="lp-pricing-tier">
              <input
                type="radio"
                name={name}
                className="lp-pricing-radio"
                checked={tier === i}
                onChange={() => setTier(i)}
              />
              <span className="lp-pricing-tier-events">{t.events} events a month</span>
              <span className="lp-pricing-tier-price">
                ${price(t.monthly)}
                <span className="lp-pricing-tier-unit">{unit}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="lp-pricing-cta">
          <a className="lp-btn lp-btn-primary lp-pricing-cta-btn" href="/signup">
            Start free for 15 days
            <span className="lp-btn-shine" aria-hidden />
          </a>
          <p className="lp-pricing-note" aria-live="polite">
            Free for 15 days, then ${price(chosen.monthly)}
            {unit}, billed {billing} + local taxes. Upgrade or downgrade anytime and cancel anytime.
          </p>
        </div>
      </article>
    </div>
  );
}

"use client";

import { useState } from "react";

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

/* Kobbe's tiers, one to one. Yearly is ten months — "2 months free". */
const TIERS = [
  { key: "events_100k", events: "100K", monthly: 9, yearly: 90 },
  { key: "events_500k", events: "500K", monthly: 19, yearly: 190 },
  { key: "events_1m", events: "1M", monthly: 29, yearly: 290 },
  { key: "events_3m", events: "3M", monthly: 59, yearly: 590 },
  { key: "events_5m", events: "5M", monthly: 89, yearly: 890 },
  { key: "events_10m", events: "10M", monthly: 169, yearly: 1690 },
];

type Period = "monthly" | "yearly";

const usd = (n: number) => `$${new Intl.NumberFormat("en-US").format(n)}`;

/**
 * Pricing — every feature on one card, every volume on the other. The only
 * control is the billing switch; the CTA and its note always describe the
 * entry tier, as on the reference.
 */
export function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");
  const yearly = period === "yearly";
  const entry = TIERS[0];
  const signup = `https://app.kobbe.io/signup?${new URLSearchParams({ tier: entry.key, period })}`;

  return (
    <div id="pricing" className="lp-pricing">
      <article className="lp-pricing-card lp-pricing-card-features" aria-label="Included features">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative spot, sized by CSS */}
        <img
          className="lp-pricing-spot"
          src="/landing/spot-gull-coin-640.webp"
          srcSet="/landing/spot-gull-coin-320.webp 320w, /landing/spot-gull-coin-640.webp 640w"
          sizes="64px"
          width={640}
          height={516}
          alt=""
          loading="lazy"
        />
        <h2 className="lp-pricing-title">
          <span className="lp-pricing-title-lead">Pricing.</span>{" "}
          <span>
            Same features on every plan; only the event volume changes. Nothing to pay today:
            start with a 15-day free trial, no credit card required, and pick your volume when the
            trial ends.
          </span>
        </h2>
        <ul className="lp-pricing-features" role="list">
          {FEATURES.map((feature) => (
            <li key={feature} className="lp-pricing-feature">
              <svg className="lp-pricing-mark" viewBox="0 0 542 542" fill="none" aria-hidden>
                <path
                  className="lp-pricing-mark-cross"
                  d="M295.5 246.25V0H246.25V246.25H0V295.5H246.25V541.75H295.5V295.5H541.75V246.25H295.5Z"
                />
                <rect className="lp-pricing-mark-hole" width="63" height="63" transform="translate(239.875 239.875)" />
              </svg>
              <p className="lp-pricing-feature-text">{feature}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className="lp-pricing-card lp-pricing-card-plans" aria-label="Pricing plans">
        <div className="lp-pricing-billing">
          <span className="lp-pricing-period" data-active={!yearly || undefined}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={`${yearly ? "Yearly" : "Monthly"} billing. Switch to ${yearly ? "monthly" : "yearly"}.`}
            className="lp-pricing-switch"
            onClick={() => setPeriod(yearly ? "monthly" : "yearly")}
          >
            <span className="lp-pricing-switch-track" aria-hidden />
            <span className="lp-pricing-switch-thumb" aria-hidden />
          </button>
          <span className="lp-pricing-period" data-active={yearly || undefined}>
            Yearly
          </span>
          <span className="lp-pricing-period" data-active={yearly || undefined}>
            2 months free
          </span>
        </div>

        <ul className="lp-pricing-tiers" role="list">
          {TIERS.map((tier) => {
            const amount = yearly ? tier.yearly : tier.monthly;
            return (
              <li key={tier.key} className="lp-pricing-tier">
                <span>{tier.events} events a month</span>
                <span
                  className="lp-pricing-price"
                  aria-label={
                    yearly
                      ? `${usd(amount)} per year, billed annually — 2 months free`
                      : `${usd(amount)} per month, billed monthly`
                  }
                >
                  <span className="lp-pricing-amount">{usd(amount)}</span>
                  <span className="lp-pricing-unit">{yearly ? "/yr" : "/mo"}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="lp-pricing-cta">
          <a className="lp-pricing-cta-btn" href={signup}>
            Start free for 15 days
          </a>
          <p className="lp-pricing-note">
            {yearly
              ? `Free for 15 days, then ${usd(entry.yearly)}/yr, billed annually + local taxes`
              : `Free for 15 days, then ${usd(entry.monthly)}/mo, billed monthly + local taxes`}{" "}
            Upgrade or downgrade anytime and cancel anytime
          </p>
        </div>
      </article>
    </div>
  );
}

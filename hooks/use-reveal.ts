"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll entrance for marketing sections.
 *
 * An IntersectionObserver flips `data-shown` once and then unobserves — the
 * element never animates twice, and nothing runs on scroll. All the motion
 * itself (distance, duration, curve, the reduced-motion variant) lives in the
 * `.cl-reveal` recipe in src/cluster.css; this only says *when*.
 *
 * Anything already on screen at mount is marked shown immediately, so the
 * hero never fades in under the reader.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(rootMargin = "-12% 0px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.dataset.shown = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}

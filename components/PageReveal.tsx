"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import styles from "./PageReveal.module.css";

/**
 * Page-load reveal — reference/specs/motion-reveals.md `8z2bhi` ("Body"),
 * confirmed live in reference/specs/motion-confirmed.md #1: the whole page
 * rises ~150px and fades in once, on load — not scroll-triggered, hence
 * `animate` here rather than `whileInView`.
 *
 * No reveal at the 768px tablet breakpoint — see PageReveal.module.css.
 *
 * Investigated a reported bug (mobile, both locales): the page loaded
 * scrolled partway into the hero instead of at the top. Ruled out:
 * - No autofocus/scrollIntoView/focus() anywhere in this codebase (the
 *   only tabIndex is Testimonials' carousel region, which doesn't move
 *   focus on mount by itself).
 * - The reveal's own `y: 150 -> 0` is a CSS transform, not a layout
 *   change (it doesn't reflow or resize anything), so it can't be the
 *   thing pulling scrollTop away from 0 — if anything, a transform-only
 *   shift would show as blank space above the content while it settles,
 *   not as content already scrolled past.
 * That leaves the browser's native `history.scrollRestoration`, which
 * defaults to "auto" and was never touched anywhere in this app: on
 * reload (or a same-URL revisit during dev/testing), the browser
 * silently re-applies whatever scroll offset was last recorded against
 * that history entry, which reads exactly like "loads scrolled into the
 * hero" once you'd scrolled there before reloading. Fixed by opting this
 * page out of that native restore and explicitly pinning to the top on
 * mount instead — useLayoutEffect (not useEffect) so it runs before the
 * browser paints the first client-rendered frame, avoiding a visible
 * jump. Applied unconditionally (not mobile-gated): forcing scrollY to 0
 * on load is correct at every breakpoint, and a no-op wherever the page
 * was already at the top, so it can't affect tablet/desktop behavior.
 */
export default function PageReveal({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className={styles.reveal}
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

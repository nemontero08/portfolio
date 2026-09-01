"use client";

import { motion } from "motion/react";
import styles from "./BackButton.module.css";

const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

/**
 * Reproduces reference/framer-original/how-i-work's "Close Button" element
 * (href="../", i.e. this page's link back to home) — confirmed via its
 * static markup/CSS, not the old spec:
 * - 48x48 circle, border 1.01px solid rgb(231, 229, 228) (== our
 *   --color-text-primary), background rgba(0,0,0,0), backdrop-filter:
 *   blur(5px), fully round.
 * - Icon: a plain "plus" glyph (viewBox 0 0 24 24, stroke rgb(217, 219, 222),
 *   stroke-width 2) rotated 45deg to read as an "X" — the rotation is a
 *   confirmed REST-state value baked into the static markup, not a hover
 *   effect.
 * - Sticky at top:0, 32px from the page top via padding, and — confirmed,
 *   not assumed — horizontally CENTERED on the page (its wrapper is
 *   width:min-content inside a parent with align-items:center), not pinned
 *   to the left edge like a typical "back" control.
 *
 * HOVER is NOT verifiable from static CSS: the source's two hover-variant
 * classes (framer-v-3vcljy / framer-v-11rbkt1) resolve to the exact same
 * declaration block (cursor:pointer only) everywhere in the captured
 * stylesheet — real hover styling only exists in Framer's runtime JS, which
 * this offline capture doesn't include. APPROXIMATED below with a soft fill
 * on hover — flag to replace once verified against the live site.
 */
const backgroundVariants = {
  rest: { backgroundColor: "rgba(0, 0, 0, 0)" },
  hover: { backgroundColor: "rgba(231, 229, 228, 0.08)" },
};

export default function BackButton() {
  return (
    <div className={styles.wrap}>
      <motion.a
        href="/"
        aria-label="Back to home"
        className={styles.button}
        initial="rest"
        whileHover="hover"
        variants={backgroundVariants}
        transition={TRANSITION}
      >
        <svg viewBox="0 0 24 24" className={styles.icon} style={{ transform: "rotate(45deg)" }} aria-hidden>
          <path d="M5 12H19" stroke="rgb(217, 219, 222)" strokeWidth={2} strokeLinecap="round" />
          <path d="M12 5V19" stroke="rgb(217, 219, 222)" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </motion.a>
    </div>
  );
}

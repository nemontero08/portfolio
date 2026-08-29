"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import Pill from "@/components/ui/Pill";
import CursorFollowPill from "@/components/ui/CursorFollowPill";
import styles from "./CaseStudyCard.module.css";

/**
 * Reusable card for the homepage's 3 case studies. Verified against the
 * original's compiled component source
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/ZITs4QJDF.DGGAzRZZ.mjs)
 * for all 3 cards' actual "Desktop" variant (the one that renders at our
 * build's breakpoint) — NOT the old component-motion-spec, which didn't
 * distinguish this:
 *
 * - Vitalmed (the only card with a real link) is the ONLY one with a tint
 *   hover: base `rgba(15, 76, 182, 0.6)` -> hover `rgb(15, 76, 182)` (same
 *   hue, alpha 0.6 -> 1), on the site's standard spring transition. That's
 *   its only hover change.
 * - Basalto and Lumine Gas render fully SOLID (no alpha at all) at this
 *   breakpoint in the source — the 0.6-alpha version only exists in their
 *   separate "Small" (mobile) variant, unrelated to hover. They have no
 *   background hover animation; instead they carry `cursor: none` and a
 *   `data-framer-cursor` attribute wiring up the cursor-follow
 *   "Under construction" pill.
 * - Pill content order is `🛠️` THEN "Under construction" — confirmed via
 *   the compiled CSS's flex `order` (order:0 for the emoji, order:1 for the
 *   text), the reverse of their DOM order.
 */
const TINT_TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const tintVariants = (rgb: string) => ({
  rest: { backgroundColor: `rgba(${rgb}, 0.6)` },
  hover: { backgroundColor: `rgba(${rgb}, 1)` },
});

interface CaseStudyCardProps {
  /** "R, G, B" triple, e.g. "212, 199, 143" — both the solid and 0.6-alpha forms are derived from this. */
  background: string;
  /** Light-background cards (e.g. Lumine Gas) need dark text for contrast — not extracted, a necessary inference. */
  textColor?: string;
  pillBackground: string;
  pills: string[];
  eyebrow?: string;
  heading: ReactNode;
  /** Placeholder only — real assets aren't wired up yet. */
  imagePlaceholder?: string;
  /** Real link + tint hover. Mutually exclusive with underConstruction. */
  href?: string;
  /** No link; cursor:none + cursor-follow "Under construction" pill instead. */
  underConstruction?: boolean;
}

export default function CaseStudyCard({
  background,
  textColor,
  pillBackground,
  pills,
  eyebrow,
  heading,
  imagePlaceholder,
  href,
  underConstruction = false,
}: CaseStudyCardProps) {
  const [hovering, setHovering] = useState(false);
  const textStyle = textColor ? ({ color: textColor } as CSSProperties) : undefined;

  const content = (
    <>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <p className={styles.heading}>{heading}</p>
      </div>
      <div className={styles.pills}>
        {pills.map((pill) => (
          <Pill key={pill} background={pillBackground}>
            {pill}
          </Pill>
        ))}
      </div>
      {imagePlaceholder && <div className={styles.imagePlaceholder}>{imagePlaceholder}</div>}
    </>
  );

  if (underConstruction) {
    return (
      <div
        className={`${styles.card} ${styles.underConstruction}`}
        style={{ background: `rgb(${background})`, ...textStyle }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {content}
        <CursorFollowPill active={hovering}>
          <span aria-hidden>🛠️</span>
          <span>Under construction</span>
        </CursorFollowPill>
      </div>
    );
  }

  return (
    <motion.a
      className={`${styles.card} ${styles.active}`}
      href={href}
      style={textStyle}
      initial="rest"
      whileHover="hover"
      variants={tintVariants(background)}
      transition={TINT_TRANSITION}
    >
      {content}
    </motion.a>
  );
}

"use client";

import { Fragment, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
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
 * - Vitalmed's phone mockup (`image` prop) is a single pre-rendered PNG
 *   (377x345, real file, not a composited frame+screenshot) positioned
 *   `position:absolute; bottom:0; right:0` in the source — flush with the
 *   card's corner, not parked off-card. No rotate/transform exists anywhere
 *   in the source for this element; whatever tilt is visible is baked into
 *   the image asset itself. Source's fixed size (181x166px) is scaled up
 *   here as a percentage of the card instead of reused literally — our
 *   grid cell is far bigger than Framer's authored 336x274 default, and
 *   the literal pixel size would read as lost/tiny rather than "corner
 *   accent," which is a judgment call, not an extracted value.
 * - "VITALMED" text does NOT exist anywhere in the captured markup's DOM —
 *   verified by grepping the whole page for "vitalmed" (case-insensitive):
 *   every match is the `href="vitalmed/"` URL. It turns out to be an SVG
 *   logotype (vector letterforms), not text — reference/specs/vitalmed-logo.svg
 *   — which is why the text search found nothing; wired in via `titleLogo`.
 *
 * CORRECTED text hierarchy for Basalto/Lumine Gas (previously backwards —
 * see page.tsx for the exact per-card values pulled from source): each has
 * a big TITLE (`title` prop — the project name, e.g. "BASALTO") in its own
 * distinct display font at 28px/800 in the source, and a smaller SUBTITLE
 * (`heading` prop, confirmed 16px, Inter, the site's default text preset)
 * below it — there is no separate "eyebrow" at all; that was this
 * component's own earlier misreading of the source, not something in it.
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
  /** Optional wordmark/logo image, rendered in place of `title` (Vitalmed only). */
  titleLogo?: ReactNode;
  /** The big project-name title (Basalto/Lumine Gas). Mutually exclusive with titleLogo. */
  title?: ReactNode;
  /** Source default is 28px/800 — pages may override (see page.tsx). */
  titleFontSize?: number;
  titleFontFamily?: string;
  /** The smaller subtitle text below the title (confirmed 16px in source for Basalto/Lumine). */
  heading: ReactNode;
  headingFontSize?: number;
  /** e.g. Lumine Gas's subtitle is 0.8 alpha of its title color in the source. */
  headingOpacity?: number;
  /** Decorative background pattern (Basalto/Lumine only) — see CardTexture. */
  texture?: ReactNode;
  /** Real mockup image — position:absolute, bottom-right corner, per the source. */
  image?: { src: string; aspectRatio: number; alt?: string };
  /** Real link + tint hover. Mutually exclusive with underConstruction. */
  href?: string;
  /** No link; cursor:none + cursor-follow "Under construction" pill instead. */
  underConstruction?: boolean;
  /** Label for the cursor-follow pill, translated by the caller. Required when underConstruction is set. */
  underConstructionLabel?: string;
  /**
   * Vitalmed-only mobile request: tighter tag pills (smaller gap/font/padding)
   * at <=425px, without touching Basalto/Lumine's shared .pills/.pill rules.
   * Adds styles.tagsDense to just this card's pills wrapper so the mobile
   * override in CaseStudyCard.module.css can target it specifically.
   */
  denseTagsMobile?: boolean;
}

export default function CaseStudyCard({
  background,
  textColor,
  pillBackground,
  pills,
  titleLogo,
  title,
  titleFontSize,
  titleFontFamily,
  heading,
  headingFontSize,
  headingOpacity,
  texture,
  image,
  href,
  underConstruction = false,
  underConstructionLabel,
  denseTagsMobile = false,
}: CaseStudyCardProps) {
  const [hovering, setHovering] = useState(false);
  const textStyle = textColor ? ({ color: textColor } as CSSProperties) : undefined;

  const content = (
    <>
      {texture}
      <div className={styles.textLayer}>
        {titleLogo && <div className={styles.titleLogo}>{titleLogo}</div>}
        {title && (
          <p
            className={styles.title}
            style={{
              ...(titleFontSize ? { fontSize: titleFontSize } : undefined),
              ...(titleFontFamily ? { fontFamily: titleFontFamily } : undefined),
            }}
          >
            {title}
          </p>
        )}
        <p
          className={styles.heading}
          style={{
            ...(headingFontSize ? { fontSize: headingFontSize } : undefined),
            ...(headingOpacity !== undefined ? { opacity: headingOpacity } : undefined),
          }}
        >
          {heading}
        </p>
      </div>
      <div
        className={`${styles.pills} ${styles.textLayer}${denseTagsMobile ? ` ${styles.tagsDense}` : ""}`}
      >
        {pills.map((pill, index) => (
          <Fragment key={pill}>
            {index === 1 && <span className={styles.pillBreak} aria-hidden="true" />}
            <Pill background={pillBackground}>{pill}</Pill>
          </Fragment>
        ))}
      </div>
      {image && (
        <div className={styles.imageWrap} style={{ aspectRatio: image.aspectRatio }}>
          <Image src={image.src} alt={image.alt ?? ""} fill className={styles.image} />
        </div>
      )}
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
        {/*
          Touch devices (see CursorFollowPill.module.css's `(hover: none)`
          rule) never show the cursor-follow pill below, since the
          mouseenter/mouseleave state it depends on doesn't behave
          reliably on tap — this static badge is its mobile replacement,
          shown only via the mirrored `(hover: none)` rule in
          CaseStudyCard.module.css, so "under construction" still reads on
          mobile instead of silently disappearing.
        */}
        <div className={styles.staticBadge}>
          <span aria-hidden>🛠️</span>
          <span>{underConstructionLabel}</span>
        </div>
        <CursorFollowPill active={hovering}>
          <span aria-hidden>🛠️</span>
          <span>{underConstructionLabel}</span>
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

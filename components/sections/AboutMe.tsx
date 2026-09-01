"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./AboutMe.module.css";

/**
 * Photo: the real candid B&W photo, recovered from the capture — resolved
 * through f2c-sw.js's mapping (`/images/sxoPODrh3glOe2LuKgnPPBucaI.jpeg?width=1200&height=1599`
 * -> `assets/framerusercontent.com/images/sxoPODrh3glOe2LuKgnPPBucaI.0whlnha.jpeg`,
 * a real 1200x1599 JPEG in the mirror) and copied to public/images/about-me.jpg.
 *
 * Hover reveal: traced from the compiled "aboutMeCard" component source
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/ZITs4QJDF.DGGAzRZZ.mjs)
 * — the static HTML/CSS alone doesn't expose these values (same as the
 * LinkedIn/Resume/How-I-Work-gear hovers earlier this session), but the
 * compiled JS does, as literal style objects. This CONFIRMS
 * motion-confirmed.md's live observation that it's a hover reveal, not a
 * scroll/load one: the position change is gated by a JS-toggled `.hover`
 * class, the same mechanism as those other components.
 *
 * - REST (source values): parked outside the card — bottom:-164px,
 *   left:-151px, 80x80, border-radius 24px. Hidden by the card's own
 *   overflow:clip, not opacity.
 * - HOVER (source values): slides to bottom:-27px, left:-12px, shrinks
 *   slightly to 72x72, radius tightens to 21.6px.
 * - A permanent 20deg rotate applies in both states in the source — not
 *   animated, it has no hover override for it on this variant.
 * - Transition: the same site-wide spring found throughout this bundle for
 *   every other traced hover this session (confirmed, not guessed):
 *   { type: "spring", duration: 0.4, bounce: 0.2 }.
 *
 * DELIBERATE DEVIATION from the source (per design feedback, not the
 * original): mirrored horizontally to emerge from the bottom-RIGHT instead
 * of bottom-left, scaled up in two passes (1.5x, then a further 1.2x on
 * top = 1.8x the original source size), and border-radius independently
 * halved from its (already 1.5x) value rather than scaled with size.
 * rotate flips sign (20 -> -20) to lean symmetrically from the new origin.
 *
 * REST offsets scale uniformly with size (both by the same 1.2x factor
 * this pass) — safe, since if a box already sits fully outside the card
 * (as confirmed above), scaling every value by the same positive factor
 * keeps it fully outside regardless of magnitude.
 *
 * HOVER offset (bottom:-24px, right:-20px) is a manually-set value (design
 * feedback), not derived by scaling — chosen directly so the photo peeks
 * from the bottom-right corner without colliding with the text.
 */
const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const cardTextVariants = {
  rest: { color: "var(--color-text-muted)" },
  hover: { color: "#e7e5e4" },
};

const photoVariants = {
  rest: { bottom: -295.2, right: -271.8, width: 144, height: 144, borderRadius: 18, rotate: -20 },
  hover: { bottom: -24, right: -20, width: 130, height: 130, borderRadius: 16.2, rotate: -20 },
};

export default function AboutMe() {
  return (
    <motion.div className={styles.card} initial="rest" whileHover="hover">
      <div>
        <h4 className={styles.title}>About me</h4>
        <motion.p className={styles.description} variants={cardTextVariants} transition={TRANSITION}>
          Product Designer focused on digital products, complex systems, and clarity-driven experiences.
        </motion.p>
      </div>
      <motion.div className={styles.photo} variants={photoVariants} transition={TRANSITION}>
        <Image src="/images/about-me.jpg" alt="" fill className={styles.photoImage} />
      </motion.div>
    </motion.div>
  );
}

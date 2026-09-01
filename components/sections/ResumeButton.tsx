"use client";

import { motion } from "motion/react";
import styles from "./ResumeButton.module.css";

/**
 * Hover mechanism corrected per live DevTools inspection of the original
 * (both rest and hover states captured directly, not inferred from the
 * static export or compiled JS bundle — see project conversation history
 * for the earlier, wrong version based on a different code path):
 *
 * - The document graphic is `.framer-1lt0w37` ("Con"), position:absolute
 *   inside the button, parked outside the visible area at rest and clipped
 *   by the pill's own `overflow: hidden` — not a fade, not an in-place
 *   appearance. It slides + shrinks into view on hover.
 * - REST:  bottom 136px, right -177px, height 125px, gap 10px (hidden, clipped)
 * - HOVER: bottom -38px,  right -13px,  height 100px, gap 8px  (slid into view)
 *   (width stays `min-content`, flex-flow row, overflow visible — both states)
 * - The button has no background/radius of its own; those belong to the
 *   inner "pill" (`.framer-da59x7`, see ResumeButton.module.css), which is
 *   what visually looks like "the button."
 *
 * NOT confirmed: the transition timing/easing isn't in the static CSS
 * (Framer drives it at runtime). This spring is a starting point reusing
 * the same default found elsewhere on this site, not a measured value for
 * this specific interaction — tune to match by eye.
 *
 * Artwork: reference/specs/resume-doc.svg (only one file was supplied, so
 * the same drawing is used for both rest and hover — only its container
 * slides/resizes). The original's `<use>` referenced two different symbol
 * ids (rest vs hover), which could mean the drawing itself also changes;
 * that's not reproducible without the second file.
 */
const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const containerVariants = {
  rest: { bottom: 136, right: -177, height: 125, gap: 10 },
  hover: { bottom: -38, right: -13, height: 100, gap: 8 },
};

// TODO(i18n): there are two CVs, one per language — swap RESUME_HREF to
// CV_URLS[locale] once locale routing/switching is wired up. For now this
// always links the English CV (the current default), regardless of
// whatever locale ends up being detected/selected.
const CV_URLS = {
  en: "https://drive.google.com/file/d/1GBlxHIKzgw4Xv7DNqGKQj19GC0M40hPM/view",
  es: "https://drive.google.com/file/d/1womkBKNM0JCoLzADmmMrJZS21rJR1vBj/view",
} as const;

const RESUME_HREF = CV_URLS.en;

// reference/specs/resume-doc.svg, verbatim — the real drawing pulled from
// the live site, already resolved to literal colors (no Framer CSS vars):
// #e7e5e4 fill with a thin #252626 outline (stroke-width 1.6).
function ResumeDocumentArt() {
  return (
    <svg
      className={styles.document}
      viewBox="0 0 97.648 99.955"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M 35.124 98.482 L 0.252 25.312 C -0.044 24.693 -0.081 23.982 0.149 23.335 C 0.378 22.688 0.855 22.159 1.474 21.864 L 46.823 0.251 C 47.442 -0.044 48.153 -0.08 48.8 0.149 L 66.891 6.562 C 67.54 6.792 68.071 7.272 68.366 7.894 L 97.396 68.803 C 97.692 69.422 97.729 70.134 97.499 70.78 C 97.269 71.427 96.792 71.956 96.173 72.252 L 38.572 99.704 C 37.953 99.999 37.241 100.036 36.595 99.807 C 35.948 99.578 35.419 99.101 35.124 98.482 Z M 29.546 46.693 L 60.682 31.854 L 29.546 46.694 Z M 44.385 77.829 L 75.521 62.99 L 44.385 77.83 Z M 36.965 62.261 L 52.533 54.842"
        fill="#e7e5e4"
      />
      <path
        d="M 29.546 46.693 L 60.682 31.854 M 44.385 77.83 L 75.521 62.99 M 36.965 62.262 L 52.533 54.842 M 35.124 98.482 L 0.252 25.312 C -0.044 24.693 -0.081 23.982 0.149 23.335 C 0.378 22.688 0.855 22.159 1.474 21.864 L 46.823 0.251 C 47.442 -0.044 48.153 -0.08 48.8 0.149 L 66.891 6.562 C 67.54 6.792 68.071 7.272 68.366 7.894 L 97.396 68.803 C 97.692 69.422 97.729 70.134 97.499 70.78 C 97.269 71.427 96.792 71.956 96.173 72.252 L 38.572 99.704 C 37.953 99.999 37.241 100.036 36.595 99.807 C 35.948 99.578 35.419 99.101 35.124 98.482 Z"
        fill="transparent"
        strokeWidth="1.6"
        stroke="#252626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 45.841 0.72 L 52.147 13.952 C 52.442 14.571 52.971 15.048 53.618 15.277 C 54.264 15.506 54.976 15.469 55.595 15.174 L 68.829 8.868"
        fill="#e7e5e4"
      />
      <path
        d="M 45.841 0.72 L 52.147 13.952 C 52.442 14.571 52.971 15.048 53.618 15.277 C 54.264 15.506 54.976 15.469 55.595 15.174 L 68.829 8.868"
        fill="transparent"
        strokeWidth="1.6"
        stroke="#252626"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResumeButton() {
  return (
    <motion.a
      className={styles.button}
      href={RESUME_HREF}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
    >
      <div className={styles.pill}>
        <h4 className={styles.label}>Resume</h4>
        <motion.div
          className={styles.docContainer}
          variants={containerVariants}
          transition={TRANSITION}
        >
          <ResumeDocumentArt />
        </motion.div>
      </div>
    </motion.a>
  );
}

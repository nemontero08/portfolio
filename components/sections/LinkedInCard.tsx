"use client";

import { motion } from "motion/react";
import styles from "./LinkedInCard.module.css";

/**
 * Corrected per direct DevTools inspection of the live site: the flourish is
 * NOT an inline <svg> — it's a div with the SVG as a `background-image` data
 * URI (structure: `data-name="drawingContainer"` wrapper with only
 * `opacity: 1`, containing a 210x242 absolutely-positioned div that
 * overflows the 60px-tall card and gets clipped by the card's own
 * `overflow: clip`, not resized to fit).
 *
 * The path data and both fill states are still the ones verified from the
 * compiled component source
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/aUo72HyGA.TvmVOA-D.mjs,
 * "LinkedinBtn"): rgba(204,204,204,0.05) at rest -> rgb(255,255,255) on
 * hover, and the position offset (bottom:-80px, right:-16px) comes from
 * that same source's compiled CSS for `.framer-s8m6yb` (drawingContainer).
 *
 * Since a `background-image` can't be smoothly interpolated between two
 * data URIs, the crossfade is done the same way the color swap on the card
 * itself is — two stacked copies of the mark (one per fill), animated via
 * opacity — using the same transition as the card so both read as one
 * motion.
 */
const PATH_D =
  "M 54.916 130.934 L 86.492 231.176 L 53.113 241.69 L 21.537 141.448 Z M 47.291 99.318 L 47.494 99.92 C 48.902 104.368 48.388 109.202 46.077 113.255 L 46.066 113.264 C 43.402 117.861 39.012 121.203 33.872 122.546 L 33.915 122.533 L 33.71 122.597 C 28.837 124.386 23.445 124.118 18.773 121.855 L 18.781 121.859 C 14.419 119.685 11.175 115.774 9.845 111.085 L 9.853 111.11 L 9.712 110.685 C 8.281 106.157 8.805 101.238 11.156 97.112 L 11.166 97.102 C 13.818 92.549 18.166 89.232 23.259 87.879 L 23.221 87.891 C 28.114 86.081 33.53 86.325 38.24 88.568 L 38.224 88.558 C 42.53 90.695 45.778 94.496 47.217 99.083 L 47.299 99.342 L 47.295 99.33 L 47.292 99.318 Z M 188.457 135.918 L 206.551 193.359 L 173.277 203.84 L 156.39 150.229 C 154.876 144.24 151.578 138.852 146.933 134.779 L 147.048 134.884 C 142.82 131.691 137.228 130.944 132.309 132.916 L 132.359 132.901 C 128.442 133.98 125.039 136.422 122.762 139.787 L 122.792 139.751 C 120.701 142.894 119.427 146.509 119.086 150.269 L 119.082 150.427 C 119.077 153.353 119.58 156.257 120.569 159.01 L 120.554 158.967 L 138.176 214.91 L 104.902 225.391 C 96.563 198.443 89.76 176.606 84.492 159.88 C 79.223 143.153 76.046 133.185 74.961 129.972 L 73.333 125.146 L 106.607 114.666 L 111.195 129.23 L 110.99 129.294 C 111.597 126.887 112.397 124.533 113.384 122.256 L 113.353 122.326 C 114.473 119.896 115.806 117.569 117.337 115.373 L 117.412 115.268 C 119.363 112.48 121.819 110.083 124.653 108.2 L 124.825 108.097 C 128.107 105.91 131.684 104.201 135.448 103.023 L 135.936 102.87 L 135.912 102.877 C 146.27 99.135 157.748 100.121 167.318 105.573 L 167.344 105.592 C 176.775 111.036 183.817 121.141 188.468 135.908 L 188.457 135.917 Z";

function markDataUri(fill: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210.048 241.69"><path d="M 0 50.801 L 161.278 0 L 210.048 154.828 L 48.769 205.629 Z" fill="transparent"/><path d="${PATH_D}" fill="${fill}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const REST_FILL = "rgba(204, 204, 204, 0.05)";
const HOVER_FILL = "rgb(255, 255, 255)";

const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const cardVariants = {
  rest: { backgroundColor: "rgb(25, 26, 26)" },
  hover: { backgroundColor: "rgb(14, 118, 168)" },
};

const restMarkVariants = { rest: { opacity: 1 }, hover: { opacity: 0 } };
const hoverMarkVariants = { rest: { opacity: 0 }, hover: { opacity: 1 } };

export default function LinkedInCard() {
  return (
    <motion.a
      className={styles.card}
      href="https://www.linkedin.com/in/nemontero08/"
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={TRANSITION}
    >
      <h4 className={styles.label}>LinkedIn</h4>
      <div className={styles.drawingContainer} data-name="drawingContainer">
        <motion.div
          className={styles.mark}
          style={{ backgroundImage: markDataUri(REST_FILL) }}
          variants={restMarkVariants}
          transition={TRANSITION}
          aria-hidden
        />
        <motion.div
          className={styles.mark}
          style={{ backgroundImage: markDataUri(HOVER_FILL) }}
          variants={hoverMarkVariants}
          transition={TRANSITION}
          aria-hidden
        />
      </div>
    </motion.a>
  );
}

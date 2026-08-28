"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import styles from "./PageReveal.module.css";

/**
 * Page-load reveal — reference/specs/motion-reveals.md `8z2bhi` ("Body"),
 * confirmed live in reference/specs/motion-confirmed.md #1: the whole page
 * rises ~150px and fades in once, on load — not scroll-triggered, hence
 * `animate` here rather than `whileInView`.
 *
 * No reveal at the 768px tablet breakpoint — see PageReveal.module.css.
 */
export default function PageReveal({ children }: { children: ReactNode }) {
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

"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./HowItWorkTeaser.module.css";

const MotionLink = motion.create(Link);

/**
 * All values below confirmed against the live original's DevTools (not
 * guessed) — see project conversation history. Two pieces remain
 * placeholders pending real assets:
 * - The circle's icon: original is `<use href="#1475982494">`, not present
 *   in our captured mirror. Simple arrow glyph stands in.
 * - The gear's rotation behavior: confirmed target angle (~141deg) and that
 *   it's a smooth rotation, but NOT yet confirmed whether it's a one-shot
 *   spin-to-rest or a continuous spin while hovered — built as a one-shot
 *   rotation to a resting angle for now, using a placeholder transition
 *   (TRANSITION below) that's easy to swap once confirmed.
 */
const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const descriptionVariants = {
  rest: { color: "var(--color-text-muted)" },
  hover: { color: "#e7e5e4" },
};

const circleVariants = {
  rest: { color: "rgb(122, 119, 117)" },
  hover: { color: "rgb(231, 229, 228)" },
};

const gearVariants = {
  rest: { opacity: 0, rotate: 0 },
  hover: { opacity: 1, rotate: 141 },
};

function ArrowIcon() {
  return (
    <svg className={styles.circleIcon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// reference/specs/gear.svg, verbatim.
function GearArt() {
  return (
    <motion.svg
      className={styles.gear}
      viewBox="0 0 174.261 184.067"
      variants={gearVariants}
      transition={TRANSITION}
      aria-hidden
    >
      <path
        d="M 70.796 1.448 C 81.599 -0.483 92.659 -0.483 103.462 1.448 L 104.017 1.55 C 106.582 2.023 108.628 3.964 109.235 6.502 C 109.276 6.604 109.297 6.727 109.318 6.83 L 112.543 24.293 L 112.563 24.293 C 119.999 27.087 126.863 31.073 133.026 36.126 L 149.729 30.19 C 152.304 29.287 155.17 30.063 156.939 32.142 L 157.309 32.573 C 164.431 40.951 169.979 50.549 173.683 60.903 L 173.868 61.438 C 174.149 62.229 174.281 63.065 174.258 63.904 C 174.191 65.744 173.357 67.472 171.958 68.669 L 158.501 80.174 C 158.501 80.215 158.521 80.277 158.521 80.318 C 158.582 80.77 158.665 81.222 158.726 81.673 C 159.22 85.11 159.467 88.577 159.466 92.049 C 159.466 96.035 159.138 100.02 158.501 103.923 L 158.542 103.944 L 171.958 115.428 C 173.22 116.527 174.026 118.059 174.217 119.723 C 174.32 120.688 174.217 121.674 173.868 122.619 L 173.683 123.153 C 169.969 133.503 164.423 143.099 157.309 151.484 L 156.939 151.916 C 155.173 154 152.304 154.776 149.729 153.867 L 133.026 147.93 C 126.898 152.978 119.977 156.976 112.543 159.763 L 109.318 177.226 C 108.821 179.917 106.71 182.02 104.017 182.506 L 103.462 182.608 C 98.093 183.579 92.647 184.067 87.191 184.067 L 87.129 184.067 C 81.652 184.066 76.187 183.578 70.796 182.608 L 70.242 182.506 C 67.55 182.017 65.441 179.916 64.942 177.226 L 61.695 159.681 C 54.34 156.908 47.54 152.942 41.438 147.949 C 41.418 147.929 41.377 147.909 41.356 147.888 L 24.531 153.867 C 23.434 154.243 22.259 154.328 21.12 154.113 C 19.638 153.839 18.296 153.063 17.32 151.916 L 16.949 151.484 C 9.832 143.102 4.285 133.505 0.576 123.153 L 0.391 122.619 C -0.537 120.045 0.223 117.166 2.301 115.387 L 15.922 103.759 C 15.287 99.881 14.971 95.958 14.977 92.029 C 14.977 88.104 15.286 84.18 15.922 80.318 L 15.922 80.297 L 2.301 68.669 C 2.198 68.587 2.116 68.484 2.014 68.403 C 0.152 66.602 -0.483 63.878 0.391 61.439 L 0.576 60.903 C 4.29 50.554 9.837 40.957 16.951 32.573 L 17.32 32.142 C 19.085 30.056 21.955 29.28 24.531 30.19 L 41.356 36.168 C 47.447 31.154 54.318 27.171 61.695 24.376 L 64.942 6.83 C 65.44 4.141 67.549 2.039 70.241 1.551 Z M 86.625 56.249 C 66.743 56.249 50.625 72.367 50.625 92.249 C 50.625 112.131 66.743 128.249 86.625 128.249 C 106.507 128.249 122.625 112.131 122.625 92.249 C 122.625 72.367 106.507 56.249 86.625 56.249 Z"
        fill="rgba(204,204,204,0.4)"
      />
    </motion.svg>
  );
}

export default function HowItWorkTeaser() {
  const t = useTranslations("home.howItWorkTeaser");

  return (
    <MotionLink className={styles.card} href="/how-i-work" initial="rest" whileHover="hover">
      <div className={styles.textGroup}>
        <h4 className={styles.title}>{t("title")}</h4>
        <motion.p className={styles.description} variants={descriptionVariants} transition={TRANSITION}>
          {t("description")}
        </motion.p>
      </div>
      <motion.div className={styles.circle} variants={circleVariants} transition={TRANSITION}>
        <ArrowIcon />
      </motion.div>
      <GearArt />
    </MotionLink>
  );
}

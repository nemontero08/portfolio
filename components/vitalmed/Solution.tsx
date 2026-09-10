import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import styles from "./Solution.module.css";

/**
 * reference/framer-original/vitalmed/'s "The Solution" section
 * (Desktop variant, .framer-2dvwlj under the "THE SOLUTION" eyebrow).
 * Verbatim text, confirmed layout — read from the compiled CSS via a
 * proper cascade resolution (source-order simulation over the exact
 * selectors that apply to this page's own "framer-SJTaY" Desktop variant),
 * not guessed. See the eyebrow/label font note below for one thing that
 * first looked identical to Problem's pattern but confirmed differently.
 *
 * Structure: intro (eyebrow/titulo/body) -> one card ("Cosas", bg
 * rgb(20,20,20), radius 20px, padding 43px) containing a 9-step linear
 * flow laid out as 3 rows of 3 steps (space-around, connected by small
 * arrow icon-buttons), with a single turning arrow between rows — right-
 * aligned after row 1, left-aligned after row 2, confirmed via each
 * turn wrapper's own align-items — then a closing highlighted callout.
 *
 * Eyebrow / step-label font: confirmed via source's own --font-selector
 * (base64 "SW50ZXItTWVkaXVt" decodes to "Inter-Medium") for BOTH "THE
 * SOLUTION" and every per-step label — i.e. plain Inter medium (already
 * this app's default sans, --font-family-sans), NOT Space Grotesk. This
 * differs from Problem.module.css's .eyebrow, which uses
 * var(--font-space-grotesk) for the same-looking eyebrow row; checked
 * directly rather than assumed consistent, and left Problem's file alone
 * (out of scope here) — only noting the discrepancy.
 *
 * "Data confirmation" (row 2's 3rd step) is the sole step whose label is
 * both centered and wrapped in a real <strong> in the source (bold) —
 * reproduced as such; every other label is left as normal weight 500,
 * default (left) alignment.
 *
 * All 9 step screenshots are real PNGs, resolved via f2c-sw.js
 * (reference/framer-original/assets/framerusercontent.com/images/ — one
 * directory up from the vitalmed/ page capture, not inside it), copied to
 * public/images with descriptive names. The connecting arrow icon is the
 * same reused sprite symbol (#1475982494) already reproduced as an inline
 * SVG component in HowItEvolved.tsx — same two-path glyph, rotated per
 * use (45deg between same-row steps in rows 1 and 3, -135deg in row 2,
 * 135deg for both row-turn indicators — all confirmed per-instance from
 * source, not a single guessed rotation reused everywhere).
 *
 * No Lottie animations in this section — confirmed; the 3 Lottie
 * animations on this page belong to section 9 (UI & Design System).
 */

type Step = {
  key: string;
  src: string;
  label: string;
  emphasis?: boolean;
};

// Image paths + keys aren't translatable content — paired with
// vitalmed.solution.steps' 9 labels by index. Only step 5 ("Data
// confirmation") is emphasized (bold + centered), confirmed in source.
const STEP_IMAGES = [
  { key: "onboarding-intro", src: "/images/vitalmed-solution-onboarding-intro.png" },
  { key: "id-scan", src: "/images/vitalmed-solution-id-scan.png" },
  { key: "biometric-validation", src: "/images/vitalmed-solution-biometric-validation.png" },
  { key: "summary", src: "/images/vitalmed-solution-summary.png" },
  { key: "health-declaration", src: "/images/vitalmed-solution-health-declaration.png" },
  { key: "data-confirmation", src: "/images/vitalmed-solution-data-confirmation.png", emphasis: true },
  { key: "signature", src: "/images/vitalmed-solution-signature.png" },
  { key: "payment", src: "/images/vitalmed-solution-payment.png" },
  { key: "completion", src: "/images/vitalmed-solution-completion.png" },
];

function ArrowIcon({ rotate }: { rotate: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className={styles.arrowIcon}
      style={{ "--arrow-rotate": `${rotate}deg` } as CSSProperties}
      aria-hidden>
      <path
        d="M7 7H17V17"
        fill="none"
        stroke="rgb(130, 180, 240)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17L17 7"
        fill="none"
        stroke="rgb(130, 180, 240)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconButton({ rotate }: { rotate: number }) {
  return (
    <div className={styles.iconButton}>
      <ArrowIcon rotate={rotate} />
    </div>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className={styles.step}>
      <div className={styles.imageWrap}>
        <Image src={step.src} alt="" fill className={styles.image} />
      </div>
      <p className={step.emphasis ? styles.labelEmphasis : styles.label}>{step.label}</p>
    </div>
  );
}

function Row({ steps, arrowRotate }: { steps: Step[]; arrowRotate: number }) {
  return (
    <div className={styles.row}>
      <StepCard step={steps[0]} />
      <IconButton rotate={arrowRotate} />
      <StepCard step={steps[1]} />
      <IconButton rotate={arrowRotate} />
      <StepCard step={steps[2]} />
    </div>
  );
}

export default async function Solution() {
  const t = await getTranslations("vitalmed.solution");
  const labels = t.raw("steps") as string[];
  const steps: Step[] = STEP_IMAGES.map((img, i) => ({ ...img, label: labels[i] }));

  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>{t("titleLine1")}</p>
          <p className={styles.tituloLine2}>{t("titleLine2")}</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>{t("body1")}</p>
          <p className={styles.bodyText}>{t("body2")}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.flow}>
          <Row steps={steps.slice(0, 3)} arrowRotate={45} />
          <div className={styles.turnRight}>
            <div className={styles.turnSlot}>
              <IconButton rotate={135} />
            </div>
          </div>
          <Row steps={steps.slice(3, 6)} arrowRotate={-135} />
          <div className={styles.turnLeft}>
            <div className={styles.turnSlot}>
              <IconButton rotate={135} />
            </div>
          </div>
          <Row steps={steps.slice(6, 9)} arrowRotate={45} />
        </div>

        <div className={styles.callout}>
          <p className={styles.calloutText}>{t("callout")}</p>
        </div>
      </div>
    </div>
  );
}

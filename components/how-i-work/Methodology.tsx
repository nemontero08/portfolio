import { getTranslations } from "next-intl/server";
import styles from "./Methodology.module.css";

/**
 * reference/framer-original/how-i-work/'s first content section
 * (.framer-4x6xxy-container). All text below is verbatim from the source —
 * NOT reinterpreted, with one confirmed correction:
 *
 * - The heading has no trailing period in the source ("...digital
 *   products", not "...digital products."). Kept as-is rather than adding
 *   punctuation that isn't there.
 * - Card 04 (DELIVERY/Launch)'s description previously duplicated the
 *   Principles section's own intro sentence word-for-word — a copy-paste
 *   bug in the original English capture. The live Spanish page
 *   (how-i-work-es) has distinct, correct copy for this card ("Diseño de
 *   alta fidelidad, documentación técnica y handoff preciso para
 *   ingeniería."), confirming what the English was always meant to say.
 *   Fixed here to a faithful translation of that sentence.
 *
 * Card hover: NOT present in the source at all. Unlike the back button
 * (a real link with rest/hover variant classes, just no verified color
 * values), these four cards are plain non-interactive divs — no <a>
 * wrapper, no hover-variant classes, no cursor:pointer, and no :hover rule
 * anywhere in the captured stylesheet targets them. Left fully static to
 * match; flag if you'd like a hover affordance added anyway.
 *
 * Icons: all 4 are real inline SVG symbol defs in the capture (<use
 * href="#...">, same mechanism as the testimonials quote icon and the back
 * button's plus icon) — none missing, nothing to resolve via f2c-sw.js.
 */

type IconPath = { d: string; transform: string };
type TranslatedStep = { eyebrow: string; title: string; description: string };
type Step = TranslatedStep & { paths: IconPath[] };

// Icon geometry isn't translatable content — indexed to match
// howIWork.methodology.steps' order in the JSON.
const STEP_PATHS: IconPath[][] = [
  [
    {
      d: "M 11.106 2.317 C 11.669 2.598 12.331 2.598 12.894 2.317 L 16.553 0.487 C 16.863 0.332 17.232 0.349 17.526 0.531 C 17.821 0.714 18.001 1.036 18 1.383 L 18 14.147 C 18 14.526 17.786 14.872 17.447 15.041 L 12.894 17.318 C 12.331 17.599 11.669 17.599 11.106 17.318 L 6.894 15.212 C 6.331 14.931 5.669 14.931 5.106 15.212 L 1.447 17.042 C 1.137 17.197 0.768 17.18 0.473 16.997 C 0.178 16.815 -0.001 16.492 0 16.145 L 0 3.382 C 0 3.003 0.214 2.657 0.553 2.488 L 5.106 0.211 C 5.669 -0.07 6.331 -0.07 6.894 0.211 Z",
      transform: "translate(3 3.236)",
    },
    { d: "M 0 0 L 0 15", transform: "translate(15 5.764)" },
    { d: "M 0 0 L 0 15", transform: "translate(9 3.236)" },
  ],
  [
    {
      d: "M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 6 0 C 7.105 0 8 0.895 8 2 L 8 6 C 8 7.105 7.105 8 6 8 Z",
      transform: "translate(3 3)",
    },
    { d: "M 0 0 L 0 4 C 0 5.105 0.895 6 2 6 L 6 6", transform: "translate(7 11)" },
    {
      d: "M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 6 0 C 7.105 0 8 0.895 8 2 L 8 6 C 8 7.105 7.105 8 6 8 Z",
      transform: "translate(13 13)",
    },
  ],
  [
    {
      d: "M 2 16 C 0.895 16 0 15.105 0 14 L 0 2 C 0 0.895 0.895 0 2 0 L 18 0 C 19.105 0 20 0.895 20 2 L 20 14 C 20 15.105 19.105 16 18 16 Z",
      transform: "translate(2 4)",
    },
    { d: "M 0 0 L 0.01 0", transform: "translate(6 8)" },
    { d: "M 0 0 L 0.01 0", transform: "translate(10 8)" },
    { d: "M 0 0 L 0.01 0", transform: "translate(14 8)" },
  ],
  [
    {
      d: "M 2 0.513 C 0.5 1.773 0 5.513 0 5.513 C 0 5.513 3.74 5.013 5 3.513 C 5.71 2.673 5.7 1.383 4.91 0.603 C 4.105 -0.165 2.851 -0.204 2 0.513 Z",
      transform: "translate(2.5 15.987)",
    },
    {
      d: "M 3 13 L 0 10 C 0.532 8.62 1.202 7.296 2 6.05 C 4.369 2.262 8.532 -0.027 13 0 C 13 2.72 12.22 7.5 7 11 C 5.737 11.799 4.397 12.469 3 13 Z",
      transform: "translate(9 2)",
    },
    { d: "M 5 4.48 L 0 4.48 C 0 4.48 0.55 1.45 2 0.48 C 3.62 -0.6 7 0.48 7 0.48", transform: "translate(4 7.52)" },
    { d: "M 0 2 L 0 7 C 0 7 3.03 6.45 4 5 C 5.08 3.38 4 0 4 0", transform: "translate(12 13)" },
  ],
];

function StepIcon({ paths }: { paths: readonly IconPath[] }) {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          transform={p.transform}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export default async function Methodology() {
  const t = await getTranslations("howIWork.methodology");
  const translatedSteps = t.raw("steps") as TranslatedStep[];
  const steps: Step[] = translatedSteps.map((step, i) => ({ ...step, paths: STEP_PATHS[i] }));

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.introBody}>
          <h3 className={styles.heading}>{t("heading")}</h3>
          <p className={styles.paragraph}>{t("paragraph")}</p>
        </div>
      </div>
      <div className={styles.row}>
        {steps.map((step) => (
          <div className={styles.card} key={step.eyebrow}>
            <div className={styles.cardTop}>
              <div className={styles.iconGroup}>
                <div className={styles.iconBox}>
                  <StepIcon paths={step.paths} />
                </div>
                <p className={styles.cardEyebrow}>{step.eyebrow}</p>
              </div>
              <h4 className={styles.cardTitle}>{step.title}</h4>
            </div>
            <p className={styles.cardDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

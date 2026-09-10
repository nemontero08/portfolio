import Image from "next/image";
import { getTranslations } from "next-intl/server";
import IterationScreenshotsCarousel from "./IterationScreenshotsCarousel";
import styles from "./HowItEvolved.module.css";

/**
 * reference/framer-original/vitalmed/'s "How It Evolved" section
 * (.framer-nsflht-container). Verbatim text, confirmed layout/colors —
 * not the old spec. Full section, top to bottom. Only read the Desktop
 * variant, so the known Spanish-mobile-breakpoint bug elsewhere on this
 * site (e.g. "FLUJO ORIGINAL") isn't a factor here — everything below is
 * confirmed English.
 *
 * Structure: intro (eyebrow/title/body) -> 4 timeline phases (Discovery,
 * Iteration 01, Iteration 02, The Strategic Shift), each a dot+connector
 * icon column beside a label/heading/body/highlighted-"Item" content
 * column -> a closing italic line -> a Before/After comparison card.
 *
 * Two confirmed leading/double spaces reproduced verbatim from source
 * (not typos on my part): Iteration 01's label (" ITERATION 01 — ...")
 * and body (" platform with four modules..."), and the Strategic Shift
 * body's double space after "It became replacing it.".
 *
 * Iteration 01's 3 screenshots: the 1st and 3rd both use the exact same
 * source image (confirmed, not a mistake) — only the 2nd is a different
 * file. Real PNGs, resolved via f2c-sw.js, copied to public/images.
 *
 * The Strategic Shift's dot uses a real SVG symbol in the source with an
 * SVG filter (feOffset/feGaussianBlur/feFlood) creating a soft blue glow
 * around the plain dot shape — approximated here with a CSS box-shadow
 * glow rather than reproducing the filter primitives 1:1; flagging that
 * as an approximation, everything else on this dot (shape, fill color)
 * is exact.
 *
 * Before/After's center icon (#1475982494, a corner+diagonal "arrow"
 * glyph rotated 45deg) IS present in this page's capture — confirmed,
 * unlike the same symbol id being absent from the home page's own
 * capture (see HowItWorkTeaser.tsx) — so the real icon is used here, not
 * a placeholder.
 */

type TranslatedPhase = {
  label: string;
  heading: string;
  body: string;
  item: string;
  screenshots?: string[];
};

type Phase = TranslatedPhase & {
  accent?: boolean;
  glow?: boolean;
  screenshotImages?: string[];
};

// Structural-only data (image paths, accent/glow flags) that isn't
// translatable content — merged with vitalmed.howItEvolved.phases (label/
// heading/body/item/screenshot captions) by index at render time.
const PHASE_META: { accent?: boolean; glow?: boolean; screenshotImages?: string[] }[] = [
  {},
  {
    screenshotImages: [
      "/images/vitalmed-flow-identity.png",
      "/images/vitalmed-flow-home.png",
      "/images/vitalmed-flow-identity.png",
    ],
  },
  {},
  { accent: true, glow: true },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} className={styles.arrowIcon} aria-hidden>
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

function PhaseBlock({ phase }: { phase: Phase }) {
  return (
    <div className={styles.phase}>
      <div className={styles.iconColumn}>
        <div className={phase.glow ? styles.dotGlow : styles.dot} />
        <div className={styles.connector} />
      </div>
      <div className={styles.content}>
        <p className={styles.phaseLabel}>{phase.label}</p>
        <p className={styles.phaseHeading}>{phase.heading}</p>
        <p className={styles.phaseBody}>{phase.body}</p>
        <div className={phase.accent ? styles.itemAccent : styles.item}>
          <p className={phase.accent ? styles.itemTextAccent : styles.itemText}>{phase.item}</p>
        </div>
        {phase.screenshots && phase.screenshotImages && (
          <>
            {/* Desktop (≥768px): all 3 side by side, unchanged. */}
            <div className={styles.screenshots}>
              {phase.screenshots.map((caption, i) => (
                <div key={i} className={styles.screenshot}>
                  <div className={styles.screenshotImageWrap}>
                    <Image src={phase.screenshotImages![i]} alt="" fill className={styles.screenshotImage} />
                  </div>
                  <p className={styles.screenshotCaption}>{caption}</p>
                </div>
              ))}
            </div>
            {/* Mobile (≤767px): swipeable carousel instead — see .carousel
                in HowItEvolved.module.css for the display:none toggle
                between this and .screenshots above. */}
            <IterationScreenshotsCarousel
              items={phase.screenshots.map((caption, i) => ({
                key: caption,
                src: phase.screenshotImages![i],
                caption,
              }))}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default async function HowItEvolved() {
  const t = await getTranslations("vitalmed.howItEvolved");
  const translatedPhases = t.raw("phases") as TranslatedPhase[];
  const phases: Phase[] = translatedPhases.map((phase, i) => ({ ...phase, ...PHASE_META[i] }));

  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>{t("titleLine1")}</p>
          <p className={styles.tituloLine2}>{t("titleLine2")}</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>{t("body")}</p>
        </div>
      </div>

      {phases.map((phase) => (
        <PhaseBlock key={phase.label} phase={phase} />
      ))}

      <p className={styles.closing}>{t("closing")}</p>

      <div className={styles.compareCard}>
        <div className={styles.compareCol}>
          <p className={styles.beforeLabel}>{t("compare.beforeLabel")}</p>
          <p className={styles.beforeText}>{t("compare.beforeText")}</p>
        </div>
        <div className={styles.iconButton}>
          <ArrowIcon />
        </div>
        <div className={styles.compareCol}>
          <p className={styles.afterLabel}>{t("compare.afterLabel")}</p>
          <p className={styles.afterText}>{t("compare.afterText")}</p>
        </div>
      </div>
    </div>
  );
}

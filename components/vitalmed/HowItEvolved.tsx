import Image from "next/image";
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

type Phase = {
  label: string;
  heading: string;
  body: string;
  item: string;
  accent?: boolean;
  glow?: boolean;
  screenshots?: { src: string; caption: string }[];
};

const PHASES: Phase[] = [
  {
    label: "DISCOVERY",
    heading: "Diagnosis of the original process",
    body: "Mapping of internal states, analysis of validations and friction between teams. Fintech onboarding benchmark. No formal interviews: the starting point was the operational process, not the user",
    item: "Finding: the process follows internal logic, not user logic",
  },
  {
    label: " ITERATION 01 — ORGANIZING COMPLEXITY",
    heading: "Structuring the chaos without changing the model",
    body: " platform with four modules and visible states for the first time: identity, health declaration, payment, signature. The process gained clarity. The model remained intact",
    item: "Organizing wasn't simplifying",
    screenshots: [
      { src: "/images/vitalmed-flow-identity.png", caption: "Identity verification start" },
      { src: "/images/vitalmed-flow-home.png", caption: "Home screen" },
      { src: "/images/vitalmed-flow-identity.png", caption: "Health declaration start" },
    ],
  },
  {
    label: "ITERATION 02 — REDUCING FRICTION",
    heading: "Simplifying within the system",
    body: "A question-by-question review with the legal team. −40% of questions and three documents consolidated into one. A real reduction in cognitive load, not just visual. The flow was still long",
    item: "The problem was still the model",
  },
  {
    label: "THE STRATEGIC SHIFT",
    heading: "With the leadership change, the question changed",
    body: "The goal stopped being to optimize the existing process. It became replacing it.  The user profile already handled complex processes independently. The expected standard was high.",
    item: "Decision: redesign onboarding as a fintech-style mobile-only flow",
    accent: true,
    glow: true,
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} style={{ transform: "rotate(45deg)" }} aria-hidden>
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
        {phase.screenshots && (
          <div className={styles.screenshots}>
            {phase.screenshots.map((s, i) => (
              <div key={i} className={styles.screenshot}>
                <div className={styles.screenshotImageWrap}>
                  <Image src={s.src} alt="" fill className={styles.screenshotImage} />
                </div>
                <p className={styles.screenshotCaption}>{s.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HowItEvolved() {
  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>HOW IT EVOLVED</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>Three moments,</p>
          <p className={styles.tituloLine2}>one conclusion.</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>
            The project was shaped by a strict legal framework, legacy systems, mandatory medical review, and
            multiple teams with competing priorities. Plus a leadership change mid-process.
          </p>
        </div>
      </div>

      {PHASES.map((phase) => (
        <PhaseBlock key={phase.label} phase={phase} />
      ))}

      <p className={styles.closing}>The product stopped being a bureaucratic process and became an onboarding</p>

      <div className={styles.compareCard}>
        <div className={styles.compareCol}>
          <p className={styles.beforeLabel}>BEFORE</p>
          <p className={styles.beforeText}>How do we optimize the current process?</p>
        </div>
        <div className={styles.iconButton}>
          <ArrowIcon />
        </div>
        <div className={styles.compareCol}>
          <p className={styles.afterLabel}>AFTER</p>
          <p className={styles.afterText}>Does it make sense for onboarding to keep working like a bureaucratic form?</p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./UserExperience.module.css";

/**
 * reference/framer-original/vitalmed/'s "User Experience" section
 * (.framer-13ivkdr-container). Verbatim text, confirmed layout/colors —
 * not the old spec. Full section, top to bottom: intro, a STAGE/BEFORE/
 * AFTER table (5 rows), and an "Experience curve" chart image.
 *
 * The header cells' data-framer-name attributes are Spanish ("ETAPA",
 * "ANTES", "DESPUES") but their actual rendered text is confirmed English
 * ("STAGE"/"BEFORE"/"AFTER") — just internal Framer layer names, not a
 * visible-text bug. Checked every row's actual <p> content directly;
 * everything visible here is English.
 *
 * Stage numbering: 4 of the 5 rows use a real HTML <ol start="N"> for
 * their number (confirmed via the actual start attribute, not assumed);
 * the "Identity validation" row instead has "2. " typed manually into its
 * plain text, with no <ol> at all — reproduced here as pre-computed
 * "N. " + stage text strings, matching the real confirmed numbering
 * (1,2,3,4,5) either way. "Firs contact" (row 1's description) is a
 * verbatim source typo, not introduced by me. Row 4's stage text has a
 * confirmed leading space (" Medical review").
 *
 * Badge/bar colors: BEFORE badges use rgb(212,146,10) (row 1 only, ==
 * --color-semantic-amber) or rgb(224,90,69)/rgb(224,128,112) (rows 2-5,
 * == --color-semantic-red family). AFTER badges are rgb(0,87,184)-based
 * blue (== --color-case-vitalmed) for rows 1-4, but row 5 ("Satisfied")
 * uses rgb(46,168,130) (== --color-semantic-green) instead — confirmed,
 * not a guess; the last row's resolution is intentionally green, not blue.
 *
 * Bar fill width: confirmed to equal score×10% exactly across all 9 data
 * points checked in the source (e.g. 6.5/10 -> 65%, 9.2/10 -> 92%) —
 * computed here from each score rather than hardcoded per bar.
 *
 * Row 4 (Medical review) has an extra highlighted note attached to its
 * AFTER cell only, confirmed in source: "If there are no pre-existing
 * conditions, validation happens in the background. The user doesn't
 * wait."
 *
 * Chart image: a real PNG ("Frame EN" — implying an unused "Frame ES"
 * Spanish sibling exists in the source but isn't rendered here), resolved
 * via f2c-sw.js, copied to public/images.
 */

type Feeling = {
  label: string;
  quote: string;
  score: string;
  scoreValue: number;
  border: string;
  bg: string;
  text: string;
  bar: string;
};

type Row = {
  stageDisplay: string;
  description: string;
  before: Feeling;
  after: Feeling;
  afterNote?: string;
};

const BLUE = { border: "rgba(0, 87, 184, 0.24)", bg: "rgba(0, 87, 184, 0.1)", text: "rgb(130, 180, 240)", bar: "rgb(0, 87, 184)" };
const RED = { border: "rgba(224, 90, 69, 0.2)", bg: "rgba(224, 90, 69, 0.1)", text: "rgb(224, 128, 112)", bar: "rgb(224, 128, 112)" };

const ROWS: Row[] = [
  {
    stageDisplay: "1. Onboarding start",
    description: "Firs contact",
    before: {
      label: " \u{1F615} Confused",
      quote: '"What do I need to prepare? How long does it take?"',
      score: "2/10",
      scoreValue: 2,
      border: "rgba(212, 146, 10, 0.2)",
      bg: "rgba(212, 146, 10, 0.1)",
      text: "rgb(200, 150, 10)",
      bar: "rgb(212, 146, 10)",
    },
    after: {
      label: " \u{1F535} Oriented",
      quote: "\"I can see the steps. I know how long it'll take. I can start.\"",
      score: "7/10",
      scoreValue: 7,
      ...BLUE,
    },
  },
  {
    stageDisplay: "2. Identity validation",
    description: "ID, data & biometrics",
    before: {
      label: "\u{1F630} Anxious",
      quote: '"They asked for my info via WhatsApp, my ID photo by message, and sent me to another app for biometrics."',
      score: "1.5/10",
      scoreValue: 1.5,
      ...RED,
    },
    after: {
      label: "\u{1F512} Confident",
      quote: '"I scanned my ID, the data filled in automatically, and the validation happened within the same app."',
      score: "8/10",
      scoreValue: 8,
      ...BLUE,
    },
  },
  {
    stageDisplay: "3. Health declaration",
    description: "Medical questions",
    before: {
      label: "\u{1F613} Exhausted",
      quote: "\"There are so many questions. I don't understand why so many.\"",
      score: "1/10",
      scoreValue: 1,
      ...RED,
    },
    after: {
      label: "\u{1F60C} Calm",
      quote: "\"The questions are few and clear. I'm halfway through.\"",
      score: "6.5/10",
      scoreValue: 6.5,
      ...BLUE,
    },
  },
  {
    stageDisplay: "4.  Medical review",
    description: "No pre-existing conditions",
    before: {
      label: "\u{1F61F} Worried",
      quote: "\"They didn't tell me anything. Am I still in the process? Did they reject me?\"",
      score: "0.5/10",
      scoreValue: 0.5,
      ...RED,
    },
    after: {
      label: "⚡ Invisible",
      quote: '"I didn\'t even notice it. I went straight to the next step."',
      score: "9.2/10",
      scoreValue: 9.2,
      ...BLUE,
    },
    afterNote: "If there are no pre-existing conditions, validation happens in the background. The user doesn't wait.",
  },
  {
    stageDisplay: "5. Signature & payment",
    description: "Onboarding completion",
    before: {
      label: " \u{1F624} Frustrated",
      quote: '"I have to print, sign, and scan. In 2025."',
      score: "1/10",
      scoreValue: 1,
      ...RED,
    },
    after: {
      label: "✅ Satisfied",
      quote: '"I signed and paid in two steps. Done. Easy."',
      score: "9/10",
      scoreValue: 9,
      border: "rgba(46, 168, 130, 0.24)",
      bg: "rgba(46, 168, 130, 0.1)",
      text: "rgb(46, 168, 130)",
      bar: "rgb(46, 168, 130)",
    },
  },
];

function FeelingCell({ feeling, note }: { feeling: Feeling; note?: string }) {
  return (
    <div className={styles.col}>
      <div className={styles.badge} style={{ borderColor: feeling.border, background: feeling.bg }}>
        <p className={styles.badgeText} style={{ color: feeling.text }}>
          {feeling.label}
        </p>
      </div>
      <p className={styles.quote}>{feeling.quote}</p>
      <div className={styles.barRow}>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${feeling.scoreValue * 10}%`, background: feeling.bar }} />
        </div>
        <p className={styles.score}>{feeling.score}</p>
      </div>
      {note && (
        <div className={styles.note}>
          <p className={styles.noteText}>{note}</p>
        </div>
      )}
    </div>
  );
}

export default function UserExperience() {
  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>USER EXPERIENCE</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>How the user feels</p>
          <p className={styles.tituloLine2}>at each stage of the flow.</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>
            The design didn&apos;t just solve the structure. It actively changed the user&apos;s emotional state at
            every critical stage.
          </p>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.headerStage}>
            <p className={styles.headerText}>STAGE</p>
          </div>
          <div className={styles.headerBefore}>
            <p className={styles.headerText}>BEFORE</p>
          </div>
          <div className={styles.headerAfter}>
            <p className={styles.headerText}>AFTER</p>
          </div>
        </div>

        {ROWS.map((row) => (
          <div className={styles.row} key={row.stageDisplay}>
            <div className={styles.col1}>
              <p className={styles.stage}>{row.stageDisplay}</p>
              <p className={styles.description}>{row.description}</p>
            </div>
            <FeelingCell feeling={row.before} />
            <FeelingCell feeling={row.after} note={row.afterNote} />
          </div>
        ))}
      </div>

      <div className={styles.curve}>
        <p className={styles.curveLabel}>EXPERIENCE CURVE — BEFORE VS AFTER</p>
        <div className={styles.curveImageWrap}>
          <Image src="/images/vitalmed-experience-curve.png" alt="" fill className={styles.curveImage} />
        </div>
      </div>
    </div>
  );
}

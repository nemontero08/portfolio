import Image from "next/image";
import { getTranslations } from "next-intl/server";
import UserExperienceAccordion from "./UserExperienceAccordion";
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

type TranslatedFeeling = { label: string; quote: string; score: string };
type TranslatedRow = {
  stage: string;
  description: string;
  before: TranslatedFeeling;
  after: TranslatedFeeling;
  afterNote?: string;
};

type FeelingStyle = { border: string; bg: string; text: string; bar: string };
type Feeling = TranslatedFeeling & FeelingStyle & { scoreValue: number };
type Row = { stageDisplay: string; description: string; before: Feeling; after: Feeling; afterNote?: string };

const AMBER = { border: "rgba(212, 146, 10, 0.2)", bg: "rgba(212, 146, 10, 0.1)", text: "rgb(200, 150, 10)", bar: "rgb(212, 146, 10)" };
const BLUE = { border: "rgba(0, 87, 184, 0.24)", bg: "rgba(0, 87, 184, 0.1)", text: "rgb(130, 180, 240)", bar: "rgb(0, 87, 184)" };
const RED = { border: "rgba(224, 90, 69, 0.2)", bg: "rgba(224, 90, 69, 0.1)", text: "rgb(224, 128, 112)", bar: "rgb(224, 128, 112)" };
const GREEN = { border: "rgba(46, 168, 130, 0.24)", bg: "rgba(46, 168, 130, 0.1)", text: "rgb(46, 168, 130)", bar: "rgb(46, 168, 130)" };

// Badge/bar colors aren't translatable content — styling only, indexed to
// match vitalmed.userExperience.rows' order in the JSON. Row 5's AFTER
// resolution is intentionally green, not blue (confirmed in source).
const ROW_STYLE: { before: FeelingStyle; after: FeelingStyle }[] = [
  { before: AMBER, after: BLUE },
  { before: RED, after: BLUE },
  { before: RED, after: BLUE },
  { before: RED, after: BLUE },
  { before: RED, after: GREEN },
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

export default async function UserExperience() {
  const t = await getTranslations("vitalmed.userExperience");
  const tableHeaders = t.raw("tableHeaders") as string[];
  const translatedRows = t.raw("rows") as TranslatedRow[];

  const rows: Row[] = translatedRows.map((row, i) => ({
    stageDisplay: row.stage,
    description: row.description,
    afterNote: row.afterNote,
    before: { ...row.before, ...ROW_STYLE[i].before, scoreValue: parseFloat(row.before.score) },
    after: { ...row.after, ...ROW_STYLE[i].after, scoreValue: parseFloat(row.after.score) },
  }));

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

      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.headerStage}>
            <p className={styles.headerText}>{tableHeaders[0]}</p>
          </div>
          <div className={styles.headerBefore}>
            <p className={styles.headerText}>{tableHeaders[1]}</p>
          </div>
          <div className={styles.headerAfter}>
            <p className={styles.headerText}>{tableHeaders[2]}</p>
          </div>
        </div>

        {rows.map((row) => (
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

      <UserExperienceAccordion rows={rows} />

      <div className={styles.curve}>
        <p className={styles.curveLabel}>{t("curveLabel")}</p>
        <div className={styles.curveImageWrap}>
          <Image src="/images/vitalmed-experience-curve.png" alt="" fill className={styles.curveImage} />
        </div>
      </div>
    </div>
  );
}

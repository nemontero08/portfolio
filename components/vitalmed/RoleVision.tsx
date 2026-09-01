import styles from "./RoleVision.module.css";

/**
 * reference/framer-original/vitalmed/'s "Role & Vision" section
 * (.framer-1pd5jc6-container). Verbatim text, confirmed layout/colors —
 * not the old spec. Two rows, both built here.
 *
 * Row 1: three equal-width cards (Role/Vision/Sector · Platform).
 * Row 2: a 60%-width "Team" card + a 470px "Impact" card containing a 2x2
 * grid of 4 metric tiles (number + caption each). Confirmed NOT equal-flex
 * columns like Row 1 — fixed 60%/470px split, fixed 229px row height.
 *
 * Eyebrow color confirmed as a plain #666 gray on both rows — NOT the
 * usual accent lavender used for eyebrows elsewhere on this site
 * (Methodology/Principles/Contact/Hero's own NDA badge). Checked directly:
 * no color override exists on these text nodes, so they fall through to
 * preset yzjt99's own bare default (#666).
 *
 * Metric tiles: background rgba(0, 87, 184, 0.2) (== --color-case-vitalmed
 * at 20% alpha) and text color rgb(130, 180, 240) — both confirmed, and
 * both literals since no existing token matches either exactly.
 *
 * One deliberate departure from source, per explicit instruction: the 2nd
 * metric tile in the capture has only ONE text node — "Simple cases
 * completed without manual intervention" at 15px, no separate number —
 * unlike the other 3 tiles, which are real number+caption pairs. (The
 * tile's own container CSS is identical to the other 3's, gap:4px/
 * padding:8px/centered, so structurally it's clearly meant to be a pair —
 * just authored with one line in the source.) Built here instead as a
 * number+caption pair — "0" / "Manual interventions needed" — matching
 * the other 3 tiles' typographic treatment, per instruction; the
 * original's single line is intentionally not used.
 *
 * Flagging one more thing rather than silently resolving it: the 3rd
 * tile's number is verbatim "3 -> 1" in the source (ASCII hyphen +
 * greater-than, confirmed in the compiled markup) — not the Unicode "→"
 * arrow character. Reproduced verbatim as source text; say the word if you
 * want it swapped to a real arrow glyph.
 */
export default function RoleVision() {
  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>ROLE</p>
          <p className={styles.value}>
            Product Designer — End-to-end redesign of the digital onboarding, from process analysis to mobile-first
            flow design
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.eyebrow}>VISION</p>
          <p className={styles.value}>
            Turn onboarding into a measurable digital product, aligned with current standards for subscription
            service onboarding
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.eyebrow}>SECTOR · PLATFORM</p>
          <div className={styles.bodyGroup}>
            <p className={styles.boldLine}>Health · Healthtech · Onboarding</p>
            <p className={styles.value}>Web app mobile-only</p>
          </div>
        </div>
      </div>

      <div className={styles.row2}>
        <div className={styles.teamCard}>
          <p className={styles.eyebrow}>TEAM · COLLABORATION</p>
          <div className={styles.bodyGroup}>
            <p className={styles.boldLine}>Legal · Operations · Medical Audit · Development</p>
            <p className={styles.value}>
              Redesign of the operational process, experience architecture, and mobile-first flow. Cross-functional
              work across teams with legal, technical, and regulatory constraints
            </p>
          </div>
        </div>

        <div className={styles.impactCard}>
          <div className={styles.impactRow}>
            <div className={styles.tile}>
              <p className={styles.tileNumber}>-40%</p>
              <p className={styles.tileCaption}>Reduction in health declaration questions</p>
            </div>
            <div className={styles.tile}>
              <p className={styles.tileNumber}>0</p>
              <p className={styles.tileCaption}>Manual interventions needed</p>
            </div>
          </div>
          <div className={styles.impactRow}>
            <div className={styles.tile}>
              <p className={styles.tileNumberRegular}>3 -&gt; 1</p>
              <p className={styles.tileCaption}>Legal documents consolidated into one</p>
            </div>
            <div className={styles.tile}>
              <p className={styles.tileNumber}>Onboarding in 15 min</p>
              <p className={styles.tileCaption}>Process reduced from days to minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

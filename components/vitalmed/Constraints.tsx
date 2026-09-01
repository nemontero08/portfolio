import styles from "./Constraints.module.css";

/**
 * reference/framer-original/vitalmed/'s "Constraints" section
 * (.framer-fyct3x-container). Verbatim text, confirmed layout/colors —
 * not the old spec. Full section, top to bottom. Only read the Desktop
 * variant, so the known Spanish-mobile-breakpoint bug elsewhere on this
 * site (e.g. "FLUJO ORIGINAL") isn't a factor here — everything below is
 * confirmed English.
 *
 * Cosas row order here is COL DER (the 7-item "constant balance" list)
 * THEN COL IZQ (the single UX/Legal/Operations/Technical card) — reversed
 * from The Problem section's COL IZQ-then-COL DER order. Both are
 * flex:1 0 0 (equal width) here, unlike The Problem's 40%/flex:1 split.
 *
 * Constraint-list icon: a plain filled dot (5x5 SVG, fill rgb(0, 87, 184)
 * == --color-case-vitalmed) — confirmed real, embedded inline, resolved
 * with no external asset needed.
 */

const CONSTRAINTS = [
  "Strict legal framework",
  "Mandatory and extensive health declarations",
  "Digital signature with formal validation",
  "Legacy systems in production",
  "Medical review for sensitive answers",
  "Multiple teams with a say in decisions",
  "Leadership change mid-process",
];

const BALANCE_TILES: { title: string; body: string; boldTitle: boolean }[] = [
  { title: "UX", body: "Clear experience, solvable without unnecessary friction", boldTitle: true },
  { title: "Legal", body: "No manual intervention for simple cases", boldTitle: true },
  // Confirmed: this one's title has no weight override in the source, unlike the other 3.
  { title: "OPERATIONS", body: "Viable for the teams running it", boldTitle: false },
  { title: "TECHNICAL", body: "Implementable within existing systems", boldTitle: true },
];

function Dot() {
  return (
    <svg viewBox="0 0 5 5" width={5} height={5} aria-hidden>
      <circle cx="2.5" cy="2.5" r="2.5" fill="rgb(0, 87, 184)" />
    </svg>
  );
}

export default function Constraints() {
  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>CONSTRAINTS</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>Redesigning didn&apos;t mean</p>
          <p className={styles.tituloLine2}>starting from scratch.</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>
            The project was shaped by a strict legal framework, legacy systems, mandatory medical review, and
            multiple teams with competing priorities. Plus a leadership change mid-process
          </p>
        </div>
      </div>

      <div className={styles.cosas}>
        <div className={styles.colDer}>
          <p className={styles.derTitle}>THE CONSTANT BALANCE</p>
          <p className={styles.derText}>Every decision ran through four variables in constant tension</p>
          <div className={styles.cuadro}>
            {CONSTRAINTS.map((label) => (
              <div key={label} className={styles.item}>
                <Dot />
                <p className={styles.itemLabel}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.colIzq}>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}>USER EXPERIENCE</p>
            <div className={styles.visionInner}>
              <p className={styles.visionBody}>
                A long, fragmented journey with no status visibility, unexpected steps, and no clear confirmation.
              </p>
              <div className={styles.grid}>
                {BALANCE_TILES.map((tile) => (
                  <div key={tile.title} className={styles.tile}>
                    <p className={tile.boldTitle ? styles.tileTitle : styles.tileTitleRegular}>{tile.title}</p>
                    <p className={styles.tileCaption}>{tile.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

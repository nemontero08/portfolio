import { getTranslations } from "next-intl/server";
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

// Confirmed: the 3rd tile's (OPERATIONS/OPERACIÓN) title has no weight
// override in the source, unlike the other 3 — kept as a local flag,
// indexed to match vitalmed.constraints.grid's order in the JSON.
const BALANCE_TILE_BOLD_TITLE = [true, true, false, true];

type BalanceTile = { title: string; caption: string };

function Dot() {
  return (
    <svg viewBox="0 0 5 5" width={5} height={5} aria-hidden>
      <circle cx="2.5" cy="2.5" r="2.5" fill="rgb(0, 87, 184)" />
    </svg>
  );
}

export default async function Constraints() {
  const t = await getTranslations("vitalmed.constraints");
  const items = t.raw("items") as string[];
  const grid = t.raw("grid") as BalanceTile[];

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

      <div className={styles.cosas}>
        <div className={styles.colDer}>
          <p className={styles.derTitle}>{t("balanceTitle")}</p>
          <p className={styles.derText}>{t("balanceText")}</p>
          <div className={styles.cuadro}>
            {items.map((label) => (
              <div key={label} className={styles.item}>
                <Dot />
                <p className={styles.itemLabel}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.colIzq}>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}>{t("userExperienceTitle")}</p>
            <div className={styles.visionInner}>
              <p className={styles.visionBody}>{t("userExperienceBody")}</p>
              <div className={styles.grid}>
                {grid.map((tile, i) => (
                  <div key={tile.title} className={styles.tile}>
                    <p className={BALANCE_TILE_BOLD_TITLE[i] ? styles.tileTitle : styles.tileTitleRegular}>
                      {tile.title}
                    </p>
                    <p className={styles.tileCaption}>{tile.caption}</p>
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

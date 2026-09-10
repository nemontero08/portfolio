import { getTranslations } from "next-intl/server";
import styles from "./Problem.module.css";

/**
 * reference/framer-original/vitalmed/'s "The Problem" section
 * (.framer-1djg2f9-container). Verbatim text, confirmed layout/colors —
 * not the old spec. Full section, top to bottom:
 *
 * - Texto (full width): eyebrow "THE PROBLEM" + a 2-line italic serif
 *   title + a body paragraph + a highlighted "Mensaje" line.
 * - Cosas (row below Texto): COL IZQ (40% width, two stacked cards —
 *   "User Experience" and "Organization") + COL DER (remaining width —
 *   a "Titulo" label + a vertical 8-item timeline of the original flow's
 *   steps, each with an emoji icon, separated by thin connector lines).
 *
 * SECCION eyebrow font-size: no --framer-font-size is set anywhere in the
 * source for this text node OR any of its ancestors up to the section
 * root — traced the full var() fallback chain
 * (--font-size -> --framer-font-size, no default) confirmed empty, so it
 * falls through to CSS inheritance. Rendered at 16px here (the site's
 * base default) as the most defensible reading of that chain — flagging
 * this as inferred-via-inheritance rather than an explicit source value,
 * unlike everything else in this component. Same situation applies to the
 * two Vision cards' own body lines (no explicit font-size either).
 *
 * Icons: the 8 timeline icons are literal emoji (🌐💬📷🔗📄💳🏥⌨️), not
 * images/sprites — confirmed plain text content, nothing to resolve via
 * f2c-sw.js. The connector "Linea" between items IS a real asset: an
 * inline SVG symbol (<use href="#svg1282954012_228">) present directly in
 * the capture (a 1x11 vertical tick, stroke rgba(255,255,255,0.07)) — not
 * missing, nothing to flag.
 */

// Emoji are decorative and identical in both locales — paired with the
// translated timeline labels (vitalmed.problem.timeline) by index.
const TIMELINE_EMOJI = ["🌐", "💬", "📷", "🔗", "📄", "💳", "🏥", "⌨️"];

function ConnectorLine() {
  return (
    <div className={styles.linea}>
      <svg viewBox="0 0 1 11" width={1} height={11} aria-hidden>
        <path d="M 0 0 L 0 11" stroke="rgba(255, 255, 255, 0.07)" strokeWidth={2} />
      </svg>
    </div>
  );
}

export default async function Problem() {
  const t = await getTranslations("vitalmed.problem");
  const timeline = t.raw("timeline") as string[];

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
          <p className={styles.mensaje}>{t("mensaje")}</p>
        </div>
      </div>

      <div className={styles.cosas}>
        <div className={styles.colIzq}>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}> {t("userExperience.title")}</p>
            <p className={styles.visionBody}>{t("userExperience.body")}</p>
          </div>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}>{t("organization.title")}</p>
            <p className={styles.visionBody}>{t("organization.body1")} </p>
            <p className={styles.visionBody}>{t("organization.body2")}</p>
          </div>
        </div>

        <div className={styles.colDer}>
          <p className={styles.derTitle}>{t("timelineTitle")}</p>
          <div className={styles.cuadro}>
            {timeline.map((label, i) => (
              <div key={label} className={styles.itemGroup}>
                <div className={styles.item}>
                  <div className={styles.icono}>
                    <p className={styles.iconoEmoji}>{TIMELINE_EMOJI[i]}</p>
                  </div>
                  <p className={styles.itemLabel}>{label}</p>
                </div>
                {i < timeline.length - 1 && <ConnectorLine />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

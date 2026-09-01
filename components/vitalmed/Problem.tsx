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

const TIMELINE_STEPS = [
  { emoji: "🌐", label: "Initial web form" },
  { emoji: "💬", label: "Contact and follow-up via WhatsApp" },
  { emoji: "📷", label: "ID photos via message" },
  { emoji: "🔗", label: "Biometric validation on external platform" },
  { emoji: "📄", label: "PDF to print, sign, and scan" },
  { emoji: "💳", label: "Banking details via WhatsApp" },
  { emoji: "🏥", label: "Manual review by medical audit team" },
  { emoji: "⌨️", label: "Manual entry into internal system" },
];

function ConnectorLine() {
  return (
    <div className={styles.linea}>
      <svg viewBox="0 0 1 11" width={1} height={11} aria-hidden>
        <path d="M 0 0 L 0 11" stroke="rgba(255, 255, 255, 0.07)" strokeWidth={2} />
      </svg>
    </div>
  );
}

export default function Problem() {
  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>THE PROBLEM</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>Onboarding didn&apos;t live in a system.</p>
          <p className={styles.tituloLine2}>It lived across tools.</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>
            The process started with a web form, continued on WhatsApp with an advisor, included PDFs to print and
            sign, validations on external platforms, and manual review by the medical audit team. For the user:
            opaque, slow, unpredictable. For the organization: total dependency on manual effort, no traceability,
            no metrics
          </p>
          <p className={styles.mensaje}>The problem wasn&apos;t visual. It was structural</p>
        </div>
      </div>

      <div className={styles.cosas}>
        <div className={styles.colIzq}>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}> USER EXPERIENCE</p>
            <p className={styles.visionBody}>
              A long, fragmented journey with no status visibility, unexpected steps, and no clear confirmation
            </p>
          </div>
          <div className={styles.visionCard}>
            <p className={styles.visionTitle}>ORGANIZATION</p>
            <p className={styles.visionBody}>Total dependency on human intervention. </p>
            <p className={styles.visionBody}>Traceability through conversations. Variable timelines. No metrics</p>
          </div>
        </div>

        <div className={styles.colDer}>
          <p className={styles.derTitle}>ORIGINAL FLOW — 8 STEPS · 5 DIFFERENT CHANNELS</p>
          <div className={styles.cuadro}>
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.label} className={styles.itemGroup}>
                <div className={styles.item}>
                  <div className={styles.icono}>
                    <p className={styles.iconoEmoji}>{step.emoji}</p>
                  </div>
                  <p className={styles.itemLabel}>{step.label}</p>
                </div>
                {i < TIMELINE_STEPS.length - 1 && <ConnectorLine />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

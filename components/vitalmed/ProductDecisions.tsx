import { getTranslations } from "next-intl/server";
import styles from "./ProductDecisions.module.css";

/**
 * reference/framer-original/vitalmed/'s "Product Decisions" section
 * (Desktop variant, .framer-mv5KU.framer-1hgtjfo, under the "PRODUCT
 * DECISIONS" eyebrow). Verbatim text, confirmed layout — resolved via
 * proper cascade simulation over the exact selectors that apply to this
 * page's own "framer-mv5KU" component-instance Desktop variant (a
 * different generated wrapper class than Solution's "framer-SJTaY" —
 * each Framer component instance gets its own, checked directly rather
 * than assumed shared).
 *
 * Unlike every other section built so far, this one's TITULO is a single
 * line ("Structural decisions" — no second line) and there is NO
 * separate "Body" intro paragraph at all: eyebrow + titulo go straight
 * into content. Confirmed, not an oversight.
 *
 * Structure, top to bottom:
 * 1. Four decision cards in two fixed/flex columns (2 cards each): title,
 *    description, and a highlighted amber "Trade-off: ..." pill pinned to
 *    the card's bottom.
 * 2. A second row: a narrow (30%) quote card ("WHAT CHANGED" + an italic
 *    serif pull-quote) beside a wider (flex) "A SYSTEM BUILT TO MEASURE"
 *    card listing 4 metrics, each with the same reused arrow icon-button
 *    (#1475982494, rotate 45deg — same glyph already reproduced inline in
 *    HowItEvolved.tsx and Solution.tsx) and a bottom divider on every item
 *    except the last (confirmed: the last item's wrapper carries neither
 *    data-border nor the others' bottom padding).
 *
 * No images in this section — confirmed, no <img> tags in the source for
 * it. No other sprite refs beyond the one arrow icon reused above.
 *
 * Card/column height note: the source forces the two decision-card
 * columns and their cards to a hardcoded pixel height (e.g. 370px) via
 * Framer's design-time layout so each card's trade-off pill lands flush
 * at the bottom via justify-content:space-between. A responsive rebuild
 * can't reproduce that hardcoded height faithfully, so each card here is
 * auto-height with an explicit gap before its pill instead — same visual
 * intent (text top, pill separated below), noted as an approximation
 * rather than silently deviating.
 */

type Decision = { title: string; description: string; tradeOff: string };
type Metric = { title: string; description: string };

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} style={{ transform: "rotate(45deg)" }} aria-hidden>
      <path d="M7 7H17V17" fill="none" stroke="rgb(130, 180, 240)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17L17 7" fill="none" stroke="rgb(130, 180, 240)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className={styles.decisionCard}>
      <div className={styles.decisionText}>
        <p className={styles.decisionTitle}>{decision.title}</p>
        <p className={styles.decisionDescription}>{decision.description}</p>
      </div>
      <div className={styles.tradeOff}>
        <p className={styles.tradeOffText}>{decision.tradeOff}</p>
      </div>
    </div>
  );
}

function MetricItem({ metric, bordered }: { metric: Metric; bordered: boolean }) {
  return (
    <div className={bordered ? styles.metricItem : styles.metricItemLast}>
      <div className={styles.metricIcon}>
        <ArrowIcon />
      </div>
      <div className={styles.metricText}>
        <p className={styles.metricTitle}>{metric.title}</p>
        <p className={styles.metricDescription}>{metric.description}</p>
      </div>
    </div>
  );
}

export default async function ProductDecisions() {
  const t = await getTranslations("vitalmed.productDecisions");
  const decisions = t.raw("decisions") as Decision[];
  const metrics = t.raw("metrics") as Metric[];

  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine}>{t("title")}</p>
        </div>
      </div>

      <div className={styles.decisionsRow}>
        <div className={styles.decisionsColFixed}>
          {decisions.slice(0, 2).map((d) => (
            <DecisionCard key={d.title} decision={d} />
          ))}
        </div>
        <div className={styles.decisionsColFlex}>
          {decisions.slice(2, 4).map((d) => (
            <DecisionCard key={d.title} decision={d} />
          ))}
        </div>
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.quoteCol}>
          <div className={styles.quoteCard}>
            <p className={styles.quoteLabel}>{t("quoteLabel")}</p>
            <p className={styles.quoteText}>&quot;{t("quoteText")}&quot;</p>
          </div>
        </div>
        <div className={styles.metricsCol}>
          <div className={styles.metricsCard}>
            <p className={styles.metricsLabel}>{t("metricsLabel")}</p>
            <div className={styles.metricsList}>
              {metrics.map((metric, i) => (
                <MetricItem key={metric.title} metric={metric} bordered={i < metrics.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import styles from "./Takeaways.module.css";

/**
 * reference/framer-original/vitalmed/'s "Takeaways" section (Desktop
 * variant, .framer-J9S3v.framer-1f0w3c9, under the "TAKEAWAYS" eyebrow —
 * the page's final section). Verbatim text, confirmed layout — resolved
 * via cascade simulation scoped to this component instance's own
 * "framer-J9S3v" wrapper class (each Framer component instance gets its
 * own generated wrapper class, same approach as every other section on
 * this page).
 *
 * Like Product Decisions, there is NO separate "Body" intro paragraph —
 * eyebrow + 2-line titulo go straight into content. Confirmed, not an
 * oversight.
 *
 * Content: a plain divided list of 4 numbered takeaways (no card
 * background this time — just a top-border divider between items,
 * confirmed no border on item 1, top border on items 2-4), each pairing
 * a large italic serif number with a title + description. Below that, a
 * single highlighted closing-quote callout (left accent bar + tinted
 * background) with an attribution line.
 *
 * Number/quote font: confirmed IBM Plex Serif italic at REGULAR weight
 * (font-selector "R0Y7SUJNIFBsZXggU2VyaWYtaXRhbGlj", no "500" — distinct
 * from the titulo's italic MEDIUM weight, "...LTUwMGl0YWxpYw=="-style
 * selectors used elsewhere on this page). Reproduced as plain italic
 * (no font-weight override), not the --font-ibm-plex-serif variable
 * (which is loaded at weight 500 for this page's medium-italic titulos).
 *
 * No images or sprite icon refs anywhere in this section — confirmed,
 * purely typographic.
 */

type Takeaway = { number: string; title: string; description: string };

export default async function Takeaways() {
  const t = await getTranslations("vitalmed.takeaways");
  const items = t.raw("items") as Takeaway[];

  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>{t("titleLine1")}</p>
          <p className={styles.tituloLine2}>{t("titleLine2")}</p>
        </div>
      </div>

      <div className={styles.list}>
        {items.map((item, i) => (
          <div key={item.number} className={i === 0 ? styles.itemFirst : styles.item}>
            <p className={styles.number}>{item.number}</p>
            <div className={styles.itemText}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.callout}>
        <p className={styles.quote}>&quot;{t("quote")}&quot;</p>
        <p className={styles.attribution}>{t("attribution")}</p>
      </div>
    </div>
  );
}

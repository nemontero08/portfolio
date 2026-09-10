import { getTranslations } from "next-intl/server";
import styles from "./WhatIDo.module.css";

type Item = { title: string; description: string };

// Slider arrows are hidden by default in the original (shown on hover/scroll
// interaction) — that behavior comes later. Static horizontal-scroll list
// for now.
export default async function WhatIDo() {
  const t = await getTranslations("home.whatIDo");
  const items = t.raw("items") as Item[];

  return (
    <div className={styles.card}>
      <h5 className={styles.eyebrow}>{t("eyebrow")}</h5>
      <ul className={styles.list}>
        {items.map((item) => (
          <li className={styles.item} key={item.title}>
            <h4 className={styles.itemTitle}>{item.title}</h4>
            <h5 className={styles.itemDescription}>{item.description}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
}

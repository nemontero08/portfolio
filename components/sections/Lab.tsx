import { getTranslations } from "next-intl/server";
import styles from "./Lab.module.css";

export default async function Lab() {
  const t = await getTranslations("home.lab");

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{t("title")}</h4>
      <p className={styles.description}>{t("description")}</p>
    </div>
  );
}

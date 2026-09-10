import { Hanken_Grotesk } from "next/font/google";
import { getTranslations } from "next-intl/server";
import styles from "./Hero.module.css";

// Headline-only accent font — the rest of the site stays on Inter.
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-hanken-grotesk",
});

// New custom hero content (redesign phase) — not from reference/framer-original.
export default async function Hero() {
  const t = await getTranslations("home.hero");
  const pills = t.raw("pills") as string[];

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>{t("eyebrow")}</p>
      <h1 className={`${styles.title} ${hankenGrotesk.variable}`}>
        {t.rich("title", {
          emphasis: (chunks) => <span className={styles.underline}>{chunks}</span>,
        })}
      </h1>
      <p className={styles.description}>{t("paragraph")}</p>
      <div className={styles.pills}>
        {pills.map((pill) => (
          <span className={styles.pill} key={pill}>
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

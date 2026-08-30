import { Hanken_Grotesk } from "next/font/google";
import styles from "./Hero.module.css";

// Headline-only accent font — the rest of the site stays on Inter.
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-hanken-grotesk",
});

// New custom hero content (redesign phase) — not from reference/framer-original.
export default function Hero() {
  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>PRODUCT DESIGNER · UX/UI · REMOTE</p>
      <h1 className={`${styles.title} ${hankenGrotesk.variable}`}>
        I design complex products, starting with <span className={styles.underline}>how they work</span>.
      </h1>
      <p className={styles.description}>
        I used to write the code, now I design the product — that&apos;s why I start with how it works, not
        how it looks. I work across B2B and B2C, from dashboards and operational tools to complex flows.
      </p>
      <div className={styles.pills}>
        <span className={styles.pill}>3+ years in product</span>
        <span className={styles.pill}>B2B · B2C · SaaS</span>
        <span className={styles.pill}>ex-developer · full-stack</span>
      </div>
    </div>
  );
}

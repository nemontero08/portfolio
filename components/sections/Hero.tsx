import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.hi}>
          <h3 className={styles.greeting}>Hello, I&apos;m Nico</h3>
          <p className={styles.wave} aria-hidden>
            👋
          </p>
        </div>
        <h3 className={styles.headline}>I turn complex processes into usable digital products</h3>
      </div>
      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden />
        <p className={styles.role}>
          <span>PRODUCT</span>
          <span>UX/UI</span>
          <span>DESIGNER</span>
        </p>
      </div>
    </div>
  );
}

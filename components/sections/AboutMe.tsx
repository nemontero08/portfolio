import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <div className={styles.card}>
      <div>
        <h4 className={styles.title}>About me</h4>
        <p className={styles.description}>
          Product Designer focused on digital products, complex systems, and clarity-driven experiences.
        </p>
      </div>
      <div className={styles.photoPlaceholder} aria-hidden />
    </div>
  );
}

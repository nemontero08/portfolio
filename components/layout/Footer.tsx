import styles from "./Footer.module.css";

// New addition, not part of the original site.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© {year} Nicolas Montero</p>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/nemontero08/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className={styles.link}
          href="https://drive.google.com/file/d/1GBlxHIKzgw4Xv7DNqGKQj19GC0M40hPM/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a className={styles.link} href="mailto:monteronicolasuxui@gmail.com">
          Email
        </a>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

const LANGUAGES = ["EN", "ES"] as const;

/**
 * New addition, not part of the original site. Visual only for now — the
 * language switch doesn't wire up real translation yet (tracked as a
 * separate next step); it just toggles which option looks active.
 */
export default function Navbar() {
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]>("EN");

  return (
    <nav className={styles.navbar}>
      <p className={styles.brand}>Nicolas Montero</p>
      <div className={styles.langSwitch} role="group" aria-label="Language">
        {LANGUAGES.map((option) => (
          <button
            key={option}
            type="button"
            className={option === lang ? `${styles.langOption} ${styles.langOptionActive}` : styles.langOption}
            aria-pressed={option === lang}
            onClick={() => setLang(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </nav>
  );
}

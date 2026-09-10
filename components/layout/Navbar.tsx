"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";
import styles from "./Navbar.module.css";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const satisfies { code: (typeof routing)["locales"][number]; label: string }[];

/**
 * New addition, not part of the original site. The language switch is now
 * wired to real locale routing: clicking EN/ES navigates to the same page
 * under the other locale (e.g. /en/vitalmed <-> /es/vitalmed) rather than
 * resetting to home — usePathname/useRouter here are next-intl's
 * locale-aware versions (@/i18n/navigation), so `pathname` is already the
 * locale-agnostic path and router.replace's `locale` option swaps the
 * prefix.
 */
export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <p className={styles.brand}>Nicolas Montero</p>
      <div className={styles.langSwitch} role="group" aria-label="Language">
        {LANGUAGES.map((option) => (
          <button
            key={option.code}
            type="button"
            className={option.code === locale ? `${styles.langOption} ${styles.langOptionActive}` : styles.langOption}
            aria-pressed={option.code === locale}
            onClick={() => router.replace(pathname, { locale: option.code })}
          >
            {option.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

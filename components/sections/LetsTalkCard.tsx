import { getTranslations } from "next-intl/server";
import styles from "./LetsTalkCard.module.css";
import CopyBtn from "@/components/ui/CopyBtn";

const EMAIL = "monteronicolasuxui@gmail.com";

/**
 * Verified against the compiled component source
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/{Bi9EkExg7.3Fg7n9Qe.mjs,OH1NKk6xX.B_iWmm58.mjs}):
 * - Card colors confirmed unchanged from the layout step: bg
 *   `rgb(183, 196, 255)` (#b7c4ff), text `rgb(0, 56, 182)` (#0038b6).
 *
 * The copy-to-clipboard behavior itself (hover -> "COPY EMAIL", click ->
 * "COPIED!", 2s revert) now lives in the shared components/ui/CopyBtn,
 * reused as-is here — see that file for the full behavior notes.
 *
 * Not pulled from source (not asked to this time): the "@" icon and the
 * copy glyph are simple placeholders sized to spec (25x25 / 16x16).
 */

function CopyIcon() {
  return (
    <svg className={styles.copyIcon} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3.5 10.5H2.75A1.25 1.25 0 0 1 1.5 9.25v-6.5A1.25 1.25 0 0 1 2.75 1.5h6.5A1.25 1.25 0 0 1 10.5 2.75V3.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export default async function LetsTalkCard() {
  const t = await getTranslations("home.letsTalkCard");

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3 className={styles.title}>{t("title")}</h3>
        <div className={styles.atIcon} aria-hidden>
          @
        </div>
      </div>
      <CopyBtn email={EMAIL} icon={<CopyIcon />} />
    </div>
  );
}

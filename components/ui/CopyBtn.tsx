"use client";

import { useState, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./CopyBtn.module.css";

const COPIED_RESET_MS = 2000;

/**
 * Shared copy-to-clipboard control, extracted from the home page's
 * LetsTalkCard. Behavior confirmed there against the compiled component
 * source (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/{Bi9EkExg7.3Fg7n9Qe.mjs,OH1NKk6xX.B_iWmm58.mjs}):
 * hover -> "COPY EMAIL" (no punctuation), click -> copies + "COPIED!"
 * (with it), reverts to the plain email after COPIED_RESET_MS. The text
 * swap is an instant string change, not a fade.
 *
 * The three possible labels (email / "COPY EMAIL" / "COPIED!") are
 * rendered simultaneously, stacked in one CSS grid cell, with only the
 * active one visible (visibility, not display — a hidden grid item still
 * contributes to the track's sizing). That keeps the label's own intrinsic
 * width pinned to the widest of the three at all times, so the button
 * never shrinks when the text swaps to a shorter string mid-hover — a
 * shrinking hit area was pushing the cursor outside the button, dropping
 * the hover, reverting the text, and re-triggering hover in a loop.
 *
 * The outer <button> is the stable-width hit area (it can end up wider
 * than its content — e.g. LetsTalkCard's .card is a column flex container
 * with no align-items override, so it stretches the button to the card's
 * full width). Text + icon live together in an inner, content-sized,
 * left-aligned wrapper, so they stay glued to each other and to the left
 * edge regardless of how wide the outer button ends up — the icon must
 * hug the text, not the button's right edge.
 *
 * Colors, icon, gap, and font are left to the caller — confirmed to differ
 * between the home card and the how-i-work Contact section (see
 * LetsTalkCard.tsx and components/how-i-work/Contact.tsx for each context's
 * own confirmed values).
 */
interface CopyBtnProps {
  email: string;
  icon: ReactNode;
  gap?: number;
  fontFamily?: string;
  className?: string;
}

export default function CopyBtn({ email, icon, gap = 8, fontFamily, className }: CopyBtnProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showHoverLabel = hovered && !copied;
  const showEmail = !hovered && !copied;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // clipboard access can fail (permissions, insecure context) — the
      // label still confirms the attempt, nothing else to do here.
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  return (
    <button
      type="button"
      className={`${styles.copyBtn} ${className ?? ""}`}
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.inner} style={{ gap } as CSSProperties}>
        <span className={styles.emailStack} style={fontFamily ? { fontFamily } : undefined}>
          <span className={styles.emailLayer} data-active={showEmail}>
            {email}
          </span>
          <span className={styles.emailLayer} data-active={showHoverLabel}>
            COPY EMAIL
          </span>
          <span className={styles.emailLayer} data-active={copied}>
            COPIED!
          </span>
        </span>
        {icon}
      </span>
    </button>
  );
}

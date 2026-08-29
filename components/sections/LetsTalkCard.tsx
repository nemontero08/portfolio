"use client";

import { useState, useRef } from "react";
import styles from "./LetsTalkCard.module.css";

const EMAIL = "monteronicolasuxui@gmail.com";
const COPIED_RESET_MS = 2000; // confirmed against the source: this exact 2s value is used by one of its several near-duplicate per-breakpoint state machines (others use 1.5s) — see component notes.

/**
 * Verified against the compiled component source
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/{Bi9EkExg7.3Fg7n9Qe.mjs,OH1NKk6xX.B_iWmm58.mjs}):
 * - Hover text is literally `COPY EMAIL` (no punctuation); click text is
 *   literally `COPIED!` (with it) — both confirmed as exact strings in the
 *   source, text color unchanged (stays accent-deep) in both.
 * - The click handler really does `navigator.clipboard.writeText(email)`,
 *   then reverts on a timer — 2000ms is one of the real values used in the
 *   source's (several, slightly inconsistent per breakpoint) revert timers;
 *   others use 1500ms. Reverts to the plain email, not back to "COPY EMAIL",
 *   matching the spec here.
 * - Card colors confirmed unchanged from the layout step: bg
 *   `rgb(183, 196, 255)` (#b7c4ff), text `rgb(0, 56, 182)` (#0038b6).
 * - The text swap is an INSTANT string swap, not a fade: an opacity
 *   crossfade washes the deep-blue text out toward the lavender background
 *   mid-transition, which the original does not do. No animation on this
 *   text — just change the string.
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

export default function LetsTalkCard() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const label = copied ? "COPIED!" : hovered ? "COPY EMAIL" : EMAIL;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard access can fail (permissions, insecure context) — the
      // label still confirms the attempt, nothing else to do here.
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <h3 className={styles.title}>Let&apos;s talk</h3>
        <div className={styles.atIcon} aria-hidden>
          @
        </div>
      </div>
      <button
        type="button"
        className={styles.copyBtn}
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className={styles.email}>{label}</p>
        <CopyIcon />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "./UserExperience.module.css";

type Feeling = { label: string; quote: string; score: string; scoreValue: number; border: string; bg: string; text: string; bar: string };
type Row = { stageDisplay: string; description: string; before: Feeling; after: Feeling; afterNote?: string };

/**
 * Mobile-only (≤767px, hidden at desktop via CSS — see .accordion in
 * UserExperience.module.css) replacement for the desktop STAGE/BEFORE/
 * AFTER table. Confirmed from reference/framer-original/vitalmed/'s own
 * "MOBILE L" variant (shared across 375-424/425-767/<374, same as every
 * other section on this page): the table becomes a real interactive
 * accordion — a genuine reused Framer code component (framer-YK2hC and 4
 * sibling instances, one per stage; confirmed via the page's own
 * data-framer-components list, not a CSS-only trick), not a plain stack
 * or a horizontal scroll.
 *
 * CONFIRMED from the static capture (collapsed/rest state): each row is
 * a dark (rgb(20,20,20)) card, 16px radius, 16px padding, a clickable
 * header (cursor:pointer, row layout, space-between) showing the
 * "N. Stage name" + description text on the left and a chevron icon
 * (the real source glyph, svg id 4024583230 — a plain 12x6 down-chevron,
 * not a placeholder) on the right. Rows are stacked with an 8px gap.
 *
 * NOT independently confirmed: the expanded panel's exact content
 * styling. The compiled component JS confirms this is a real 3-variant
 * component (Desktop/rest, "Variant 2"/hover, "Variant 3"/expanded —
 * traced via its own variant-id map), but a static HTML capture only
 * ever contains the rest-state markup, so the expanded panel's real
 * layout isn't recoverable from this capture. Built here as a reasonable
 * mobile adaptation instead: tapping a row reveals the SAME confirmed
 * Before/After data already used by the desktop table (badge, quote,
 * bar, score — identical values/colors), just stacked vertically instead
 * of side-by-side, rather than inventing new content. Flagging this one
 * piece as an adaptation, not an extracted value — everything else on
 * this component is confirmed.
 */
export default function UserExperienceAccordion({ rows }: { rows: Row[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {rows.map((row, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={styles.accordionItem} key={row.stageDisplay}>
            <button
              type="button"
              className={styles.accordionHeader}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className={styles.accordionHeaderText}>
                <p className={styles.stage}>{row.stageDisplay}</p>
                <p className={styles.description}>{row.description}</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className={styles.accordionChevron}
                style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
                aria-hidden
              >
                <path
                  d="M6 9L12 15L18 9"
                  fill="none"
                  stroke="rgb(204, 204, 204)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen && (
              <div className={styles.accordionBody}>
                <AccordionFeeling label="BEFORE" feeling={row.before} />
                <AccordionFeeling label="AFTER" feeling={row.after} note={row.afterNote} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AccordionFeeling({ label, feeling, note }: { label: string; feeling: Feeling; note?: string }) {
  return (
    <div className={styles.accordionFeeling}>
      <p className={styles.accordionFeelingLabel}>{label}</p>
      <div className={styles.badge} style={{ borderColor: feeling.border, background: feeling.bg }}>
        <p className={styles.badgeText} style={{ color: feeling.text }}>
          {feeling.label}
        </p>
      </div>
      <p className={styles.quote}>{feeling.quote}</p>
      <div className={styles.barRow}>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${feeling.scoreValue * 10}%`, background: feeling.bar }} />
        </div>
        <p className={styles.score}>{feeling.score}</p>
      </div>
      {note && (
        <div className={styles.note}>
          <p className={styles.noteText}>{note}</p>
        </div>
      )}
    </div>
  );
}

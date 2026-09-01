import styles from "./Contact.module.css";
import CopyBtn from "@/components/ui/CopyBtn";

const EMAIL = "monteronicolasuxui@gmail.com";

/**
 * reference/framer-original/how-i-work/'s third and last content section
 * (.framer-nkc5pu-container) — the solid lavender CTA box. Verbatim text,
 * confirmed layout/colors — not the old spec.
 *
 * All text in this box is confirmed rgb(0, 56, 182) (== --color-accent-deep,
 * the exact token already used for the home page's Let's Talk card text on
 * the same lavender fill) — set once on .box below, inherited by everything
 * including CopyBtn.
 *
 * CopyBtn: the real control here is literally named "CopyBtn" in the
 * source (data-framer-name="CopyBtn") — same component identity as the
 * home page's, confirmed via its own compiled JS in a prior pass. Reused
 * directly from components/ui/CopyBtn, not rebuilt. Two confirmed
 * differences from the home usage, both passed as props rather than
 * hardcoded into the shared component: a 12px icon/text gap (home uses
 * 8px), and Space Grotesk Bold for the email text (home uses the inherited
 * default sans — flagging that discrepancy; left home's file untouched
 * per instructions not to touch other sections/pages, but happy to sync it
 * if you want). The copy icon is the source's REAL icon (two overlapping
 * rounded squares, extracted from its inline <use> symbol), not the
 * placeholder still used on the home card.
 *
 * The gap between the intro text block and the CopyBtn row (32px, --space-7)
 * is NOT independently confirmed — the source sets no explicit `gap` at
 * that level (only `justify-content: space-between` on a min-content-height
 * box, which has no visible effect without a taller constrained box).
 * Approximated to match this box's own padding scale; flag if it should be
 * tighter/looser.
 */

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden>
      <path
        d="M 2 14 C 0.895 14 0 13.105 0 12 L 0 2 C 0 0.895 0.895 0 2 0 L 12 0 C 13.105 0 14 0.895 14 2 L 14 12 C 14 13.105 13.105 14 12 14 Z"
        transform="translate(8 8)"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 2 14 C 0.9 14 0 13.1 0 12 L 0 2 C 0 0.9 0.9 0 2 0 L 12 0 C 13.1 0 14 0.9 14 2"
        transform="translate(2 2)"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <div className={styles.box}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>LET&apos;S WORK TOGETHER</p>
        <div className={styles.body}>
          <h3 className={styles.heading}>Let&apos;s talk.</h3>
          <p className={styles.paragraph}>
            I work best with founders or product teams at an early or growth stage, with a concrete operational
            problem that design can solve. If you&apos;re looking for just pretty screens, I&apos;m probably not the
            right fit.
          </p>
          <p className={styles.typicalProjects}>
            Typical projects: digital onboarding · B2B platforms · operational process redesign · systems with
            technical or legal constraints.
          </p>
        </div>
      </div>
      <CopyBtn email={EMAIL} icon={<CopyIcon />} gap={12} fontFamily="var(--font-space-grotesk)" />
    </div>
  );
}

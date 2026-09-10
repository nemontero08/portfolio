import { Space_Grotesk, Manrope } from "next/font/google";
import styles from "./page.module.css";
import BackButton from "@/components/layout/BackButton";
import Methodology from "@/components/how-i-work/Methodology";
import Principles from "@/components/how-i-work/Principles";
import ContactCTA from "@/components/sections/ContactCTA";

// This page's own confirmed heading/eyebrow fonts (separate from the home
// page's Manrope instance, which only loads weight 800). Weight 600 is
// Principles' "What you won't find"/card-title preset; 700 is the section
// headings and Methodology's card titles. Space Grotesk 700 is Contact's
// CopyBtn email text (confirmed bold, unlike the 400/500 eyebrow weights).
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });
const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-manrope" });

/**
 * FIRST PASS: page scaffold only. This page reproduces
 * reference/framer-original/how-i-work/'s own aesthetic and structure —
 * it does NOT reuse the home page's redesigned Bento layout.
 *
 * Section containers below match the original's confirmed structure,
 * order, max-width, padding, and gap. Content for each is stubbed for now;
 * filled in one section at a time in later passes.
 *
 * Confirmed section order + identity (via each section's own eyebrow/
 * heading text in the source, not guessed):
 * 1. Methodology — "METHODOLOGY & FLOW" / "I turn complex processes into
 *    digital products"
 * 2. Principles  — "WHERE I WORK BEST" / "Non-negotiable principles"
 * 3. Contact/CTA — "LET'S WORK TOGETHER" / "Let's talk." (rendered via the
 *    shared components/sections/ContactCTA, also used to close the
 *    Vitalmed page — not a how-i-work-specific component)
 */
export default function HowIWorkPage() {
  return (
    <main className={`${styles.root} ${spaceGrotesk.variable} ${manrope.variable}`}>
      <BackButton />
      <div className={styles.body}>
        <section className={styles.methodology} aria-label="Methodology">
          <Methodology />
        </section>
        <section className={styles.principles} aria-label="Principles">
          <Principles />
        </section>
        <section className={styles.contact} aria-label="Contact">
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}

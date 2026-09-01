import { Space_Grotesk, IBM_Plex_Serif } from "next/font/google";
import styles from "./page.module.css";
import BackButton from "@/components/layout/BackButton";
import VitalmedHero from "@/components/vitalmed/Hero";
import RoleVision from "@/components/vitalmed/RoleVision";
import Problem from "@/components/vitalmed/Problem";
import Constraints from "@/components/vitalmed/Constraints";
import HowItEvolved from "@/components/vitalmed/HowItEvolved";
import UserExperience from "@/components/vitalmed/UserExperience";

// This page's own confirmed eyebrow font (Role & Vision's three eyebrow
// labels, ROLE/VISION/SECTOR · PLATFORM — Space Grotesk medium, 12px).
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500"], variable: "--font-space-grotesk" });
// The Problem section's title font (italic serif, confirmed).
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-ibm-plex-serif",
});

/**
 * FIRST PASS: recon + scaffold only. Same approach as /how-i-work — this
 * page reproduces reference/framer-original/vitalmed/'s own aesthetic and
 * structure, not the home page's redesigned layout.
 *
 * BackButton is reused as-is: this page's own "Close Button" element is
 * confirmed byte-for-byte identical in markup/CSS to how-i-work's
 * (same classes, href="../", same border/backdrop-filter values) — not
 * assumed, checked directly.
 *
 * Section containers below match the original's confirmed structure,
 * order, max-width, and divider pattern. Content for each is stubbed for
 * now; filled in one section at a time in later passes (Lottie animations
 * included — see the recon report for their exact location).
 *
 * Confirmed section order + identity (via each section's own eyebrow/
 * heading text or, for Hero, its body copy — not guessed):
 * 1.  Hero            — "From fragmented process to digital onboarding"
 *     (the whole hero block is itself a link back to "../", confirmed —
 *     not just the separate Close Button)
 * 2.  Role & Vision    — "ROLE" / "VISION" / "SECTOR" meta band
 * 3.  The Problem      — "THE PROBLEM"
 * 4.  Constraints      — "CONSTRAINTS"
 * 5.  How It Evolved   — "HOW IT EVOLVED"
 * 6.  User Experience  — "USER EXPERIENCE" (before/after emotional table)
 * 7.  The Solution     — "THE SOLUTION"
 * 8.  Product Decisions— "PRODUCT DECISIONS"
 * 9.  UI & Design System — "UI & DESIGN SYSTEM" (owns all 3 Lottie
 *     animations, under its "Animations & illustrations" sub-block)
 * 10. Takeaways        — "TAKEAWAYS"
 */
export default function VitalmedPage() {
  return (
    <main className={`${styles.root} ${spaceGrotesk.variable} ${ibmPlexSerif.variable}`}>
      <BackButton />
      <div className={styles.body}>
        <section className={styles.hero} aria-label="Hero">
          <VitalmedHero />
        </section>
        <section className={styles.roleVision} aria-label="Role and vision">
          <RoleVision />
        </section>
        <section className={styles.problem} aria-label="The problem">
          <Problem />
        </section>
        <section className={styles.constraints} aria-label="Constraints">
          <Constraints />
        </section>
        <section className={styles.evolution} aria-label="How it evolved">
          <HowItEvolved />
        </section>
        <section className={styles.userExperience} aria-label="User experience">
          <UserExperience />
        </section>
        <section className={styles.solution} aria-label="The solution" />
        <section className={styles.productDecisions} aria-label="Product decisions" />
        <section className={styles.designSystem} aria-label="UI and design system" />
        <section className={styles.takeaways} aria-label="Takeaways" />
      </div>
    </main>
  );
}

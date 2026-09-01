import Image from "next/image";
import styles from "./Hero.module.css";
import VitalmedLogo from "@/components/sections/VitalmedLogo";

/**
 * reference/framer-original/vitalmed/'s Hero section
 * (a.framer-d7nccx data-framer-name="Hero"). Verbatim text, confirmed
 * layout/colors — not the old spec.
 *
 * IMPORTANT confirmed departure from source: the whole hero block is
 * wrapped in <a href="../"> in the original (a second, redundant way back
 * to home besides the Close Button). Per explicit instruction this is
 * intentionally NOT reproduced — rendered as a plain non-interactive div,
 * no href, no click behavior. The visual box itself (background/radius/
 * padding) belongs to the INNER "Desktop" variant element, not the outer
 * link, so dropping the <a> loses nothing visually.
 *
 * Logo: the "VITALMED" wordmark here is a real inline SVG (background-
 * image data URI in the source, viewBox 0 0 343.868 47.696, white fill,
 * rendered at 344x48) — confirmed the same mark already built as
 * components/sections/VitalmedLogo for the home page's case-study card,
 * just at a different confirmed size, so reused directly rather than
 * duplicating the path data.
 *
 * Hero image: a real PNG (ZXJAaL3gnfD9agNIzFaDsglp8.1232zgv.png, natural
 * 683x1460), resolved via f2c-sw.js and copied to public/images. Confirmed
 * position: absolute, top:32px right:32px of the card (not part of the
 * normal flex flow next to the text column), 225x481 at this breakpoint,
 * object-fit:cover. No confirmed border-radius on the image itself.
 */
export default function VitalmedHero() {
  return (
    <div className={styles.card}>
      <div className={styles.textColumn}>
        <VitalmedLogo height={48} />
        <div className={styles.headingGroup}>
          <h3 className={styles.heading}>From fragmented process to digital onboarding</h3>
          <div className={styles.subheadingGroup}>
            <h3 className={styles.subheading}>
              An onboarding process that lived across forms, WhatsApp, and PDFs.
            </h3>
            <h3 className={styles.subheading}>
              The result was a mobile-only flow — structured, automated, and measurable.
            </h3>
          </div>
        </div>
        <div className={styles.ndaBadge}>
          <h3 className={styles.ndaIcon} aria-hidden>
            {String.fromCodePoint(0x1f512, 0x200b)}
          </h3>
          <h3 className={styles.ndaText}>Protected by NDA — name changed, real process</h3>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <Image src="/images/vitalmed-hero.png" alt="" fill className={styles.image} />
      </div>
    </div>
  );
}

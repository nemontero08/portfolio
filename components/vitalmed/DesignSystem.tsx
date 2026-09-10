import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LottieAnimation from "./LottieAnimation";
import styles from "./DesignSystem.module.css";

/**
 * reference/framer-original/vitalmed/'s "UI & Design System" section
 * (Desktop variant, .framer-WITdp.framer-1bukco0, under the "UI & DESIGN
 * SYSTEM" eyebrow). Verbatim text, confirmed layout — resolved via
 * cascade simulation scoped to this component instance's own
 * "framer-WITdp" wrapper class (each Framer component instance gets its
 * own generated wrapper class — checked directly, not assumed shared
 * with Solution's "framer-SJTaY" or Product Decisions' "framer-mv5KU").
 *
 * PASS 2 (this one): the 3 Lottie animations are now wired via
 * LottieAnimation (dotLottie-web canvas player). Each slot's .lottie file
 * and container size were traced to the compiled component JS, not
 * guessed — see LOTTIE_SLOTS below and LottieAnimation.tsx for the full
 * trace/confirmation notes.
 *
 * Body paragraphs: source wraps the 3 paragraphs in an extra nested
 * "framer-13hfa1i" frame (place-content:center, align-items:center,
 * width:min-content) inside Body — inconsistent with every other
 * section's plain full-width paragraph stack, and would visually
 * shrink-wrap/center-align these left-aligned paragraphs if reproduced
 * literally. Treated as a Framer editor artifact (an accidental extra
 * frame), not deliberate design, and reproduced with the same
 * `.body { column, gap:10px, width:100% }` pattern already established
 * in every other section instead.
 *
 * Two sub-blocks, both plain WHITE cards (rgb(255,255,255), 20px radius)
 * — the only light-on-dark surfaces on this page, confirmed — each with
 * a "✦ Label" heading whose star glyph and text are two different dark
 * grays (rgba(20,20,20,.6) / rgba(51,51,51,.6), confirmed, no matching
 * token in globals.css since this is the only light-card context on the
 * site).
 *
 * "Animations & illustrations" card: 3 rows, each pairing one Lottie slot
 * with one static image, alternating left/right (space-between). All 3
 * static images are real PNGs, resolved via f2c-sw.js, copied to
 * public/images. Confirmed Lottie container sizes (the actual player
 * footprint once wired, larger than each row's own nominal slot width —
 * these are deliberately overflowing decorative loops, confirmed via
 * `overflow:visible` on every wrapping row/slot in source, not a bug):
 * row 1 slot 300x210, row 2 slot 300x210, row 3 slot 270x189.
 *
 * "UI KIT" card: 2 stacked images on the left beside 1 tall image on the
 * right (space-between), then 1 full-width banner image below. All 4
 * real PNGs, resolved via f2c-sw.js, copied to public/images.
 *
 * MOBILE (≤767px) PASS: fixed. Source's own MOBILE L variant confirms
 * the UI KIT overflow above is real even in the original (its 266px/
 * 257px/346px images keep their literal desktop pixel widths at mobile
 * with no shrink — checked directly, no override exists for them at that
 * breakpoint) — not something introduced by this rebuild. Per this
 * pass's explicit instruction to fix it, DesignSystem.module.css's mobile
 * block stacks .uiKitContent into a column and caps every
 * .uiKitImageWrap at max-width:100% instead of reproducing the source's
 * literal overflow; this is a deliberate text-safety/overflow deviation
 * from a confirmed-but-broken source value, not a guess (the one
 * genuinely confirmed mobile change here, the closing banner going
 * width:100%, is also covered by that same max-width:100% rule). The 3
 * Lottie canvases and the 3 per-row static frames DO have confirmed
 * source mobile pixel sizes (traced the same way as their desktop sizes)
 * — see LOTTIE_1/2/3 below and the animFrame1/2/3 classes.
 */

// Row 1 left, row 2 right, row 3 left — DOM order, confirmed via
// reference/framer-original's own compiled component JS
// (assets/framerusercontent.com/sites/.../m21rtN65...-jlE0pQg.mjs):
// each container class's srcUrl traced directly, not matched by guesswork.
// mobileWidth/mobileHeight: confirmed source values at the MOBILE L
// breakpoint for the same -container classes (0.8x of desktop for
// LOTTIE_1/2; LOTTIE_3 shares its Laptop-breakpoint value, also
// confirmed directly for MOBILE L, not extrapolated).
const LOTTIE_1 = {
  src: "/lottie/vitalmed-design-anim-1.lottie",
  width: 300,
  height: 210,
  mobileWidth: 240,
  mobileHeight: 168,
}; // framer-3fztuy-container <- jwqoDo5HnF.lottie
const LOTTIE_2 = {
  src: "/lottie/vitalmed-design-anim-2.lottie",
  width: 300,
  height: 210,
  mobileWidth: 240,
  mobileHeight: 168,
}; // framer-15m3odw-container <- 28BiGBgeGM.lottie
const LOTTIE_3 = {
  src: "/lottie/vitalmed-design-anim-3.lottie",
  width: 270,
  height: 189,
  mobileWidth: 216,
  mobileHeight: 151,
}; // framer-18nxl8p-container <- n2LQTUtCo7.lottie

export default async function DesignSystem() {
  const t = await getTranslations("vitalmed.designSystem");

  return (
    <div className={styles.section}>
      <div className={styles.texto}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <div className={styles.titulo}>
          <p className={styles.tituloLine1}>{t("titleLine1")}</p>
          <p className={styles.tituloLine2}>{t("titleLine2")}</p>
        </div>
        <div className={styles.body}>
          <p className={styles.bodyText}>{t("body1")}</p>
          <p className={styles.bodyText}>{t("body2")}</p>
          <p className={styles.bodyText}>{t("body3")}</p>
        </div>
      </div>

      <div className={styles.cosas}>
        <div className={styles.colAnimations}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>
              <span className={styles.cardLabelStar}>✦</span> {t("animationsLabel")}
            </p>

            <div className={styles.animationsContent}>
              <div className={styles.animationsRow}>
                <div className={styles.lottieSlot} style={{ width: 130 }}>
                  <LottieAnimation
                    src={LOTTIE_1.src}
                    width={LOTTIE_1.width}
                    height={LOTTIE_1.height}
                    mobileWidth={LOTTIE_1.mobileWidth}
                    mobileHeight={LOTTIE_1.mobileHeight}
                  />
                </div>
                <div className={`${styles.animImageWrap} ${styles.animFrame1}`} style={{ aspectRatio: 1.10193 }}>
                  <Image src="/images/vitalmed-design-anim-frame-1.png" alt="" fill className={styles.animImage} />
                </div>
              </div>
              <div className={styles.animationsRow}>
                <div className={`${styles.animImageWrap} ${styles.animFrame2}`} style={{ aspectRatio: 1.20536 }}>
                  <Image src="/images/vitalmed-design-anim-pibecelu.png" alt="" fill className={styles.animImage} />
                </div>
                <div className={styles.lottieSlot} style={{ width: 128 }}>
                  <LottieAnimation
                    src={LOTTIE_2.src}
                    width={LOTTIE_2.width}
                    height={LOTTIE_2.height}
                    mobileWidth={LOTTIE_2.mobileWidth}
                    mobileHeight={LOTTIE_2.mobileHeight}
                  />
                </div>
              </div>
              <div className={styles.animationsRow}>
                <div className={styles.lottieSlot} style={{ width: 187 }}>
                  <LottieAnimation
                    src={LOTTIE_3.src}
                    width={LOTTIE_3.width}
                    height={LOTTIE_3.height}
                    mobileWidth={LOTTIE_3.mobileWidth}
                    mobileHeight={LOTTIE_3.mobileHeight}
                  />
                </div>
                <div className={`${styles.animImageWrap} ${styles.animFrame3}`} style={{ aspectRatio: 1 }}>
                  <Image src="/images/vitalmed-design-anim-frame-3.png" alt="" fill className={styles.animImage} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.colUiKit}>
          <div className={styles.card}>
            <div className={styles.uiKitTitulo}>
              <p className={styles.cardLabel}>
                <span className={styles.cardLabelStar}>✦</span> {t("uiKitLabel")}
              </p>
            </div>

            <div className={styles.uiKitContent}>
              <div className={styles.uiKitStack}>
                <div className={styles.uiKitImageWrap} style={{ width: 266, aspectRatio: 0.911081 }}>
                  <Image src="/images/vitalmed-uikit-frame-1.png" alt="" fill className={styles.animImage} />
                </div>
                <div className={styles.uiKitImageWrap} style={{ width: 257, aspectRatio: 2.51961 }}>
                  <Image src="/images/vitalmed-uikit-frame-2.png" alt="" fill className={styles.animImage} />
                </div>
              </div>
              <div className={styles.uiKitTallWrap}>
                <div className={styles.uiKitImageWrap} style={{ width: 346, aspectRatio: 0.815988 }}>
                  <Image src="/images/vitalmed-uikit-frame-3.png" alt="" fill className={styles.animImage} />
                </div>
              </div>
            </div>

            <div className={styles.uiKitImageWrap} style={{ width: 397, aspectRatio: 4.5625 }}>
              <Image src="/images/vitalmed-uikit-frame-4.png" alt="" fill className={styles.animImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import styles from "./Principles.module.css";

/**
 * reference/framer-original/how-i-work/'s second content section
 * (.framer-y90czo-container). Verbatim text, confirmed layout — not the old
 * spec. Two-column top level (Texto 40% | Cosas, flex:1), confirmed via
 * .framer-1jy8qcf/.framer-14k5lt's own CSS, not assumed from the "COL IZQ"
 * class name (which is misleading — despite the name, the two "COL IZQ"
 * blocks inside Cosas are stacked VERTICALLY via flex-column, not
 * side-by-side: a 2x2 grid of 4 cards, then the wider 5th card below it).
 *
 * Per-instruction note: the original has a known bug where "What you won't
 * find" shows Spanish ("Lo que no vas a encontrar…") at one mobile
 * breakpoint. Only the Desktop variant (English) was read for this pass —
 * that quirk isn't reproduced.
 *
 * Icons: all 6 (5 principle cards + the shared "won't find" glyph) are real
 * inline SVG symbol defs (<use href="#...">), confirmed present — none
 * missing, nothing to resolve via f2c-sw.js. "Diagnosis" reuses the exact
 * same icon as Methodology's "Map" card (#1705284671 in the source) —
 * confirmed intentional reuse, not a mistake on my part.
 *
 * Hover: checked directly — none of this section's cards/blocks are <a>
 * elements, none carry a hover-variant class, and no :hover rule in the
 * captured stylesheet targets any of them. Same conclusion as Methodology:
 * left fully static, nothing approximated.
 *
 * One more confirmed (not assumed) difference from Methodology's cards:
 * these icons sit bare, with no tinted background chip — Methodology's
 * icon boxes have padding+accent-tinted background, these don't (padding:0,
 * no background-color anywhere in the source for this section's icons).
 */

type IconPath = { d: string; transform: string };

function Icon({
  paths,
  size,
  color,
  className,
}: {
  paths: IconPath[];
  size: number;
  color: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          transform={p.transform}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

const ACCENT = "var(--color-accent)";
const AVOID_COLOR = "rgb(238, 125, 119)"; // confirmed, no matching token (differs from --color-semantic-red)

const WONT_FIND_ICON: IconPath[] = [
  { d: "M 6 0 L 0 6", transform: "translate(9 9)" },
  {
    d: "M 0.586 14.726 C 0.211 14.351 0 13.842 0 13.312 L 0 6.688 C 0 6.158 0.211 5.649 0.586 5.274 L 5.274 0.586 C 5.649 0.211 6.158 0 6.688 0 L 13.312 0 C 13.842 0 14.351 0.211 14.726 0.586 L 19.414 5.274 C 19.789 5.649 20 6.158 20 6.688 L 20 13.312 C 20 13.842 19.789 14.351 19.414 14.726 L 14.726 19.414 C 14.351 19.789 13.842 20 13.312 20 L 6.688 20 C 6.158 20 5.649 19.789 5.274 19.414 Z",
    transform: "translate(2 2)",
  },
  { d: "M 0 0 L 6 6", transform: "translate(9 9)" },
];

type TranslatedCard = { title: string; description: string };

// Icon geometry isn't translatable content — indexed to match
// howIWork.principles.cards' order in the JSON (Diagnosis, Decisions,
// Focus, Cycles, Components — the first 4 form the 2x2 grid, the 5th is
// the wide Components card below it).
const CARD_PATHS: IconPath[][] = [
  [
    {
      d: "M 11.106 2.317 C 11.669 2.598 12.331 2.598 12.894 2.317 L 16.553 0.487 C 16.863 0.332 17.232 0.349 17.526 0.531 C 17.821 0.714 18.001 1.036 18 1.383 L 18 14.147 C 18 14.526 17.786 14.872 17.447 15.041 L 12.894 17.318 C 12.331 17.599 11.669 17.599 11.106 17.318 L 6.894 15.212 C 6.331 14.931 5.669 14.931 5.106 15.212 L 1.447 17.042 C 1.137 17.197 0.768 17.18 0.473 16.997 C 0.178 16.815 -0.001 16.492 0 16.145 L 0 3.382 C 0 3.003 0.214 2.657 0.553 2.488 L 5.106 0.211 C 5.669 -0.07 6.331 -0.07 6.894 0.211 Z",
      transform: "translate(3 3.236)",
    },
    { d: "M 0 0 L 0 15", transform: "translate(15 5.764)" },
    { d: "M 0 0 L 0 15", transform: "translate(9 3.236)" },
  ],
  [
    { d: "M 0 0 L 1.93 3.44", transform: "translate(12.99 6.74)" },
    {
      d: "M 14.271 0 C 12.391 1.915 9.819 2.994 7.135 2.994 C 4.452 2.994 1.88 1.915 0 0",
      transform: "translate(4.865 12)",
    },
    { d: "M 2.16 3.84 L 0 0", transform: "translate(18.84 17.16)" },
    { d: "M 0 14.26 L 8.02 0", transform: "translate(3 6.74)" },
    {
      d: "M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z",
      transform: "translate(10 3)",
    },
  ],
  [
    {
      d: "M 0 3 C 0 1.343 1.343 0 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 Z",
      transform: "translate(9 9)",
    },
    { d: "M 0 4 L 0 2 C 0 0.895 0.895 0 2 0 L 4 0", transform: "translate(3 3)" },
    { d: "M 0 0 L 2 0 C 3.105 0 4 0.895 4 2 L 4 4", transform: "translate(17 3)" },
    { d: "M 4 0 L 4 2 C 4 3.105 3.105 4 2 4 L 0 4", transform: "translate(17 17)" },
    { d: "M 4 4 L 2 4 C 0.895 4 0 3.105 0 2 L 0 0", transform: "translate(3 17)" },
  ],
  [
    {
      d: "M 0 9 C 0 4.029 4.029 0 9 0 C 11.516 0.009 13.931 0.991 15.74 2.74 L 18 5",
      transform: "translate(3 3)",
    },
    { d: "M 5 0 L 5 5 L 0 5", transform: "translate(16 3)" },
    {
      d: "M 18 0 C 18 4.971 13.971 9 9 9 C 6.484 8.991 4.069 8.009 2.26 6.26 L 0 4",
      transform: "translate(3 12)",
    },
    { d: "M 5 0 L 0 0 L 0 5", transform: "translate(3 16)" },
  ],
  [
    {
      d: "M 18 5.998 C 17.999 5.284 17.618 4.625 17 4.268 L 10 0.268 C 9.381 -0.089 8.619 -0.089 8 0.268 L 1 4.268 C 0.382 4.625 0.001 5.284 0 5.998 L 0 13.998 C 0.001 14.712 0.382 15.371 1 15.728 L 8 19.728 C 8.619 20.085 9.381 20.085 10 19.728 L 17 15.728 C 17.618 15.371 17.999 14.712 18 13.998 Z",
      transform: "translate(3 2.002)",
    },
    { d: "M 0 0 L 8.7 5 L 17.4 0", transform: "translate(3.3 7)" },
    { d: "M 0 10 L 0 0", transform: "translate(12 12)" },
  ],
];

function PrincipleCard({ title, description, paths }: { title: string; description: string; paths: IconPath[] }) {
  return (
    <div className={styles.card}>
      <Icon paths={paths} size={18} color={ACCENT} />
      <h5 className={styles.cardTitle}>{title}</h5>
      <p className={styles.cardText}>{description}</p>
    </div>
  );
}

export default async function Principles() {
  const t = await getTranslations("howIWork.principles");
  const wontFindItems = t.raw("wontFindItems") as string[];
  const translatedCards = t.raw("cards") as TranslatedCard[];
  const cards = translatedCards.map((card, i) => ({ ...card, paths: CARD_PATHS[i] }));
  const [card0, card1, card2, card3, componentsCard] = cards;

  return (
    <>
      <div className={styles.left}>
        <div className={styles.intro}>
          <h4 className={styles.heading}>{t("heading")}</h4>
          <p className={styles.bodyText}>{t("body")}</p>
        </div>

        <div className={styles.infoCard}>
          <p className={styles.eyebrow}>{t("whereEyebrow")}</p>
          <p className={styles.bodyText}>{t("whereBody")}</p>
        </div>
      </div>

      <div className={`${styles.infoCard} ${styles.wontFind}`}>
        <h5 className={styles.wontFindHeading}>{t("wontFindHeading")}</h5>
        <p className={styles.bodyText}>{t("wontFindIntro")}</p>
        {wontFindItems.map((item) => (
          <div className={styles.wontFindItem} key={item}>
            <Icon paths={WONT_FIND_ICON} size={18} color={AVOID_COLOR} className={styles.wontFindIcon} />
            <p className={styles.bodyText}>{item}</p>
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.grid}>
          <div className={styles.gridRow}>
            <PrincipleCard {...card0} />
            <PrincipleCard {...card1} />
          </div>
          <div className={styles.gridRow}>
            <PrincipleCard {...card2} />
            <PrincipleCard {...card3} />
          </div>
        </div>
        <div className={styles.wideCard}>
          <Icon paths={componentsCard.paths} size={24} color={ACCENT} />
          <div className={styles.wideCardText}>
            <h5 className={styles.cardTitle}>{componentsCard.title}</h5>
            <p className={styles.cardText}>{componentsCard.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

import type { CSSProperties, ReactNode } from "react";
import styles from "./GridItem.module.css";

interface GridItemProps {
  /** Grid columns spanned at the >=1024px bento tiers (measured, out of 12). */
  colSpan: number;
  /** Grid rows spanned at the >=1024px bento tiers (measured, out of 8). */
  rowSpan: number;
  /**
   * Home mobile pass 2 (<=425px): explicit visual order at mobile only,
   * decoupled from DOM/source order — same mechanism as tabletOrder below.
   * Supersedes this pass's earlier "just use DOM order" mobile treatment
   * (see git history) now that a real reorder brief exists. Lower values
   * render first. Defaults to 0.
   */
  mobileOrder?: number;
  /**
   * Home mobile pass 2: how many of the 2 mobile columns this card spans —
   * 2 (full width) or 1 (half, pairs with the next 1-span card in mobile
   * order via grid auto-placement) — same mechanism as tabletSpan below.
   * Defaults to 2 (full width) as the safe choice for any card that
   * doesn't specify one.
   */
  mobileSpan?: 1 | 2;
  /**
   * Home mobile pass 2: exact card height at <=425px — same min-height
   * (not height) mechanism as tabletMinHeight below, so real content that
   * needs more room grows instead of clipping. Omit for a card with no
   * specified target (sizes to content).
   */
  mobileMinHeight?: number;
  /**
   * Hides this card entirely at <=425px while leaving it untouched at
   * tablet/desktop — used for the combined About-me/How-I-Work column,
   * whose mobile treatment splits into a separate standalone GridItem
   * (see mobileOnly below and app/[locale]/page.tsx) rather than reusing
   * this same grid cell.
   */
  hiddenAtMobile?: boolean;
  /**
   * Hides this card entirely above 425px — the inverse of hiddenAtMobile,
   * for a GridItem that exists only to give a mobile-only standalone
   * placement to content that's otherwise nested inside another card at
   * tablet/desktop (see app/[locale]/page.tsx's standalone How-I-Work
   * mobile entry).
   */
  mobileOnly?: boolean;
  /**
   * Home tablet pass (426-1023px): how many of the 2 tablet columns this
   * card spans — 2 (full width) or 1 (half, pairs with the next 1-span
   * card in DOM order via grid auto-placement). Defaults to 2 (full
   * width) as the safe choice for any card that doesn't specify one.
   */
  tabletSpan?: 1 | 2;
  /**
   * Home tablet pass: explicit visual order at 426-1023px only, decoupled
   * from DOM/source order (which mobile still relies on — see
   * GridItem.module.css). Lower values render first. Defaults to 0.
   */
  tabletOrder?: number;
  /**
   * Home tablet pass: exact card height at 426-1023px, per Nico's measured
   * spec — applied as `min-height` rather than `height` so a card whose
   * real (possibly longer, e.g. Spanish) content needs more room grows
   * instead of clipping; grid's default row-stretch still makes it land
   * on exactly this value whenever content fits, matching same-row
   * siblings. Omit for a card with no specified target (sizes to content).
   */
  tabletMinHeight?: number;
  /** See GridItem.module.css — "sobre mi" and "Lab" only, per measured CSS. */
  hiddenBelow1024?: boolean;
  className?: string;
  children: ReactNode;
}

export default function GridItem({
  colSpan,
  rowSpan,
  mobileOrder = 0,
  mobileSpan = 2,
  mobileMinHeight,
  hiddenAtMobile = false,
  mobileOnly = false,
  tabletSpan = 2,
  tabletOrder = 0,
  tabletMinHeight,
  hiddenBelow1024 = false,
  className,
  children,
}: GridItemProps) {
  const style = {
    "--col-span": colSpan,
    "--row-span": rowSpan,
    "--mobile-order": mobileOrder,
    "--mobile-col-span": mobileSpan,
    "--mobile-min-height": mobileMinHeight ? `${mobileMinHeight}px` : "0",
    "--tablet-col-span": tabletSpan,
    "--tablet-order": tabletOrder,
    "--tablet-min-height": tabletMinHeight ? `${tabletMinHeight}px` : "0",
  } as CSSProperties;

  const classes = [
    styles.item,
    hiddenBelow1024 && styles.hiddenBelow1024,
    hiddenAtMobile && styles.hiddenAtMobile,
    mobileOnly && styles.mobileOnly,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

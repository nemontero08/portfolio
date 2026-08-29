import type { CSSProperties, ReactNode } from "react";
import styles from "./GridItem.module.css";

interface GridItemProps {
  /** Grid columns spanned at the >=1024px bento tiers (measured, out of 12). */
  colSpan: number;
  /** Grid rows spanned at the >=1024px bento tiers (measured, out of 8). */
  rowSpan: number;
  /**
   * Visual position in the <1024px single-column stack, from the original's
   * `order` CSS (measured where present; sections without an explicit
   * override default to 0, i.e. their natural DOM position).
   */
  mobileOrder?: number;
  /** See GridItem.module.css — "sobre mi" and "Lab" only, per measured CSS. */
  hiddenBelow1024?: boolean;
  className?: string;
  children: ReactNode;
}

export default function GridItem({
  colSpan,
  rowSpan,
  mobileOrder = 0,
  hiddenBelow1024 = false,
  className,
  children,
}: GridItemProps) {
  const style = {
    "--col-span": colSpan,
    "--row-span": rowSpan,
    "--mobile-order": mobileOrder,
  } as CSSProperties;

  const classes = [styles.item, hiddenBelow1024 && styles.hiddenBelow1024, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

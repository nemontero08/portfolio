import type { ReactNode } from "react";
import styles from "./BentoGrid.module.css";

/**
 * The homepage's bento layout — reference/framer-original/index.html's
 * `.framer-8z2bhi` ("Body"). At >=1024px it's a real 12x8 CSS grid; each
 * section only declares its span (see GridItem), and — like the original —
 * relies on grid auto-placement in DOM order rather than explicit
 * grid-column/row-start. Verified: the 12 sections' spans sum to exactly
 * 12*8=96 cells with no gaps/overlaps, and the original's own per-section
 * `order` at the 1024 tier matches plain DOM order 1:1 — so DOM order alone
 * reproduces both tiers correctly.
 */
export default function BentoGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

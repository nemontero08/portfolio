import type { CSSProperties, ReactNode } from "react";
import styles from "./Pill.module.css";

export default function Pill({
  children,
  background,
}: {
  children: ReactNode;
  background: string;
}) {
  return (
    <span className={styles.pill} style={{ background } as CSSProperties}>
      {children}
    </span>
  );
}

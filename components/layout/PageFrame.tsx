import type { ReactNode } from "react";
import styles from "./PageFrame.module.css";

export default function PageFrame({ children }: { children: ReactNode }) {
  return <div className={styles.frame}>{children}</div>;
}

import type { ReactNode } from "react";
import styles from "./VitalmedRightColumn.module.css";

// About me (60%) stacked over the How I Work teaser (40%) inside a single
// grid cell — see VitalmedRightColumn.module.css for why.
export default function VitalmedRightColumn({
  aboutMe,
  howItWork,
}: {
  aboutMe: ReactNode;
  howItWork: ReactNode;
}) {
  return (
    <div className={styles.column}>
      <div className={styles.aboutMeSlot}>{aboutMe}</div>
      <div className={styles.howItWorkSlot}>{howItWork}</div>
    </div>
  );
}

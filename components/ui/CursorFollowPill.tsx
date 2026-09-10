"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import styles from "./CursorFollowPill.module.css";

/**
 * Generic cursor-follow pill — shows `children` in a small pill pinned to
 * the pointer while `active` is true.
 *
 * Tracking confirmed against the original's runtime
 * (reference/framer-original/assets/framerusercontent.com/sites/7G5vstFnwaNgCo9zPKVdDy/framer.DIbmgvkJ.mjs):
 * the position motion values are set directly on every `pointermove`
 * (`x.set(e.clientX)`) — no spring/lerp on position at all, i.e. PINNED to
 * the cursor, not eased. The only animated value is opacity, via a 0.2s
 * tween, when the pill mounts/unmounts (fade in/out).
 */
const OPACITY_TRANSITION = { type: "tween" as const, duration: 0.2 };

export default function CursorFollowPill({ active, children }: { active: boolean; children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // `active` (mouseenter/mouseleave on the card) and real pointer
  // coordinates arrive independently — a card can go active from a
  // synthetic/reflow-triggered mouseenter with no pointermove behind it
  // (e.g. content shifting under a stationary cursor while resizing the
  // window). Without this, the pill would render pinned at its (0,0)
  // initial value — top-left of the viewport, at z-index 9999 — on top of
  // whatever happens to be there. Gate rendering on having received a
  // real position at least once, ever (not reset between activations —
  // once known, x/y always hold a real on-screen point, even if slightly
  // stale from a prior hover, which is harmless).
  const [hasPosition, setHasPosition] = useState(false);

  useEffect(() => {
    if (!active) return;
    function handleMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setHasPosition(true);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [active, x, y]);

  return (
    <AnimatePresence>
      {active && hasPosition && (
        <motion.div
          className={styles.pill}
          style={{ left: x, top: y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={OPACITY_TRANSITION}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

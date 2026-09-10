"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import styles from "./HowItEvolved.module.css";

/**
 * Mobile-only (≤767px, hidden at desktop via CSS — see .carousel in
 * HowItEvolved.module.css) replacement for Iteration 01's 3 screenshots,
 * which at desktop just sit side by side (.screenshots, all 3 visible at
 * once — untouched, still the default there). At mobile they used to be
 * a bare horizontal-scroll strip; this swaps that for a real swipeable
 * carousel, one screen at a time + dot indicators — same mechanism as
 * the Home page's Testimonials carousel (components/sections/
 * Testimonials.tsx: motion's AnimatePresence + drag="x" + a dots row),
 * reused rather than reimplemented, per instruction. Unlike Testimonials,
 * this one has NO autoplay — these are read-at-your-own-pace app
 * screenshots, not rotating quotes.
 */

type Item = { key: string; src: string; caption: string };

const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 300;
const TRANSITION = { type: "spring" as const, duration: 0.4, bounce: 0.2, delay: 0 };

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function IterationScreenshotsCarousel({ items }: { items: Item[] }) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (delta: number) => {
      setSlide(([current]) => [wrap(current + delta, items.length), delta]);
    },
    [items.length],
  );

  const goTo = useCallback((target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      paginate(1);
    } else if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      paginate(-1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") paginate(1);
    else if (e.key === "ArrowLeft") paginate(-1);
  }

  const active = items[index];

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Screenshots"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.carouselViewport}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            className={styles.carouselSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
          >
            <div className={styles.screenshotImageWrap}>
              <Image src={active.src} alt="" fill className={styles.screenshotImage} />
            </div>
            <p className={styles.screenshotCaption}>{active.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.carouselDots}>
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            className={i === index ? `${styles.carouselDot} ${styles.carouselDotActive}` : styles.carouselDot}
            aria-label={`Show screenshot: ${item.caption}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

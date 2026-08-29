"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import styles from "./Testimonials.module.css";

// Content reused verbatim from reference/framer-original/index.html — same
// quotes, same authors. The carousel mechanism below is a new
// implementation, not a copy of Framer's slider (per instructions).
const TESTIMONIALS = [
  {
    quote: [
      "Nicolás is a very proactive person with a great ability to interpret needs and turn them into digital products.",
      "He has excellent command of design, prototyping, and management tools, and a strong attention to detail.",
    ],
    name: "Luciano Molina",
    role: "Product Manager at OneInfo Consulting",
  },
  {
    quote: [
      "Nicolás consistently delivered quality results.",
      "He has excellent UX/UI judgment and, combined with his programming knowledge, is a very well-rounded professional.",
      "He's reliable, responsible, and very easy to work with as a team.",
    ],
    name: "Franco Capristo",
    role: "Full-stack Developer at Estrategias Diferenciadas S.A.",
  },
  {
    quote: [
      "Nico stood out for his deep understanding of the business and client needs, becoming a key reference throughout the process.",
      "He created excellent interactive prototypes and helped document the process clearly.",
      "He's a very collaborative and easy person to work with.",
    ],
    name: "Leonel Cappiello",
    role: "Full-stack Developer at OneInfo Consulting",
  },
  {
    quote: [
      "Nicolás stood out for his ability to turn ideas into clear and effective user experiences.",
      "His commitment to quality, continuous improvement, and collaborative attitude made him a key part of the team.",
    ],
    name: "Fabricio Menghi",
    role: "Tech lead at OneInfo Consulting",
  },
  {
    quote: [
      "Nicolás combines technical programming knowledge with UX/UI design, which allows him to come up with user-centered solutions that are also technically viable.",
      "He's a great collaborator and someone who is very easy to work with to achieve excellent results.",
    ],
    name: "Dario Pérez",
    role: "Product Manager at Estrategias Diferenciadas S.A.",
  },
];

const AUTOPLAY_MS = 5000;
const RESUME_AFTER_MS = 10000;
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

export default function Testimonials() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = useCallback((delta: number) => {
    setSlide(([current]) => [wrap(current + delta, TESTIMONIALS.length), delta]);
  }, []);

  const goTo = useCallback((target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  const registerInteraction = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, paginate]);

  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    registerInteraction();
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      paginate(1);
    } else if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      paginate(-1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      registerInteraction();
      paginate(1);
    } else if (e.key === "ArrowLeft") {
      registerInteraction();
      paginate(-1);
    }
  }

  const active = TESTIMONIALS[index];

  return (
    <div
      className={styles.card}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.quoteMark} aria-hidden />
      <div className={styles.viewport}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            className={styles.slide}
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
            <div className={styles.quote}>
              {active.quote.map((line) => (
                <p className={styles.quoteLine} key={line}>
                  {line}
                </p>
              ))}
            </div>
            <div className={styles.profile}>
              <div className={styles.avatar} aria-hidden />
              <div>
                <p className={styles.name}>{active.name}</p>
                <p className={styles.role}>{active.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.dots}>
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={i === index}
            onClick={() => {
              registerInteraction();
              goTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

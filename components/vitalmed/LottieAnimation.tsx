"use client";

import { useEffect, useRef } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import styles from "./DesignSystem.module.css";

let wasmConfigured = false;

/**
 * Client-only dotLottie canvas player. Wasm binary self-hosted from
 * public/lottie/dotlottie-player.wasm (copied from the installed
 * @lottiefiles/dotlottie-web@0.65.0 package — byte-identical to the
 * version mirrored in reference/framer-original/assets/cdn.jsdelivr.net/,
 * checked directly) via DotLottie.setWasmUrl(), configured once module-
 * wide rather than defaulting to the library's jsDelivr fallback.
 *
 * autoplay/loop/speed/hover=false below are CONFIRMED, not assumed —
 * traced directly from the compiled component JS
 * (assets/framerusercontent.com/sites/.../m21rtN65...-jlE0pQg.mjs) which
 * embeds each instance's literal props: autoplay:true, loop:true,
 * hover:false, controls:false, direction:'1', speed:1, srcType:'url'. So
 * playback here is confirmed source behavior, not a guessed default.
 *
 * width/height (and the optional mobileWidth/mobileHeight) are applied
 * via CSS custom properties rather than a plain inline style, so
 * DesignSystem.module.css's ≤767px media query can swap in the source's
 * own confirmed smaller mobile canvas size (renderConfig.autoResize:true
 * makes the dotLottie player itself follow the canvas element's actual
 * CSS-rendered size, not just its initial width/height attributes).
 */
export default function LottieAnimation({
  src,
  width,
  height,
  mobileWidth,
  mobileHeight,
}: {
  src: string;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wasmConfigured) {
      DotLottie.setWasmUrl("/lottie/dotlottie-player.wasm");
      wasmConfigured = true;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const player = new DotLottie({
      canvas,
      src,
      autoplay: true,
      loop: true,
      speed: 1,
      renderConfig: { autoResize: true },
    });

    return () => player.destroy();
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.lottieCanvas}
      style={
        {
          "--lottie-w": `${width}px`,
          "--lottie-h": `${height}px`,
          "--lottie-w-mobile": `${mobileWidth ?? width}px`,
          "--lottie-h-mobile": `${mobileHeight ?? height}px`,
        } as React.CSSProperties
      }
    />
  );
}

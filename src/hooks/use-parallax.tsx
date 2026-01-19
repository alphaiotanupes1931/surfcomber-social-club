import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: ["start start" | "start end" | "end start" | "end end", "start start" | "start end" | "end start" | "end end"];
  speed?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = ["start end", "end start"], speed = 0.5 } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  
  // Create various parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  const yReverse = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  return {
    ref,
    scrollYProgress,
    y,
    yReverse,
    opacity,
    scale,
  };
}

// Hook for image parallax with slower movement
export function useImageParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);
  
  return { ref, y };
}

// Hook for text parallax with fade
export function useTextParallax() {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  
  return { ref, y, opacity };
}

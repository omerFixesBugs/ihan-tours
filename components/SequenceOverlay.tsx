"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SequenceOverlayProps {
  scrollYProgress: MotionValue<number>;
  enter: number;
  visible: number;
  exit: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
  hold?: boolean;
  children: React.ReactNode;
}

export default function SequenceOverlay({
  scrollYProgress,
  enter,
  visible,
  exit,
  direction = "up",
  distance = 48,
  className = "",
  hold = false,
  children,
}: SequenceOverlayProps) {
  const { opacity, x, y, scale, blur } = useScrollReveal(scrollYProgress, {
    enter,
    visible,
    exit,
    direction,
    distance,
    hold,
  });

  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ opacity, x, y, scale, filter }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

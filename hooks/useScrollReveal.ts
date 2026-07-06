import { useTransform, type MotionValue } from "framer-motion";

interface ScrollRevealOptions {
  enter?: number;
  visible?: number;
  exit?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  scaleFrom?: number;
  hold?: boolean;
}

export function useScrollReveal(
  scrollYProgress: MotionValue<number>,
  {
    enter = 0,
    visible = 0.15,
    exit = 0.35,
    distance = 48,
    direction = "up",
    scaleFrom = 0.94,
    hold = false,
  }: ScrollRevealOptions = {}
) {
  const opacity = hold
    ? useTransform(scrollYProgress, [enter, visible], [0, 1])
    : useTransform(
        scrollYProgress,
        [enter, visible, exit - 0.05, exit],
        [0, 1, 1, 0]
      );

  const offset = useTransform(scrollYProgress, [enter, visible], [distance, 0]);

  const x = useTransform(offset, (v) => {
    if (direction === "left") return -v;
    if (direction === "right") return v;
    return 0;
  });

  const y = useTransform(offset, (v) => {
    if (direction === "up") return v;
    if (direction === "down") return -v;
    return 0;
  });

  const scale = useTransform(
    scrollYProgress,
    [enter, visible],
    [scaleFrom, 1]
  );

  const blur = useTransform(scrollYProgress, [enter, visible], [8, 0]);

  return { opacity, x, y, scale, blur };
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  type MotionValue,
} from "framer-motion";

interface CanvasSequenceProps {
  images: HTMLImageElement[];
  isLoading: boolean;
  children?: React.ReactNode;
  scrollHeight?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  scrollYProgress?: MotionValue<number>;
  /** Scroll progress (0–1) at which the sequence finishes. After this the last frame stays pinned. Default = 1 */
  frameEnd?: number;
  canvasScale?: MotionValue<number> | number;
  canvasOpacity?: MotionValue<number> | number;
  canvasY?: MotionValue<string> | string | MotionValue<number> | number;
  canvasFilter?: MotionValue<string> | string;
  underCanvasContent?: React.ReactNode;
}

export default function CanvasSequence({
  images,
  isLoading,
  children,
  scrollHeight = "400vh",
  containerRef: externalRef,
  scrollYProgress: externalProgress,
  frameEnd = 1,
  canvasScale = 1,
  canvasOpacity = 1,
  canvasY = 0,
  canvasFilter = "none",
  underCanvasContent,
}: CanvasSequenceProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef ?? internalRef;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = externalProgress ?? internalProgress;

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      if (images.length > 0) {
        renderFrame(0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, renderFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0 || isLoading) return;
    const totalFrames = images.length;
    // Map scroll progress [0, frameEnd] → [0, totalFrames-1], then clamp
    const t = frameEnd < 1 ? Math.min(latest / frameEnd, 1) : latest;
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(t * (totalFrames - 1)))
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoading, images, renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {underCanvasContent && (
          <div className="absolute inset-0 z-0">
            {underCanvasContent}
          </div>
        )}
        <motion.canvas
          ref={canvasRef as any}
          style={{ scale: canvasScale, opacity: canvasOpacity, y: canvasY, filter: canvasFilter }}
          className="absolute inset-0 block h-full w-full z-[1]"
        />
        <div className="pointer-events-none absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}


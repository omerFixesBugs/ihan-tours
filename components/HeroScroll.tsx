"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import CanvasSequence from "./CanvasSequence";
import SequenceOverlay from "./SequenceOverlay";
import HeroIntro from "./HeroIntro";
import HeroBrandMark from "./HeroBrandMark";
import { useLanguage } from "@/components/LanguageContext";

interface HeroScrollProps {
  images: HTMLImageElement[];
  isLoading: boolean;
}

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

// Scroll range where window frame passes through viewport
const WINDOW_PASS_START = 0.35;
const WINDOW_PASS_END = 0.45;

// The sequence finishes here — last frame stays pinned after this
const FRAME_END = 0.55;

export default function HeroScroll({ images, isLoading }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Intro layout fades early; brand mark stays on the window during zoom
  const introOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.10], [0, -24]);

  // Brand visible through window zoom, dissolves once frame passes
  const brandOpacity = useTransform(
    scrollYProgress,
    [0, WINDOW_PASS_START, WINDOW_PASS_END],
    [1, 1, 0]
  );
  const brandScale = useTransform(
    scrollYProgress,
    [0, WINDOW_PASS_START, WINDOW_PASS_END],
    [1, 1.04, 1.12]
  );
  const brandBlur = useTransform(
    scrollYProgress,
    [WINDOW_PASS_START, WINDOW_PASS_END],
    [0, 10]
  );
  const brandFilter = useTransform(brandBlur, (b) => `blur(${b}px)`);

  const endCloudFade = useTransform(scrollYProgress, [0.86, 0.96], [0, 1]);

  // Plunge through the cloud: zoom in, blur, and fade out to reveal under-cloud image
  const canvasScale = useTransform(scrollYProgress, [0.55, 0.65], [1, 1.8]);
  const canvasOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const canvasBlurAmount = useTransform(scrollYProgress, [0.55, 0.65], [0, 15]);
  const canvasFilter = useTransform(canvasBlurAmount, (b) => `blur(${b}px)`);

  const underCloudScale = useTransform(scrollYProgress, [0.55, 0.65], [1.1, 1]);
  const transcendColor = useTransform(scrollYProgress, [0.86, 0.96], ["#ffffff", "#171717"]);
  const transcendPColor = useTransform(scrollYProgress, [0.86, 0.96], ["rgba(255,255,255,0.7)", "rgba(23,23,23,0.7)"]);

  const lastTheme = useRef<"dark" | "light">("dark");
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // When the screen fades to luxury-cream (> 0.9), text must be black
    const theme = latest > 0.9 ? "light" : "dark";
    if (lastTheme.current !== theme) {
      lastTheme.current = theme;
      window.dispatchEvent(new CustomEvent("nav-theme-change", { detail: theme }));
    }
  });

  return (
    <CanvasSequence
      images={images}
      isLoading={isLoading}
      scrollHeight="800vh"
      containerRef={containerRef}
      scrollYProgress={scrollYProgress}
      frameEnd={FRAME_END}
      canvasScale={canvasScale}
      canvasOpacity={canvasOpacity}
      canvasFilter={canvasFilter}
      underCanvasContent={
        <motion.div
          style={{ scale: underCloudScale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="/under-cloud.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      }
    >
      {!isLoading && (
        <>
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="pointer-events-auto absolute inset-0 z-20"
          >
            <HeroIntro />
          </motion.div>

          <motion.div
            style={{
              opacity: brandOpacity,
              scale: brandScale,
              filter: brandFilter,
            }}
            className="absolute inset-0 z-[25]"
          >
            <HeroBrandMark />
          </motion.div>
        </>
      )}

      {/* ─── Hold‑zone content: appears after sequence ends ─── */}

      {/* About company paragraph (plays while approaching the final clouds) */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.41}
        visible={0.42}
        exit={0.56}
        direction="up"
        distance={100}
        className="absolute inset-0 z-[25] flex flex-col items-center justify-center p-6 md:p-12"
      >
        {/* Soft sky-blended vignette to improve text readability against white clouds */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/50 via-sky-900/10 to-transparent mix-blend-multiply" />

        <div className="w-full max-w-[1400px]">
          <p className="flex flex-wrap text-left font-sans text-3xl font-medium leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[64px]">
            {t("heroScroll.about_text").split(" ").map((word: string, i: number, arr: string[]) => {
              const start = 0.42 + (i / arr.length) * 0.07;
              const end = start + (0.07 / arr.length);
              return <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
            })}
          </p>
        </div>
      </SequenceOverlay>

      {/* Main tagline */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.57}
        visible={0.61}
        exit={0.72}
        direction="up"
        distance={40}
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
      >
        <p className="max-w-2xl font-display text-xl font-semibold uppercase leading-relaxed tracking-display text-white md:text-3xl">
          {t("heroScroll.tagline")}
        </p>
      </SequenceOverlay>

      {/* Left card — What We Offer */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.64}
        visible={0.68}
        exit={0.78}
        direction="left"
        distance={56}
        className="absolute left-8 top-1/3 max-w-sm p-4 md:left-20"
      >
        <span className="mb-2 block text-xs uppercase tracking-superwide text-white/70">
          {t("heroScroll.what_we_offer")}
        </span>
        <h2 className="font-display mb-3 text-2xl font-bold uppercase tracking-display text-white md:text-3xl">
          {t("heroScroll.private_group_tours")}
        </h2>
        <p className="text-sm font-light leading-relaxed text-white/80">
          {t("heroScroll.what_we_offer_desc")}
        </p>
      </SequenceOverlay>

      {/* Right card — Why Choose Us */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.64}
        visible={0.68}
        exit={0.78}
        direction="right"
        distance={56}
        className="absolute right-8 top-1/3 max-w-sm p-4 text-right md:right-20"
      >
        <span className="mb-2 block text-xs uppercase tracking-superwide text-white/70">
          {t("heroScroll.why_choose_us")}
        </span>
        <h2 className="font-display mb-3 text-2xl font-bold uppercase tracking-display text-white md:text-3xl">
          {t("heroScroll.travel_with_confidence")}
        </h2>
        <p className="text-sm font-light leading-relaxed text-white/80">
          {t("heroScroll.why_choose_us_desc")}
        </p>
      </SequenceOverlay>

      {/* Right card — Expert Guides */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.74}
        visible={0.78}
        exit={1.0}
        hold={true}
        direction="right"
        distance={56}
        className="absolute right-8 top-1/2 max-w-sm p-4 text-right md:right-20 z-20"
      >
        <motion.span
          style={{ color: transcendPColor }}
          className="mb-2 block text-xs uppercase tracking-superwide"
        >
          {t("heroScroll.local_expertise")}
        </motion.span>
        <motion.h2
          style={{ color: transcendColor }}
          className="font-display mb-3 text-2xl font-bold uppercase tracking-display md:text-3xl"
        >
          {t("heroScroll.expert_guides")}
        </motion.h2>
        <motion.p
          style={{ color: transcendPColor }}
          className="text-sm font-light leading-relaxed"
        >
          {t("heroScroll.local_expertise_desc")}
        </motion.p>
      </SequenceOverlay>

      {/* Left card — VIP Experiences (Plays alongside Expert Guides) */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.75}
        visible={0.79}
        exit={1.0}
        hold={true}
        direction="left"
        distance={56}
        className="absolute left-8 top-[40%] max-w-sm p-4 md:left-20 z-20"
      >
        <motion.span
          style={{ color: transcendPColor }}
          className="mb-2 block text-xs uppercase tracking-superwide"
        >
          {t("heroScroll.unmatched_comfort")}
        </motion.span>
        <motion.h2
          style={{ color: transcendColor }}
          className="font-display mb-3 text-2xl font-bold uppercase tracking-display md:text-3xl"
        >
          {t("heroScroll.vip_experiences")}
        </motion.h2>
        <motion.p
          style={{ color: transcendPColor }}
          className="text-sm font-light leading-relaxed"
        >
          {t("heroScroll.unmatched_comfort_desc")}
        </motion.p>
      </SequenceOverlay>

      {/* Top Center card — Global Reach (Plays alongside Expert Guides) */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.74}
        visible={0.78}
        exit={1.0}
        hold={true}
        direction="down"
        distance={40}
        className="absolute inset-x-0 top-[20%] mx-auto flex max-w-md flex-col items-center p-4 text-center z-20"
      >
        <motion.span
          style={{ color: transcendPColor }}
          className="mb-2 block text-xs uppercase tracking-superwide"
        >
          {t("heroScroll.global_reach")}
        </motion.span>
        <motion.h2
          style={{ color: transcendColor }}
          className="font-display mb-3 text-2xl font-bold uppercase tracking-display md:text-3xl"
        >
          {t("heroScroll.destinations_count")}
        </motion.h2>
        <motion.p
          style={{ color: transcendPColor }}
          className="text-sm font-light leading-relaxed"
        >
          {t("heroScroll.global_reach_desc")}
        </motion.p>
      </SequenceOverlay>

      {/* Bottom CTA — Transcend Boundaries */}
      <SequenceOverlay
        scrollYProgress={scrollYProgress}
        enter={0.72}
        visible={0.78}
        exit={1.0}
        hold={true}
        direction="up"
        distance={48}
        className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center px-6 text-center md:bottom-24"
      >
        <motion.div style={{ color: transcendColor }}>
          <h2 className="font-display mb-4 text-3xl font-bold uppercase tracking-display md:text-5xl">
            {t("heroScroll.transcend_boundaries")}
          </h2>
          <motion.p style={{ color: transcendPColor }} className="max-w-xl font-light leading-relaxed">
            {t("heroScroll.transcend_boundaries_desc")}
          </motion.p>
        </motion.div>
      </SequenceOverlay>

      {/* Cloud fade to next section */}
      <motion.div
        style={{ opacity: endCloudFade }}
        className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-luxury-sky/80 via-luxury-cream to-luxury-cream"
      />
    </CanvasSequence>
  );
}

"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { drawCoverFrame } from "@/lib/canvasDraw";
import SequenceOverlay from "./SequenceOverlay";
import LuxuryTransition from "./LuxuryTransition";
import { useLanguage } from "@/components/LanguageContext";

const ACCORDION_DATA = [
  {
    id: "documentation",
    title: "Visa & Documentation",
    content:
      "From visa applications to travel documentation, our expert team handles every step of the process. We prepare and verify your paperwork with precision, so you can travel with complete confidence and without unnecessary delays.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "availability",
    title: "24/7 Support",
    content:
      "Our travel specialists are on call around the clock to help with bookings, itinerary changes, or last-minute needs. Wherever you are on your journey, expert support is always just a message away.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "services",
    title: "Tailored Packages",
    content:
      "Every traveler is different, so we design custom tour packages built around your interests, budget, and schedule — from spiritual journeys and family holidays to corporate trips.",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "efficient",
    title: "Best Price Guarantee",
    content:
      "We work directly with airlines, hotels, and trusted local partners to secure the best possible rates, passing the savings on to you without compromising on comfort or service.",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=1600",
  },
];

interface TourShowcaseProps {
  images: HTMLImageElement[];
  isLoading: boolean;
}

/* ── Scroll breakpoints ─────────────────────────────────────────── */

// Phase 1: Plane flies up from bottom on try.jpg background
const PHASE1_END = 0.11;

// Phase 1.5: Up Flight Illusion
const PHASE1_5_START = 0.11;
const PHASE1_5_END = 0.18;

// Phase 2: Zet-sequence canvas plays (frames 0–117)
const PHASE2_START = 0.18;
const PHASE2_END = 0.67;

// Phase 3–4: Swap to static, plane shrinks right
const PHASE3_START = 0.67;
const PHASE4_START = 0.69;
const PHASE4_END = 0.77;

/* ── Tour callouts (mapped within Phase 2 range) ────────────────── */
const TOUR_CALLOUTS = [
  {
    enter: 0.14,
    visible: 0.17,
    exit: 0.28,
    direction: "down" as const,
    className:
      "absolute left-1/2 top-12 max-w-sm -translate-x-1/2 p-4 text-center md:top-16",
    eyebrow: "Spiritual Journey",
    title: "Umrah",
    body: "Umrah is not just a physical journey; it is a divine summons.",
  },
  {
    enter: 0.21,
    visible: 0.24,
    exit: 0.35,
    direction: "right" as const,
    className:
      "absolute right-6 top-[22%] max-w-sm p-4 text-right md:right-16",
    eyebrow: "Southeast Asia",
    title: "Malaysia",
    body: "Known for its beaches, rainforests and mix of cultural influences.",
  },
  {
    enter: 0.28,
    visible: 0.31,
    exit: 0.42,
    direction: "left" as const,
    className:
      "absolute left-6 top-[22%] max-w-sm p-4 text-left md:left-16",
    eyebrow: "Heritage",
    title: "China",
    body: "Walk the Great Wall and wander imperial palaces across iconic destinations.",
  },
  {
    enter: 0.35,
    visible: 0.38,
    exit: 0.49,
    direction: "right" as const,
    className:
      "absolute right-6 top-[48%] max-w-sm p-4 text-right md:right-16",
    eyebrow: "Tropical Escape",
    title: "Thailand",
    body: "From golden temples in Bangkok to the turquoise islands of the south.",
  },
  {
    enter: 0.42,
    visible: 0.45,
    exit: 0.56,
    direction: "left" as const,
    className:
      "absolute bottom-[22%] left-6 max-w-sm p-4 text-left md:left-16",
    eyebrow: "Coastal",
    title: "Maldives",
    body: "Iconic harbours and sun-drenched coasts. The ultimate island retreat.",
  },
  {
    enter: 0.48,
    visible: 0.51,
    exit: 0.62,
    direction: "up" as const,
    className:
      "absolute bottom-12 right-6 max-w-sm p-4 text-right md:right-16",
    eyebrow: "Inbound",
    title: "Bangladesh",
    body: "Curated experiences and local expertise for the modern explorer.",
  },
];

export default function TourShowcase({ images, isLoading }: TourShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, language } = useLanguage();

  // Localized Accordion Data
  const localizedAccordionData = ACCORDION_DATA.map((item) => ({
    ...item,
    title: t(`tourShowcase.accordion.${item.id}.title`),
    content: t(`tourShowcase.accordion.${item.id}.content`),
  }));

  const [activeAccordionId, setActiveAccordionId] = useState(ACCORDION_DATA[0].id);

  // Localized Callouts
  const localizedTourCallouts = TOUR_CALLOUTS.map((item) => {
    const slug = item.title.toLowerCase();
    return {
      ...item,
      eyebrow: t(`tourShowcase.callouts.${slug}.eyebrow`),
      title: t(`tourShowcase.callouts.${slug}.title`),
      body: t(`tourShowcase.callouts.${slug}.body`),
    };
  });

  const { scrollYProgress: globalScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The first 90% of the scroll container drives the old 900vh sequence
  const scrollYProgress = useTransform(globalScrollYProgress, [0, 0.9], [0, 1]);

  /* ── Phase 1: Plane fly-up ──────────────────────────────────── */
  const planeIntroOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const planeIntroY = useTransform(scrollYProgress, [0, PHASE1_END], ["100vh", "0%"]);
  
  const luxuryOpacity = useTransform(
    scrollYProgress,
    [0, PHASE1_END, PHASE1_5_END],
    [1, 1, 0]
  );
  const luxuryY = useTransform(
    scrollYProgress,
    [PHASE1_END, PHASE1_5_END],
    ["0vh", "80vh"]
  );

  /* ── Phase 1.5: Up Flight Illusion ──────────────────────────── */
  const bgY = useTransform(
    scrollYProgress,
    [0, PHASE1_END, PHASE1_5_END],
    ["-5%", "-5%", "5%"]
  );
  
  const flightTextOpacity = useTransform(
    scrollYProgress,
    [PHASE1_END, PHASE1_END + 0.01, PHASE1_5_END - 0.01, PHASE1_5_END],
    [0, 1, 1, 0]
  );
  const flightTextY = useTransform(
    scrollYProgress,
    [PHASE1_END, PHASE1_5_END],
    ["-60vh", "60vh"]
  );

  /* ── Phase 2: Canvas sequence ───────────────────────────────── */
  const canvasOpacity = useTransform(
    scrollYProgress,
    [PHASE2_START - 0.015, PHASE2_START],
    [0, 1]
  );
  const canvasHide = useTransform(
    scrollYProgress,
    [PHASE2_END - 0.015, PHASE2_END],
    [1, 0]
  );

  const planeIntroCombinedOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, PHASE2_START, PHASE2_START + 0.015],
    [0, 1, 1, 0]
  );

  const canvasCombinedOpacity = useTransform(
    [canvasOpacity, canvasHide],
    ([fadeIn, fadeOut]: number[]) => Math.min(fadeIn, fadeOut)
  );

  /* ── Phase 3–4: Outro plane ──────────────────────────────────── */
  const outroPlaneOpacity = useTransform(
    scrollYProgress,
    [PHASE3_START - 0.02, PHASE3_START],
    [0, 1]
  );
  const outroPlaneScale = useTransform(
    scrollYProgress,
    [PHASE4_START, PHASE4_END],
    [1, 0.5]
  );
  const outroPlaneY = useTransform(
    scrollYProgress,
    [PHASE4_START, PHASE4_END],
    ["0%", "15%"]
  );
  
  const outroPlaneX = useTransform(
    globalScrollYProgress,
    [0.9 * PHASE4_START, 0.9 * PHASE4_END, 0.9, 1.0],
    ["0%", "25%", "25%", "-150vw"]
  );

  /* ── Phase 8: Better Way to Fly (climbs up) ────────────────── */
  const betterWayY = useTransform(
    globalScrollYProgress,
    [0.9, 1.0],
    ["100vh", "0vh"]
  );
  const betterWayOpacity = useTransform(
    globalScrollYProgress,
    [0.89, 0.9],
    [0, 1]
  );

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end bottom", "end top"] as any,
  });
  const dividerPlaneX = useTransform(exitProgress, [0, 1], ["-20vw", "120vw"]);

  const activeAccordionItem = localizedAccordionData.find((item) => item.id === activeAccordionId);
  const originalAccordionItem = ACCORDION_DATA.find((item) => item.id === activeAccordionId);

  /* ── Phase 4: Block 1 (Explore the World) ──────────────────── */
  const block1Opacity = useTransform(
    scrollYProgress,
    [0.73, 0.77, 0.84, 0.87],
    [0, 1, 1, 0]
  );
  const block1Y = useTransform(
    scrollYProgress,
    [0.73, 0.77, 0.83, 0.86],
    ["15vh", "0vh", "0vh", "-25vh"]
  );

  /* ── Phase 5: Block 2 (Curated Experiences) ────────────────── */
  const block2Opacity = useTransform(
    scrollYProgress,
    [0.83, 0.86, 0.93, 0.96],
    [0, 1, 1, 0]
  );
  const block2Y = useTransform(
    scrollYProgress,
    [0.83, 0.86, 0.92, 0.95],
    ["15vh", "0vh", "0vh", "-25vh"]
  );

  /* ── Phase 6: Block 3 (Seamless Travel) ────────────────────── */
  const block3Opacity = useTransform(
    scrollYProgress,
    [0.92, 0.95, 0.98, 1],
    [0, 1, 1, 0]
  );
  const block3Y = useTransform(
    scrollYProgress,
    [0.92, 0.95, 0.98, 1],
    ["15vh", "0vh", "0vh", "-25vh"]
  );

  /* ── Photography Canvas Cards Transforms ────────────────────── */
  // ── Block 1: Explore the World (Staggered Entrance) ──
  // Card 1A (Left): Enters 0.73 to 0.76, exits 0.83 to 0.87
  const card1AOpacity = useTransform(scrollYProgress, [0.73, 0.76, 0.83, 0.87], [0, 1, 1, 0]);
  const card1AY = useTransform(scrollYProgress, [0.73, 0.76, 0.83, 0.84, 0.85, 0.86, 0.87], ["80vh", "-2vh", "-2vh", "3vh", "18vh", "58vh", "120vh"]);
  const card1ARotate = useTransform(scrollYProgress, [0.73, 0.76, 0.83, 0.84, 0.85, 0.86, 0.87], [-10, -10, -10, -6, 2, 12, 29]);

  // Card 1B (Center): Enters 0.74 to 0.77, exits 0.83 to 0.87
  const card1BOpacity = useTransform(scrollYProgress, [0.74, 0.77, 0.83, 0.87], [0, 1, 1, 0]);
  const card1BY = useTransform(scrollYProgress, [0.74, 0.77, 0.83, 0.84, 0.85, 0.86, 0.87], ["80vh", "0vh", "0vh", "5vh", "20vh", "60vh", "120vh"]);
  const card1BRotate = useTransform(scrollYProgress, [0.74, 0.77, 0.83, 0.84, 0.85, 0.86, 0.87], [-4, -4, -4, 0, 8, 18, 35]);

  // Card 1C (Right): Enters 0.75 to 0.78, exits 0.83 to 0.87
  const card1COpacity = useTransform(scrollYProgress, [0.75, 0.78, 0.83, 0.87], [0, 1, 1, 0]);
  const card1CY = useTransform(scrollYProgress, [0.75, 0.78, 0.83, 0.84, 0.85, 0.86, 0.87], ["80vh", "2vh", "2vh", "7vh", "22vh", "62vh", "120vh"]);
  const card1CRotate = useTransform(scrollYProgress, [0.75, 0.78, 0.83, 0.84, 0.85, 0.86, 0.87], [8, 8, 8, 12, 20, 30, 46]);

  // ── Block 2: Curated Discoveries (Staggered Entrance) ──
  // Card 2A (Left): Enters 0.83 to 0.85, exits 0.92 to 0.96
  const card2AOpacity = useTransform(scrollYProgress, [0.83, 0.85, 0.92, 0.96], [0, 1, 1, 0]);
  const card2AY = useTransform(scrollYProgress, [0.83, 0.85, 0.92, 0.93, 0.94, 0.95, 0.96], ["80vh", "-2vh", "-2vh", "3vh", "18vh", "58vh", "120vh"]);
  const card2ARotate = useTransform(scrollYProgress, [0.83, 0.85, 0.92, 0.93, 0.94, 0.95, 0.96], [-3, -3, -3, -6, -14, -24, -41]);

  // Card 2B (Center): Enters 0.84 to 0.86, exits 0.92 to 0.96
  const card2BOpacity = useTransform(scrollYProgress, [0.84, 0.86, 0.92, 0.96], [0, 1, 1, 0]);
  const card2BY = useTransform(scrollYProgress, [0.84, 0.86, 0.92, 0.93, 0.94, 0.95, 0.96], ["80vh", "0vh", "0vh", "5vh", "20vh", "60vh", "120vh"]);
  const card2BRotate = useTransform(scrollYProgress, [0.84, 0.86, 0.92, 0.93, 0.94, 0.95, 0.96], [3, 3, 3, 0, -8, -18, -35]);

  // Card 2C (Right): Enters 0.85 to 0.87, exits 0.92 to 0.96
  const card2COpacity = useTransform(scrollYProgress, [0.85, 0.87, 0.92, 0.96], [0, 1, 1, 0]);
  const card2CY = useTransform(scrollYProgress, [0.85, 0.87, 0.92, 0.93, 0.94, 0.95, 0.96], ["80vh", "2vh", "2vh", "7vh", "22vh", "62vh", "120vh"]);
  const card2CRotate = useTransform(scrollYProgress, [0.85, 0.87, 0.92, 0.93, 0.94, 0.95, 0.96], [9, 9, 9, 3, -5, -15, -29]);

  // ── Block 3: Seamless Travel (Staggered Entrance) ──
  // Card 3A (Left): Enters 0.92 to 0.94, exits 0.98 to 1.0
  const card3AOpacity = useTransform(scrollYProgress, [0.92, 0.94, 0.98, 1.0], [0, 1, 1, 0]);
  const card3AY = useTransform(scrollYProgress, [0.92, 0.94, 0.98, 0.985, 0.99, 0.995, 1.0], ["80vh", "-2vh", "-2vh", "3vh", "18vh", "58vh", "120vh"]);
  const card3ARotate = useTransform(scrollYProgress, [0.92, 0.94, 0.98, 0.985, 0.99, 0.995, 1.0], [-7, -7, -7, -5, 1, 9, 20]);

  // Card 3B (Center): Enters 0.93 to 0.95, exits 0.98 to 1.0
  const card3BOpacity = useTransform(scrollYProgress, [0.93, 0.95, 0.98, 1.0], [0, 1, 1, 0]);
  const card3BY = useTransform(scrollYProgress, [0.93, 0.95, 0.98, 0.985, 0.99, 0.995, 1.0], ["80vh", "0vh", "0vh", "5vh", "20vh", "60vh", "120vh"]);
  const card3BRotate = useTransform(scrollYProgress, [0.93, 0.95, 0.98, 0.985, 0.99, 0.995, 1.0], [-2, -2, -2, 0, 6, 14, 25]);

  // Card 3C (Right): Enters 0.94 to 0.96, exits 0.98 to 1.0
  const card3COpacity = useTransform(scrollYProgress, [0.94, 0.96, 0.98, 1.0], [0, 1, 1, 0]);
  const card3CY = useTransform(scrollYProgress, [0.94, 0.96, 0.98, 0.985, 0.99, 0.995, 1.0], ["80vh", "2vh", "2vh", "7vh", "22vh", "62vh", "120vh"]);
  const card3CRotate = useTransform(scrollYProgress, [0.94, 0.96, 0.98, 0.985, 0.99, 0.995, 1.0], [3, 3, 3, 5, 11, 19, 30]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = images[index];
      if (!canvas || !img) return;
      drawCoverFrame(canvas, img);
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
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0 || isLoading) return;
    if (latest < PHASE2_START - 0.02 || latest > PHASE2_END + 0.02) return;

    const totalFrames = images.length;
    const t = Math.max(0, Math.min(1, (latest - PHASE2_START) / (PHASE2_END - PHASE2_START)));
    const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(t * (totalFrames - 1))));
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoading, images, renderFrame]);

  const leftFlightText = language === "bn" ? "প্রত্যাশাকে" : "Elevate Your";
  const rightFlightText = language === "bn" ? "নতুন উচ্চতায় নিয়ে যান" : "Expectations";

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background"
      style={{ height: "1000vh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatPlane {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1.2deg);
          }
        }
        .floating-plane {
          animation: floatPlane 6s ease-in-out infinite;
        }
      ` }} />
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ═══ Layer 0: try.jpg background ═══ */}
        <motion.img
          src="/try.jpg"
          alt=""
          style={{ 
            scale: 1.1, // static scale to allow panning without revealing edges
            y: bgY,
            zIndex: 0 
          }}
          className="absolute inset-0 h-full w-full object-cover transform-gpu origin-center"
        />

        {/* ═══ Phase 1.5: Flight text overlays ═══ */}
        <motion.div
          style={{
            opacity: flightTextOpacity,
            y: flightTextY,
            zIndex: 1,
          }}
          className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 2xl:left-24"
        >
          <span className="font-display text-2xl font-bold uppercase tracking-widest text-ink/80 md:text-5xl">
            {leftFlightText}
          </span>
        </motion.div>
        
        <motion.div
          style={{
            opacity: flightTextOpacity,
            y: flightTextY,
            zIndex: 1,
          }}
          className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2  2xl:right-24"
        >
          <span className="font-display text-2xl font-bold uppercase tracking-widest text-ink/80 xl:text-5xl">
            {rightFlightText}
          </span>
        </motion.div>

        {/* ═══ Phase 1: Luxury text (flies down as sequence starts) ═══ */}
        <motion.div
          style={{ opacity: luxuryOpacity, y: luxuryY, zIndex: 1 }}
          className="pointer-events-auto absolute inset-0"
        >
          <LuxuryTransition />
        </motion.div>

        {/* ═══ Phase 1: Plane intro (out_0001.png flies up) ═══ */}
        <motion.div
          style={{
            opacity: planeIntroCombinedOpacity,
            y: planeIntroY,
            zIndex: 1,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="/out_0001.png"
            alt=""
            className="h-full w-full object-cover drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        {/* ═══ Phase 2: Zet-sequence canvas ═══ */}
        <motion.div
          style={{
            opacity: canvasCombinedOpacity,
            zIndex: 2,
          }}
          className="absolute inset-0"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
          />
        </motion.div>

        {/* ═══ Phase 3–4: Outro plane (out_0118.png) shrinks to right ═══ */}
        <motion.div
          style={{
            opacity: outroPlaneOpacity,
            scale: outroPlaneScale,
            x: outroPlaneX,
            y: outroPlaneY,
            zIndex: 3,
            transformOrigin: "center center",
          }}
          className="absolute inset-0"
        >
          <img
            src="/out_0118.png"
            alt=""
            className="h-full w-full object-cover drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)] floating-plane"
          />
        </motion.div>

        {/* ═══ Scroll-Linked Photography Canvas Cards (Behind Planet) ═══ */}
        <div className="absolute right-[8vw] md:right-[12vw] top-[48%] -translate-y-1/2 w-[240px] md:w-[320px] h-[340px] md:h-[420px] flex items-center justify-center pointer-events-none hidden md:block" style={{ zIndex: 2 }}>
          {/* ── Block 1: Explore the World ── */}
          {/* Card 1A */}
          <motion.div
            style={{
              opacity: card1AOpacity,
              y: card1AY,
              rotate: card1ARotate,
              x: "-14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400"
                alt="Travel Boat"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 1C */}
          <motion.div
            style={{
              opacity: card1COpacity,
              y: card1CY,
              rotate: card1CRotate,
              x: "14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400"
                alt="Tropical beach"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 1B (Center, on top) */}
          <motion.div
            style={{
              opacity: card1BOpacity,
              y: card1BY,
              rotate: card1BRotate,
              x: "0vw",
              zIndex: 3,
            }}
            className="absolute bg-white p-3 pb-8 md:p-4 md:pb-10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[160px] md:w-[210px] h-[160px] md:h-[210px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400"
                alt="Explore the World"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center font-sans tracking-wide text-neutral-800 text-[10px] md:text-xs font-semibold uppercase">
              {language === "bn" ? "পৃথিবী অন্বেষণ" : "Explore the World"}
            </div>
          </motion.div>

          {/* ── Block 2: Curated Discoveries ── */}
          {/* Card 2A */}
          <motion.div
            style={{
              opacity: card2AOpacity,
              y: card2AY,
              rotate: card2ARotate,
              x: "-14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400"
                alt="Yosemite"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 2C */}
          <motion.div
            style={{
              opacity: card2COpacity,
              y: card2CY,
              rotate: card2CRotate,
              x: "14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400"
                alt="Santorini"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 2B (Center, on top) */}
          <motion.div
            style={{
              opacity: card2BOpacity,
              y: card2BY,
              rotate: card2BRotate,
              x: "0vw",
              zIndex: 3,
            }}
            className="absolute bg-white p-3 pb-8 md:p-4 md:pb-10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[160px] md:w-[210px] h-[160px] md:h-[210px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=400"
                alt="Curated Discoveries"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center font-sans tracking-wide text-neutral-800 text-[10px] md:text-xs font-semibold uppercase">
              {language === "bn" ? "বিশেষ আবিষ্কার" : "Curated Discoveries"}
            </div>
          </motion.div>

          {/* ── Block 3: Seamless Travel ── */}
          {/* Card 3A */}
          <motion.div
            style={{
              opacity: card3AOpacity,
              y: card3AY,
              rotate: card3ARotate,
              x: "-14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&q=80&w=400"
                alt="Airport lounge"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 3C */}
          <motion.div
            style={{
              opacity: card3COpacity,
              y: card3CY,
              rotate: card3CRotate,
              x: "14vw",
            }}
            className="absolute bg-white p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[140px] md:w-[190px] h-[140px] md:h-[190px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=400"
                alt="Resort pool"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Card 3B (Center, on top) */}
          <motion.div
            style={{
              opacity: card3BOpacity,
              y: card3BY,
              rotate: card3BRotate,
              x: "0vw",
              zIndex: 3,
            }}
            className="absolute bg-white p-3 pb-8 md:p-4 md:pb-10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-sm border border-neutral-100/50"
          >
            <div className="relative w-[160px] md:w-[210px] h-[160px] md:h-[210px] overflow-hidden bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=400"
                alt="Seamless Travel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center font-sans tracking-wide text-neutral-800 text-[10px] md:text-xs font-semibold uppercase">
              {language === "bn" ? "সহজ যাত্রা" : "Seamless Travel"}
            </div>
          </motion.div>
        </div>

        {/* ═══ Phase 4: Left-side content (Block 1) ═══ */}
        <motion.div
          style={{
            opacity: block1Opacity,
            y: block1Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-[38%] flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            {t("tourShowcase.journey_continues")}
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            {t("tourShowcase.explore_world")}
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            {t("tourShowcase.explore_world_desc")}
          </p>
        </motion.div>

        {/* ═══ Phase 5: Left-side content (Block 2) ═══ */}
        <motion.div
          style={{
            opacity: block2Opacity,
            y: block2Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-[38%] flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            {t("tourShowcase.immersive_exp")}
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            {t("tourShowcase.curated_discoveries")}
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            {t("tourShowcase.curated_discoveries_desc")}
          </p>
        </motion.div>

        {/* ═══ Phase 6: Left-side content (Block 3) ═══ */}
        <motion.div
          style={{
            opacity: block3Opacity,
            y: block3Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-[38%] flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24 pointer-events-none"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            {t("tourShowcase.end_to_end")}
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            {t("tourShowcase.seamless_travel")}
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            {t("tourShowcase.seamless_travel_desc")}
          </p>
        </motion.div>

        {/* ═══ Phase 8: Better Way to Fly ═══ */}
        <motion.div
          style={{ y: betterWayY, opacity: betterWayOpacity, zIndex: 10 }}
          className="absolute inset-0 flex h-full w-full overflow-hidden bg-transparent pointer-events-auto"
        >
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left Column: Accordion */}
            <div className="flex h-full w-full flex-col justify-center px-6 py-16 md:w-1/2 md:px-16 lg:px-24 bg-transparent">
              <h2 className="mb-16 text-xs font-bold uppercase tracking-widest text-ink/75">
                {t("tourShowcase.better_way")}
              </h2>

              <div className="flex w-full max-w-xl flex-col">
                {localizedAccordionData.map((item) => {
                  const isActive = activeAccordionId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="group border-b border-ink/10 py-6 first:border-t-0"
                    >
                      <button
                        onClick={() => setActiveAccordionId(item.id)}
                        className="flex w-full items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-ink">
                          {item.title}
                        </span>
                        <span className="text-2xl font-light text-ink/50 transition-colors group-hover:text-ink">
                          {isActive ? "−" : "+"}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-6 text-sm leading-relaxed text-ink/80 md:pr-12 md:text-base lg:pr-24">
                              {item.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Floating CTA */}
              <div className="mt-12 flex justify-start">
                <a
                  href="mailto:bookings@ihantours.com"
                  className="inline-flex items-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink shadow-sm transition-transform hover:scale-105"
                >
                  {t("tourShowcase.book_flight")}
                  <svg
                    className="ml-3 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative h-1/2 w-full md:h-full md:w-1/2">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={activeAccordionItem?.id}
                  src={originalAccordionItem?.image}
                  alt={activeAccordionItem?.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ═══ Divider Plane (Bottom Edge) ═══ */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-50 h-32 w-full overflow-hidden">
          <motion.div
            style={{ x: dividerPlaneX }}
            className="absolute bottom-4 left-0 h-16 w-16 md:h-24 md:w-24"
          >
            <img
              src="/out_0001.png"
              alt=""
              className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        {/* ═══ Tour callouts — during Phase 2 ═══ */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {localizedTourCallouts.map((item) => (
            <div key={item.title}>
              {/* Mobile version: Exits normally to prevent clutter */}
              <SequenceOverlay
                scrollYProgress={scrollYProgress}
                enter={item.enter}
                visible={item.visible}
                exit={item.exit}
                direction={item.direction}
                distance={44}
                className={`${item.className} md:hidden`}
              >
                <span className="mb-2 block text-[10px] uppercase tracking-superwide text-ink/60 md:text-xs">
                  {item.eyebrow}
                </span>
                <p className="font-display mb-2 text-xl font-bold uppercase leading-tight text-ink md:text-3xl">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-ink/75 md:text-base">
                  {item.body}
                </p>
              </SequenceOverlay>

              {/* Desktop version: Stays on screen to fill empty space */}
              <SequenceOverlay
                scrollYProgress={scrollYProgress}
                enter={item.enter}
                visible={item.visible}
                exit={0.65}
                direction={item.direction}
                distance={44}
                className={`${item.className} hidden md:block`}
              >
                <span className="mb-2 block text-[10px] uppercase tracking-superwide text-ink/60 md:text-xs">
                  {item.eyebrow}
                </span>
                <p className="font-display mb-2 text-xl font-bold uppercase leading-tight text-ink md:text-3xl">
                  {item.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-ink/75 md:text-base">
                  {item.body}
                </p>
              </SequenceOverlay>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


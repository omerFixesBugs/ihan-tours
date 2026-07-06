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

const ACCORDION_DATA = [
  {
    id: "pets",
    title: "Pets",
    content:
      "Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.",
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "availability",
    title: "24/7 availability",
    content:
      "Our global concierge team is ready at a moment's notice to arrange your charter. Whether it's a last-minute business trip or a sudden weekend getaway, we ensure an aircraft is prepared and waiting for you anywhere in the world.",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "services",
    title: "Onboard services",
    content:
      "Experience Michelin-star dining, premium beverages, and bespoke entertainment options tailored entirely to your preferences. Every flight is curated to your exact tastes by our dedicated cabin crew.",
    image:
      "https://images.unsplash.com/photo-1583428751336-d7681329c017?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "efficient",
    title: "Efficient",
    content:
      "Skip the lines, security queues, and layovers. Private travel minimizes your transit time, allowing you to fly direct to thousands of executive airports worldwide, getting you closer to your final destination faster.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600",
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
      "absolute right-6 top-[28%] max-w-sm p-4 text-right md:right-16",
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
      "absolute left-6 top-[42%] max-w-sm p-4 text-left md:left-16",
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
      "absolute right-6 top-[58%] max-w-sm p-4 text-right md:right-16",
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
  const [activeAccordionId, setActiveAccordionId] = useState(ACCORDION_DATA[0].id);

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

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end bottom", "end top"],
  });
  const dividerPlaneX = useTransform(exitProgress, [0, 1], ["-20vw", "120vw"]);

  const activeAccordionItem = ACCORDION_DATA.find((item) => item.id === activeAccordionId);

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

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background"
      style={{ height: "1000vh" }}
    >
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
          className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 md:left-24"
        >
          <span className="font-display text-2xl font-bold uppercase tracking-widest text-ink/80 md:text-5xl">
            Elevate Your
          </span>
        </motion.div>
        
        <motion.div
          style={{
            opacity: flightTextOpacity,
            y: flightTextY,
            zIndex: 1,
          }}
          className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 md:right-24"
        >
          <span className="font-display text-2xl font-bold uppercase tracking-widest text-ink/80 md:text-5xl">
            Expectations
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
            className="h-full w-full object-cover drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        {/* ═══ Phase 4: Left-side content (Block 1) ═══ */}
        <motion.div
          style={{
            opacity: block1Opacity,
            y: block1Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-1/2 flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            Your Journey Continues
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            Explore the World
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            From hidden coastlines to mountain retreats — every destination crafted to transform the way you travel.
          </p>
        </motion.div>

        {/* ═══ Phase 5: Left-side content (Block 2) ═══ */}
        <motion.div
          style={{
            opacity: block2Opacity,
            y: block2Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-1/2 flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            Immersive Experiences
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            Curated Discoveries
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            Go beyond the guidebooks. We weave authentic cultural encounters and exclusive access into every itinerary we design.
          </p>
        </motion.div>

        {/* ═══ Phase 6: Left-side content (Block 3) ═══ */}
        <motion.div
          style={{
            opacity: block3Opacity,
            y: block3Y,
            zIndex: 5,
          }}
          className="absolute left-8 top-1/2 flex w-full max-w-xl -translate-y-1/2 flex-col items-start justify-center px-6 text-left md:left-16 lg:left-24 pointer-events-none"
        >
          <span className="mb-2 block text-xs uppercase tracking-superwide text-ink/60">
            End-to-End Service
          </span>
          <h2 className="font-display mb-4 text-4xl font-bold uppercase leading-tight tracking-display text-ink md:text-5xl">
            Seamless Travel
          </h2>
          <p className="mb-6 text-sm font-light leading-relaxed text-ink/75 md:text-base">
            From the moment you depart to your safe return, our global partners ensure a frictionless and luxurious journey.
          </p>
        </motion.div>

        {/* ═══ Phase 8: Better Way to Fly ═══ */}
        <motion.div
          style={{ y: betterWayY, zIndex: 10 }}
          className="absolute inset-0 flex h-full w-full bg-transparent pointer-events-auto"
        >
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left Column: Accordion */}
            <div className="flex h-full w-full flex-col justify-center px-6 py-16 md:w-1/2 md:px-16 lg:px-24 bg-transparent">
              <h2 className="mb-16 text-xs font-bold uppercase tracking-widest text-ink/75">
                A BETTER WAY TO FLY
              </h2>

              <div className="flex w-full max-w-xl flex-col">
                {ACCORDION_DATA.map((item) => {
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
                  Book the Flight
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
                  src={activeAccordionItem?.image}
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
          {TOUR_CALLOUTS.map((item) => (
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

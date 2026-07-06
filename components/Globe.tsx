"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import SequenceOverlay from "./SequenceOverlay";

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card slides from bottom of screen to top of screen between 0.5 and 1.0 progress
  const cardY = useTransform(scrollYProgress, [0.5, 1], ["100vh", "-100vh"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background p-12 md:p-24">
        {/* Rotating globe background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/globe-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        {/* Headline — fades in as globe section enters */}
        <SequenceOverlay
          scrollYProgress={scrollYProgress}
          enter={0.4}
          visible={0.5}
          exit={1}
          hold
          direction="up"
          distance={40}
          className="relative z-10 max-w-xl pt-8 md:pt-12"
        >
          <span className="mb-3 block text-xs uppercase tracking-ultra text-gold-400">
            Global Destinations
          </span>
          <h2 className="text-4xl font-light uppercase leading-tight tracking-wide md:text-6xl">
            Unrestricted Routing
          </h2>
          <p className="mt-6 font-light leading-relaxed text-neutral-400">
            From remote islands to cultural capitals — every path optimized for
            discovery beyond the ordinary.
          </p>
        </SequenceOverlay>

        {/* Destination pills — appear one by one mid-scroll */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 px-4">
          {[
            { label: "Maldives", enter: 0.45, visible: 0.55, exit: 1 },
            { label: "Umrah", enter: 0.55, visible: 0.65, exit: 1 },
            { label: "China", enter: 0.65, visible: 0.75, exit: 1 },
            { label: "Thailand", enter: 0.75, visible: 0.85, exit: 1 },
            { label: "Malaysia", enter: 0.85, visible: 0.95, exit: 1 },
          ].map((dest) => (
            <SequenceOverlay
              key={dest.label}
              scrollYProgress={scrollYProgress}
              enter={dest.enter}
              visible={dest.visible}
              exit={dest.exit}
              hold
              direction="up"
              distance={24}
              className="inline-block"
            >
              <span className="rounded-full border border-neutral-700 bg-background/60 px-4 py-2 text-xs uppercase tracking-superwide text-neutral-300 backdrop-blur-sm">
                {dest.label}
              </span>
            </SequenceOverlay>
          ))}
        </div>

        {/* Footer CTA — rises as user scrolls through globe */}
        <SequenceOverlay
          scrollYProgress={scrollYProgress}
          enter={0.8}
          visible={0.95}
          exit={1}
          hold
          direction="up"
          distance={32}
          className="relative z-10 mt-auto w-full"
        >
          <div className="flex w-full flex-col items-start justify-between gap-6 border-t border-neutral-800 pt-8 md:flex-row md:items-end">
            <div>
              <span className="block text-[10px] uppercase tracking-ultra text-neutral-500">
                Begin Your Journey
              </span>
              <a
                href="mailto:bookings@ihantours.com"
                className="mt-2 block text-xl font-light transition-colors hover:text-brand-red"
              >
                bookings@ihantours.com
              </a>
            </div>
          </div>
        </SequenceOverlay>

        {/* Climbing Card */}
        <motion.div
          style={{ y: cardY }}
          className="absolute right-4 top-0 z-20 flex w-72 flex-col justify-between bg-[#F9F6F0] p-6 text-ink shadow-2xl md:right-24 md:w-[380px] md:p-10"
        >
          {/* Top Section */}
          <div className="flex justify-between">
            <div className="flex flex-col leading-none">
              <span className="text-6xl font-bold tracking-tighter md:text-[100px]">5K+</span>
              <span className="text-5xl tracking-tighter md:text-[80px]">flights</span>
            </div>
            {/* Barcode */}
            <div className="flex w-8 flex-col items-end pt-2">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-ink" 
                  style={{ 
                    height: [2,3,1.5,4,2,1.5,5][i % 7] + 'px',
                    width: i % 5 === 0 ? '70%' : '100%',
                    marginBottom: [2,1.5,3,1.5,2][i % 5] + 'px'
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div className="mt-20 md:mt-32">
            <p className="text-xs font-bold uppercase tracking-widest md:text-sm">
              Successfully Arranged
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 flex flex-col gap-6 md:mt-24 md:gap-8">
            {/* Jr Logo SVG */}
            <div className="flex items-center">
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22C4 26 8 28 14 28C22 28 26 22 26 14V4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M34 28V16C34 10 38 6 46 6C54 6 54 10 54 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-relaxed md:text-base">
              Each journey reflects years of expertise, precision, and trust. From last-minute charters to intercontinental business routes — Jesko Jets ensures safety, discretion, and excellence in every flight.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

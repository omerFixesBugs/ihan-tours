"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";

const CITIES = [
  "Paris",
  "Toronto",
  "Miami",
  "Bangkok",
  "Melbourne",
  "London",
  "Seoul",
  "Sydney",
  "Tokyo",
  "Dubai",
  "New York",
  "Rome",
];

// Extend list heavily to ensure it can loop endlessly for a long time
const MARQUEE_CITIES = [...CITIES, ...CITIES, ...CITIES, ...CITIES];

export default function FlyAnywhere() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const itemRef = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  // Measure item height for responsive translation
  useEffect(() => {
    if (itemRef.current) {
      setItemHeight(itemRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (itemRef.current) setItemHeight(itemRef.current.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Step ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 1500); // Wait 1.5s on each city
    return () => clearInterval(interval);
  }, []);

  const getCityTranslation = (city: string) => {
    const key = city.toLowerCase().replace(" ", "_");
    return t(`flyAnywhere.cities.${key}`);
  };

  return (
    <section className="relative z-30 h-[200vh] w-full">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center bg-transparent">
      
      {/* ── Giant Background Text ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 flex w-full translate-y-[20%] items-end justify-center leading-none">
        <span className="font-display text-[28vw] font-bold tracking-tighter text-white/[0.04] select-none">
          {t("flyAnywhere.global")}
        </span>
      </div>

      {/* ── Main Content: Fly Anywhere Ticker ── */}
      <div className="relative z-10 flex w-full items-center justify-center px-4 md:px-0">
        
        {/* Left Side */}
        <div className="flex w-1/3 justify-end pr-4 md:w-2/5 md:pr-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {t("flyAnywhere.title")}
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center text-white/40">
          <span className="h-[1px] w-8 bg-white/20 md:w-16"></span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-3 h-5 w-5 rotate-45 md:h-6 md:w-6"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
          <span className="h-[1px] w-8 bg-white/20 md:w-16"></span>
        </div>

        {/* Right Side: Vertical Stepper Ticker */}
        <div
          className="relative block w-1/3 overflow-hidden pl-4 md:w-2/5 md:pl-12 transition-all duration-300"
          style={{
            height: itemHeight ? itemHeight * 5 : "50vh",
          }}
        >
          {/* Scrolling List */}
          <motion.div
            initial={false}
            animate={{
              y: -(activeIndex * itemHeight),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex flex-col items-start"
            style={{
              paddingTop: itemHeight ? itemHeight * 2 : "20vh",
            }}
          >
            {Array.from({ length: 2000 }).map((_, idx) => {
              const city = CITIES[idx % CITIES.length];
              const isHighlighted = idx === activeIndex;
              
              return (
                <span
                  key={`city-${idx}`}
                  ref={idx === 0 ? itemRef : null}
                  className={`flex h-12 w-full items-center font-display text-xl font-bold transition-colors duration-500 md:h-16 md:text-4xl lg:h-20 lg:text-5xl ${
                    isHighlighted ? "text-white" : "text-white/20"
                  }`}
                >
                  {getCityTranslation(city)}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="absolute bottom-12 z-20 flex w-full justify-center">
        <a
          href="mailto:bookings@ihantours.com"
          className="inline-flex items-center rounded-full bg-white px-6 py-4 text-xs font-semibold text-ink shadow-sm transition-transform hover:scale-105 md:text-sm"
        >
          {t("flyAnywhere.book_flight")}
          <span className="ml-3 flex h-6 w-6 rotate-45 items-center justify-center rounded-full bg-ink text-white">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
          </span>
        </a>
      </div>
      </div>
    </section>
  );
}

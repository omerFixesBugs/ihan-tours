"use client";

import { useEffect, useMemo, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import {
  buildWindowSequencePaths,
  buildZetSequencePaths,
  WINDOW_SEQUENCE_COUNT,
  ZET_SEQUENCE_COUNT,
} from "@/lib/sequencePaths";
import Loader from "./Loader";
import HeroScroll from "./HeroScroll";
import PremiumPackages from "./PremiumPackages";
import TourShowcase from "./TourShowcase";
import FlyAnywhere from "./FlyAnywhere";
import Globe from "./Globe";
import TrustStats from "./TrustStats";
import ValuedCustomers from "./ValuedCustomers";
import WhyChooseUs from "./WhyChooseUs";
import ExpertSolutions from "./ExpertSolutions";
import FeaturedDestinations from "./FeaturedDestinations";
import Gallery from "./Gallery";
import TravelPartners from "./TravelPartners";
import Testimonials from "./Testimonials";
import ExclusiveOffers from "./ExclusiveOffers";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const ALL_IMAGE_PATHS = [
  ...buildWindowSequencePaths(WINDOW_SEQUENCE_COUNT),
  ...buildZetSequencePaths(ZET_SEQUENCE_COUNT),
];

/** Static images used by TourShowcase intro/outro — preloaded alongside sequences */
const STATIC_PRELOAD = ["/try.jpg", "/out_0001.png", "/out_0118.png"];

export default function PageClient() {
  const imageUrls = useMemo(() => ALL_IMAGE_PATHS, []);
  const { images, isLoading, progress } = useImagePreloader(imageUrls);
  const ready = !isLoading;

  const lightSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lightSectionProgress } = useScroll({
    target: lightSectionRef,
    offset: ["start start", "end start"]
  });

  const lastTheme = useRef<"dark" | "light">("dark");
  useMotionValueEvent(lightSectionProgress, "change", (latest) => {
    const theme = (latest > 0.01 && latest < 0.99) ? "light" : "dark";
    if (lastTheme.current !== theme) {
      lastTheme.current = theme;
      window.dispatchEvent(new CustomEvent("nav-theme-change", { detail: theme }));
    }
  });

  const heroImages = useMemo(
    () => images.slice(0, WINDOW_SEQUENCE_COUNT),
    [images]
  );
  const tourImages = useMemo(
    () => images.slice(WINDOW_SEQUENCE_COUNT, WINDOW_SEQUENCE_COUNT + ZET_SEQUENCE_COUNT),
    [images]
  );

  // Preload static TourShowcase images early
  useEffect(() => {
    STATIC_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <>
      <Loader progress={progress} visible={!ready} />
      <main className="relative bg-background text-foreground">
        <HeroScroll images={heroImages} isLoading={isLoading} />
        <div ref={lightSectionRef}>
          <PremiumPackages />
          <TourShowcase images={tourImages} isLoading={isLoading} />
        </div>
        <FlyAnywhere />
        <div className="relative z-20 -mt-[100vh]">
          <Globe />
        </div>
        <div className="relative w-full overflow-clip">
          {/* Traveling Plane overlay */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="sticky top-[50vh] ml-auto h-[600px] w-[600px] -translate-y-1/2 translate-x-[30%] rotate-180 opacity-10 drop-shadow-2xl md:h-[1200px] md:w-[1200px]">
              <img src="/out_0001.png" alt="Traveling Plane" className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            </div>
          </div>

          <TrustStats />
          <ValuedCustomers />
          <WhyChooseUs />
          <ExpertSolutions />
          <FeaturedDestinations />
          <Gallery />
          <TravelPartners />
          <Testimonials />
          <ExclusiveOffers />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}

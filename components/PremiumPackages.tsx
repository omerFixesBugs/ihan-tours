"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { useLanguage } from "@/components/LanguageContext";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function PremiumPackages() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDeckVisible, setIsDeckVisible] = useState(false);
  const [isSpread, setIsSpread] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDeckVisible(true);
          setTimeout(() => {
            setIsSpread(true);
          }, 600);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? POPULAR_PACKAGES.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === POPULAR_PACKAGES.length - 1 ? 0 : i + 1));

  const getRatingStr = (ratingVal: number) => {
    if (!ratingVal) return "";
    const formatted = ratingVal % 1 === 0 ? `${ratingVal}.0` : `${ratingVal}`;
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return formatted.replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
    }
    return formatted;
  };

  const getPaxText = (min: number, max: number) => {
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      const minStr = min.toString().replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
      const maxStr = max.toString().replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
      return `${minStr}-${maxStr} জন`;
    }
    return `${min}-${max} Pax`;
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-luxury-cream via-white to-luxury-sky py-16 md:py-24">
      {/* Soft blend from hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-luxury-cream to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <style dangerouslySetInnerHTML={{ __html: `
          .slider-container {
            --active-width: min(340px, 82vw);
            --inactive-width: min(240px, 62vw);
            --slider-height: 440px;
            
            --card-pos-0: 0px;
            --card-pos-1: 180px;
            --card-pos-2: 320px;
            --card-pos-3: 450px;
            
            --card-scale-0: 1;
            --card-scale-1: 0.85;
            --card-scale-2: 0.72;
            --card-scale-3: 0.6;
          }
          @media (min-width: 768px) {
            .slider-container {
              --active-width: 380px;
              --inactive-width: 280px;
              --slider-height: 540px;
              
              --card-pos-0: 0px;
              --card-pos-1: 250px;
              --card-pos-2: 440px;
              --card-pos-3: 610px;
              
              --card-scale-0: 1;
              --card-scale-1: 0.88;
              --card-scale-2: 0.76;
              --card-scale-3: 0.65;
            }
          }
          .shuffle-card {
            transition: transform 900ms cubic-bezier(0.34, 1.56, 0.64, 1), 
                        opacity 700ms ease-out, 
                        width 600ms ease-out, 
                        filter 500ms ease-out;
          }
        ` }} />

        <header className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
            {language === "bn" ? "সবচেয়ে জনপ্রিয় প্যাকেজগুলো" : "Best-Selling Packages"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 md:text-base">
            {language === "bn" 
              ? "ইহান ট্যুরস অ্যান্ড ট্রাভেলসের সাথে আপনার পছন্দের গন্তব্যটি বেছে নিয়ে ভ্রমণের দিগন্ত প্রসারিত করুন!" 
              : "Expand your travel horizons with new facets! Explore the world by choosing your ideal travel destinations with Ihan Tours and Travels."
            }
          </p>
        </header>

        <div className="slider-container relative flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous package"
            className="absolute left-0 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg transition-transform hover:scale-105 md:left-2"
          >
            <ChevronIcon direction="left" />
          </button>

          <div 
            className="relative flex w-full max-w-5xl md:max-w-6xl items-center justify-center"
            style={{ height: "var(--slider-height)" }}
          >
            {POPULAR_PACKAGES.map((pkg, index) => {
              let offset = index - activeIndex;
              const N = POPULAR_PACKAGES.length;
              if (offset > N / 2) {
                offset -= N;
              } else if (offset < -N / 2) {
                offset += N;
              }
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);
              const isVisible = absOffset <= 3;

              if (!isVisible) return null;

              const pkgTrans = t(`popularPackages.${pkg.id}`) || {};
              const title = pkgTrans.title || pkg.title;
              const location = pkgTrans.location || pkg.location;
              const description = pkgTrans.description || pkg.description;
              const duration = pkgTrans.duration || pkg.duration;
              const price = pkgTrans.price || pkg.price;
              const accommodation = pkgTrans.accommodation || pkg.accommodation_type;

              // Shuffle state machine
              const transformTranslation = isSpread 
                ? `calc(${offset < 0 ? -1 : 1} * var(--card-pos-${absOffset}))` 
                : "0px";
              const transformScale = isSpread
                ? `var(--card-scale-${absOffset})`
                : (isActive ? "1" : "0.9");
              const rotation = isSpread ? "0deg" : `${offset * 3}deg`;

              let opacity = 0;
              if (!isDeckVisible) {
                opacity = 0;
              } else if (!isSpread) {
                if (isActive) opacity = 1;
                else if (absOffset === 1) opacity = 0.5;
                else opacity = 0;
              } else {
                if (isActive) opacity = 1;
                else if (absOffset === 1) opacity = 0.6;
                else if (absOffset === 2) opacity = 0.25;
              }

              return (
                <article
                  key={pkg.id}
                  className={`absolute shuffle-card ${absOffset > 2 ? "pointer-events-none" : ""}`}
                  style={{
                    width: isActive ? "var(--active-width)" : "var(--inactive-width)",
                    zIndex: 10 - absOffset,
                    transform: `translateX(${transformTranslation}) scale(${transformScale}) rotate(${rotation})`,
                    opacity: opacity,
                    filter: isActive ? "none" : "grayscale(100%)",
                  }}
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-neutral-200/80">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pkg.image}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-md bg-neutral-900 px-2.5 py-1 text-[10px] font-medium text-white md:text-xs">
                        {duration}
                      </span>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="mb-1 flex items-center justify-between text-xs text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <MapPinIcon />
                          <span>{location}</span>
                        </div>
                        {pkg.star_rating && (
                          <div className="flex items-center gap-1 text-[#f59e0b]">
                            <span>★</span>
                            <span className="text-neutral-600">{getRatingStr(pkg.review_rating || pkg.star_rating)}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 md:text-lg">
                        {title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
                        {description}
                      </p>
                      
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-neutral-500 md:text-xs">
                        {accommodation && (
                          <span className="rounded-md bg-neutral-100 px-2 py-1">
                            {accommodation}
                          </span>
                        )}
                        {pkg.pax_min && pkg.pax_max && (
                          <span className="rounded-md bg-neutral-100 px-2 py-1">
                            {getPaxText(pkg.pax_min, pkg.pax_max)}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                        <span className="text-sm font-bold text-[#e8192c] md:text-base">
                          {price}
                        </span>
                        <Link
                          href={`/packages/${pkg.id}`}
                          className="text-sm font-semibold text-neutral-900 transition-colors hover:text-[#e8192c]"
                        >
                          {t("common.view_details")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next package"
            className="absolute right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg transition-transform hover:scale-105 md:right-2"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      {/* Blend into sequence 2 below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-luxury-sky" />
    </section>
  );
}

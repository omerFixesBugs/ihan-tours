"use client";

import { useState } from "react";
import { POPULAR_PACKAGES } from "@/lib/packages";

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

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? POPULAR_PACKAGES.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === POPULAR_PACKAGES.length - 1 ? 0 : i + 1));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-luxury-cream via-white to-luxury-sky py-16 md:py-24">
      {/* Soft blend from hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-luxury-cream to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <header className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
            Best-Selling Packages
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 md:text-base">
            Expand your travel horizons with new facets! Explore the world by
            choosing your ideal travel destinations with Ihan Tours and Travels.
          </p>
        </header>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous package"
            className="absolute left-0 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg transition-transform hover:scale-105 md:left-2"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="relative flex h-[420px] w-full max-w-4xl items-center justify-center md:h-[460px]">
            {POPULAR_PACKAGES.map((pkg, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const xOffset = offset * 200;

              return (
                <article
                  key={pkg.id}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    width: isActive ? "min(320px, 82vw)" : "min(220px, 62vw)",
                    zIndex: 10 - Math.abs(offset),
                    transform: `translateX(${xOffset}px) scale(${isActive ? 1 : 0.82})`,
                    opacity: isActive ? 1 : 0.6,
                    filter: isActive ? "none" : "grayscale(100%)",
                  }}
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-neutral-200/80">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-md bg-neutral-900 px-2.5 py-1 text-[10px] font-medium text-white md:text-xs">
                        {pkg.duration}
                      </span>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="mb-1 flex items-center justify-between text-xs text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          <MapPinIcon />
                          <span>{pkg.location}</span>
                        </div>
                        {pkg.star_rating && (
                          <div className="flex items-center gap-1 text-[#f59e0b]">
                            <span>★</span>
                            <span className="text-neutral-600">{pkg.review_rating || pkg.star_rating}.0</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 md:text-lg">
                        {pkg.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
                        {pkg.description}
                      </p>
                      
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-neutral-500 md:text-xs">
                        {pkg.accommodation_type && (
                          <span className="rounded-md bg-neutral-100 px-2 py-1">
                            {pkg.accommodation_type}
                          </span>
                        )}
                        {pkg.pax_min && pkg.pax_max && (
                          <span className="rounded-md bg-neutral-100 px-2 py-1">
                            {pkg.pax_min}-{pkg.pax_max} Pax
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                        <span className="text-sm font-bold text-[#e8192c] md:text-base">
                          {pkg.price}
                        </span>
                        <a
                          href="mailto:bookings@ihantours.com"
                          className="text-sm font-semibold text-neutral-900 transition-colors hover:text-[#e8192c]"
                        >
                          View Package
                        </a>
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

"use client";

import { TRAVEL_PARTNERS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function TravelPartners() {
  const { language } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-[#E8A598] to-[#1E293B] py-16 overflow-hidden border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10 text-center">
        <h2 className="text-2xl font-light uppercase tracking-wide text-white drop-shadow-md">
          {language === "bn" ? "আমাদের ভ্রমণ সহযোগী" : "Our Travel Partners"}
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-brand-red/50" />
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-4 pr-12 md:gap-20 md:pr-20">
          {[...TRAVEL_PARTNERS, ...TRAVEL_PARTNERS, ...TRAVEL_PARTNERS].map((partner, idx) => (
            <img
              key={`${partner.id}-${idx}`}
              src={partner.logo_url}
              alt={partner.name}
              className="h-10 w-auto max-w-[120px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              title={partner.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

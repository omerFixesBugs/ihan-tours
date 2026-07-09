"use client";

import { TEAM_ORGS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function ValuedCustomers() {
  const { language } = useLanguage();

  return (
    <section className="bg-background py-16 overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10 text-center">
        <h2 className="text-2xl font-light uppercase tracking-wide text-white">
          {language === "bn" ? "আমাদের সম্মানিত গ্রাহক" : "Our Valued Customers"}
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-brand-red/50" />
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-4 pr-12 md:gap-20 md:pr-20">
          {[...TEAM_ORGS, ...TEAM_ORGS, ...TEAM_ORGS].map((org, idx) => (
            <img
              key={`${org.id}-${idx}`}
              src={org.logo_url}
              alt={org.name}
              className="h-12 w-auto max-w-[150px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

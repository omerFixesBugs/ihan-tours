"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import { FEATURED_DESTINATIONS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function DestinationsPageClient() {
  const { t, language } = useLanguage();

  const nameMap: Record<string, string> = {
    umrah: language === "bn" ? "ওমরাহ" : "Umrah",
    malaysia: language === "bn" ? "মালয়েশিয়া" : "Malaysia",
    china: language === "bn" ? "চীন" : "China",
    thailand: language === "bn" ? "থাইল্যান্ড" : "Thailand",
    maldives: language === "bn" ? "মালদ্বীপ" : "Maldives",
    "corporate-tour": language === "bn" ? "কর্পোরেট ট্যুর" : "Corporate Tours",
  };

  const getRatingStr = (rating: number) => {
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return `${rating}.0`.replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
    }
    return `${rating}.0`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader
        title={t("destinationsPage.title")}
        subtitle={t("destinationsPage.subtitle")}
        image="/packages/world-tour-1.jpg"
      />

      <div className="relative w-full flex-grow">
        <PlaneOverlay />

        <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-neutral-400 text-lg leading-relaxed font-light">
                {t("destinationsPage.description")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DESTINATIONS.map((dest, index) => (
              <ScrollReveal key={dest.id} delay={index * 0.1}>
                <Link
                  href={dest.href ?? `/destination/${dest.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-red/10 hover:border-brand-red/30"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={dest.image_url}
                      alt={nameMap[dest.slug] || dest.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2.5 py-1.5 rounded-md flex items-center gap-1 text-xs border border-white/10">
                      <span className="text-[#f59e0b]">★</span>
                      <span className="text-white font-medium">{getRatingStr(dest.star_rating)}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors">
                      {nameMap[dest.slug] || dest.name}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm font-light leading-relaxed text-neutral-400 mb-6 flex-1">
                      {t(`featuredDestinations.items.${dest.slug}`)}
                    </p>
                    <div className="mt-auto flex items-center justify-end border-t border-white/10 pt-4">
                      <span className="text-sm font-semibold uppercase tracking-wider text-white transition-colors group-hover:text-brand-red flex items-center gap-2">
                        {t("common.view_details")}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import { FEATURED_DESTINATIONS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function FeaturedDestinations() {
  const { t, language } = useLanguage();

  const getDestData = (slug: string, defaultName: string) => {
    const nameMap: Record<string, string> = {
      umrah: language === "bn" ? "ওমরাহ" : "Umrah",
      malaysia: language === "bn" ? "মালয়েশিয়া" : "Malaysia",
      china: language === "bn" ? "চীন" : "China",
      thailand: language === "bn" ? "থাইল্যান্ড" : "Thailand",
      maldives: language === "bn" ? "মালদ্বীপ" : "Maldives",
    };
    
    return {
      name: nameMap[slug] || defaultName,
      description: t(`featuredDestinations.items.${slug}`)
    };
  };

  const getRatingStr = (rating: number) => {
    if (language === "bn") {
      return "৫.০";
    }
    return `${rating}.0`;
  };

  return (
    <section className="bg-gradient-to-b from-[#F9F6F0] via-[#FFE5D9] to-[#FFD8C9] py-16 md:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">{t("featuredDestinations.title")}</h2>
          <p className="text-neutral-700 font-light max-w-2xl mx-auto">{t("featuredDestinations.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_DESTINATIONS.map((dest) => {
            const data = getDestData(dest.slug, dest.name);
            return (
              <div key={dest.id} className="group relative overflow-hidden rounded-2xl bg-white/40 border border-black/5 backdrop-blur-sm transition-all hover:border-brand-red/50 hover:bg-white/60 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={dest.image_url} 
                    alt={data.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-xs border border-black/5 shadow-sm">
                    <span className="text-[#f59e0b]">★</span>
                    <span className="text-ink font-bold">{getRatingStr(dest.star_rating)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-brand-red transition-colors">{data.name}</h3>
                  <p className="text-sm font-light text-neutral-700 line-clamp-3">{data.description}</p>
                  <div className="mt-6 flex justify-end">
                    <a href={`/destination/${dest.slug}`} className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2 group-hover:text-brand-red transition-colors">
                      {language === "bn" ? "অন্বেষণ করুন" : "Explore"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

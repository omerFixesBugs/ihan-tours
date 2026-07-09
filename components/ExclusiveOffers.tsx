"use client";

import { OFFERS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function ExclusiveOffers() {
  const { t } = useLanguage();

  const getOfferData = (id: number) => {
    switch (id) {
      case 1:
        return {
          title: t("offers.items.summer.title"),
          description: t("offers.items.summer.description"),
          badge: t("offers.seasonal")
        };
      case 2:
        return {
          title: t("offers.items.umrah.title"),
          description: t("offers.items.umrah.description"),
          badge: t("offers.special_rate")
        };
      case 3:
        return {
          title: t("offers.items.corporate.title"),
          description: t("offers.items.corporate.description"),
          badge: t("offers.corporate")
        };
      default:
        return { title: "", description: "", badge: "" };
    }
  };

  return (
    <section className="bg-background py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{t("common.exclusive_offers_title")}</h2>
          <div className="mx-auto h-px w-24 bg-brand-red/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => {
            const data = getOfferData(offer.id);
            return (
              <div key={offer.id} className="group relative overflow-hidden rounded-2xl bg-white/5 aspect-[4/3] flex flex-col justify-end">
                <img 
                  src={offer.image_url} 
                  alt={data.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
                  {data.badge}
                </div>

                <div className="relative z-10 p-6 md:p-8 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{data.title}</h3>
                  <p className="text-sm font-light text-neutral-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden line-clamp-2">
                    {data.description}
                  </p>
                  <a 
                    href={offer.cta_link} 
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-white hover:text-brand-red transition-colors"
                  >
                    {t("common.view_details")}
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

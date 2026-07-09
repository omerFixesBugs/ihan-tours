"use client";

import { GALLERY_ITEMS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function Gallery() {
  const { language } = useLanguage();

  const getCaption = (id: number, defaultCaption: string) => {
    if (language === "bn") {
      const captionMap: Record<number, string> = {
        10: "শান্ত মনোরম দৃশ্য",
        11: "সাংস্কৃতিক মিলনমেলা",
        12: "পার্বত্য বিহার",
        13: "দ্বীপ ভ্রমণ",
        14: "ঐতিহাসিক স্থান",
        16: "শহুরে কোলাহল থেকে মুক্তি",
        17: "স্থানীয় সুস্বাদু খাবার",
        18: "বন্যপ্রাণী সাফারি",
      };
      return captionMap[id] || defaultCaption;
    }
    return defaultCaption;
  };

  return (
    <section className="bg-gradient-to-b from-[#FFD8C9] to-[#E8A598] py-16 md:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-red text-xs uppercase tracking-superwide font-bold mb-4 block">
            {language === "bn" ? "মুহূর্ত ও স্মৃতি" : "Moments & Memories"}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">
            {language === "bn" ? (
              <>আমাদের ভ্রমণকারীদের <br/> <span className="text-brand-red">ক্যামেরায়</span></>
            ) : (
              <>From our travelers&apos; <br/> <span className="text-brand-red">cameras</span></>
            )}
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group overflow-hidden rounded-xl">
              <img 
                src={item.image_url} 
                alt={getCaption(item.id, item.caption)} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold">{getCaption(item.id, item.caption)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

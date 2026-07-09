"use client";

import { WHY_CHOOSE_US } from "@/lib/siteData";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function WhyChooseUs() {
  const data = WHY_CHOOSE_US[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={containerRef} className="bg-background py-20 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div style={{ opacity, y }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white/5">
            <img 
              src={data.image_url} 
              alt={t("whyChooseUs.subtitle")} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          
          <div className="flex flex-col items-start">
            <span className="text-brand-red text-xs uppercase tracking-superwide font-medium mb-4">
              {t("whyChooseUs.subtitle")}
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t("whyChooseUs.title") }}
            />
            <p className="text-neutral-400 font-light leading-relaxed mb-10 max-w-lg md:text-lg">
              {t("whyChooseUs.description")}
            </p>
            <a 
              href={data.primary_btn_url}
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-background font-medium text-sm transition-colors hover:bg-brand-red hover:text-white"
            >
              {t("whyChooseUs.btn_text")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

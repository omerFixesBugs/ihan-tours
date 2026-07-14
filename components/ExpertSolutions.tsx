"use client";

import { EXPERT_SOLUTIONS } from "@/lib/siteData";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function ExpertSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const getSolutionData = (id: number) => {
    switch (id) {
      case 1:
        return {
          title: t("expertSolutions.sacred_umrah"),
          paragraph: t("expertSolutions.sacred_umrah_body"),
          primary_btn_text: t("expertSolutions.view_packages"),
          secondary_btn_text: t("expertSolutions.contact_advisor")
        };
      case 2:
        return {
          title: t("expertSolutions.corporate"),
          paragraph: t("expertSolutions.corporate_body"),
          primary_btn_text: t("expertSolutions.get_quote"),
          secondary_btn_text: t("expertSolutions.contact_advisor")
        };
      case 3:
        return {
          title: t("expertSolutions.inbound"),
          paragraph: t("expertSolutions.inbound_body"),
          primary_btn_text: t("expertSolutions.explore_bangladesh"),
          secondary_btn_text: null
        };
      default:
        return { title: "", paragraph: "", primary_btn_text: "", secondary_btn_text: null };
    }
  };

  return (
    <section ref={containerRef} className="bg-background py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-md">{t("expertSolutions.title")}</h2>
          <div className="mx-auto h-px w-24 bg-brand-red/50" />
        </div>

        <motion.div style={{ opacity, y }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {EXPERT_SOLUTIONS.map((solution) => {
            const data = getSolutionData(solution.id);
            return (
              <div key={solution.id} className="group relative overflow-hidden rounded-2xl bg-white/5 aspect-[4/5] flex flex-col justify-end p-8 border border-white/5">
                <img 
                  src={solution.image_url} 
                  alt={data.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">{data.title}</h3>
                  <p className="text-sm font-light text-neutral-300 mb-6">{data.paragraph}</p>
                  <div className="flex flex-wrap gap-3">
                    <a href={solution.primary_btn_url} className="px-5 py-2.5 rounded-full bg-brand-red text-white text-xs font-medium transition-colors hover:bg-brand-redDark">
                      {data.primary_btn_text}
                    </a>
                    {data.secondary_btn_text && (
                      <a href={solution.secondary_btn_url!} className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-sm transition-colors hover:bg-white/20 border border-white/10">
                        {data.secondary_btn_text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

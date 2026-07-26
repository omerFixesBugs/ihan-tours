"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function HeroBrandMark() {
  const { t, language } = useLanguage();
  const isBn = language === "bn";

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-center ml-4 md:ml-3">
      <p
        className={`font-display text-[clamp(1.25rem,3.5vw,2.05rem)] font-extrabold uppercase leading-none text-foreground ${
          isBn ? "tracking-normal" : "tracking-[0.28em]"
        }`}
        style={{
          textShadow:
            "0 2px 24px rgba(0,0,0,0.45), 0 0 40px rgba(0,0,0,0.25)",
        }}
      >
        {t("nav.brand")}
      </p>
      <p
        className={`font-display mt-3 text-[clamp(0.65rem,1.8vw,1rem)] font-bold uppercase text-foreground/95 ${
          isBn ? "tracking-normal" : "tracking-[0.35em]"
        }`}
        style={{
          textShadow: "0 1px 16px rgba(0,0,0,0.4)",
        }}
      >
        {t("nav.brand_sub")}
      </p>
    </div>
  );
}

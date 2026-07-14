"use client";

import { useLanguage } from "@/components/LanguageContext";

function PlaneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function ScrollChevrons() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="opacity-70"
    >
      <path d="m6 9 6 6 6-6" />
      <path d="m6 15 6 6 6-6" />
    </svg>
  );
}

export default function HeroIntro() {
  const { t } = useLanguage();

  return (
    <div className="relative h-full w-full">
      {/* Top-left headline */}
      <h1 className="font-display absolute left-4 top-[22%] max-w-[220px] text-2xl font-bold uppercase text-foreground leading-tight md:left-8 md:top-[28%] md:text-3xl md:max-w-[280px] lg:left-12 lg:top-[30%] lg:text-4xl lg:max-w-[340px] xl:left-16 xl:text-[52px] xl:max-w-[520px] xl:leading-tight 2xl:left-24 2xl:text-[70px] 2xl:max-w-[680px] 2xl:leading-tight">
        {t("hero.celebrate")}
        <br />
        {t("hero.the_journey")}
      </h1>

      {/* Bottom-right headline */}
      <h2 className="font-display absolute bottom-[28%] right-4 max-w-[220px] text-right text-2xl font-bold uppercase text-foreground leading-tight md:right-8 md:bottom-[34%] md:text-3xl md:max-w-[280px] lg:right-12 lg:text-4xl lg:max-w-[340px] xl:right-16 xl:text-[52px] xl:max-w-[520px] xl:leading-tight 2xl:right-24 2xl:text-[70px] 2xl:max-w-[680px] 2xl:leading-tight">
        {t("hero.discover")}
        <br />
        {t("hero.holidays")}
      </h2>

      {/* Bottom-left copy block */}
      <div className="absolute bottom-8 left-4 max-w-[220px] md:bottom-28 md:left-8 md:max-w-[260px] lg:left-12 lg:max-w-[280px] xl:left-16 xl:max-w-[320px] 2xl:bottom-32 2xl:left-24 2xl:max-w-[380px]">
        <p className="font-display text-base font-semibold uppercase leading-tight tracking-display text-foreground md:text-lg lg:text-xl">
          {t("hero.expand")}
          <br />
          {t("hero.travel_horizons")}
        </p>
        <div className="my-4 h-px w-16 bg-foreground/40" />
        <p className="hidden md:block text-[11px] font-light leading-relaxed text-neutral-400 md:text-xs lg:text-sm">
          {t("hero.intro_body")}
        </p>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-6 hidden items-end gap-4 md:flex md:right-12 md:bottom-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] uppercase tracking-ultra text-neutral-500">
            {t("hero.scroll_down")}
          </span>
          <ScrollChevrons />
        </div>
        <div className="mb-1 max-w-[140px] border-l border-neutral-700 pl-4">
          <span className="text-[9px] uppercase leading-relaxed tracking-superwide text-neutral-500">
            {t("hero.to_start")}
            <br />
            {t("hero.the_journey_small")}
          </span>
        </div>
      </div>
    </div>
  );
}

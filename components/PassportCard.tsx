"use client";

import type { PassportItem } from "@/lib/passports";
import { useLanguage } from "@/components/LanguageContext";

interface PassportCardProps {
  item: PassportItem;
  index: number;
  onOpen?: () => void;
}

export default function PassportCard({ item, index, onOpen }: PassportCardProps) {
  const { language } = useLanguage();
  const label =
    item.name ??
    (language === "bn" ? `সফল ক্লায়েন্ট #${index + 1}` : `Successful Client #${index + 1}`);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all duration-500 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-[0_20px_50px_-20px_rgba(220,38,38,0.35)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
        <img
          src={item.src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          {language === "bn" ? "ভিসা অনুমোদিত" : "Visa Approved"}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="mt-0.5 text-xs text-neutral-300">
            {language === "bn" ? "ওয়ার্ক ভিসা" : "Work Visa"}
            {" · "}
            {item.country ?? (language === "bn" ? "ইউরোপ" : "Europe")}
          </p>
        </div>
      </div>
    </button>
  );
}

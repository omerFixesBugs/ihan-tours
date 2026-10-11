"use client";

import { useState } from "react";
import Link from "next/link";
import type { PassportItem } from "@/lib/passports";
import { useLanguage } from "@/components/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import PassportCard from "@/components/PassportCard";
import PassportLightbox from "@/components/PassportLightbox";

const HOME_LIMIT = 8;

export default function SuccessfulClients({ passports }: { passports: PassportItem[] }) {
  const { language } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  const preview = passports.slice(0, HOME_LIMIT);
  const bn = language === "bn";

  return (
    <section className="relative z-10 border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <ScrollReveal>
            <span className="mb-4 block text-xs font-bold uppercase tracking-superwide text-brand-red">
              {bn ? "আমাদের সাফল্যের গল্প" : "Our Success Stories"}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-5xl">
              {bn ? (
                <>ইউরোপে <span className="text-brand-red">ওয়ার্ক ভিসায়</span> কর্মরত আমাদের ক্লায়েন্ট</>
              ) : (
                <>Our clients now <span className="text-brand-red">working in Europe</span></>
              )}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl text-base font-light leading-relaxed text-neutral-400 md:text-lg">
              {bn
                ? "এরা আমাদের সেই ক্লায়েন্ট যাদের আমরা সফলভাবে ওয়ার্ক ভিসায় ইউরোপে পাঠিয়েছি এবং তারা এখন সেখানে কাজ করছেন।"
                : "These are real clients we have successfully sent to Europe on work visas — and they are working there today."}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-neutral-300">
              <span className="font-display text-2xl font-bold text-white">{passports.length > 0 ? `${passports.length}+` : "—"}</span>
              {bn ? "সফল ভিসা" : "Successful visas"}
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {preview.map((item, i) => (
            <ScrollReveal key={item.src} delay={0.05 * (i % 4)}>
              <PassportCard item={item} index={i} onOpen={() => setActive(i)} />
            </ScrollReveal>
          ))}
          {/* Placeholders until images are added to /public/passport */}
          {preview.length === 0 &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-center text-xs text-neutral-500"
              >
                <svg className="h-10 w-10 text-brand-red/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth={1.5} />
                  <circle cx="12" cy="10" r="3" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeWidth={1.5} d="M9 16h6" />
                </svg>
                {bn ? "শীঘ্রই আসছে" : "Coming soon"}
              </div>
            ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            {bn ? "সবগুলো দেখুন" : "View all success stories"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <PassportLightbox items={preview} index={active} onChange={setActive} />
    </section>
  );
}

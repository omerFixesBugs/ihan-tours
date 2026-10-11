"use client";

import { useState } from "react";
import type { PassportItem } from "@/lib/passports";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import ContactSection from "@/components/ContactSection";
import PassportCard from "@/components/PassportCard";
import PassportLightbox from "@/components/PassportLightbox";
import { useLanguage } from "@/components/LanguageContext";

export default function SuccessStoriesPageClient({ passports }: { passports: PassportItem[] }) {
  const { language } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const bn = language === "bn";

  const countries = Array.from(new Set(passports.map((p) => p.country).filter(Boolean))) as string[];
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? passports : passports.filter((p) => p.country === filter);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <PageHeader
        title={bn ? "সাফল্যের গল্প" : "Success Stories"}
        subtitle={bn ? "ইউরোপে ওয়ার্ক ভিসা" : "Work Visas to Europe"}
        image="/visa/visa.jpg"
      />

      <div className="relative w-full flex-grow">
        <PlaneOverlay />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="mb-12 text-center">
            <ScrollReveal>
              <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                {bn ? "আমাদের সফল ক্লায়েন্টরা" : "Our Successful Clients"}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-400">
                {bn
                  ? "নিচের প্রত্যেকে আমাদের মাধ্যমে ওয়ার্ক ভিসা পেয়ে ইউরোপে গিয়েছেন এবং বর্তমানে সেখানে কর্মরত আছেন। পরবর্তী সাফল্যের গল্প হতে পারে আপনার।"
                  : "Every client below received their work visa through us, travelled to Europe, and is employed there today. The next success story could be yours."}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-neutral-300">
                <span className="font-display text-2xl font-bold text-white">{passports.length}</span>
                {bn ? "জন সফল ক্লায়েন্ট" : "successful clients"}
              </div>
            </ScrollReveal>
          </div>

          {countries.length > 1 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {["all", ...countries].map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    filter === c
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-white/15 text-neutral-300 hover:border-brand-red/60"
                  }`}
                >
                  {c === "all" ? (bn ? "সব" : "All") : c}
                </button>
              ))}
            </div>
          )}

          {shown.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {shown.map((item, i) => (
                <ScrollReveal key={item.src} delay={0.05 * (i % 4)}>
                  <PassportCard item={item} index={passports.indexOf(item)} onOpen={() => setActive(i)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-neutral-500">
              {bn ? "শীঘ্রই আসছে।" : "Coming soon."}
            </p>
          )}
        </section>

        <div className="relative z-10">
          <ContactSection />
        </div>
      </div>

      <Footer />
      <PassportLightbox items={shown} index={active} onChange={setActive} />
    </main>
  );
}

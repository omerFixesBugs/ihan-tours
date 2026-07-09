"use client";

import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import ContactSection from "@/components/ContactSection";
import { useLanguage } from "@/components/LanguageContext";

export default function VisaPageClient() {
  const { t } = useLanguage();
  const bullets = t("visaPage.bullets") as string[];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title={t("visaPage.title")} 
        subtitle={t("visaPage.subtitle")} 
        image="/visa/visa.jpg"
      />
      
      <div className="relative w-full flex-grow">
        <PlaneOverlay />
        
        <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  {t("visaPage.heading")}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-neutral-400 text-lg leading-relaxed font-light mb-8">
                  {t("visaPage.description")}
                </p>
              </ScrollReveal>
              
              <ul className="space-y-4 mb-10">
                {bullets.map((item, i) => (
                  <ScrollReveal key={i} delay={0.3 + (i * 0.1)}>
                    <li className="flex items-center gap-3 text-neutral-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      </span>
                      {item}
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
            
            <ScrollReveal direction="left" delay={0.3}>
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80" 
                  alt="Passport and tickets" 
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="relative z-10">
          <ContactSection />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

"use client";

import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import TrustStats from "@/components/TrustStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import { useLanguage } from "@/components/LanguageContext";

export default function AboutPageClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title={t("aboutPage.title")} 
        subtitle={t("aboutPage.subtitle")} 
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
      />
      
      <div className="relative w-full">
        <PlaneOverlay />
        
        <section className="py-20 md:py-32 max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
              {t("aboutPage.heading")}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-neutral-400 text-lg leading-relaxed font-light mb-6">
              {t("aboutPage.p1")}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <p className="text-neutral-400 text-lg leading-relaxed font-light">
              {t("aboutPage.p2")}
            </p>
          </ScrollReveal>
        </section>

        <div className="relative z-10">
          <WhyChooseUs />
          <TrustStats />
          <Testimonials />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

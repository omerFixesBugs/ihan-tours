"use client";

import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { useLanguage } from "@/components/LanguageContext";

export default function PackagesPageClient() {
  const { t } = useLanguage();
  const internationalPackages = POPULAR_PACKAGES.filter(p => p.type === "international" || p.type === "corporate");

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title={t("packagesPage.title")} 
        subtitle={t("packagesPage.subtitle")} 
        image="/packages/world-tour-3.jpg" 
      />
      
      <div className="relative w-full flex-grow">
        <PlaneOverlay />
        
        <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-neutral-400 text-lg leading-relaxed font-light">
                {t("packagesPage.description")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalPackages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 0.1}>
                <PackageCard pkg={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}

import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Umrah Packages | Ihan Tours and Travels",
  description: "Embark on a deeply spiritual Umrah journey with Ihan Tours.",
};

export default function UmrahPage() {
  const umrahPackages = POPULAR_PACKAGES.filter(p => p.type === "umrah");
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Sacred Journeys" 
        subtitle="Umrah Packages" 
        image="https://images.unsplash.com/photo-1565552643983-6c8ea394d13e?w=1920&q=80" 
      />
      
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-neutral-400 text-lg leading-relaxed font-light">
            Embark on a deeply spiritual journey with our meticulously planned Umrah packages. 
            We ensure your focus remains entirely on your devotion and peace, while we handle 
            the logistics, premium accommodations near the Haram, and comfortable transport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umrahPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

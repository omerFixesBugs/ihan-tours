import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Packages | Ihan Tours and Travels",
  description: "Explore the world with our premium international holiday packages.",
};

export default function PackagesPage() {
  const internationalPackages = POPULAR_PACKAGES.filter(p => p.type === "international");
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Global Escapes" 
        subtitle="Holiday Packages" 
        image="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80" 
      />
      
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-neutral-400 text-lg leading-relaxed font-light">
            Expand your travel horizons with our curated international holiday packages. 
            From the turquoise waters of the Maldives to the majestic Swiss Alps, 
            we design unforgettable experiences tailored to your desires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internationalPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

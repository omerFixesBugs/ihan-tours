import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbound Tours | Ihan Tours and Travels",
  description: "Discover the hidden gems of Bangladesh with our inbound eco-tours.",
};

export default function InboundPage() {
  const inboundPackages = POPULAR_PACKAGES.filter(p => p.type === "inbound");
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Discover Bangladesh" 
        subtitle="Inbound Tours" 
        image="https://images.unsplash.com/photo-1608958435020-e8531a8924b6?w=1920&q=80" 
      />
      
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-neutral-400 text-lg leading-relaxed font-light">
            Experience the rich heritage, vibrant culture, and unparalleled natural beauty of Bangladesh. 
            Our guided local experiences take you deep into the heart of the country, from the Sundarbans 
            to the lush tea gardens of Sylhet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inboundPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

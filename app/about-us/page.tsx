import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import TrustStats from "@/components/TrustStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ihan Tours and Travels",
  description: "Learn more about our mission, vision, and dedication to curated travel experiences.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Our Story" 
        subtitle="Ihan Tours and Travels" 
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
      />
      
      <section className="py-20 md:py-32 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
          Crafting Unforgettable <br className="hidden md:block"/> Memories Since Inception
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed font-light mb-6">
          Ihan Tours and Travels was founded on a simple principle: travel should be transformative, 
          seamless, and deeply personal. We recognized that modern travelers seek more than just a ticket 
          and a hotel; they seek an experience curated to their specific desires.
        </p>
        <p className="text-neutral-400 text-lg leading-relaxed font-light">
          Whether you are embarking on a sacred Umrah pilgrimage, exploring the serene landscapes of 
          Bangladesh, or retreating to a luxury island resort, our dedicated team of travel experts is 
          committed to handling every detail with precision and care.
        </p>
      </section>

      <WhyChooseUs />
      <TrustStats />
      <Testimonials />
      
      <Footer />
    </main>
  );
}

import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa & Ticketing | Ihan Tours and Travels",
  description: "Hassle-free visa processing and air ticketing services.",
};

export default function VisaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title="Visa & Ticketing" 
        subtitle="Seamless Travel Prep" 
      />
      
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Hassle-Free Processing
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed font-light mb-8">
              Navigating visa requirements can be complex and time-consuming. At Ihan Tours, 
              our experienced consultants handle the paperwork, appointments, and follow-ups 
              for major destinations worldwide.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Comprehensive document checking",
                "Appointment scheduling",
                "Form filling assistance",
                "Flight & Hotel itinerary generation for visas",
                "Competitive airfare ticketing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80" 
              alt="Passport and tickets" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      <ContactSection />
      
      <Footer />
    </main>
  );
}

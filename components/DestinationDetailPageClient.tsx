"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import ScrollReveal from "@/components/ScrollReveal";
import PlaneOverlay from "@/components/PlaneOverlay";
import { POPULAR_PACKAGES } from "@/lib/packages";
import { getDestinationDetails } from "@/lib/destinationDetails";
import { useLanguage } from "@/components/LanguageContext";
import { FEATURED_DESTINATIONS } from "@/lib/siteData";

type Destination = (typeof FEATURED_DESTINATIONS)[number];

export default function DestinationDetailPageClient({ dest }: { dest: Destination }) {
  const { t, language } = useLanguage();
  const router = useRouter();

  const nameMap: Record<string, string> = {
    umrah: language === "bn" ? "ওমরাহ" : "Umrah",
    malaysia: language === "bn" ? "মালয়েশিয়া" : "Malaysia",
    china: language === "bn" ? "চীন" : "China",
    thailand: language === "bn" ? "থাইল্যান্ড" : "Thailand",
    maldives: language === "bn" ? "মালদ্বীপ" : "Maldives",
  };
  const name = nameMap[dest.slug] || dest.name;

  const details = getDestinationDetails(dest.slug, language);

  const relatedPackages = POPULAR_PACKAGES.filter((p) =>
    p.location.toLowerCase().includes(dest.name.toLowerCase())
  );

  const otherDestinations = FEATURED_DESTINATIONS.filter(
    (d) => d.slug !== dest.slug
  );

  const handleWhatsAppClick = () => {
    const messageText =
      language === "bn"
        ? `আসসালামু আলাইকুম, ইহান ট্যুরস! আমি "${name}" ভ্রমণের বিষয়ে জানতে আগ্রহী। অনুগ্রহ করে বিস্তারিত জানিয়ে সাহায্য করবেন। ধন্যবাদ!`
        : `Hi Ihan Tours! I'm interested in planning a trip to ${name}. Could you share the available packages and next steps? Thank you!`;
    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/8801713224948?text=${encodedText}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader
        title={name}
        subtitle={t("destinationDetailPage.eyebrow")}
        image={dest.image_url}
      />

      <div className="relative w-full flex-grow">
        <PlaneOverlay />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-brand-red transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
              {language === "bn" ? "ফিরে যান" : "Go Back"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-12">
              {details && (
                <ScrollReveal>
                  <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                    <h2 className="text-2xl font-bold font-display text-white mb-4">
                      {language === "bn" ? "সংক্ষিপ্ত পরিচিতি" : "Overview"}
                    </h2>
                    <p className="text-neutral-300 leading-relaxed font-light mb-6">
                      {details.overview}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {details.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red text-xs mt-0.5">✓</span>
                          <span className="text-neutral-300 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                      <span className="text-brand-red text-xl">🗓</span>
                      <div>
                        <span className="text-white font-medium block text-sm">
                          {language === "bn" ? "ভ্রমণের সেরা সময়" : "Best Time to Visit"}
                        </span>
                        <span className="text-xs text-neutral-400 font-light">{details.bestTimeToVisit}</span>
                      </div>
                    </div>
                  </section>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <section>
                  <h2 className="text-2xl font-bold font-display text-white mb-6">
                    {relatedPackages.length > 0
                      ? (language === "bn" ? "সংশ্লিষ্ট প্যাকেজসমূহ" : "Related Packages")
                      : (language === "bn" ? "কাস্টম ভ্রমণ পরিকল্পনা" : "Plan a Custom Trip")}
                  </h2>

                  {relatedPackages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedPackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                      <p className="text-neutral-300 leading-relaxed font-light mb-6">
                        {language === "bn"
                          ? `${name}-এর জন্য এখনো কোনো নির্দিষ্ট প্যাকেজ তৈরি করা হয়নি, তবে আমরা আপনার জন্য একটি কাস্টম ইটিনেরারি তৈরি করতে পারি। হোয়াটসঅ্যাপে যোগাযোগ করুন এবং আমাদের টিম আপনার সাথে বিস্তারিত নিয়ে কথা বলবে।`
                          : `We don't have a fixed package for ${name} listed yet, but we regularly arrange custom trips here. Reach out on WhatsApp and our team will put together an itinerary tailored to you.`}
                      </p>
                      <button
                        onClick={handleWhatsAppClick}
                        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500"
                      >
                        <span>💬</span>
                        {language === "bn" ? "হোয়াটসঅ্যাপে জিজ্ঞাসা করুন" : "Ask on WhatsApp"}
                      </button>
                    </div>
                  )}
                </section>
              </ScrollReveal>
            </div>

            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white font-display">
                  {language === "bn" ? "এই ভ্রমণ নিয়ে আগ্রহী?" : "Interested in this trip?"}
                </h3>
                <p className="text-sm text-neutral-400 font-light">
                  {language === "bn"
                    ? "আমাদের ভ্রমণ বিশেষজ্ঞরা আপনার জন্য সেরা পরিকল্পনা তৈরি করতে প্রস্তুত।"
                    : "Our travel experts can help you plan the perfect trip, from flights to itinerary."}
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500"
                >
                  <span>💬</span>
                  {language === "bn" ? "বুক ভায়া হোয়াটসঅ্যাপ" : "Book via WhatsApp"}
                </button>
              </div>

              {otherDestinations.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                    {language === "bn" ? "অন্যান্য গন্তব্য দেখুন" : "Explore Other Destinations"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {otherDestinations.map((d) => (
                      <Link
                        key={d.slug}
                        href={d.href ?? `/destination/${d.slug}`}
                        className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-brand-red/40 hover:text-brand-red"
                      >
                        {nameMap[d.slug] || d.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

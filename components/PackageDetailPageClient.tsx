"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TravelPackage } from "@/lib/packages";
import { getPackageDetails } from "@/lib/packageDetailsData";
import { useLanguage } from "@/components/LanguageContext";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PlaneOverlay from "@/components/PlaneOverlay";

export default function PackageDetailPageClient({ pkg }: { pkg: TravelPackage }) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [pax, setPax] = useState(pkg.pax_min || 2);
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "accommodation">("itinerary");
  
  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const pkgTrans = t(`popularPackages.${pkg.id}`) || {};
  const title = pkgTrans.title || pkg.title;
  const location = pkgTrans.location || pkg.location;
  const duration = pkgTrans.duration || pkg.duration;
  const price = pkgTrans.price || pkg.price;
  const accommodationType = pkgTrans.accommodation || pkg.accommodation_type;

  const details = getPackageDetails(pkg.id, language);

  const parsePrice = (priceStr: string): number => {
    const clean = priceStr.replace(/[^0-9]/g, "");
    return parseInt(clean) || 0;
  };

  const formatPrice = (num: number): string => {
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      const formatted = num.toLocaleString("bn-BD");
      // convert english digits to bengali digits
      return `৳ ${formatted.replace(/[0-9]/g, (w) => bnDigits[parseInt(w)])}`;
    }
    return `৳ ${num.toLocaleString("en-IN")}`;
  };

  const unitPrice = parsePrice(price);
  const totalPrice = unitPrice * pax;

  const getPaxText = (num: number) => {
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num.toString().replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
    }
    return num.toString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    }, 1200);
  };

  const handleWhatsAppClick = () => {
    const messageText = language === "bn" 
      ? `আসসালামু আলাইকুম, ইহান ট্যুরস! আমি "${title}" প্যাকেজটি বুক করতে আগ্রহী।\n\n` +
        `• গন্তব্য: ${location}\n` +
        `• সময়কাল: ${duration}\n` +
        `• যাত্রী সংখ্যা: ${getPaxText(pax)} জন\n` +
        `• আনুমানিক মোট মূল্য: ${formatPrice(totalPrice)}\n\n` +
        `অনুগ্রহ করে বুকিং প্রক্রিয়া এবং বুকিং সংক্রান্ত পরবর্তী তথ্য দিয়ে সাহায্য করবেন। ধন্যবাদ!`
      : `Hi Ihan Tours! I am interested in booking the "${title}" package.\n\n` +
        `• Destination: ${location}\n` +
        `• Duration: ${duration}\n` +
        `• Passengers: ${pax} Person(s)\n` +
        `• Estimated Total Price: ${formatPrice(totalPrice)}\n\n` +
        `Please let me know the availability and next steps. Thank you!`;
        
    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/8801713224948?text=${encodedText}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <PageHeader 
        title={title} 
        subtitle={location} 
        image={pkg.image.startsWith("/") ? pkg.image : `/${pkg.image}`} 
      />
      
      <div className="relative w-full flex-grow">
        <PlaneOverlay />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
          {/* Back Button */}
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
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Package Overview */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                  {language === "bn" ? "প্যাকেজ পরিচিতি" : "Overview"}
                </h2>
                <p className="text-neutral-300 leading-relaxed font-light mb-6">
                  {details.overview}
                </p>
                
                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {details.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red text-xs mt-0.5">✓</span>
                      <span className="text-neutral-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Detail Tabs */}
              <div className="space-y-6">
                <div className="flex border-b border-white/10">
                  {(["itinerary", "inclusions", "accommodation"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
                        activeTab === tab 
                          ? "border-brand-red text-brand-red" 
                          : "border-transparent text-neutral-400 hover:text-white"
                      }`}
                    >
                      {tab === "itinerary" && (language === "bn" ? "ভ্রমণ পরিকল্পনা" : "Itinerary")}
                      {tab === "inclusions" && (language === "bn" ? "অফারের অন্তর্ভুক্ত" : "Inclusions & Exclusions")}
                      {tab === "accommodation" && (language === "bn" ? "আবাসন তথ্য" : "Accommodation")}
                    </button>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md min-h-[300px]">
                  
                  {/* Tab Content: Itinerary */}
                  {activeTab === "itinerary" && (
                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                      {details.itinerary.map((item) => (
                        <div key={item.day} className="relative pl-10 group">
                          {/* Day Dot */}
                          <div className="absolute left-0 top-0 w-8.5 h-8.5 rounded-full bg-background border-2 border-brand-red flex items-center justify-center text-brand-red text-xs font-bold font-display z-10 transition-transform group-hover:scale-110">
                            {getPaxText(item.day)}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2 font-display">
                              {language === "bn" ? `দিন ${getPaxText(item.day)}: ${item.title}` : `Day ${item.day}: ${item.title}`}
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed font-light">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content: Inclusions & Exclusions */}
                  {activeTab === "inclusions" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-display flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          {language === "bn" ? "প্যাকেজে যা অন্তর্ভুক্ত রয়েছে:" : "What's Included"}
                        </h3>
                        <ul className="space-y-3">
                          {details.inclusions.map((inclusion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300 font-light">
                              <span className="text-green-500 text-lg leading-none mt-0.5">✓</span>
                              <span>{inclusion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-display flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                          {language === "bn" ? "প্যাকেজে যা অন্তর্ভুক্ত নয়:" : "What's Excluded"}
                        </h3>
                        <ul className="space-y-3">
                          {details.exclusions.map((exclusion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300 font-light">
                              <span className="text-brand-red text-lg leading-none mt-0.5">✗</span>
                              <span>{exclusion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Accommodation */}
                  {activeTab === "accommodation" && (
                    <div className="space-y-6">
                      <div className="border border-white/10 rounded-xl p-5 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-brand-red font-semibold mb-1 block">
                            {details.accommodation.type}
                          </span>
                          <h3 className="text-xl font-bold text-white mb-1 font-display">
                            {details.accommodation.name}
                          </h3>
                          <p className="text-neutral-400 text-sm font-light">
                            {details.accommodation.details}
                          </p>
                        </div>
                        <div className="flex-shrink-0 bg-brand-red/10 border border-brand-red/20 px-4 py-2.5 rounded-lg text-center">
                          <span className="text-amber-500 text-lg block">★ ★ ★ ★ ★</span>
                          <span className="text-xs text-neutral-300 font-medium">{details.accommodation.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-400">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-3">
                          <span className="text-brand-red text-xl">☕</span>
                          <div>
                            <span className="text-white font-medium block">{language === "bn" ? "সকালের নাস্তা" : "Breakfast Included"}</span>
                            <span className="text-xs font-light">{language === "bn" ? "প্রতিদিনের সুস্বাদু বুফে নাস্তা" : "Daily buffet style morning meals"}</span>
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-3">
                          <span className="text-brand-red text-xl">🌐</span>
                          <div>
                            <span className="text-white font-medium block">{language === "bn" ? "বিনামূল্যে ওয়াই-ফাই" : "Complimentary Wi-Fi"}</span>
                            <span className="text-xs font-light">{language === "bn" ? "রিসোর্ট/হোটেল জুড়ে হাই-স্পিড নেটওয়ার্ক" : "Stay connected in rooms & lobby"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Right Booking Sidebar */}
            <div className="lg:sticky lg:top-28 space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md space-y-6">
                
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-1 block">
                    {language === "bn" ? "প্রতি জন প্যাকেজ মূল্য" : "Price Per Person"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-brand-red font-display">{price}</span>
                  </div>
                </div>

                <hr className="border-white/10" />

                {/* Pax Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-neutral-300 block">
                    {language === "bn" ? "যাত্রী সংখ্যা:" : "Select Passengers:"}
                  </label>
                  <div className="flex items-center justify-between border border-white/10 bg-black/40 rounded-xl p-2">
                    <button
                      type="button"
                      onClick={() => setPax((p) => Math.max(pkg.pax_min || 1, p - 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-brand-red hover:text-white flex items-center justify-center text-lg font-bold text-white transition-colors"
                      disabled={pax <= (pkg.pax_min || 1)}
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-white font-display">
                      {getPaxText(pax)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPax((p) => Math.min(pkg.pax_max || 40, p + 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-brand-red hover:text-white flex items-center justify-center text-lg font-bold text-white transition-colors"
                      disabled={pax >= (pkg.pax_max || 40)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-neutral-400 block text-right font-light">
                    {language === "bn" 
                      ? `নূন্যতম যাত্রী: ${getPaxText(pkg.pax_min || 1)} জন | সর্বোচ্চ: ${getPaxText(pkg.pax_max || 40)} জন`
                      : `Min Pax: ${pkg.pax_min || 1} | Max Pax: ${pkg.pax_max || 40}`
                    }
                  </span>
                </div>

                <hr className="border-white/10" />

                {/* Total Price Display */}
                <div className="flex justify-between items-center bg-brand-red/5 border border-brand-red/20 rounded-xl p-4">
                  <span className="text-sm font-medium text-neutral-300">
                    {language === "bn" ? "সর্বমোট মূল্য (আনুমানিক):" : "Estimated Total:"}
                  </span>
                  <span className="text-2xl font-bold text-brand-red font-display">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* WhatsApp Action */}
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/10 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.022-.079-.186-.23-.418-.345-.233-.115-1.375-.678-1.587-.756-.213-.078-.369-.115-.525.115-.156.23-.604.756-.74.912-.136.156-.271.176-.504.06-2.337-1.163-4.148-3.419-5.183-5.228-.27-.47-.074-.725.163-.96.216-.214.47-.549.704-.824.23-.275.31-.47.46-.78.15-.312.075-.584-.038-.813-.112-.228-.905-2.203-1.242-3.012-.328-.79-.661-.683-.905-.695-.232-.012-.497-.014-.763-.014-.266 0-.698.1-1.063.498-.366.398-1.398 1.365-1.398 3.329 0 1.963 1.43 3.854 1.63 4.12 1.963 2.668 4.29 4.07 6.727 4.908.647.222 1.233.242 1.696.172.518-.08 1.587-.648 1.81-1.272.223-.624.223-1.157.156-1.272zM12 .007c-6.627 0-12 5.373-12 12a11.96 11.96 0 0 0 3.23 8.358l-2.076 6.066 6.305-2.008a11.963 11.963 0 0 0 5.541 1.584c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
                  {language === "bn" ? "হোয়াটসঅ্যাপে বুক করুন" : "Book via WhatsApp"}
                </button>

                {/* Form Trigger Title */}
                <div className="pt-2 text-center text-xs text-neutral-400 font-light">
                  {language === "bn" ? "অথবা নিচে ইনকোয়ারি ফর্ম পূরণ করুন:" : "Or submit an inquiry below:"}
                </div>

                {/* Lead Collection Form */}
                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-950/20 border border-green-800/30 rounded-xl p-5 text-center text-green-400 text-sm space-y-2 font-medium"
                  >
                    <div>✓ {language === "bn" ? "ইনকোয়ারি সফলভাবে পাঠানো হয়েছে!" : "Inquiry Sent Successfully!"}</div>
                    <div className="text-xs text-neutral-400 font-light">
                      {language === "bn" ? "আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।" : "Our travel experts will contact you within 24 hours."}
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={language === "bn" ? "আপনার নাম" : "Your Name"}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder={language === "bn" ? "মোবাইল নম্বর" : "Phone Number"}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder={language === "bn" ? "ইমেইল (ঐচ্ছিক)" : "Email Address (Optional)"}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red text-sm text-neutral-300"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder={language === "bn" ? "বার্তা বা মন্তব্য..." : "Special requests or messages..."}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red text-sm resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl border border-brand-red/30 hover:border-brand-red hover:bg-brand-red/10 text-brand-red hover:text-white font-bold transition-all text-sm uppercase tracking-wider disabled:opacity-50"
                    >
                      {isSubmitting 
                        ? (language === "bn" ? "পাঠানো হচ্ছে..." : "Submitting...") 
                        : (language === "bn" ? "ইনকোয়ারি সাবমিট করুন" : "Send Inquiry")
                      }
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

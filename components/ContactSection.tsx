"use client";

import { useLanguage } from "@/components/LanguageContext";
import { SITE_SETTINGS, WHATSAPP_NUMBERS } from "@/lib/siteData";
import { useState } from "react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ status: "idle" });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const { t, language } = useLanguage();

  const getServiceLabel = (val: string) => {
    if (val === "umrah") return t("contactSection.umrah_pkg");
    if (val === "tour") return t("contactSection.holiday_tour");
    if (val === "visa") return t("contactSection.visa_proc");
    if (val === "ticket") return t("contactSection.air_ticketing");
    return language === "bn" ? "সাধারণ জিজ্ঞাসা" : "General Inquiry";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormState({ status: "submitting" });

    const serviceLabel = getServiceLabel(formData.service);
    const whatsappMsg = language === "bn"
      ? `হ্যালো ইহান ট্যুরস অ্যান্ড ট্রাভেলস,

আমি আপনাদের ওয়েবসাইট থেকে একটি যোগাযোগের অনুরোধ পাঠাচ্ছি:
• নাম: ${formData.name}
• হোয়াটসঅ্যাপ নম্বর: ${formData.phone}
• ইমেইল: ${formData.email}
• আগ্রহী সেবা: ${serviceLabel}
• বার্তা: ${formData.message}`
      : `Hello Ihan Tours and Travels,

I am sending an inquiry from your website contact form:
• Name: ${formData.name}
• WhatsApp Number: ${formData.phone}
• Email: ${formData.email}
• Interested Service: ${serviceLabel}
• Message: ${formData.message}`;

    // Get phone number based on service context
    let context = "visa";
    if (formData.service === "umrah") context = "umrah";
    else if (formData.service === "tour") context = "package";

    const contact = WHATSAPP_NUMBERS.find(n => n.context === context) || WHATSAPP_NUMBERS[0];
    const cleanNumber = contact.number.replace(/\D/g, ""); // strip all non-digits

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Simulate successful form submission locally
    setTimeout(() => {
      setFormState({ status: "success" });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      setTimeout(() => setFormState({ status: "idle" }), 5000);
    }, 1000);
  };

  const getWhatsAppLabel = (context: string) => {
    switch (context) {
      case "umrah":
        return language === "bn" ? "ওমরাহ ও হজ" : "Umrah & Hajj";
      case "package":
        return language === "bn" ? "ছুটির প্যাকেজসমূহ" : "Holiday Packages";
      case "visa":
        return language === "bn" ? "ভিসা ও টিকেটিং" : "Visa & Ticketing";
      default:
        return "";
    }
  };

  const getWhatsAppNumberStr = (num: string) => {
    if (language === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return num.replace(/[0-9]/g, (w) => bnDigits[parseInt(w)]);
    }
    return num;
  };

  return (
    <section
      id="contact"
      className="bg-background py-16 md:py-24 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-red text-xs uppercase tracking-superwide font-medium mb-4 block">
            {t("contactSection.have_questions")}
          </span>
          <h2
            className="text-3xl md:text-5xl font-display font-bold text-white mb-4"
            dangerouslySetInnerHTML={{
              __html: t("contactSection.plan_departure"),
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              {t("contactSection.reach_out")}
            </h3>
            <p className="text-neutral-400 font-light mb-10 text-sm">
              {t("contactSection.description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {WHATSAPP_NUMBERS.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white/5 border border-white/10 p-5 rounded-xl hover:border-brand-red/30 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                    {getWhatsAppLabel(contact.context)}
                  </span>
                  <a
                    href={`https://wa.me/${contact.number.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-medium hover:text-brand-red transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-brand-red"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {getWhatsAppNumberStr(contact.number)}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <svg
                  className="w-5 h-5 text-brand-red shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    {t("contactSection.email_us")}
                  </h4>
                  <a
                    href={`mailto:${SITE_SETTINGS.email}`}
                    className="text-neutral-400 font-light hover:text-white transition-colors"
                  >
                    {SITE_SETTINGS.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <svg
                  className="w-5 h-5 text-brand-red shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    {t("contactSection.office_address")}
                  </h4>
                  <p className="text-neutral-400 font-light">
                    {t("footer.address_val")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6">
              {t("contactSection.send_message")}
            </h3>

            {formState.status === "success" ? (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="text-white text-xl font-bold mb-2">
                  {t("contactSection.msg_sent")}
                </h4>
                <p className="text-neutral-400 text-sm">
                  {t("contactSection.msg_success_desc")}
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                  {t("contactSection.full_name")}
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                    {t("contactSection.whatsapp_number")}
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="+880..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                    {t("contactSection.email_address")}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                  {t("contactSection.interested_service")}
                </label>
                <select
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors appearance-none"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                >
                  <option value="">{t("contactSection.select_service")}</option>
                  <option value="umrah">{t("contactSection.umrah_pkg")}</option>
                  <option value="tour">
                    {t("contactSection.holiday_tour")}
                  </option>
                  <option value="visa">{t("contactSection.visa_proc")}</option>
                  <option value="ticket">
                    {t("contactSection.air_ticketing")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                  {t("contactSection.your_message")}
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
                  placeholder={t("contactSection.message_placeholder")}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState.status === "submitting"}
                className="w-full bg-brand-red text-white font-medium py-3 rounded-lg hover:bg-brand-redDark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {formState.status === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("contactSection.sending")}
                  </>
                ) : (
                  <>
                    {t("contactSection.send_msg_btn")}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

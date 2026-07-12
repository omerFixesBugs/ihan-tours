"use client";

import { useLanguage } from "@/components/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function PlaneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

const EMPTY_FORM = { name: "", email: "", phone: "", destination: "" };

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const { t } = useLanguage();

  const handleClose = () => {
    setIsOpen(false);
    // Reset after exit animation completes
    setTimeout(() => {
      setFormData(EMPTY_FORM);
      setFormStatus("idle");
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setFormStatus("submitting");
    console.log("Form submitted:", formData);
    // Fake API call
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        handleClose();
      }, 2500);
    }, 1200);
  };

  const set =
    (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-[60] flex justify-center md:bottom-10">
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group flex items-center gap-1.5 overflow-hidden rounded-full bg-black/40 p-1.5 backdrop-blur-md"
        >
          <span className="relative flex overflow-hidden rounded-full bg-white">
            <span className="block px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out group-hover:-translate-y-full md:px-7 md:py-3 md:text-base">
              {t("common.book_tour")}
            </span>
            <span className="absolute inset-0 flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 md:px-7 md:py-3 md:text-base">
              {t("common.book_tour")}
            </span>
          </span>
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-neutral-900 md:h-12 md:w-12">
            <span className="transition-transform duration-500 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
              <PlaneIcon />
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-neutral-900 transition-transform duration-500 ease-in-out -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0">
              <PlaneIcon />
            </span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end p-3 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleClose}
            />

            <div className="relative w-full max-w-[1400px] pb-6 md:pb-10">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={handleClose}
                className="absolute -top-12 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full rounded-[1.5rem] bg-white shadow-2xl overflow-hidden md:rounded-[2rem]"
              >
                {/* Success Overlay */}
                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white p-8 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                        <svg
                          className="h-7 w-7 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900">
                        Request Received!
                      </h3>
                      <p className="text-sm text-neutral-500 max-w-xs">
                        Thank you,{" "}
                        <span className="font-medium text-neutral-800">
                          {formData.name || "traveler"}
                        </span>
                        . Our team will reach out to you shortly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 p-5 md:flex-row md:items-start md:gap-0 md:p-10"
                >
                  {/* Title */}
                  <div className="flex shrink-0 items-center md:w-[220px]">
                    <h2 className="font-sans text-2xl font-medium tracking-tight text-neutral-900 md:text-5xl">
                      {t("common.contact_us")}
                    </h2>
                  </div>

                  {/* Fields + Checkbox wrapper */}
                  <div className="flex flex-col gap-5 w-full">
                    {/* 4 input fields — stacked on mobile, row on desktop */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-0">
                      {/* NAME */}
                      <div className="flex flex-col gap-1 md:border-l md:border-neutral-200 md:pl-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={set("name")}
                          placeholder="e.g. Ahmed Hossain"
                          className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="flex flex-col gap-1 md:border-l md:border-neutral-200 md:pl-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={set("email")}
                          placeholder="e.g. ahmed@company.com"
                          className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
                        />
                      </div>

                      {/* PHONE */}
                      <div className="flex flex-col gap-1 md:border-l md:border-neutral-200 md:pl-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={set("phone")}
                          placeholder="e.g. +880 17XX XXX XXX"
                          className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
                        />
                      </div>

                      {/* DESTINATION + Submit */}
                      <div className="flex flex-col gap-1 md:border-l md:border-neutral-200 md:pl-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                          Destination / Service
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            required
                            value={formData.destination}
                            onChange={set("destination")}
                            placeholder="e.g. Malaysia, Umrah, Visa..."
                            className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={formStatus === "submitting"}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2a2522] text-white transition-transform hover:scale-105 disabled:opacity-60"
                          >
                            {formStatus === "submitting" ? (
                              <svg
                                className="h-4 w-4 animate-spin"
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
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            ) : (
                              <PlaneIcon />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Checkbox — always at bottom-left, never floating */}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="privacy-cta"
                        required
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                      />
                      <label
                        htmlFor="privacy-cta"
                        className="text-[9px] font-semibold uppercase leading-tight tracking-wider text-neutral-400"
                      >
                        By submitting, I agree to the Privacy Policy.
                      </label>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-[60] flex justify-center md:bottom-10">
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group flex items-center gap-1.5 overflow-hidden rounded-full bg-black/40 p-1.5 backdrop-blur-md"
        >
          <span className="relative flex overflow-hidden rounded-full bg-white">
            <span className="block px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out group-hover:-translate-y-full md:px-7 md:py-3 md:text-base">
              Book Your Tour
            </span>
            <span className="absolute inset-0 flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 md:px-7 md:py-3 md:text-base">
              Book Your Tour
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
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="relative w-[95vw] max-w-[1400px] pb-6 md:pb-10">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
              >
                <CloseIcon />
              </motion.button>
              
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-h-[85vh] overflow-y-auto rounded-[1.5rem] bg-white p-6 shadow-2xl md:max-h-none md:overflow-visible md:rounded-[2rem] md:p-10"
              >
                <form className="flex flex-col gap-6 md:flex-row md:items-start md:gap-0" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                  <div className="flex shrink-0 items-center md:w-[220px]">
                    <h2 className="font-sans text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
                      Contact
                    </h2>
                  </div>

                  <div className="flex w-full flex-col gap-4 md:flex-row md:gap-0">
                    {/* NAME */}
                    <div className="flex-1 md:border-l md:border-neutral-200 md:pl-6">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                        Name
                      </label>
                      <input type="text" placeholder="Type..." className="w-full bg-transparent text-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none" required />
                      <div className="mt-4 flex items-center gap-2 md:mt-8">
                        <input type="checkbox" id="privacy" className="h-3.5 w-3.5 rounded-full border-neutral-300 text-neutral-900 focus:ring-neutral-900" required />
                        <label htmlFor="privacy" className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
                          By submitting, you agree<br className="hidden md:block" />to our <span className="underline">Privacy Policy</span>
                        </label>
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="flex-1 md:border-l md:border-neutral-200 md:pl-6">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                        Email
                      </label>
                      <input type="email" placeholder="Email..." className="w-full bg-transparent text-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none" required />
                    </div>

                    {/* PHONE */}
                    <div className="flex-1 md:border-l md:border-neutral-200 md:pl-6">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                        Phone
                      </label>
                      <input type="tel" placeholder="Phone..." className="w-full bg-transparent text-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none" />
                    </div>

                    {/* DESTINATION */}
                    <div className="flex-1 md:border-l md:border-neutral-200 md:pl-6">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                        Destination
                      </label>
                      <div className="flex items-center gap-4">
                        <input type="text" placeholder="City, Country..." className="w-full bg-transparent text-lg text-neutral-900 placeholder:text-neutral-300 focus:outline-none" required />
                        <button type="submit" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2a2522] text-white transition-transform hover:scale-105">
                          <PlaneIcon />
                        </button>
                      </div>
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

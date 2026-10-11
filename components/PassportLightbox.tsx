"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PassportItem } from "@/lib/passports";

interface PassportLightboxProps {
  items: PassportItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export default function PassportLightbox({ items, index, onChange }: PassportLightboxProps) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, items.length, onChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => onChange(null)}
        >
          <motion.img
            key={item.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={item.src}
            alt={item.name ?? "Passport"}
            className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            aria-label="Close"
            onClick={() => onChange(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-brand-red"
          >
            ×
          </button>
          {items.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(((index ?? 0) - 1 + items.length) % items.length);
                }}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-brand-red md:left-6"
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(((index ?? 0) + 1) % items.length);
                }}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-brand-red md:right-6"
              >
                ›
              </button>
            </>
          )}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest text-neutral-400">
            {(index ?? 0) + 1} / {items.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

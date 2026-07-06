"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  progress: number;
  visible: boolean;
}

export default function Loader({ progress, visible }: LoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <span className="mb-8 text-xs uppercase tracking-ultra text-gold-400">
            Ihan Tours
          </span>
          <h1 className="mb-12 text-3xl font-light uppercase tracking-wide text-foreground md:text-5xl">
            Curated Journeys
          </h1>
          <div className="h-px w-48 overflow-hidden bg-neutral-800">
            <motion.div
              className="h-full bg-gold-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="mt-4 text-xs font-light tracking-superwide text-neutral-500">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

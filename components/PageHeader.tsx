"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
}

export default function PageHeader({ title, subtitle, image, video }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.6, 0.2, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useTransform(blurAmount, (b) => `blur(${b}px)`);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[80vh] md:h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-background">
      {video ? (
        <>
          <motion.video 
            style={{ y, scale, opacity, filter }}
            src={video} 
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover origin-center" 
          />
          {/* Deep gradient to blend into the dark background of the pages */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </>
      ) : image ? (
        <>
          <motion.img 
            style={{ y, scale, opacity, filter }}
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover origin-center" 
          />
          {/* Deep gradient to blend into the dark background of the pages */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
      )}
      
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 text-center"
      >
        {subtitle && (
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-brand-red text-sm md:text-base uppercase tracking-superwide font-semibold mb-6 block"
          >
            {subtitle}
          </motion.span>
        )}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight drop-shadow-2xl"
        >
          {title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="mx-auto h-1 w-32 bg-brand-red/80 origin-center rounded-full" 
        />
      </motion.div>
    </div>
  );
}

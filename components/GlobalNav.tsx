"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { WHATSAPP_NUMBERS } from "@/lib/siteData";
import { useLanguage } from "@/components/LanguageContext";

export default function GlobalNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handler = (e: any) => setTheme(e.detail);
    window.addEventListener("nav-theme-change", handler);
    return () => window.removeEventListener("nav-theme-change", handler);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setTheme("dark");
    }
  }, [pathname]);

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (language !== "bn") {
      setIsFlipped(false);
      return;
    }

    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [language]);

  const isLight = theme === "light";

  const navLinks = [
    { name: t("nav.umrah"), path: "/umrah" },
    { name: t("nav.packages"), path: "/packages" },
    { name: t("nav.inbound"), path: "/inbound" },
    { name: t("nav.visa"), path: "/visa" },
    { name: t("nav.about_us"), path: "/about-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 md:h-24 items-center justify-between px-6 md:px-12 transition-colors duration-500">
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      ` }} />
      <Link href="/" className="flex items-center gap-2 perspective-1000">
        <div 
          className={`relative w-[280px] h-[76px] transition-transform duration-700 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Face: Logo */}
          <div className="absolute inset-0 w-full pt-10 h-full backface-hidden flex items-center">
            <img 
              src="/logo/Logo.png" 
              alt="Ihan Tours" 
              className={`h-[68px] w-auto object-contain transition-all scale-[3.5] transform origin-left -ml-9 ${
                isLight ? "brightness-0" : ""
              }`} 
            />
          </div>

          {/* Back Face: Bengali Text */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-start">
            <span className={`font-display text-2xl md:text-3xl font-bold uppercase tracking-normal transition-colors ${
              isLight ? "text-black hover:text-brand-red" : "text-white hover:text-brand-red"
            }`}>
              {t("nav.brand")}
            </span>
          </div>
        </div>
      </Link>
      
      <ul className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`group relative inline-block overflow-hidden rounded-full px-4 py-2 text-[11px] md:text-xs font-medium uppercase tracking-widest transition-colors ${
                  isActive ? "text-brand-red" : isLight ? "text-black" : "text-white"
                }`}
              >
                <span className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${
                  isLight ? "bg-black/10" : "bg-white/20"
                }`}></span>
                <span className="relative z-10 block overflow-hidden">
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{link.name}</span>
                  <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">{link.name}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Language Switcher */}
        <div className={`flex items-center gap-0.5 border rounded-full px-0.5 py-0.5 transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isLight ? "border-black/20 text-black" : "border-white/20 text-white"}`}>
          <button 
            onClick={() => setLanguage("en")} 
            className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full transition-all ${
              language === "en" 
                ? "bg-brand-red text-white" 
                : "hover:bg-white/10"
            }`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage("bn")} 
            className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full transition-all ${
              language === "bn" 
                ? "bg-brand-red text-white" 
                : "hover:bg-white/10"
            }`}
          >
            বাং
          </button>
        </div>

        {/* Chat Button */}
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBERS[0].number.replace(/\+/g, '')}`} 
          target="_blank" 
          rel="noreferrer"
          className={`text-[11px] font-medium uppercase tracking-widest border px-4 py-2 rounded-full hover:bg-brand-red hover:border-brand-red hover:text-white transition-all flex items-center gap-2 ${isLight ? "text-black border-black/20" : "text-white border-white/20"}`}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {t("nav.chat")}
        </a>
      </div>
    </nav>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { WHATSAPP_NUMBERS } from "@/lib/siteData";

const NAV_LINKS = ["Umrah", "Packages", "Inbound", "Visa", "About Us"];

export default function GlobalNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handler = (e: any) => setTheme(e.detail);
    window.addEventListener("nav-theme-change", handler);
    return () => window.removeEventListener("nav-theme-change", handler);
  }, []);

  const isLight = theme === "light";

  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 md:h-24 items-center justify-between px-6 md:px-12 transition-colors duration-500">
      <Link href="/" className="flex items-center gap-2">
        <span className={`font-display text-lg font-bold uppercase tracking-widest transition-colors ${isLight ? "text-black hover:text-brand-red" : "text-white hover:text-brand-red"}`}>
          Ihan Tours
        </span>
      </Link>
      
      <ul className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => {
          const path = `/${link.toLowerCase().replace(" ", "-")}`;
          const isActive = pathname === path;
          return (
            <li key={link}>
              <Link
                href={path}
                className={`group relative inline-block overflow-hidden rounded-full px-4 py-2 text-[11px] md:text-xs font-medium uppercase tracking-widest transition-colors ${
                  isActive ? "text-brand-red" : isLight ? "text-black" : "text-white"
                }`}
              >
                <span className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${
                  isLight ? "bg-black/10" : "bg-white/20"
                }`}></span>
                <span className="relative z-10 block overflow-hidden">
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{link}</span>
                  <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">{link}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:flex items-center gap-4">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBERS[0].number.replace(/\+/g, '')}`} 
          target="_blank" 
          rel="noreferrer"
          className={`text-[11px] font-medium uppercase tracking-widest border px-4 py-2 rounded-full hover:bg-brand-red hover:border-brand-red hover:text-white transition-all flex items-center gap-2 ${isLight ? "text-black border-black/20" : "text-white border-white/20"}`}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat
        </a>
      </div>
    </nav>
  );
}

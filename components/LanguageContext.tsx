"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "bn";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved === "en" || saved === "bn") {
      setLanguageState(saved);
      document.documentElement.setAttribute("lang", saved);
    } else {
      document.documentElement.setAttribute("lang", "en");
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
    document.documentElement.setAttribute("lang", lang);
  };

  // Safe key path lookup translation helper, e.g., t("footer.get_in_touch")
  const t = (key: string): any => {
    const keys = key.split(".");
    let currentObj: any = translations[language];

    for (const k of keys) {
      if (currentObj && typeof currentObj === "object" && k in currentObj) {
        currentObj = currentObj[k];
      } else {
        // Fallback to English if key not found in the selected language dictionary
        let fallbackObj: any = translations["en"];
        for (const fk of keys) {
          if (fallbackObj && typeof fallbackObj === "object" && fk in fallbackObj) {
            fallbackObj = fallbackObj[fk];
          } else {
            return key; // return key as final fallback
          }
        }
        return fallbackObj;
      }
    }
    return currentObj;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

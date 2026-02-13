"use client"
import React, { createContext, useContext, useState } from "react"
import { content, LanguageCode } from "../lib/translations"


interface LanguageContextType {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: (key: keyof typeof content.EN) => string; // Force it to expect any string
}


const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: () => "" 
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>("EN")


  const t = (key: keyof typeof content.EN): string => {
    return (content[lang] as any)[key] || (content.EN as any)[key] || "";
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
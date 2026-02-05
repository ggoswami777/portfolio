"use client"
import React, { createContext, useContext, useState } from "react"
import { content, LanguageCode } from "../lib/translations"

const LanguageContext = createContext({
  lang: "EN" as LanguageCode,
  setLang: (l: LanguageCode) => {},
  t: (key: keyof typeof content.EN) => ""
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>("EN")

  // This 't' function gets the translation for a key
  const t = (key: keyof typeof content.EN) => content[lang][key] || content.EN[key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
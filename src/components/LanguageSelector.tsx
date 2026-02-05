"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react' 

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "EN", name: "English" },
  { code: "HI", name: "हिन्दी" },
  { code: "ES", name: "Español" },
  { code: "JA", name: "日本語" },
  { code: "RU", name: "Русский" },
  { code: "KO", name: "한국어" },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  // FIXED: Added 'as Language' to remove the TypeScript red line
  const [selected, setSelected] = useState<Language>(languages[0] as Language)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative font-sn" ref={containerRef} style={{ zIndex: 9999 }}>
     <button
  type="button"
  onClick={() => setIsOpen(!isOpen)}
  className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-app-accent bg-app-bg hover:bg-app-accent transition-all cursor-pointer min-w-[90px] justify-between focus:outline-none select-none
    ${isOpen ? "pointer-events-none" : ""}`}
>

        <span className="text-sm font-bold tracking-tighter">{selected.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            // absolute z-index ensures it floats over the dashed guides
            className="absolute right-0 bg-bg-primary top-full mt-2 z-[10000] w-48 py-2 rounded-lg border border-app-accent bg-app-bg shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  // onPointerDown fires the INSTANT the mouse touches the button
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelected(lang);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors group text-left"
                >
                  <div className="flex items-center gap-4 pointer-events-none">
                    <span className="font-bold text-[10px] opacity-40 group-hover:opacity-100 min-w-[20px]">
                      {lang.code}
                    </span>
                    <span className={`${selected.code === lang.code ? 'font-bold' : 'font-normal'}`}>
                      {lang.name}
                    </span>
                  </div>
                  {selected.code === lang.code && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
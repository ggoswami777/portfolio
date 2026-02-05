"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react' 
import { useLanguage } from './LanguageContext'
import { cn } from '../lib/utils'

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
  const { lang: currentLang, setLang } = useLanguage() 
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = languages.find(l => l.code === currentLang) || languages[0]

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
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all cursor-pointer min-w-[90px] justify-between focus:outline-none select-none",
          // Uses your theme variables
          "border border-[color:var(--color-border-dashed)]",
          "bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-primary)]",
          "hover:bg-[color:var(--color-text-primary)]/[0.05]",
          isOpen && "pointer-events-none opacity-50"
        )}
      >
        <span className="text-sm font-bold tracking-tighter">{selected.code}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen ? 'rotate-180' : '')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={cn(
              "absolute right-0 top-full mt-2 z-[10000] w-48 py-2 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl",
              // The dropdown now uses your background and border variables
              "bg-[color:var(--color-bg-primary)]/90 border border-[color:var(--color-border-dashed)]"
            )}
          >
            <div className="flex flex-col">
              {languages.map((l) => (
                <div
                  key={l.code}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setLang(l.code as any);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors group text-left",
                    "text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-text-primary)]/[0.08]"
                  )}
                >
                  <div className="flex items-center gap-4 pointer-events-none">
                    <span className="font-bold text-[10px] opacity-40 group-hover:opacity-100 min-w-[20px]">
                      {l.code}
                    </span>
                    <span className={cn(selected.code === l.code ? 'font-bold' : 'font-normal')}>
                      {l.name}
                    </span>
                  </div>
                  {selected.code === l.code && <Check className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
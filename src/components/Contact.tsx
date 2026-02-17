"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileText } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export const Contact = () => {
    const {t}=useLanguage();
  return (
    <section id="contact" className="py-24 px-4 w-full relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        
        
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-[var(--color-text-primary)] tracking-tight"
        >
          {t("Connect")}
        </motion.h2>

       
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-14"
        >
          <p className="text-base md:text-xl opacity-60 text-[var(--color-text-primary)] leading-relaxed max-w-xl">
           {t("ConnectTitle")}
          </p>
          <p className="text-lg md:text-xl font-medium text-[var(--color-text-primary)] opacity-90">
           {t("ConnectSubTitle")}
          </p>
        </motion.div>

        <div className="flex flex-row gap-4 md:gap-8 items-center justify-center mb-16 w-full max-w-md px-2">
          
          <ContactButton 
            icon={<Calendar size={18} />} 
            label={t("BookCall")} 
          />

          <ContactButton 
            icon={<FileText size={18} />} 
            label={t("Resume")}
          />

        </div>

    
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-[1px] bg-[var(--color-text-primary)] opacity-20" />
          <p className="text-[11px] uppercase italic opacity-40 text-[var(--color-text-primary)] tracking-[0.3em]">
            Every vision deserves reality
          </p>
        </motion.div>
      </div>
    </section>
  )
}


const ContactButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="animated-border-container flex-1 min-w-[140px]">
    <button className="
      inner-content 
      group 
      relative 
      w-full 
      py-3 
      px-4 
      md:px-8 
      flex 
      items-center 
      justify-center 
      gap-2 
      transition-all 
      duration-500
      hover:bg-white 
      hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
    ">
   
      <span className="text-[var(--color-text-primary)] group-hover:text-black transition-colors duration-300">
        {icon}
      </span>
      <span className="text-[var(--color-text-primary)] group-hover:text-black font-semibold text-xs md:text-sm whitespace-nowrap transition-colors duration-300">
        {label}
      </span>
    </button>
  </div>
)
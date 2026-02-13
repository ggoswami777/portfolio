"use client"

import React from "react"
import { Github } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export const StatusCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-row flex-nowrap justify-center gap-2 sm:gap-4 mt-8 px-2 w-full">
      
   
      <div className="group flex items-center gap-2 sm:gap-4 px-2.5 py-2 sm:px-5 sm:py-3 rounded-xl border border-white/10 
                      bg-text-primary/[0.05] backdrop-blur-xl 
                      transition-all duration-300 w-1/2 sm:w-fit sm:min-w-[220px] cursor-pointer
                      hover:-translate-y-1 hover:bg-text-primary/10 hover:border-white/20
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden">
                      
        <div className="p-1.5 sm:p-2 bg-text-primary/5 rounded-lg group-hover:bg-text-primary/10 transition-colors shrink-0">
          <Github className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
        </div>
        
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.1em] opacity-40 whitespace-nowrap">
            {t("building")}
          </span>
          <div className="relative flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee sm:animate-none flex">
              <span className="text-xs sm:text-sm font-semibold tracking-tight pr-4">
                Codemeet
              </span>
      
              <span className="text-xs sm:text-sm font-semibold tracking-tight pr-4 sm:hidden">
                Codemeet
              </span>
            </div>
          </div>
        </div>
      </div>

    
      <div className="group flex items-center gap-2 sm:gap-4 px-2.5 py-2 sm:px-5 sm:py-3 rounded-xl border border-white/10 
                      bg-text-primary/[0.05] backdrop-blur-xl 
                      transition-all duration-300 w-1/2 sm:w-fit sm:min-w-[220px] cursor-pointer
                      hover:-translate-y-1 hover:bg-text-primary/10 hover:border-white/20
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden">
                      
        <div className="relative shrink-0">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg overflow-hidden bg-text-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity object-cover" 
                 src="https://i.scdn.co/image/ab67616d0000b2734cb6d231300bad26b77fa85e" alt="Spotify" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-bg-primary animate-pulse" />
        </div>

        <div className="flex flex-col min-w-0 overflow-hidden">
          <div className="relative flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee sm:animate-none flex">
              <span className="text-xs sm:text-sm font-bold tracking-tight group-hover:text-green-500 transition-colors pr-4">
                Man in the Mirror
              </span>
             
              <span className="text-xs sm:text-sm font-bold tracking-tight group-hover:text-green-500 transition-colors pr-4 sm:hidden">
                Man in the Mirror
              </span>
            </div>
          </div>
          <span className="text-[8px] sm:text-[10px] opacity-40 font-medium uppercase tracking-wider truncate">
            Dave East • {t("spotify")}
          </span>
        </div>
      </div>
    </div>
  )
}
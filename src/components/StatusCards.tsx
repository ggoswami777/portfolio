"use client"

import React from "react"
import { Github, Music } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export const StatusCards = () => {
  const {t}=useLanguage();
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {/* GitHub Card */}
      <div className="group flex items-center gap-4 px-5 py-3 rounded-xl border border-white/10 
                      bg-text-primary/[0.05] backdrop-blur-xl 
                      transition-all duration-300 w-fit min-w-[220px] cursor-pointer
                      
                      /* Hover Effects: Lift + Dynamic Glow */
                      hover:-translate-y-1 hover:bg-text-primary/10 hover:border-white/20
                      /* Dark theme: white glow | Light theme: black glow */
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] 
                      dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                      light:hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                      
        <div className="p-2 bg-text-primary/5 rounded-lg group-hover:bg-text-primary/10 transition-colors">
          <Github className="w-5 h-5 opacity-80" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-40 group-hover:opacity-70 transition-opacity">
            {t("building")}
          </span>
          <span className="text-sm font-semibold tracking-tight">Codemeet</span>
        </div>
      </div>

      {/* Spotify Card */}
      <div className="group flex items-center gap-4 px-5 py-3 rounded-xl border border-white/10 
                      bg-text-primary/[0.05] backdrop-blur-xl 
                      transition-all duration-300 w-fit min-w-[220px] cursor-pointer
                      
                      /* Hover Effects: Lift + Dynamic Glow */
                      hover:-translate-y-1 hover:bg-text-primary/10 hover:border-white/20
                      /* Adjust shadow color based on your theme preference */
                      hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] 
                      dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                      light:hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                      
        <div className="relative">
          <div className="h-10 w-10 rounded-lg overflow-hidden bg-text-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img className="w-full h-full opacity-40 group-hover:opacity-80 transition-opacity" src="https://i.scdn.co/image/ab67616d0000b2734cb6d231300bad26b77fa85e" alt="" />
           
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-primary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight group-hover:text-green-500 transition-colors">
            Man in the Mirror
          </span>
          <span className="text-[10px] opacity-40 font-medium uppercase tracking-wider">
            Dave East • {t("spotify")}
          </span>
        </div>
      </div>
    </div>
  )
}
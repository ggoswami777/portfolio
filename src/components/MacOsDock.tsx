"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider" // Import your hook
import { cn } from "../lib/utils"
import { 
  Home, 
  Code2, 
  Layers, 
  Mail, 
  Github, 
  Linkedin, 
  SunMoon 
} from "lucide-react"
import { useLanguage } from "./LanguageContext"

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
)

const MacOSDock = ({ onAppClick }: { onAppClick: (id: string) => void }) => {
  const { theme, setTheme } = useTheme() // Access theme state
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  
  const baseIconSize = 38
  const baseSpacing = 16
  const maxScale = 2.0 
  const effectWidth = 180

  useEffect(() => {
    const handleActivity = () => {
      if (window.scrollY > 20) setIsVisible(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    window.addEventListener("scroll", handleActivity)
    window.addEventListener("mousemove", handleActivity)
    return () => {
      window.removeEventListener("scroll", handleActivity)
      window.removeEventListener("mousemove", handleActivity)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
  const {t}=useLanguage();
  const home=t("home");
  const projects=t("projects");
  const stack=t("stack");
  const contact=t("contact");
  const themes=t("theme");
  const apps = [
    { id: "home", name:home, icon: <Home size={19} />, url: "#" },
    { id: "projects", name:projects, icon: <Code2 size={19} />, url: "#projects" },
    { id: "stack", name:stack, icon: <Layers size={19} />, url: "#stack" },
    { id: "contact", name:contact, icon: <Mail size={19} />,  },
    { id: "divider", name: "divider", icon: null }, 
    { id: "github", name: "GitHub", icon: <Github size={19} />, url: "https://github.com/ggoswami777" },
    { id: "linkedin", name: "LinkedIn", icon: <Linkedin size={19} />, url: "https://www.linkedin.com/in/gaurav-goswami-4567a1364" },
    { id: "twitter", name: "X", icon: <XIcon size={17} />, url: "https://x.com/gauravnickk777" },
    { id: "theme", name:themes, icon: <SunMoon size={19} /> },
  ]

  const handleAppClick = (app: any) => {
   
    if (app.id === "theme") {
      setTheme(theme === "dark" ? "light" : "dark")
      return 
    }

   
    if (app.url && app.url.startsWith("http")) {
      window.open(app.url, "_blank", "noopener,noreferrer")
    } else if (app.url && app.url.startsWith("mailto")) {
        window.location.href = app.url
    }


    onAppClick(app.id)
  }

  const getScale = (index: number) => {
    if (mouseX === null || apps[index].id === "divider") return 1
    const iconWidth = baseIconSize + baseSpacing
    const iconCenter = index * iconWidth + iconWidth / 2
    const distance = Math.abs(mouseX - iconCenter)
    if (distance > effectWidth) return 1
    return 1 + (maxScale - 1) * (1 - distance / effectWidth)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: -20, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 100 }}
          className="fixed bottom-6 left-1/2 z-50 font-sn"
        >
          <div
            ref={dockRef}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setMouseX(e.clientX - rect.left)
            }}
            onMouseLeave={() => setMouseX(null)}
            className={cn(
              "flex items-center px-4 py-3 gap-4 transition-colors duration-500",
              "bg-[color:var(--color-bg-primary)]/20 backdrop-blur-[24px]",
              "border border-[color:var(--color-border-dashed)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
              "rounded-[24px] relative"
            )}
          >
          
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />

            {apps.map((app, i) => {
              if (app.id === "divider") {
                return <div key="divider" className="w-[1px] h-6 bg-[color:var(--color-text-primary)]/15 mx-1" />
              }

              const scale = getScale(i)

              return (
                <motion.button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  style={{
                    width: baseIconSize,
                    height: baseIconSize,
                    scale: scale,
                    y: (1 - scale) * 25, 
                  }}
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-colors duration-200 group",
                    "bg-[color:var(--color-text-primary)]/[0.05]",
                    "text-[color:var(--color-text-primary)] opacity-60 hover:opacity-100",
                    "hover:bg-[color:var(--color-text-primary)]/[0.15]"
                  )}
                >
                  {app.icon}
                  
                  <span className={cn(
                    "absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border shadow-xl",
                    "text-[11px] font-outfit font-medium backdrop-blur-xl",
                    "bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-primary)] border-[color:var(--color-border-dashed)]"
                  )}>
                    {app.name}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MacOSDock
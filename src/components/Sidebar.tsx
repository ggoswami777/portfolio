"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Linkedin, Home, Briefcase, Layers, Moon, Sun, Mail } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { LanguageSelector } from './LanguageSelector'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme()
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const clickAudio = new Audio("/click.wav")
    clickAudio.volume = 0.5
    setAudio(clickAudio)
  }, [])

  const playClick = useCallback(() => {
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }, [audio])

  const handleThemeChange = () => {
    playClick()
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollTo = (id: string) => {
    
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md md:hidden"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] w-[80%] max-w-[300px] bg-[var(--color-bg-primary)] border-l border-[var(--color-border-dashed)] p-6 md:hidden flex flex-col shadow-2xl transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <LanguageSelector />
              <button 
                onClick={() => { playClick(); onClose(); }}
                className="p-2 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-dashed)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Groups */}
            <div className="space-y-6 overflow-y-auto pr-2">
              {/* Navigation */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 text-[var(--color-text-primary)] mb-4">Navigation</p>
                <div className="flex flex-col gap-2">
                  <NavBtn icon={<Home size={18}/>} label="Home" onClick={() => scrollTo('home')} />
                  <NavBtn icon={<Briefcase size={18}/>} label="Projects" onClick={() => scrollTo('projects')} />
                  <NavBtn icon={<Layers size={18}/>} label="Stack" onClick={() => scrollTo('stack')} />
                  {/* Added Contact Navigation */}
                  <NavBtn icon={<Mail size={18}/>} label="Contact" onClick={() => scrollTo('contact')} />
                </div>
              </div>

              {/* Appearance */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 text-[var(--color-text-primary)] mb-4">Appearance</p>
                <button
                  onClick={handleThemeChange}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-dashed)] text-[var(--color-text-primary)] transition-all hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Sun size={18} className="text-yellow-500"/> : <Moon size={18} className="text-blue-500"/>}
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'}`}>
                    <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`} />
                  </div>
                </button>
              </div>

              {/* Connect */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 text-[var(--color-text-primary)] mb-4">Connect</p>
                <div className="grid grid-cols-1 gap-2">
                  <a 
                    href="https://github.com/ggoswami777" 
                    target="_blank" 
                    onClick={playClick}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-dashed)] text-[var(--color-text-primary)] text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Github size={18} className="opacity-70"/> GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/gaurav-goswami-4567a1364" 
                    target="_blank" 
                    onClick={playClick}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-dashed)] text-[var(--color-text-primary)] text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Linkedin size={18} className="opacity-70"/> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-10 text-center">
              <p className="text-[10px] opacity-40 text-[var(--color-text-primary)] font-medium tracking-widest">© 2026 Gaurav Goswami</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const NavBtn = ({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 w-full p-3 rounded-xl border border-[var(--color-border-dashed)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-300 group"
  >
    <span className="opacity-60 group-hover:opacity-100">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
)
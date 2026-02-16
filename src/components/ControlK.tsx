"use client"

import React, { useEffect, useState } from "react"
import { Command } from "cmdk"
import { 
  X, User, Github, Linkedin, Twitter, 
  Sun, Moon, Copy, Home, Layers, Briefcase 
} from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ControlK() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Navigation Helper
  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-[var(--color-border-dashed)] bg-[var(--color-bg-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all group"
      >
        <span className="text-xs font-medium opacity-60 group-hover:opacity-100">⌘ K</span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] p-4 bg-black/40 backdrop-blur-sm"
      >
        <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-[var(--color-border-dashed)] bg-[var(--color-bg-primary)] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header with Search and Close Cross */}
          <div className="flex items-center border-b border-[var(--color-border-dashed)] px-4">
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-text-primary)] placeholder:opacity-40"
            />
            <button 
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 no-scrollbar">
            <Command.Empty className="py-6 text-center text-sm opacity-50">No results found.</Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading={<span className="px-3 text-[10px] font-bold opacity-30 uppercase tracking-widest">Navigation</span>}>
              <Item onSelect={() => scrollTo('home')}>
                <Home className="mr-3 h-4 w-4" />
                <span>Go to Home</span>
              </Item>
              <Item onSelect={() => scrollTo('projects')}>
                <Briefcase className="mr-3 h-4 w-4" />
                <span>View Projects</span>
              </Item>
              <Item onSelect={() => scrollTo('stack')}>
                <Layers className="mr-3 h-4 w-4" />
                <span>View Tech Stack</span>
              </Item>
            </Command.Group>

            <div className="h-[1px] bg-[var(--color-border-dashed)] mx-2 my-1" />

            {/* Actions & Socials */}
            <Command.Group heading={<span className="px-3 text-[10px] font-bold opacity-30 uppercase tracking-widest">Connect</span>}>
              <Item onSelect={() => window.open('mailto:gaurav.goswami1304@gmail.com')}>
                <User className="mr-3 h-4 w-4" />
                <span>Contact Me</span>
              </Item>
              <Item onSelect={() => window.open('https://github.com/ggoswami777', '_blank')}>
                <Github className="mr-3 h-4 w-4" />
                <span>GitHub Contributions</span>
              </Item>
              <Item onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun className="mr-3 h-4 w-4" /> : <Moon className="mr-3 h-4 w-4" />}
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </Item>
              <Item onSelect={copyLink}>
                <Copy className="mr-3 h-4 w-4" />
                <span>Copy Portfolio Link</span>
              </Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-center border-t border-[var(--color-border-dashed)] p-3 text-[10px] opacity-40 uppercase tracking-widest font-bold">
            ↑↓ to navigate · ↵ to select · esc to close
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}

function Item({ children, onSelect }: { children: React.ReactNode; onSelect?: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm transition-colors aria-selected:bg-[var(--color-text-primary)] aria-selected:text-[var(--color-bg-primary)] outline-none"
    >
      {children}
    </Command.Item>
  )
}
// components/ModeToggle.tsx
import { useTheme } from "@/components/ThemeProvider"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-current"
      aria-label="Toggle theme"
    >
      {/* Sun Icon (shows in light mode) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="20"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={{ scale: theme === "light" ? 1 : 0, opacity: theme === "light" ? 1 : 0 }}
        className="absolute inset-0 m-auto"
      >
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </motion.svg>

      {/* Moon Icon (shows in dark mode) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="20"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={{ scale: theme === "dark" ? 1 : 0, opacity: theme === "dark" ? 1 : 0 }}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </motion.svg>
    </button>
  )
}
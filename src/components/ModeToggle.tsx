"use client";

import { useTheme } from "./ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

 
  useEffect(() => {
    const clickAudio = new Audio("/click.wav");
    clickAudio.volume = 0.5;
    setAudio(clickAudio);
  }, []);

  const toggleTheme = useCallback(() => {

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
     
      });
    }

   
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme, audio]);

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-current w-[40px] h-[40px] flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.svg
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}


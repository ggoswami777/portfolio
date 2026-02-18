"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { useLanguage } from "./LanguageContext"; // Added for translations

const SUPABASE_URL ='https://fanuydbddgfejaxmdubw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbnV5ZGJkZGdmZWpheG1kdWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTIzODUsImV4cCI6MjA4Njk2ODM4NX0.uvzWXvcMHZKdgL1fUMCOM10zmVG0cf6smdVJ2g8IWD4';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ClappingHands = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 17.5L13 16V12.5C13 11.6716 12.3284 11 11.5 11C10.6716 11 10 11.6716 10 12.5V17.5" />
    <path d="M7.5 15.5V10.5C7.5 9.67157 8.17157 9 9 9C9.82843 9 10.5 9.67157 10.5 10.5V13" />
    <path d="M4.5 13.5V8.5C4.5 7.67157 5.17157 7 6 7C6.82843 7 7.5 7.67157 7.5 8.5V12" />
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36022 14.8911 4 16.1272L4.5 21L9.5 20C10.2861 20.6403 11.1005 21 12 21Z" />
  </svg>
);

export const BottomStatusCards = () => {
  const [claps, setClaps] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { t } = useLanguage(); // Using translation hook

  useEffect(() => {
    const clickAudio = new Audio("/click.wav");
    clickAudio.volume = 0.5;
    setAudio(clickAudio);
    fetchClaps();
  }, []);

  const playClick = useCallback(() => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [audio]);

  const fetchClaps = async () => {
    const { data } = await supabase
      .from('claps')
      .select('count')
      .eq('id', 'portfolio')
      .single();
    if (data) setClaps(data.count);
  };

  const handleClap = async () => {
    playClick();
    setIsAnimating(true);
    setClaps(prev => prev + 1);

    const { error } = await supabase.rpc('increment_claps', { row_id: 'portfolio' });
    if (error) {
      await supabase.from('claps').update({ count: claps + 1 }).eq('id', 'portfolio');
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 py-16 px-4 w-full">
      <GlassCard onClick={scrollToTop}>
        <ArrowUp size={20} className="text-[var(--color-text-primary)] opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-primary)] opacity-40 group-hover:opacity-80 transition-opacity font-bold">
          Back To Top
        </span>
      </GlassCard>

      <GlassCard onClick={handleClap}>
        <div className="flex items-center gap-2">
          <motion.div animate={isAnimating ? { scale: 1.4, rotate: -15 } : { scale: 1, rotate: 0 }}>
            <ClappingHands className="w-5 h-5 text-[var(--color-text-primary)] opacity-70 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.span
              key={claps}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold text-[var(--color-text-primary)]"
            >
              {claps.toLocaleString()}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-primary)] opacity-40 group-hover:opacity-80 transition-opacity font-bold">
          Appreciate
        </span>
      </GlassCard>
    </div>
  );
};

const GlassCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <motion.button
    whileHover={{ y: -6, scale: 1.03 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="group relative flex flex-col items-center justify-center gap-2 w-[145px] h-[105px] md:w-[165px] md:h-[115px] rounded-3xl transition-all duration-500 
               bg-black/[0.03] dark:bg-white/[0.02] 
               backdrop-blur-[12px] 
               border border-black/[0.08] dark:border-white/[0.05] 
               hover:bg-black/[0.06] dark:hover:bg-white/[0.07] 
               hover:border-black/[0.15] dark:hover:border-white/[0.15] 
               shadow-sm dark:shadow-none
               cursor-pointer"
  >
    <div className="relative z-10 flex flex-col items-center gap-2">{children}</div>
  </motion.button>
);
"use client";

import React, { useState, useEffect } from "react";
import { Mail, Code2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BlurText from "./BlurText";
import DinoGame from "./DinoGame";
import TypingText from "./TypingText";
import { useLanguage } from "./LanguageContext";

const ProfileCard = () => {
  const { t } = useLanguage();
  const roles = [t("role1"), t("role2"), t("role3")];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative w-full max-w-[760px] mx-auto mt-7 font-sn bg-transparent text-text-primary transition-colors duration-500">
      <div className="relative rounded-xl border border-dashed border-border-dashed bg-transparent px-4 py-10 sm:px-10 sm:py-10 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Links: Centered on mobile, top-right on desktop */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:top-6 sm:right-6 flex gap-2 z-30">
                <a 
                  href="https://x.com/gauravnickk777" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg border border-border-dashed bg-black/20 hover:bg-text-primary hover:text-bg-primary transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current opacity-90">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.83l4.713 6.231L18.244 2.25z" />
                  </svg>
                </a>
                <a 
                  href="https://leetcode.com/u/Gauravgoswami/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg border border-border-dashed bg-black/20 hover:bg-text-primary hover:text-bg-primary transition-all duration-300"
                >
                  <Code2 className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                </a>
              </div>

              <div className="flex flex-row gap-4 sm:gap-10 items-start mt-4 sm:mt-0">
                {/* Avatar Section */}
                <div
                  className="relative shrink-0 cursor-pointer group"
                  onClick={() => { if (window.innerWidth > 640) setShowGame(true); }}
                >
                  {/* Restored Play Game Arrow (Laptop Only) */}
                  <div className="hidden sm:flex absolute -top-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold mt-3 uppercase tracking-[0.2em] whitespace-nowrap animate-bounce text-text-primary">
                      ↓ {t("playgame")}
                    </span>
                  </div>

                  <div className="h-20 w-20 sm:h-32 sm:w-32 rounded-xl overflow-hidden border border-border-dashed p-1 bg-text-primary/5">
                    <img
                      src="/avatar.jpg"
                      alt="Gauravvv"
                      className="h-full w-full object-cover rounded-lg grayscale sm:group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 pt-1 text-left min-w-0">
                  <div className="flex items-center justify-start gap-1.5 sm:gap-3 mb-1">
                    <TypingText
                      text="Gauravvv"
                      as="h1"
                      typingSpeed={100}
                      initialDelay={1000} 
                      showCursor={false}
                      className="text-xl sm:text-4xl font-semibold font-black tracking-tighter uppercase leading-none truncate"
                    />
                    <svg className="w-4 h-4 sm:w-7 sm:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="#1DA1F2">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.818.915-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.51 0 2.817-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  </div>

                  <div className="h-5 sm:h-7 mb-2 sm:mb-4">
                    <AnimatePresence mode="wait">
                      <BlurText
                        key={roles[currentRoleIndex]}
                        text={roles[currentRoleIndex]}
                        delay={40}
                        animateBy="letters"
                        direction="bottom"
                        className="text-xs sm:text-lg font-medium opacity-50 tracking-tight"
                      />
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-start">
                    <a href="mailto:gaurav.goswami1304@gmail.com" className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-[15px] opacity-70 hover:opacity-100 transition-all">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 stroke-[2.5]" />
                      <span className="font-medium tracking-tight truncate max-w-[150px] sm:max-w-none">
                        gaurav.goswami1304@gmail.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-dashed border-border-dashed">
                <p className="text-[13px] sm:text-[15px] opacity-70 leading-relaxed font-medium text-left sm:text-center max-w-full sm:max-w-[90%] mx-auto tracking-tight text-text-primary/80">
                  {t("bio")}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="game-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DinoGame onExit={() => setShowGame(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileCard;
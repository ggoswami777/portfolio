"use client";

import React, { useState, useEffect } from "react";
import { Mail, Code2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import BlurText from "./BlurText";
import DinoGame from "./DinoGame";
import TypingText from "./TypingText"; // Import the component you provided
import { useLanguage } from "./LanguageContext";



const ProfileCard = () => {
  const{t}=useLanguage();
  const role1=t("role1")
  const role2=t("role2")
  const role3=t("role3")
  const roles = [role1,role2,role3];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[760px] mx-auto mt-7 font-sn bg-transparent text-text-primary transition-colors duration-500">
      <div className="relative rounded-xl border border-dashed border-border-dashed bg-transparent px-10 py-10 shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {!showGame ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top-right actions */}
              <div className="absolute top-6 right-6 flex gap-2.5">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-border-dashed hover:bg-text-primary hover:text-bg-primary transition-all duration-300 cursor-pointer group">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5 fill-current opacity-90"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.83l4.713 6.231L18.244 2.25z" />
                  </svg>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-border-dashed hover:bg-text-primary hover:text-bg-primary transition-all duration-300 cursor-pointer">
                  <Code2 className="h-5 w-5 opacity-90" />
                </button>
              </div>

              {/* Content Section */}
              <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start">
                {/* Avatar */}
                <div
                  className="relative shrink-0 pt-2 cursor-pointer group"
                  onClick={() => setShowGame(true)}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold mt-3 uppercase tracking-[0.2em] whitespace-nowrap animate-bounce text-text-primary">
                      ↓ {t("playgame")}
                    </span>
                  </div>
                  <div className="h-32 w-32 rounded-xl overflow-hidden border border-border-dashed p-1 bg-text-primary/5 transition-all duration-300 group-hover:border-text-primary/40 active:scale-95">
                    <img
                      src="/avatar.jpg"
                      alt="Gauravvv"
                      className="h-full w-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center sm:text-left pt-1">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                 
                    <TypingText
                      text="Gauravvv"
                      as="h1"
                      typingSpeed={100}
                      initialDelay={4200} 
                      startOnVisible={false} 
                      loop={false}
                      showCursor={false}
                      className="text-4xl font-semibold font-black tracking-tighter uppercase leading-none"
                    />
                    <svg
                      className="w-7 h-7 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="#1DA1F2"
                    >
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5c-1.51 0-2.818.915-3.437 2.25-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.51 0 2.817-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  </div>

                  <div className="h-7 mb-4 flex justify-center sm:justify-start items-center">
                    <AnimatePresence mode="wait">
                      <BlurText
                        key={roles[currentRoleIndex]}
                        text={roles[currentRoleIndex]}
                        delay={40}
                        animateBy="letters"
                        direction="bottom"
                        className="text-lg font-medium opacity-50 tracking-tight"
                      />
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-center sm:justify-start pt-2">
                    <a
                      href="mailto:gaurav.goswami1304@gmail.com"
                      className="flex items-center gap-3 text-[15px] opacity-70 hover:opacity-100 transition-all group"
                    >
                      <Mail className="h-4.5 w-4.5 stroke-[2.5]" />
                      <span className="font-medium tracking-tight border-b border-transparent group-hover:border-dashed group-hover:border-text-primary/40 pb-0.5">
                        gaurav.goswami1304@gmail.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Bio */}
              <div className="mt-12 pt-8 border-t border-dashed border-border-dashed">
                <p className="text-[15px] opacity-70 leading-relaxed font-medium text-center max-w-[90%] mx-auto tracking-tight text-text-primary/80">
                  {t("bio")}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <DinoGame onExit={() => setShowGame(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileCard;

"use client"

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "./components/Particles";
import Hello from "./components/Hello";
import Time from "./components/Time";
import HeaderRight from "./components/HeaderRight";
import { TryIt } from "./components/TryIt";
import ProfileCard from "./components/ProfileCard";
import { StatusCards } from "./components/StatusCards";
import { useTheme } from "./components/ThemeProvider";
import { GitHubActivity } from "./components/GithubActivity";
import MacOSDock from "./components/MacOsDock";

const App: React.FC = () => {
  const [showHello, setShowHello] = useState(true);
  const { theme } = useTheme();

  const handleAppClick = (id: string) => {
    if (id === "home") {
      const homeSection = document.getElementById("home");
      homeSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (showHello) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showHello]);

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden transition-colors duration-500">
      
      {/* Background Guides */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[80px] left-0 right-0 border-t border-dashed border-border-dashed" />
        <div className="hidden md:block absolute left-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
        <div className="hidden md:block absolute right-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
      </div>

      <Particles
        quantity={theme === "dark" ? 120 : 60} 
        staticity={100}
        ease={70}
        size={0.3}
        color={theme === "dark" ? "#ffffff" : "#000000"}
      />

      <AnimatePresence>
        {showHello && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Row always, space-between */}
      <header id="home" className="relative z-50 w-full flex flex-row justify-between items-start pt-6 px-4 md:px-[18%]">
        <div className="px-2 sm:px-5">
          <Time />
        </div>
        <div className="px-2 sm:px-5">
          <HeaderRight />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 px-2 sm:px-4 md:px-[18%] pt-5 pb-32">
        <div className="w-full">
          <TryIt />
          <ProfileCard />
          <StatusCards />
        </div>

        <div className="mt-8 sm:mt-12 mb-5 px-4">
          <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
        </div>

        <div className="overflow-x-auto no-scrollbar py-4 px-2">
           <GitHubActivity />
        </div>

        <div className="mt-5 mb-2 px-4">
          <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
        </div>
  
        <MacOSDock onAppClick={handleAppClick}/>
      </main>
    </div>
  );
};

export default App;
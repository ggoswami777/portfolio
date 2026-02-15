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
import { Projects } from "./components/Projects";

const App: React.FC = () => {
  const [showHello, setShowHello] = useState(true);
  const { theme } = useTheme();

  const handleAppClick = (id: string) => {
    if (id === "home") {
      const homeSection = document.getElementById("home");
      homeSection?.scrollIntoView({ behavior: "smooth" });
    }
    if (id === "projects") {
      const projectsSection = document.getElementById("projects");
      projectsSection?.scrollIntoView({ behavior: "smooth" });
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
          <motion.div 
            key="hello-screen"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{ opacity: 0 }} // Smooth transition out
            transition={{ duration: 0.5 }}
          >
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Animation Wrapper */}
      {!showHello && (
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Start 50px higher
          animate={{ opacity: 1, y: 0 }}    // Drop down to original position
          transition={{ 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1], // Smooth "out-quint" easing
            delay: 0.2 
          }}
        >
          {/* Header */}
          <header id="home" className="relative z-50 w-full flex flex-row justify-between items-start pt-6 px-4 md:px-[18%]">
            <div className="px-2 sm:px-5">
              <Time />
            </div>
            <div className="px-2 sm:px-5">
              <HeaderRight />
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-20 px-2 sm:px-4 md:px-[18%] pt-7 md:pt-10 pb-32">
            <div className="w-full">
              <TryIt />
              <ProfileCard />
              <StatusCards />
            </div>

            <div className="mt-8 sm:mt-12 mb-5  px-4">
              <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
            </div>

            <div className="overflow-x-auto no-scrollbar md:py-4 px-2 md:px-10">
               <GitHubActivity />
            </div>

            <div className="mt-3 mb-2 px-4">
              <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
            </div>
            <div className=" no-scrollbar md:py-4 px-2 md:px-10">
               <Projects/>
            </div>
            <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 mb-20 text-center px-4"
          >
            <p className="text-sm md:text-base font-sn italic opacity-70 text-text-primary">
              Make sure to star the projects you like. Check out my other cool work on my{" "}
              <a 
                href="https://github.com/ggoswami777" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold underline decoration-dashed underline-offset-4 hover:opacity-100 transition-opacity"
              >
                GitHub
              </a>
            </p>
          </motion.div>
            
            <div className="hidden md:block">
              <MacOSDock onAppClick={handleAppClick}/>
            </div>
          </main>
        </motion.div>
      )}
    </div>
  );
};

export default App;
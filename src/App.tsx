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
    console.log("Navigating to:", id);
    // Add your navigation or theme toggle logic here
  };
useEffect(() => {
  if (showHello) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
}, [showHello]);
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden transition-colors duration-500">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[80px] left-0 right-0 border-t border-dashed border-border-dashed" />
        <div className="absolute left-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
        <div className="absolute right-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
      </div>

      {/* Particles - Colors flip automatically based on the theme state */}
      <Particles
        quantity={120}
        staticity={100}
        ease={70}
        size={0.3}
        color={theme === "dark" ? "#ffffff" : "#000000"}
      />

      {/* Splash Screen */}
      {/* Splash Screen */}
      <AnimatePresence>
        {showHello && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            // CHANGE 'absolute' TO 'fixed' HERE
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Section */}
      <header id="home" className="relative z-50 w-full flex justify-between items-start pt-6 px-[18%]">
        <div className="px-5">
          <Time />
        </div>
        <div className="px-5">
          <HeaderRight />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-20 px-[18%] pt-5">
        <TryIt />
        <ProfileCard />
        <StatusCards />
        <div className="mt-12 mb-5 px-5">
          <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
        </div>
        <div className="px-10"> <GitHubActivity /></div>
       <div className="mt-5 mb-2 px-5">
          <div className="w-full border-t border-dashed border-border-dashed opacity-50" />
        </div>
        <MacOSDock onAppClick={handleAppClick}/>
      </main>
      
    </div>
  );
};

export default App;

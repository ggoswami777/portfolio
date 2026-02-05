import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Particles from "./components/Particles"
import Hello from "./components/Hello"
import Time from "./components/Time"
import HeaderRight from "./components/HeaderRight"
import { TryIt } from "./components/TryIt"
import ProfileCard from "./components/ProfileCard"
import { useTheme } from "./components/ThemeProvider"

const App: React.FC = () => {
  const [showHello, setShowHello] = useState(true)
  const { theme } = useTheme()

  return (
    /* We use the theme variables defined in your @theme block */
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden transition-colors duration-500">
      
      {/* Dashed Guides - Now using the dynamic variable */}
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
      <AnimatePresence>
        {showHello && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }} 
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black"
          >
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Section */}
      <header className="relative z-50 w-full flex justify-between items-start pt-6 px-[18%]">
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
      </main>
    </div>
  )
}

export default App
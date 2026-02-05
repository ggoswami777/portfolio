import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Particles from "./components/Particles"
import Hello from "./components/Hello"
import Time from "./components/Time"
import { ModeToggle } from "./components/ModeToggle"
import { useTheme } from "./components/ThemeProvider" // Check this path!
import HeaderRight from "./components/HeaderRight"
import { TryIt } from "./components/TryIt"

const App: React.FC = () => {
  const [showHello, setShowHello] = useState(true)
  const { theme } = useTheme()

  return (
    /* We use bg-bg-primary and text-text-primary from our @theme */
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden transition-colors duration-500">
      
      {/* Dashed Guides - Using the theme border color */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[80px] left-0 right-0 border-t border-dashed border-border-dashed" />
        <div className="absolute left-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
        <div className="absolute right-[18%] top-0 h-full border-l border-dashed border-border-dashed" />
      </div>

      {/* Particles - Force color flip based on state */}
      <Particles 
        quantity={120} 
        staticity={100} 
        ease={70} 
        size={0.3} 
        color={theme === "dark" ? "#ffffff" : "#000000"} 
      />

      {/* HELLO overlay - This stays black/white as a splash screen */}
      <AnimatePresence>
        {showHello && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }} 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Layout */}
      <header className="relative z-50 w-full flex justify-between items-start pt-6 px-[18%]">
        <div className="px-5">
           <Time />
        </div>
        <div className="px-5">
           <HeaderRight/>
        </div>
      </header>

      <main className="relative z-20 px-[18%] pt-20">
        {/* Your other page content goes here */}
        <TryIt/>
      </main>
    </div>
  )
}

export default App
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Particles from "./components/Particles"
import Hello from "./components/Hello"

const App: React.FC = () => {
  const [showHello, setShowHello] = useState(true)

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* guides */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-[80px] left-0 right-0 border-t border-dashed border-white/10" />
        <div className="absolute left-[18%] top-0 h-full border-l border-dashed border-white/10" />
        <div className="absolute right-[18%] top-0 h-full border-l border-dashed border-white/10" />
      </div>

      {/* particles */}
      <Particles quantity={120} staticity={100} ease={70} size={0.3} />

      {/* HELLO overlay */}
      <AnimatePresence>
        {showHello && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }} // Smooth fade out to black
            className="absolute inset-0 z-30 flex items-center justify-center overflow-visible bg-black"
          >
            <Hello onDone={() => setTimeout(() => setShowHello(false), 800)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* content */}
      <main className="relative z-20 flex min-h-screen px-[20%] text-white">
        <div className="absolute top-5 px-5">
          <p className="font-semibold text-xl tracking-wide">11:13:55 PM</p>
          <p className="text-[11px] text-white/60">
            GMT +5:30 • Mumbai, India
          </p>
        </div>
        {/* Your other content goes here */}
      </main>
    </div>
  )
}

export default App
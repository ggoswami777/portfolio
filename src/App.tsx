import { useState } from "react";
import Particles from "./components/Particles";

const App: React.FC = () => {

  return (
    <div className="relative min-h-screen bg-black">
      {/* guides */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-[80px] left-0 right-0 border-t border-dashed border-white/10" />
        <div className="absolute left-[18%] top-0 h-full border-l border-dashed border-white/10" />
        <div className="absolute right-[18%] top-0 h-full border-l border-dashed border-white/10" />
      </div>

      {/* particles */}
      <Particles quantity={120} staticity={100} ease={70} size={0.3} />

      {/* content */}
      <main className="relative z-20 flex min-h-screen px-[20%] text-white">
        <div className="absolute top-5 flex justify-between items-center gap-1 px-5">
          <div className="flex flex-col">
            <p className="font-semibold text-xl tracking-wide">11:13:55 PM</p>
            <p className="text-[11px] text-white/60">
              GMT +5:30 • Mumbai, India
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

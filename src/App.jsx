import Particles from "@/components/Particles"
function App() {
  return (
  
    <div className="relative min-h-screen">
      <Particles quantity={120} staticity={100} ease={70} size={0.3} />
      
      <main className="relative z-10 flex min-h-screen items-center justify-center text-white">
        Hello World
      </main>
    </div>
  )
}

export default App

"use client"

import React, { useEffect, useRef, useState } from "react"

const DinoGame = ({ onExit }: { onExit: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameId, setGameId] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const resetGame = () => {
    setGameOver(false)
    setScore(0)
    setHasStarted(false)
    setGameId(prev => prev + 1)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Helper to get colors from our CSS Variables
    const getThemeColor = (varName: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "#000"
    }

    const gravity = 1.0
    const dino = { x: 50, y: 150, width: 30, height: 30, dy: 0, jumpForce: -13, grounded: false }
    const obstacles: any[] = []
    let frame = 0
    let gameActive = true
    let internalStarted = false

    const handleJump = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (!internalStarted) {
          internalStarted = true
          setHasStarted(true)
        }
        if (gameActive && dino.grounded) {
          dino.dy = dino.jumpForce
          dino.grounded = false
        } else if (!gameActive) {
          resetGame()
        }
      }
    }

    window.addEventListener("keydown", handleJump)

    const update = () => {
      if (!gameActive || !internalStarted) {
        if (!internalStarted) requestAnimationFrame(update) 
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get dynamic colors based on theme
      const textColor = getThemeColor('--color-text-primary')
      const dashColor = getThemeColor('--color-border-dashed')

      // Physics
      dino.dy += gravity
      dino.y += dino.dy

      // Floor
      if (dino.y + dino.height > canvas.height - 20) {
        dino.y = canvas.height - 20 - dino.height
        dino.dy = 0
        dino.grounded = true
      }

      // Draw Dino (Uses Theme Text Color)
      ctx.fillStyle = textColor
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height)

      // Spawn Obstacles
      if (frame % 120 === 0) {
        obstacles.push({ x: canvas.width, y: canvas.height - 50, width: 20, height: 30 })
      }

      // Obstacle Loop
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obj = obstacles[i]
        obj.x -= (5 + score * 0.1)
        
        // Obstacles slightly dimmer than the dino
        ctx.fillStyle = textColor
        ctx.globalAlpha = 0.6 
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
        ctx.globalAlpha = 1.0

        // Hitbox
        if (
          dino.x < obj.x + obj.width &&
          dino.x + dino.width > obj.x &&
          dino.y < obj.y + obj.height &&
          dino.y + dino.height > obj.y
        ) {
          gameActive = false
          setGameOver(true)
        }

        if (obj.x + obj.width < 0) {
          obstacles.splice(i, 1)
          setScore(s => s + 1)
        }
      }

      // Ground Line
      ctx.strokeStyle = dashColor
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - 20)
      ctx.lineTo(canvas.width, canvas.height - 20)
      ctx.stroke()

      frame++
      requestAnimationFrame(update)
    }

    update()

    return () => {
      gameActive = false
      window.removeEventListener("keydown", handleJump)
    }
  }, [gameId])

  return (
    /* CHANGE: container now uses theme background and text colors */
    <div className="relative flex flex-col items-center justify-center w-full h-[200px] bg-text-primary/5 rounded-lg overflow-hidden border border-border-dashed select-none transition-colors duration-500">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={200} 
        className="w-full h-full" 
      />
      
      {/* HUD - Uses theme text */}
      <div className="absolute top-4 right-6 text-text-primary font-mono text-sm opacity-50">
        SCORE: {score.toString().padStart(4, '0')}
      </div>

      {/* Start Hint */}
      {!hasStarted && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/40 backdrop-blur-[2px]">
            <p className="text-text-primary text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                Press Space to Jump & Start
            </p>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-md">
          <h2 className="text-xl font-black text-text-primary mb-4 tracking-widest">GAME OVER</h2>
          <p className="text-text-primary/50 text-[10px] mb-4 uppercase">Final Score: {score}</p>
          <button 
            onClick={resetGame} 
            className="px-6 py-2 bg-text-primary text-bg-primary text-[10px] font-bold uppercase rounded-md hover:opacity-80 transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      <button 
        onClick={onExit} 
        className="absolute top-4 left-6 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity text-text-primary"
      >
        [ Exit ]
      </button>
    </div>
  )
}

export default DinoGame
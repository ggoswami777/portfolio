"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}

function hexToRgb(hex) {
  let normalized = hex.replace("#", "")

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((c) => c + c)
      .join("")
  }

  const int = parseInt(normalized, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

export function Particles({
  className,
  children,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const ctx = useRef(null)
  const circles = useRef([])
  const mousePosition = useMousePosition()
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const animationRef = useRef(null)
  const dpr = window.devicePixelRatio || 1

  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d")
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [color])

  useEffect(() => {
    updateMouse()
  }, [mousePosition])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const updateMouse = () => {
    const rect = canvasRef.current.getBoundingClientRect()
    const { w, h } = canvasSize.current
    const x = mousePosition.x - rect.left - w / 2
    const y = mousePosition.y - rect.top - h / 2
    if (Math.abs(x) < w / 2 && Math.abs(y) < h / 2) {
      mouse.current = { x, y }
    }
  }

  const resizeCanvas = () => {
    circles.current = []
    canvasSize.current.w = containerRef.current.offsetWidth
    canvasSize.current.h = containerRef.current.offsetHeight
    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`
    ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const createCircle = () => ({
    x: Math.random() * canvasSize.current.w,
    y: Math.random() * canvasSize.current.h,
    translateX: 0,
    translateY: 0,
    size: Math.random() * 2 + size,
    alpha: 0,
    targetAlpha: Math.random() * 0.6 + 0.1,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: Math.random() * 4 + 0.1,
  })

  const rgb = hexToRgb(color)

  const drawCircle = (circle) => {
    ctx.current.beginPath()
    ctx.current.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.current.fillStyle = `rgba(${rgb.join(",")},${circle.alpha})`
    ctx.current.fill()
  }

  const drawParticles = () => {
    circles.current = Array.from({ length: quantity }, createCircle)
  }

  const animate = () => {
    ctx.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

    circles.current.forEach((c) => {
      c.alpha += (c.targetAlpha - c.alpha) * 0.05
      c.x += c.dx + vx
      c.y += c.dy + vy
      c.translateX += (mouse.current.x / staticity - c.translateX) / ease
      c.translateY += (mouse.current.y / staticity - c.translateY) / ease

      ctx.current.save()
      ctx.current.translate(c.translateX, c.translateY)
      drawCircle(c)
      ctx.current.restore()

      if (
        c.x < 0 ||
        c.x > canvasSize.current.w ||
        c.y < 0 ||
        c.y > canvasSize.current.h
      ) {
        Object.assign(c, createCircle())
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden bg-neutral-950", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

export default Particles

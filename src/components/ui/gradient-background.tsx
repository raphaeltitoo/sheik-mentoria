"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.5
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient blobs
    const blobs = Array.from({ length: 6 }, (_, index) => {
      // Determine color based on index to ensure we have a mix of colors
      let hue
      if (index < 2) {
        hue = 220 // Blue
      } else if (index < 4) {
        hue = 0 // White (will be adjusted with saturation and lightness)
      } else {
        hue = 0 // Red
      }

      // Adjust colors for dark mode
      const saturation = isDark ? (index < 4 ? (index < 2 ? 70 : 0) : 70) : index < 4 ? (index < 2 ? 80 : 0) : 80

      const lightness = isDark ? (index < 4 ? (index < 2 ? 40 : 70) : 40) : index < 4 ? (index < 2 ? 50 : 100) : 50

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        dx: Math.random() * 0.2 - 0.1,
        dy: Math.random() * 0.2 - 0.1,
        hue: hue,
        saturation: saturation,
        lightness: lightness,
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw blobs
      blobs.forEach((blob) => {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
        gradient.addColorStop(0, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness}%, ${isDark ? 0.3 : 0.5})`)
        gradient.addColorStop(1, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness}%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move blobs
        blob.x += blob.dx
        blob.y += blob.dy

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.dx *= -1
        if (blob.y < 0 || blob.y > canvas.height) blob.dy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [isDark])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-70" aria-hidden="true" />
}

export default GradientBackground

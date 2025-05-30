"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Usar um pequeno delay para não bloquear a renderização inicial
    const initTimeout = setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
      if (!ctx) return

      // Configurar o canvas para cobrir toda a tela
      const setCanvasDimensions = () => {
        const displayWidth = window.innerWidth
        const displayHeight = window.innerHeight * 1.5

        // Definir tamanho lógico do canvas
        canvas.width = displayWidth
        canvas.height = displayHeight

        // Ajustar o estilo CSS para manter o tamanho visual
        canvas.style.width = `${displayWidth}px`
        canvas.style.height = `${displayHeight}px`

        // Escalar o contexto para corresponder ao DPR
        // Comentado para melhorar o desempenho em dispositivos de alta densidade
        // ctx.scale(dpr, dpr)
      }

      setCanvasDimensions()

      // Usar throttle para o evento de redimensionamento
      let resizeTimeout: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          setCanvasDimensions()
        }, 200)
      }

      window.addEventListener("resize", handleResize)

      // Cores minimalistas - apenas branco com variações sutis
      const starColors = [
        "255, 255, 255", // Branco puro
        "255, 253, 245", // Branco levemente amarelado
        "250, 250, 255", // Branco levemente azulado
      ]

      // Função para gerar um valor aleatório dentro de um intervalo
      const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

      // Criar um número muito reduzido de estrelas - abordagem minimalista
      // Apenas 50-70 estrelas em todo o céu
      const totalStars = Math.floor(randomRange(50, 70))

      const stars = Array(totalStars)
        .fill(0)
        .map(() => {
          // Distribuição uniforme mas esparsa
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height

          // Tamanho variável mas controlado - maioria pequenas
          const sizeRandom = Math.random()
          const size =
            sizeRandom < 0.8
              ? randomRange(0.3, 0.8)
              : // 80% pequenas
                sizeRandom < 0.95
                ? randomRange(0.8, 1.2)
                : // 15% médias
                  randomRange(1.2, 1.8) // 5% grandes

          // Opacidade variável - mais sutil
          const baseOpacity = randomRange(0.3, 0.7)

          // Cor aleatória do array de cores minimalistas
          const colorIndex = Math.floor(Math.random() * starColors.length)

          // Velocidade de cintilação variável, mais lenta para ser mais sutil
          const twinkleSpeed = randomRange(0.01, 0.03)

          // Offset aleatório para que as estrelas não pisquem em sincronia
          const twinkleOffset = Math.random() * Math.PI * 2

          // Intensidade de cintilação - menor para estrelas maiores (mais estáveis)
          const twinkleAmount = Math.max(0.2, 0.4 - size * 0.1)

          return {
            x,
            y,
            size,
            baseSize: size,
            baseOpacity,
            opacity: baseOpacity,
            twinkleSpeed,
            twinkleAmount,
            twinkleOffset,
            color: starColors[colorIndex],
            // Apenas as maiores estrelas têm brilho
            hasGlow: size > 1.4,
            // Algumas estrelas variam em tamanho ao cintilar
            sizeTwinkle: Math.random() > 0.7,
          }
        })

      // Configuração para apenas uma estrela cadente ocasional
      const shootingStar = {
        active: false,
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        opacity: 0,
        width: 0,
        delay: randomRange(8000, 20000), // Delay maior entre aparições
        lastActive: Date.now() - randomRange(0, 5000),
      }

      // Variáveis para animação
      let time = 0
      let lastTime = 0
      const fps = 30 // Limitar a 30 FPS para melhorar o desempenho
      const interval = 1000 / fps

      const animate = (currentTime: number) => {
        const delta = currentTime - lastTime

        // Limitar a taxa de quadros
        if (delta > interval) {
          lastTime = currentTime - (delta % interval)

          time += 0.05
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Desenhar estrelas com cintilação minimalista
          stars.forEach((star) => {
            // Cintilação usando seno
            const twinkleValue = Math.abs(Math.sin(time * star.twinkleSpeed + star.twinkleOffset))

            // Aplicar cintilação à opacidade
            star.opacity = star.baseOpacity - star.twinkleAmount + twinkleValue * star.twinkleAmount * 2

            // Também variar o tamanho para algumas estrelas
            const currentSize = star.sizeTwinkle
              ? star.baseSize * (0.7 + twinkleValue * 0.6) // Variação de tamanho de 70% a 130%
              : star.baseSize

            // Desenhar brilho para estrelas maiores - muito sutil
            if (star.hasGlow) {
              const glowSize = currentSize * 2.5
              const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize)

              gradient.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.7})`)
              gradient.addColorStop(0.5, `rgba(${star.color}, ${star.opacity * 0.2})`)
              gradient.addColorStop(1, `rgba(${star.color}, 0)`)

              ctx.beginPath()
              ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
              ctx.fillStyle = gradient
              ctx.fill()
            }

            // Desenhar o núcleo da estrela
            ctx.beginPath()
            ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
            ctx.fill()
          })

          // Processar estrela cadente ocasional
          const now = Date.now()

          // Verificar se é hora de ativar a estrela cadente
          if (!shootingStar.active && now - shootingStar.lastActive > shootingStar.delay) {
            shootingStar.active = true
            shootingStar.opacity = 0
            shootingStar.x = Math.random() * canvas.width * 0.8
            shootingStar.y = Math.random() * (canvas.height / 3) // Apenas no topo da tela
            shootingStar.angle = randomRange(Math.PI / 6, Math.PI / 3) // Ângulo entre 30 e 60 graus
            shootingStar.length = randomRange(80, 120)
            shootingStar.speed = randomRange(4, 8)
            shootingStar.width = randomRange(0.8, 1.5)
          }

          // Animar estrela cadente ativa
          if (shootingStar.active) {
            // Aumentar opacidade no início
            if (shootingStar.opacity < 0.8) {
              shootingStar.opacity += 0.05
            }

            // Mover a estrela
            shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
            shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed

            // Desenhar a estrela cadente
            ctx.beginPath()
            ctx.moveTo(shootingStar.x, shootingStar.y)
            ctx.lineTo(
              shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
              shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length,
            )

            // Criar um gradiente para a cauda
            const gradient = ctx.createLinearGradient(
              shootingStar.x,
              shootingStar.y,
              shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
              shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length,
            )

            gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`)
            gradient.addColorStop(0.1, `rgba(255, 255, 240, ${shootingStar.opacity * 0.7})`)
            gradient.addColorStop(0.5, `rgba(255, 240, 220, ${shootingStar.opacity * 0.3})`)
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = shootingStar.width
            ctx.lineCap = "round"
            ctx.stroke()

            // Adicionar brilho na ponta
            ctx.beginPath()
            ctx.arc(shootingStar.x, shootingStar.y, shootingStar.width * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`
            ctx.fill()

            // Resetar quando sair da tela
            if (shootingStar.x > canvas.width || shootingStar.y > canvas.height || shootingStar.x < 0) {
              shootingStar.active = false
              shootingStar.lastActive = now
              shootingStar.delay = randomRange(8000, 20000) // Novo delay aleatório
            }
          }
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      let animationFrameId = requestAnimationFrame(animate)
      setIsInitialized(true)

      return () => {
        window.removeEventListener("resize", handleResize)
        cancelAnimationFrame(animationFrameId)
      }
    }, 100) // Pequeno delay para não bloquear a renderização inicial

    return () => clearTimeout(initTimeout)
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-[0] opacity-70 ${isInitialized ? "transition-opacity duration-1000" : "opacity-0"}`}
      aria-hidden="true"
    />
  )
}

export default StarryBackground

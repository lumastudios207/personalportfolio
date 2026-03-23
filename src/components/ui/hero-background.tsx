"use client"

import { useEffect, useRef } from "react"

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.4 + Math.random() * 0.3,
    hue: 35 + Math.random() * 30,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let beams: Beam[] = []
    let animationFrame: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      beams = Array.from({ length: 30 }, () => createBeam(w, h))
    }

    resize()
    window.addEventListener("resize", resize)

    function resetBeam(beam: Beam, index: number) {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      const column = index % 3
      const spacing = w / 3
      beam.y = h + 100
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.5 + Math.random() * 0.4
      beam.hue = 35 + (index * 30) / beams.length
      beam.opacity = 0.4 + Math.random() * 0.3
    }

    function animate() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)
      ctx!.filter = "blur(20px)"

      beams.forEach((beam, i) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed

        if (beam.y + beam.length < -100) {
          resetBeam(beam, i)
        }

        const c = ctx!
        c.save()
        c.translate(beam.x, beam.y)
        c.rotate((beam.angle * Math.PI) / 180)

        const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2)
        const gradient = c.createLinearGradient(0, 0, 0, beam.length)
        gradient.addColorStop(0, `hsla(${beam.hue}, 95%, 70%, 0)`)
        gradient.addColorStop(0.1, `hsla(${beam.hue}, 95%, 70%, ${pulsingOpacity * 0.5})`)
        gradient.addColorStop(0.4, `hsla(${beam.hue}, 95%, 70%, ${pulsingOpacity})`)
        gradient.addColorStop(0.6, `hsla(${beam.hue}, 95%, 70%, ${pulsingOpacity})`)
        gradient.addColorStop(0.9, `hsla(${beam.hue}, 95%, 70%, ${pulsingOpacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${beam.hue}, 95%, 70%, 0)`)

        c.fillStyle = gradient
        c.fillRect(-beam.width / 2, 0, beam.width, beam.length)
        c.restore()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      style={{ filter: "blur(8px)" }}
    />
  )
}

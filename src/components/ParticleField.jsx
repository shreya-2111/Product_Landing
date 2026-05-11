import { useEffect, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const ParticleField = () => {
  const canvasRef = useRef()
  const isMobile = useIsMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mobile: fewer particles, no connection lines
    const particleCount = isMobile ? 20 : 50

    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        opacity: Math.random() * 0.4 + 0.15,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 58, 237, ${particle.opacity})`
        ctx.fill()

        // Connection lines — desktop only (O(n²) is too heavy on mobile)
        if (!isMobile) {
          particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - distance / 100)})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          })
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default ParticleField
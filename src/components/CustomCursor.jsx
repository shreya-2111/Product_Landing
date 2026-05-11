import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Glow follows with smooth lag
  const glowX = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.5 })
  const glowY = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <>
      {/* Large soft glow orb */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '400px', height: '400px',
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          filter: 'blur(2px)',
        }}
      />

      {/* Tight bright core */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '80px', height: '80px',
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(124,58,237,0.12) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          filter: 'blur(1px)',
        }}
      />
    </>
  )
}

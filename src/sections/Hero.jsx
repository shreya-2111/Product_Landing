import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Preload, useProgress, Html } from '@react-three/drei'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Play, ChevronDown, Zap, Wifi, Shield } from 'lucide-react'
import HeadphoneModel from '../components/HeadphoneModel'
import glbUrl from '../assets/headphone.glb?url'
import { useIsMobile } from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

/* ─── Progress loader shown while GLB streams ── */
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '140px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', width: `${progress}%`, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}

/* ─── Floating particles ─────────────────────────────────── */
function Particles({ isMobile }) {
  const ref = useRef()
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    // Mobile: 20 particles at lower opacity; desktop: 90
    const count = isMobile ? 20 : 90
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
      vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
      o: Math.random() * 0.35 + 0.08,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0) d.x = canvas.width
        if (d.x > canvas.width)  d.x = 0
        if (d.y < 0) d.y = canvas.height
        if (d.y > canvas.height) d.y = 0
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167,139,250,${d.o})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [isMobile])
  return (
    <canvas ref={ref} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%', pointerEvents: 'none',
    }} />
  )
}

/* ─── Pill badge ─────────────────────────────────────────── */
const Pill = ({ icon: Icon, text, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 14, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.32rem 0.85rem', borderRadius: '99px',
      background: 'rgba(124,58,237,0.1)',
      border: '1px solid rgba(124,58,237,0.3)',
      fontSize: '0.7rem', fontWeight: 700, color: '#a78bfa',
      letterSpacing: '0.07em', textTransform: 'uppercase',
    }}
  >
    {Icon && <Icon size={10} strokeWidth={2.5} />}{text}
  </motion.span>
)

/* ─── Stat block ─────────────────────────────────────────── */
const Stat = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem' }}
  >
    <span style={{
      fontSize: '1.65rem', fontWeight: 900, lineHeight: 1,
      background: 'linear-gradient(135deg,#c4b5fd,#06b6d4)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    }}>{value}</span>
    <span style={{
      fontSize: '0.65rem', color: '#475569', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>{label}</span>
  </motion.div>
)

/* ─── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef()
  const rightRef   = useRef()
  const imgRef     = useRef()
  const glowRef    = useRef()
  const ring1Ref   = useRef()
  const ring2Ref   = useRef()
  const shadowRef  = useRef()
  const isMobile   = useIsMobile()

  /* mouse parallax — desktop only */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 16 })
  const sy = useSpring(my, { stiffness: 50, damping: 16 })
  const rotX  = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotY  = useTransform(sx, [-0.5, 0.5], [-8, 8])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    if (isMobile) return
    const r = sectionRef.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width  - 0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5
    mx.set(nx); my.set(ny)
    setMouse({ x: nx, y: ny })
  }
  const onLeave = () => { mx.set(0); my.set(0); setMouse({ x: 0, y: 0 }) }

  useEffect(() => {
    /* ── initial hidden state ── */
    gsap.set(glowRef.current,  { opacity: 0, scale: 0.4 })
    gsap.set(ring1Ref.current, { opacity: 0, scale: 0.3, rotate: -60 })
    gsap.set(ring2Ref.current, { opacity: 0, scale: 0.2 })
    gsap.set('#hero-left > *', { opacity: 0, y: 50 })

    /* ── entrance timeline ── */
    const tl = gsap.timeline({ delay: isMobile ? 0.1 : 0.2 })
    tl
      .to(glowRef.current,  { opacity: 1, scale: 1, duration: isMobile ? 0.7 : 1.3, ease: 'power2.out' })
      .to(ring1Ref.current, { opacity: 1, scale: 1, rotate: 0, duration: isMobile ? 0.8 : 1.5, ease: 'back.out(1.6)' }, '-=0.6')
      .to(ring2Ref.current, { opacity: 1, scale: 1, duration: isMobile ? 0.7 : 1.3, ease: 'back.out(1.4)' }, '-=0.7')
      .to('#hero-left > *', { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.9, stagger: isMobile ? 0.07 : 0.12, ease: 'power3.out' }, '-=0.5')

    /* ── glow pulse — slower / lighter on mobile ── */
    gsap.to(glowRef.current, {
      scale: 1.1, opacity: isMobile ? 0.7 : 0.85,
      duration: isMobile ? 5 : 3.5,
      repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
    })

    /* ── rings spin — much slower on mobile to save GPU ── */
    gsap.to(ring1Ref.current, { rotate: -360, duration: isMobile ? 60 : 28, repeat: -1, ease: 'none' })
    gsap.to(ring2Ref.current, { rotate:  360, duration: isMobile ? 40 : 18, repeat: -1, ease: 'none' })

    /* ── scroll parallax — skip on mobile ── */
    if (!isMobile) {
      gsap.to(rightRef.current, {
        y: -70, scale: 0.93,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: 'bottom top',
          scrub: 1.8,
        },
      })

      gsap.to(glowRef.current, {
        opacity: 0.1, scale: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '25% top', end: 'bottom top',
          scrub: 2,
        },
      })
    }
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', background: '#050816',
      }}
    >
      {/* ── BG blooms ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.38) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 95% 50%, rgba(6,182,212,0.2) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 45% at 0% 100%, rgba(124,58,237,0.15) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 65% at 75% 55%, rgba(109,40,217,0.22) 0%, transparent 65%)' }} />
      </div>

      {/* ── Grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      {/* ── Particles ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Particles isMobile={isMobile} />
      </div>

      {/* ══ SPLIT LAYOUT ══ */}
      <div
        className="hero-grid"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1280px', margin: '0 auto',
          padding: '7rem 2rem 4rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'center', gap: '2rem',
        }}
      >
        {/* ── LEFT ── */}
        <div id="hero-left" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <Pill icon={Zap}    text="New 2026"     delay={0} />
            <Pill icon={Wifi}   text="Wireless"     delay={0.1} />
            <Pill icon={Shield} text="30-Day Trial" delay={0.2} />
          </div>

          <h1 style={{
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
            fontSize: 'clamp(3.6rem,7.5vw,6.5rem)', margin: '0 0 1.5rem',
          }}>
            <span style={{ display: 'block', color: '#f8fafc' }}>Hear</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg,#c4b5fd 0%,#7c3aed 45%,#06b6d4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>The Future</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem,1.6vw,1.1rem)', lineHeight: 1.78,
            color: '#94a3b8', marginBottom: '2.25rem', maxWidth: '420px',
          }}>
            AuralX Pro combines AI-powered noise cancellation, 3D spatial audio,
            and 40 hours of battery life — the most advanced wireless headphone ever made.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.9rem 1.85rem', borderRadius: '99px',
                fontWeight: 700, fontSize: '0.9rem', color: '#fff',
                border: 'none', cursor: 'pointer',
                background: 'linear-gradient(90deg,#7c3aed 0%,#8b5cf6 50%,#7c3aed 100%)',
                backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite',
                boxShadow: '0 0 28px rgba(124,58,237,0.5),0 4px 20px rgba(0,0,0,0.35)',
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 48px rgba(124,58,237,0.75),0 8px 28px rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingCart size={16} strokeWidth={2.5} />Buy Now — $299
            </motion.button>

            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.9rem 1.85rem', borderRadius: '99px',
                fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0',
                cursor: 'pointer', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(12px)',
              }}
              whileHover={{ scale: 1.05, y: -2, background: 'rgba(124,58,237,0.13)', borderColor: 'rgba(124,58,237,0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'rgba(124,58,237,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Play size={10} fill="#fff" color="#fff" />
              </span>
              Watch Film
            </motion.button>
          </div>

          <div style={{
            display: 'flex', gap: '1.75rem', flexWrap: 'wrap',
            paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            <Stat value="40H"  label="Battery"      delay={0} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch' }} />
            <Stat value="99%"  label="Noise Cancel" delay={0.1} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch' }} />
            <Stat value="360°" label="Spatial"      delay={0.2} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.07)', alignSelf: 'stretch' }} />
            <Stat value="5ms"  label="Latency"      delay={0.3} />
          </div>
        </div>

        {/* ── RIGHT: image centered in ring ── */}
        <div
          ref={rightRef}
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: isMobile ? '320px' : '520px',
          }}
        >
          {/*
            Single anchor — rings, glow, image all share this box.
          */}
          <motion.div
            style={{
              position: 'relative',
              width: isMobile ? '300px' : '500px',
              height: isMobile ? '300px' : '500px',
              flexShrink: 0,
              rotateX: isMobile ? 0 : rotX,
              rotateY: isMobile ? 0 : rotY,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
          >
            {/* ── Glow blob ── */}
            <div ref={glowRef} style={{
              position: 'absolute', inset: '-60px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(109,40,217,0.65) 0%, rgba(6,182,212,0.18) 45%, transparent 72%)',
              filter: 'blur(56px)', pointerEvents: 'none', zIndex: 0,
            }} />

            {/* ── Ring 1: outer, purple arc ── */}
            <div ref={ring1Ref} style={{
              position: 'absolute', inset: '-28px',
              borderRadius: '50%',
              border: '1.5px solid rgba(124,58,237,0.25)',
              backgroundImage: 'conic-gradient(from 0deg, transparent 72%, rgba(124,58,237,0.7) 88%, transparent 100%)',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {/* ── Ring 2: mid, cyan arc ── */}
            <div ref={ring2Ref} style={{
              position: 'absolute', inset: '18px',
              borderRadius: '50%',
              border: '1px solid rgba(6,182,212,0.2)',
              backgroundImage: 'conic-gradient(from 180deg, transparent 78%, rgba(6,182,212,0.6) 93%, transparent 100%)',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {/* ── Ring 3: inner static ── */}
            <div style={{
              position: 'absolute', inset: '80px',
              borderRadius: '50%',
              border: '1px solid rgba(124,58,237,0.1)',
              pointerEvents: 'none', zIndex: 1,
            }} />

            {/* ── Fog at bottom ── */}
            <div style={{
              position: 'absolute', bottom: '-10px', left: '15%', right: '15%', height: '110px',
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.38) 0%, transparent 70%)',
              filter: 'blur(22px)', pointerEvents: 'none', zIndex: 2,
            }} />

            {/* ── Canvas fills the 500×500 box — GLB model inside ── */}
            <Canvas
              camera={{ position: [0, 0, 3.2], fov: 42 }}
              gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                background: 'transparent', zIndex: 10,
              }}
            >
              <ambientLight intensity={isMobile ? 1.2 : 0.5} />
              <directionalLight position={[4, 7, 5]} intensity={isMobile ? 1.5 : 2.5} color="#ffffff" castShadow={!isMobile} />
              {!isMobile && <pointLight position={[-4, 2, 4]}  intensity={3}   color="#7c3aed" />}
              {!isMobile && <pointLight position={[4, -2, -3]} intensity={2}   color="#06b6d4" />}
              {!isMobile && <pointLight position={[0, 6, 0]}   intensity={1.5} color="#a78bfa" />}
              {!isMobile && <spotLight  position={[0, 10, 4]}  intensity={2}   angle={0.35} penumbra={1} color="#c4b5fd" castShadow />}
              {isMobile && <pointLight position={[0, 4, 2]} intensity={2} color="#7c3aed" />}
              <Environment preset="night" />
              {!isMobile && <ContactShadows position={[0, -1.3, 0]} opacity={0.55} scale={5} blur={2.5} far={3.5} color="#4c1d95" />}
              <Suspense fallback={<Loader />}>
                <HeadphoneModel url={glbUrl} mouseX={isMobile ? 0 : mouse.x} mouseY={isMobile ? 0 : mouse.y} isMobile={isMobile} />
              </Suspense>
              <Preload all />
            </Canvas>
          </motion.div>

          {/* ── Badge: top-left ── */}
          {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -24, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: '4%', left: '0%', zIndex: 20,
              background: 'rgba(8,10,26,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.3)', borderRadius: '14px',
              padding: '0.75rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0,
              background: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(124,58,237,0.6)',
            }}>
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>AuralX Chip X1</div>
              <div style={{ fontSize: '0.67rem', color: '#64748b', marginTop: '1px' }}>4× faster DSP</div>
            </div>
          </motion.div>
          )}

          {/* ── Badge: bottom-right ── */}
          {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: '4%', right: '0%', zIndex: 20,
              background: 'rgba(8,10,26,0.9)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(6,182,212,0.28)', borderRadius: '14px',
              padding: '0.75rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0,
              background: 'linear-gradient(135deg,#0891b2,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(6,182,212,0.5)',
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#fff' }}>ANC</span>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>Noise Cancel</div>
              <div style={{ fontSize: '0.67rem', color: '#64748b', marginTop: '1px' }}>99% blocked</div>
            </div>
          </motion.div>
          )}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
      }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#334155' }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={15} color="#7c3aed" />
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '12rem', zIndex: 5, pointerEvents: 'none',
        background: 'linear-gradient(to top,#050816 0%,transparent 100%)',
      }} />

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid #hero-left { align-items: center; text-align: center; }
          .hero-grid #hero-left p { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 600px) {
          .hero-grid { padding-top: 5rem !important; gap: 1rem !important; }
          .hero-grid #hero-left { padding-bottom: 1rem; }
        }
        @media (max-width: 400px) {
          .hero-grid { padding-top: 4.5rem !important; padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </section>
  )
}

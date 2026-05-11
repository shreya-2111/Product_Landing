import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, Zap, Battery, Brain, Cpu, Layers } from 'lucide-react'

const features = [
  {
    icon: Volume2,
    title: 'Active Noise Cancellation',
    desc: 'Dual-microphone hybrid ANC eliminates 99% of ambient noise — from jet engines to open offices.',
    stat: '99%',
    statLabel: 'Noise Blocked',
    color: '#7c3aed',
  },
  {
    icon: Layers,
    title: 'Spatial Audio',
    desc: '3D head-tracked surround sound that places every instrument exactly where it belongs.',
    stat: '360°',
    statLabel: 'Sound Stage',
    color: '#06b6d4',
  },
  {
    icon: Battery,
    title: '40-Hour Battery',
    desc: 'All-day and all-night listening. 5 minutes of charge delivers 3 hours of playback.',
    stat: '40H',
    statLabel: 'Playtime',
    color: '#34d399',
  },
  {
    icon: Brain,
    title: 'AI Sound Engine',
    desc: 'On-device ML analyses your environment 1000× per second and adapts EQ in real time.',
    stat: '1ms',
    statLabel: 'Latency',
    color: '#f59e0b',
  },
  {
    icon: Zap,
    title: 'Fast Charging',
    desc: 'USB-C and Qi wireless charging. The fastest charge-to-play ratio in its class.',
    stat: '5min',
    statLabel: '→ 3H Play',
    color: '#a78bfa',
  },
  {
    icon: Cpu,
    title: 'AuralX Chip X1',
    desc: 'Custom silicon built for audio. 4× more processing power than any competitor.',
    stat: '4×',
    statLabel: 'Faster DSP',
    color: '#fb7185',
  },
]

const Features = () => {
  const sectionRef = useRef()
  const cardsRef   = useRef()

  useEffect(() => {
    gsap.fromTo(
      Array.from(cardsRef.current.children),
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    )
  }, [])

  return (
    <section id="features" ref={sectionRef} style={{ padding: '7rem 1.5rem', position: 'relative', background: '#050816' }}>

      <div className="section-divider" style={{ marginBottom: '5rem' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            Technology
          </span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            <span style={{ color: '#fff' }}>Built Different.</span>
            <br />
            <span className="gradient-text">Sounds Different.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '38rem', margin: '0 auto', lineHeight: 1.7 }}>
            Six breakthrough technologies working in harmony to deliver the most immersive wireless audio ever made.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {features.map((f, i) => (
            <div key={i} className="feature-card gradient-border" style={{ cursor: 'default' }}>

              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="icon-box">
                  <f.icon size={22} color={f.color} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: f.color, lineHeight: 1 }}>{f.stat}</div>
                  <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{f.statLabel}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.6rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65 }}>
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div style={{
                marginTop: '1.5rem',
                height: '2px',
                borderRadius: '99px',
                background: `linear-gradient(90deg, ${f.color}60, transparent)`,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div style={{ position: 'absolute', top: '30%', right: '-8%', width: '30rem', height: '30rem', background: 'rgba(124,58,237,0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
    </section>
  )
}

export default Features

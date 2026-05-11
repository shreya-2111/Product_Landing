import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'
import { useIsMobile } from '../hooks/useIsMobile'

const stats = [
  { value: '99',  suffix: '%', label: 'Noise Reduction' },
  { value: '40',  suffix: 'H', label: 'Battery Life' },
  { value: '50',  suffix: 'mm', label: 'Driver Size' },
  { value: '5',   suffix: 'yr', label: 'Warranty' },
]

const pillars = [
  {
    title: 'Premium Materials',
    body: 'Aerospace-grade titanium headband, protein leather cushions, and anodised aluminium ear cups. Built to last decades.',
  },
  {
    title: 'Acoustic Innovation',
    body: 'Custom 50mm neodymium drivers tuned by Grammy-winning engineers. Flat response from 5Hz to 40kHz.',
  },
  {
    title: 'Smart Technology',
    body: 'AuralX Chip X1 runs on-device AI for adaptive EQ, voice isolation, and real-time environment sensing.',
  },
]

const About = () => {
  const sectionRef = useRef()
  const statsRef   = useRef()
  const isMobile   = useIsMobile()

  useEffect(() => {
    // Counter animation
    Array.from(statsRef.current.children).forEach((card, i) => {
      const el  = card.querySelector('.count-val')
      const end = parseInt(el.dataset.val)
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: end,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          delay: i * 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          onUpdate() { el.innerText = Math.round(parseFloat(el.innerText)) },
        }
      )
    })
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ padding: '7rem 1.5rem', position: 'relative', background: '#050816', overflow: 'hidden' }}>

      <div className="section-divider" style={{ marginBottom: '5rem' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Stats row */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '6rem' }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{ fontSize: '2.75rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.25rem' }}>
                <span className="gradient-text count-val" data-val={s.value}>{s.value}</span>
                <span className="gradient-text" style={{ fontSize: '1.5rem' }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>

          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                Our Philosophy
              </span>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}>
                <span style={{ color: '#fff' }}>Engineered for</span>
                <br />
                <span className="gradient-text">Excellence</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                Five years of research, 200+ prototypes, and collaboration with world-class audio engineers
                have produced the most refined wireless headphone ever made.
              </p>

              {/* Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {pillars.map((p, i) => (
                  <motion.div
                    key={i}
                    className="glass"
                    style={{ borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle2 size={20} color="#7c3aed" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.3rem' }}>{p.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{p.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main visual box */}
            <div style={{
              aspectRatio: '1',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.06) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Rotating ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '70%', height: '70%',
                  borderRadius: '50%',
                  border: '1px solid rgba(124,58,237,0.25)',
                }}
                animate={isMobile ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  width: '50%', height: '50%',
                  borderRadius: '50%',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
                animate={isMobile ? {} : { rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center glow */}
              <div style={{
                width: '40%', height: '40%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />

              {/* Floating dots — desktop only */}
              {!isMobile && [0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: i % 2 === 0 ? '#7c3aed' : '#06b6d4',
                    top: `${50 - 38 * Math.cos(deg * Math.PI / 180)}%`,
                    left: `${50 + 38 * Math.sin(deg * Math.PI / 180)}%`,
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              {/* Center label */}
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  AuralX Chip X1
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                  4×
                </div>
                <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                  Faster DSP
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="glass-strong"
              style={{
                position: 'absolute', bottom: '-1.5rem', left: '-1.5rem',
                borderRadius: '16px', padding: '1rem 1.25rem',
                border: '1px solid rgba(52,211,153,0.25)',
              }}
              animate={isMobile ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#34d399', lineHeight: 1 }}>40H</div>
              <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>Battery</div>
            </motion.div>

            <motion.div
              className="glass-strong"
              style={{
                position: 'absolute', top: '-1.5rem', right: '-1.5rem',
                borderRadius: '16px', padding: '1rem 1.25rem',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
              animate={isMobile ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#a78bfa', lineHeight: 1 }}>99%</div>
              <div style={{ fontSize: '0.65rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>ANC</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '40rem', height: '20rem', background: 'rgba(124,58,237,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
    </section>
  )
}

export default About

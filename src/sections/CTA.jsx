import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2, Star, Shield, Truck } from 'lucide-react'

const perks = [
  { icon: Truck,    label: 'Free shipping worldwide' },
  { icon: Shield,   label: '30-day money-back guarantee' },
  { icon: Star,     label: '2-year premium warranty' },
]

const CTA = () => {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setEmail('') }, 4000)
  }

  return (
    <section id="cta" style={{ padding: '7rem 1.5rem', position: 'relative', background: '#050816', overflow: 'hidden' }}>

      <div className="section-divider" style={{ marginBottom: '5rem' }} />

      {/* Glow backdrop */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60rem', height: '30rem',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Heading */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            Limited Launch Offer
          </span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: '#fff' }}>Experience Sound</span>
            <br />
            <span className="gradient-text">Beyond Limits</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '36rem', margin: '0 auto' }}>
            Join 50,000+ audio enthusiasts. Get early access, exclusive pricing, and launch-day delivery.
          </p>
        </motion.div>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2.5rem' }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '0.5rem',
                }}
              >
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                  <Mail size={16} color="#475569" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="cta-input"
                    style={{ paddingLeft: '2.75rem', borderRadius: '14px', border: 'none', background: 'transparent' }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-shimmer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.875rem 1.75rem', borderRadius: '14px',
                    fontWeight: 700, color: '#fff', fontSize: '0.9rem',
                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Early Access
                  <ArrowRight size={16} />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  padding: '1.25rem',
                  background: 'rgba(52,211,153,0.08)',
                  border: '1px solid rgba(52,211,153,0.25)',
                  borderRadius: '20px',
                }}
              >
                <CheckCircle2 size={22} color="#34d399" />
                <span style={{ color: '#f1f5f9', fontWeight: 600 }}>You're on the list! We'll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Perks */}
        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {perks.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p.icon size={15} color="#7c3aed" />
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{p.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {/* Pro */}
          <motion.div
            className="gradient-border"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 100%)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '24px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            {/* Popular badge */}
            <div style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              borderRadius: '99px', padding: '3px 10px',
              fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Most Popular
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AuralX Pro
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.25rem' }}>
              <span className="gradient-text">$299</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1.5rem' }}>One-time purchase</div>
            <motion.button
              className="btn-shimmer"
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                fontWeight: 700, color: '#fff', fontSize: '0.9rem',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now <ArrowRight size={15} />
            </motion.button>
          </motion.div>

          {/* Trial */}
          <motion.div
            className="glass gradient-border"
            style={{ borderRadius: '24px', padding: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Try Before Buy
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.25rem', color: '#34d399' }}>
              Free
            </div>
            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1.5rem' }}>30-day trial, full refund</div>
            <motion.button
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '12px',
                fontWeight: 700, color: '#fff', fontSize: '0.9rem',
                border: '1px solid rgba(52,211,153,0.3)', cursor: 'pointer',
                background: 'rgba(52,211,153,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
              whileHover={{ scale: 1.02, background: 'rgba(52,211,153,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              Start Trial <ArrowRight size={15} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTA

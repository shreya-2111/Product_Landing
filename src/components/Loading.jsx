import { motion } from 'framer-motion'

const Loading = () => (
  <div style={{
    position: 'fixed', inset: 0, background: '#050816',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
  }}>
    {/* Glow */}
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30rem', height: '15rem',
      background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ marginBottom: '2.5rem', textAlign: 'center' }}
    >
      <div style={{
        width: '56px', height: '56px', borderRadius: '18px',
        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem',
        boxShadow: '0 0 40px rgba(124,58,237,0.4)',
      }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem' }}>A</span>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
        AuralX <span style={{
          background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Pro</span>
      </div>
    </motion.div>

    {/* Progress bar */}
    <div style={{ width: '160px', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #06b6d4)', borderRadius: '99px' }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#334155', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
    >
      Loading experience...
    </motion.p>
  </div>
)

export default Loading

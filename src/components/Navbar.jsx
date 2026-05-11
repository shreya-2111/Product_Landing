import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Menu, X, ShoppingCart, Headphones } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Sound',    href: '#story'    },
  { label: 'About',    href: '#about'    },
  { label: 'Pricing',  href: '#cta'      },
]

export default function Navbar() {
  const navRef  = useRef()
  const [scrolled,  setScrolled] = useState(false)
  const [menuOpen,  setMenuOpen] = useState(false)
  const [active,    setActive]   = useState(null)
  const [isMobile,  setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.2 }
    )

    const onScroll = () => setScrolled(window.scrollY > 50)
    const onResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMenuOpen(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '0.7rem 0' : '1.2rem 0',
          background: scrolled ? 'rgba(5,8,22,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <motion.a
            href="#hero"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124,58,237,0.45)', flexShrink: 0,
            }}>
              <Headphones size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.03em', color: '#fff' }}>
              AuralX{' '}
              <span style={{
                background: 'linear-gradient(90deg, #a78bfa, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Pro</span>
            </span>
          </motion.a>

          {/* ── Desktop nav links — hidden on mobile ── */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setActive(link.label)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    position: 'relative',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: active === link.label ? '#fff' : '#94a3b8',
                    textDecoration: 'none',
                    background: active === link.label ? 'rgba(255,255,255,0.06)' : 'transparent',
                    transition: 'color 0.2s, background 0.2s',
                  }}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <motion.span
                    style={{
                      position: 'absolute', bottom: '5px', left: '1rem', right: '1rem',
                      height: '1.5px', borderRadius: '99px',
                      background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                      transformOrigin: 'left',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: active === link.label ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>
          )}

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>

            {/* Specs — desktop only */}
            {!isMobile && (
              <motion.a
                href="#features"
                style={{
                  fontSize: '0.82rem', fontWeight: 500, color: '#64748b',
                  textDecoration: 'none', letterSpacing: '0.02em',
                }}
                whileHover={{ color: '#94a3b8' }}
              >
                Specs
              </motion.a>
            )}

            {/* Buy Now — always visible */}
            <motion.button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: isMobile ? '0.5rem 1rem' : '0.55rem 1.25rem',
                borderRadius: '99px',
                fontSize: '0.85rem', fontWeight: 700,
                color: '#fff', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 50%, #7c3aed 100%)',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
                boxShadow: '0 0 20px rgba(124,58,237,0.35)',
              }}
              whileHover={{ scale: 1.05, y: -1, boxShadow: '0 0 32px rgba(124,58,237,0.6)' }}
              whileTap={{ scale: 0.96 }}
            >
              <ShoppingCart size={14} strokeWidth={2.5} />
              {!isMobile && 'Buy Now'}
            </motion.button>

            {/* Hamburger — mobile only */}
            {isMobile && (
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '0.45rem',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                whileHover={{ background: 'rgba(124,58,237,0.2)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: '68px', left: '1rem', right: '1rem', zIndex: 999,
              background: 'rgba(8,10,24,0.96)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '20px', padding: '1.25rem',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '0.75rem 1rem', borderRadius: '10px',
                    fontSize: '0.95rem', fontWeight: 500,
                    color: '#94a3b8', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                  whileHover={{ color: '#fff', background: 'rgba(124,58,237,0.1)', x: 4 }}
                >
                  {link.label}
                  <span style={{ fontSize: '0.7rem', color: '#334155' }}>→</span>
                </motion.a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
              <motion.button
                style={{
                  width: '100%', padding: '0.875rem', borderRadius: '12px',
                  border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(90deg, #7c3aed, #8b5cf6)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingCart size={16} />
                Buy Now — $299
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

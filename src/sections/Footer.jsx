import { motion } from 'framer-motion'
import { X, Camera, Users, Video, Mail, Phone, MapPin } from 'lucide-react'

const socials = [
  { icon: X,      label: 'X',         href: '#' },
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Users,  label: 'Facebook',  href: '#' },
  { icon: Video,  label: 'YouTube',   href: '#' },
]

const links = {
  Product:  ['Features', 'Specs', 'Reviews', 'Compare'],
  Company:  ['About', 'Careers', 'Press', 'Partners'],
  Support:  ['Help Center', 'Contact', 'Warranty', 'Returns'],
  Legal:    ['Privacy', 'Terms', 'Cookies', 'Licenses'],
}

const Footer = () => (
  <footer style={{ background: '#050816', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 1.5rem 2.5rem', position: 'relative' }}>

    {/* Top gradient line */}
    <div className="section-divider" style={{ marginBottom: '4rem' }} />

    <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

        {/* Brand */}
        <div style={{ gridColumn: 'span 2', minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '0.9rem' }}>A</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              AuralX <span className="gradient-text">Pro</span>
            </span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '22rem', marginBottom: '1.5rem' }}>
            Revolutionising wireless audio with AI-powered technology and premium craftsmanship.
          </p>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {[
              { icon: Mail,   text: 'hello@auralxpro.com' },
              { icon: Phone,  text: '+1 (555) 123-4567' },
              { icon: MapPin, text: 'San Francisco, CA' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Icon size={13} color="#475569" />
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#475569',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ scale: 1.1, y: -2, color: '#7c3aed', borderColor: 'rgba(124,58,237,0.4)' }}
              >
                <s.icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([cat, items], ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            viewport={{ once: true }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f1f5f9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {cat}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {items.map((item, ii) => (
                <li key={ii}>
                  <motion.a
                    href="#"
                    style={{ fontSize: '0.875rem', color: '#475569', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    whileHover={{ color: '#94a3b8', x: 3 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
      }}>
        <p style={{ fontSize: '0.8rem', color: '#334155' }}>
          © 2026 AuralX Pro. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Privacy', 'Terms', 'Cookies'].map((l, i) => (
            <motion.a
              key={i}
              href="#"
              style={{ fontSize: '0.8rem', color: '#334155', textDecoration: 'none' }}
              whileHover={{ color: '#7c3aed' }}
            >
              {l}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer

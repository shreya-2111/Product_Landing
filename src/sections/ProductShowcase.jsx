import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import glbUrl from '../assets/headphone.glb?url'
import { useIsMobile } from '../hooks/useIsMobile'

/* ─── Per-card mini model ─────────────────────────────────── */
function MiniModel({ rotationY = 0, rotationX = 0, autoSpin = false }) {
  const groupRef = useRef()
  const { scene } = useGLTF(glbUrl)

  // Clone + center + scale once
  const cloneRef = useRef(null)
  useEffect(() => {
    if (!scene || !groupRef.current) return
    const clone = scene.clone(true)

    const box    = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    const size   = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)
    clone.position.sub(center)
    const s = 1.5 / Math.max(size.x, size.y, size.z)
    clone.scale.setScalar(s)

    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach(m => {
        m.envMapIntensity = 2.5
        if (m.metalness !== undefined) {
          m.metalness = Math.max(m.metalness, 0.7)
          m.roughness = Math.min(m.roughness ?? 0.4, 0.3)
        }
        m.needsUpdate = true
      })
    })

    while (groupRef.current.children.length) groupRef.current.remove(groupRef.current.children[0])
    groupRef.current.add(clone)
    cloneRef.current = clone

    // Set initial rotation
    groupRef.current.rotation.y = rotationY
    groupRef.current.rotation.x = rotationX
  }, [scene])

  useFrame((state) => {
    if (!groupRef.current) return
    if (autoSpin) {
      groupRef.current.rotation.y += 0.005
    }
    // Subtle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
  })

  return <group ref={groupRef} />
}

/* ─── Card 3D viewer ─────────────────────────────────────── */
function ModelCard({ accent, rotationY, rotationX, autoSpin, label, isMobile }) {
  if (isMobile) {
    // On mobile: static gradient placeholder — no WebGL overhead
    return (
      <div style={{
        aspectRatio: '1',
        background: `radial-gradient(ellipse at 50% 50%, ${accent}30 0%, ${accent}08 50%, transparent 80%)`,
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`,
          backgroundSize: '24px 24px', opacity: 0.35,
        }} />
        <span style={{
          position: 'absolute', top: '0.85rem', left: '0.85rem',
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
          color: accent, opacity: 0.8, zIndex: 10,
        }}>{label}</span>
        {/* Simple headphone icon placeholder */}
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
          border: `1px solid ${accent}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: '1.5rem' }}>🎧</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      aspectRatio: '1',
      background: `radial-gradient(ellipse at 50% 50%, ${accent}20 0%, transparent 70%)`,
      position: 'relative',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`,
        backgroundSize: '24px 24px', opacity: 0.35, pointerEvents: 'none',
      }} />

      {/* Corner label */}
      <span style={{
        position: 'absolute', top: '0.85rem', left: '0.85rem',
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
        color: accent, opacity: 0.8, zIndex: 10,
      }}>
        {label}
      </span>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]}  intensity={2}   color="#ffffff" />
        <pointLight       position={[-3, 2, 3]}  intensity={2.5} color={accent} />
        <pointLight       position={[3, -2, -2]} intensity={1.5} color="#06b6d4" />
        <Environment preset="night" />
        <Suspense fallback={null}>
          <MiniModel rotationY={rotationY} rotationX={rotationX} autoSpin={autoSpin} />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ─── Card data ──────────────────────────────────────────── */
const views = [
  {
    label: '01', title: 'Front View',
    desc: 'Sleek matte-black finish with precision-machined aluminium accents.',
    accent: '#7c3aed', rotationY: 0, rotationX: 0, autoSpin: false,
  },
  {
    label: '02', title: 'Side Profile',
    desc: 'Ultra-thin 18mm profile with adjustable titanium headband.',
    accent: '#06b6d4', rotationY: Math.PI / 2, rotationX: 0, autoSpin: false,
  },
  {
    label: '03', title: '360° View',
    desc: 'Compact fold-flat design fits in any bag or carry-on.',
    accent: '#a78bfa', rotationY: Math.PI * 0.75, rotationX: 0.2, autoSpin: true,
  },
  {
    label: '04', title: 'Detail View',
    desc: 'Premium cushioning and precision-engineered ear cup geometry.',
    accent: '#34d399', rotationY: Math.PI, rotationX: -0.2, autoSpin: false,
  },
]

/* ─── Section ────────────────────────────────────────────── */
const ProductShowcase = () => {
  const sectionRef = useRef()
  const cardsRef   = useRef()
  const isMobile   = useIsMobile()

  useEffect(() => {
    gsap.fromTo(
      Array.from(cardsRef.current.children),
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section id="showcase" ref={sectionRef} style={{ padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden', background: '#050816' }}>

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
            Product Design
          </span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            <span className="gradient-text">Every Angle</span>
            <span style={{ color: '#fff' }}>, Perfected</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
            Obsessive attention to detail in every curve, material, and finish.
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {views.map((v, i) => (
            <motion.div
              key={i}
              className="product-card gradient-border"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ModelCard
                accent={v.accent}
                rotationY={v.rotationY}
                rotationX={v.rotationX}
                autoSpin={v.autoSpin}
                label={v.label}
                isMobile={isMobile}
              />

              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{v.title}</h3>
                  <ArrowUpRight size={16} color={v.accent} />
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BG blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '25rem', height: '25rem', background: 'rgba(124,58,237,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '20rem', height: '20rem', background: 'rgba(6,182,212,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
    </section>
  )
}

export default ProductShowcase

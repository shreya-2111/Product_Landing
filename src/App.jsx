import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar          from './components/Navbar'
import Loading         from './components/Loading'
import CustomCursor    from './components/CustomCursor'
import Hero            from './sections/Hero'
import ProductShowcase from './sections/ProductShowcase'
import Features        from './sections/Features'
import ScrollStory     from './sections/ScrollStory'
import About           from './sections/About'
import CTA             from './sections/CTA'
import Footer          from './sections/Footer'
import { useIsMobile } from './hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    // On mobile, skip Lenis — native scroll is smoother and uses no extra CPU
    if (isMobile) {
      const timer = setTimeout(() => setLoading(false), 800)
      return () => clearTimeout(timer)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    })

    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    // Sync GSAP ticker with Lenis
    gsap.ticker.lagSmoothing(0)

    const timer = setTimeout(() => setLoading(false), 1800)
    return () => { lenis.destroy(); clearTimeout(timer) }
  }, [isMobile])

  if (loading) return <Loading />

  return (
    <div style={{ background: '#050816', minHeight: '100vh' }}>
      {/* Custom cursor is desktop-only — pointless and costly on touch */}
      {!isMobile && <CustomCursor />}
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Features />
      <ScrollStory />
      <About />
      <CTA />
      <Footer />
    </div>
  )
}

export default App

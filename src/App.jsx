import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from './hooks/useIsMobile'

const Navbar          = lazy(() => import('./components/Navbar'))
const Loading         = lazy(() => import('./components/Loading'))
const CustomCursor    = lazy(() => import('./components/CustomCursor'))
const Hero            = lazy(() => import('./sections/Hero'))
const ProductShowcase = lazy(() => import('./sections/ProductShowcase'))
const Features        = lazy(() => import('./sections/Features'))
const ScrollStory     = lazy(() => import('./sections/ScrollStory'))
const About           = lazy(() => import('./sections/About'))
const CTA             = lazy(() => import('./sections/CTA'))
const Footer          = lazy(() => import('./sections/Footer'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isMobile = useIsMobile()
  const enableLenis = useMemo(() => !isMobile && !prefersReducedMotion, [isMobile, prefersReducedMotion])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleMediaChange = (event) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), enableLenis ? 1800 : 800)
    if (!enableLenis) return () => clearTimeout(timer)

    let lenis = null
    let frameId = null
    let active = true

    import('lenis').then((module) => {
      if (!active) return
      const Lenis = module.default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
      })

      const raf = (time) => {
        lenis.raf(time)
        frameId = requestAnimationFrame(raf)
      }
      frameId = requestAnimationFrame(raf)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      active = false
      if (frameId) cancelAnimationFrame(frameId)
      if (lenis) lenis.destroy()
      clearTimeout(timer)
    }
  }, [enableLenis])

  if (loading) {
    return (
      <Suspense fallback={null}>
        <Loading />
      </Suspense>
    )
  }

  return (
    <div style={{ background: '#050816', minHeight: '100vh' }}>
      {!isMobile && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <Suspense fallback={null}>
        <ProductShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollStory />
      </Suspense>
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <CTA />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

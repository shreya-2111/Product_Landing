import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useSmoothScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

export default useSmoothScroll
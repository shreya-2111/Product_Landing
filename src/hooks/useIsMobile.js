import { useState, useEffect } from 'react'

/**
 * Returns true when the viewport is ≤768px OR the device is a touch device.
 * Used to gate heavy 3D / particle / animation code on mobile.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 768 || ('ontouchstart' in window)
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setIsMobile(e.matches || ('ontouchstart' in window))
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}

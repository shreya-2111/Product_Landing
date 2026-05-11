import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HeadphoneModel({ url, mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef()
  const { scene } = useGLTF(url)

  // Clone scene so it can be reused safely
  const clonedScene = useRef(null)

  useEffect(() => {
    if (!scene) return

    // Deep clone
    const clone = scene.clone(true)
    clonedScene.current = clone

    // Compute bounding box → center + normalize scale
    const box    = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    const size   = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)

    // Shift to origin
    clone.position.set(-center.x, -center.y, -center.z)

    // Scale so longest axis = 1.7 units
    const maxAxis = Math.max(size.x, size.y, size.z)
    const s = 1.7 / maxAxis
    clone.scale.setScalar(s)

    // Enhance every mesh material — simplified on mobile
    clone.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow    = !isMobile
      child.receiveShadow = !isMobile
      if (!child.material) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((m) => {
        m.envMapIntensity = isMobile ? 1.2 : 2.5
        if (m.metalness !== undefined) {
          m.metalness = isMobile ? 0.6 : Math.max(m.metalness, 0.7)
          m.roughness = isMobile ? 0.4 : Math.min(m.roughness ?? 0.4, 0.3)
        }
        if ('clearcoat' in m) {
          // Clearcoat is expensive — disable on mobile
          m.clearcoat          = isMobile ? 0 : 1
          m.clearcoatRoughness = 0.1
        }
        m.needsUpdate = true
      })
    })

    // Attach to group
    if (groupRef.current) {
      // Remove old children
      while (groupRef.current.children.length) {
        groupRef.current.remove(groupRef.current.children[0])
      }
      groupRef.current.add(clone)
    }
  }, [scene, isMobile])

  // Entrance: scale from 0, rotate in from side, rise from below
  useEffect(() => {
    if (!groupRef.current) return
    const g = groupRef.current
    g.scale.set(0.01, 0.01, 0.01)
    g.rotation.y = -Math.PI * 0.5
    g.position.y = -2

    let start = null
    const duration = 1800 // ms

    const animate = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      // ease out cubic
      const e = 1 - Math.pow(1 - p, 3)
      const s = 0.01 + e * 0.99
      g.scale.set(s, s, s)
      g.rotation.y = -Math.PI * 0.5 * (1 - e)
      g.position.y = -2 * (1 - e)
      if (p < 1) requestAnimationFrame(animate)
    }

    const id = setTimeout(() => requestAnimationFrame(animate), 400)
    return () => clearTimeout(id)
  }, [])

  // Per-frame: circular orbit + mouse tilt
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const g = groupRef.current

    if (isMobile) {
      // Mobile: simple slow rotation only — no orbit, no mouse tilt
      g.rotation.y += 0.003
      return
    }

    // Circular orbit (small radius so it stays inside ring)
    const r     = 0.09
    const speed = 0.38
    g.position.x = Math.sin(t * speed) * r
    g.position.y = Math.cos(t * speed) * r

    // Mouse tilt — smooth lerp
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouseX * 0.6, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouseY * 0.3, 0.05)

    // Subtle roll following orbit direction
    g.rotation.z = THREE.MathUtils.lerp(
      g.rotation.z,
      Math.sin(t * speed) * 0.04,
      0.05
    )
  })

  return <group ref={groupRef} />
}

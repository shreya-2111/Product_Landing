import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus, Cylinder, Box } from '@react-three/drei'
import * as THREE from 'three'

const Headphones3D = () => {
  const groupRef = useRef()
  const leftEarRef = useRef()
  const rightEarRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    
    if (leftEarRef.current && rightEarRef.current) {
      leftEarRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
      rightEarRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  const headphoneMaterial = new THREE.MeshPhysicalMaterial({
    color: '#1a1a2e',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: '#7c3aed',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#7c3aed',
    emissiveIntensity: 0.1,
  })

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      {/* Headband */}
      <Torus
        args={[1.2, 0.08, 16, 32, Math.PI]}
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        material={headphoneMaterial}
      />
      
      {/* Headband padding */}
      <Cylinder
        args={[0.12, 0.12, 2, 16]}
        position={[0, 0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={accentMaterial}
      />

      {/* Left ear cup */}
      <group ref={leftEarRef} position={[-1, -0.2, 0]}>
        <Cylinder
          args={[0.4, 0.4, 0.15, 32]}
          material={headphoneMaterial}
        />
        <Cylinder
          args={[0.35, 0.35, 0.16, 32]}
          material={accentMaterial}
        />
        <Sphere
          args={[0.3, 32, 32]}
          position={[0, 0, 0.1]}
          material={new THREE.MeshPhysicalMaterial({
            color: '#000000',
            metalness: 0.1,
            roughness: 0.9,
          })}
        />
      </group>

      {/* Right ear cup */}
      <group ref={rightEarRef} position={[1, -0.2, 0]}>
        <Cylinder
          args={[0.4, 0.4, 0.15, 32]}
          material={headphoneMaterial}
        />
        <Cylinder
          args={[0.35, 0.35, 0.16, 32]}
          material={accentMaterial}
        />
        <Sphere
          args={[0.3, 32, 32]}
          position={[0, 0, 0.1]}
          material={new THREE.MeshPhysicalMaterial({
            color: '#000000',
            metalness: 0.1,
            roughness: 0.9,
          })}
        />
      </group>

      {/* Connecting arms */}
      <Cylinder
        args={[0.03, 0.03, 0.8, 16]}
        position={[-0.6, 0.1, 0]}
        rotation={[0, 0, -0.3]}
        material={headphoneMaterial}
      />
      <Cylinder
        args={[0.03, 0.03, 0.8, 16]}
        position={[0.6, 0.1, 0]}
        rotation={[0, 0, 0.3]}
        material={headphoneMaterial}
      />

      {/* LED indicators */}
      <Sphere
        args={[0.02, 16, 16]}
        position={[-1, -0.2, 0.2]}
        material={new THREE.MeshBasicMaterial({
          color: '#00ff88',
          emissive: '#00ff88',
          emissiveIntensity: 0.5,
        })}
      />
      <Sphere
        args={[0.02, 16, 16]}
        position={[1, -0.2, 0.2]}
        material={new THREE.MeshBasicMaterial({
          color: '#00ff88',
          emissive: '#00ff88',
          emissiveIntensity: 0.5,
        })}
      />
    </group>
  )
}

export default Headphones3D
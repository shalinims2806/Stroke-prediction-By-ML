'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // ── Camera ─────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.z = 5

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Lights ─────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const cyanLight = new THREE.PointLight(0x00d4ff, 2, 50)
    cyanLight.position.set(5, 5, 5)
    scene.add(cyanLight)

    const purpleLight = new THREE.PointLight(0x7c3aed, 1, 50)
    purpleLight.position.set(-5, -5, -5)
    scene.add(purpleLight)

    // ── Objects ────────────────────────────────────────────────────────────

    // Torus Knot — cyan
    const torusKnotGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16)
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x004466,
      roughness: 0.2,
      metalness: 0.8,
    })
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat)
    torusKnot.position.set(2, 0, 0)
    scene.add(torusKnot)

    // Icosahedron wireframe — purple
    const icoGeo = new THREE.IcosahedronGeometry(0.6, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x3b0080,
      wireframe: true,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(-1.5, 1, -1)
    scene.add(ico)

    // Sphere — pink
    const sphereGeo = new THREE.SphereGeometry(0.3, 32, 32)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0x660033,
      roughness: 0.1,
      metalness: 0.9,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    sphere.position.set(0, -1, 0.5)
    scene.add(sphere)

    // Box wireframe — orange
    const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0x331100,
      wireframe: true,
    })
    const box = new THREE.Mesh(boxGeo, boxMat)
    box.position.set(-2, -0.5, 0)
    scene.add(box)

    // Small accent sphere — cyan glow
    const accentGeo = new THREE.SphereGeometry(0.15, 16, 16)
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.5,
      roughness: 0,
      metalness: 1,
    })
    const accent = new THREE.Mesh(accentGeo, accentMat)
    accent.position.set(1, 1.5, 0.5)
    scene.add(accent)

    // ── Animation loop ─────────────────────────────────────────────────────
    let frameId: number
    let t = 0

    function animate() {
      frameId = requestAnimationFrame(animate)
      t += 0.012

      // Rotation
      torusKnot.rotation.x += 0.010
      torusKnot.rotation.y += 0.005
      ico.rotation.x += 0.005
      ico.rotation.y += 0.010
      sphere.rotation.y += 0.020
      box.rotation.x += 0.010
      box.rotation.y += 0.015
      accent.rotation.y += 0.030

      // Float (sine wave offset per object)
      torusKnot.position.y = Math.sin(t * 0.5) * 0.3
      ico.position.y = 1 + Math.sin(t * 0.7 + 1.0) * 0.2
      sphere.position.y = -1 + Math.sin(t * 1.2 + 0.5) * 0.3
      box.position.y = -0.5 + Math.sin(t * 0.4 + 2.0) * 0.25
      accent.position.y = 1.5 + Math.sin(t * 1.8 + 0.8) * 0.2

      // Subtle light pulse
      cyanLight.intensity = 2 + Math.sin(t * 1.5) * 0.5
      purpleLight.intensity = 1 + Math.sin(t * 1.0 + 1) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize handler ─────────────────────────────────────────────────────
    function handleResize() {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(mount)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      renderer.dispose()
      torusKnotGeo.dispose()
      torusKnotMat.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
      boxGeo.dispose()
      boxMat.dispose()
      accentGeo.dispose()
      accentMat.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

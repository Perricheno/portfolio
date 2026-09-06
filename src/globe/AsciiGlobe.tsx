import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import countries110m from 'world-atlas/countries-110m.json'
import type { VisitorLocation } from './useVisitorLocation'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

const countryFeatures = feature(
  countries110m as unknown as Topology,
  (countries110m as unknown as Topology).objects.countries as GeometryCollection,
).features

function project(lon: number, lat: number, w: number, h: number): [number, number] {
  return [((lon + 180) / 360) * w, ((90 - lat) / 180) * h]
}

function buildTexture(visitor: VisitorLocation | null): HTMLCanvasElement {
  const w = 800
  const h = 400
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  // AsciiEffect maps bright pixels to sparse characters (space) and dark
  // pixels to dense ones — so water must be bright (empty) and land dark
  // (filled) to read as "water empty, land drawn".
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#111'

  const drawRing = (ring: number[][]) => {
    ctx.beginPath()
    ring.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat, w, h)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fill()
  }

  for (const f of countryFeatures) {
    const geom = f.geometry
    if (!geom) continue
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach((ring) => drawRing(ring as number[][]))
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly) => poly.forEach((ring) => drawRing(ring as number[][])))
    }
  }

  ctx.fillStyle = '#000'
  const [mx, my] = project(ME.lng, ME.lat, w, h)
  ctx.beginPath()
  ctx.arc(mx, my, 7, 0, Math.PI * 2)
  ctx.fill()

  if (visitor) {
    const [vx, vy] = project(visitor.lng, visitor.lat, w, h)
    ctx.beginPath()
    ctx.arc(vx, vy, 7, 0, Math.PI * 2)
    ctx.fill()
  }

  return canvas
}

export function AsciiGlobe({ visitor }: { visitor: VisitorLocation | null }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // Render a touch smaller than the box: monospace character-grid sizing
    // in AsciiEffect can round up by a few px, so this keeps it from
    // clipping against the container edge.
    const size = Math.floor((container.offsetWidth || 300) * 0.94)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 3.2

    const texture = new THREE.CanvasTexture(buildTexture(visitor))
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 48, 48),
      new THREE.MeshBasicMaterial({ map: texture }),
    )
    // THREE.SphereGeometry's default UV mapping faces the camera at u≈0.25
    // of the texture, which for our equirectangular canvas is ~90°W — the
    // Pacific, almost entirely ocean. Rotating 180° brings Africa/Europe/
    // Asia (and the "me" marker) to the front instead.
    sphere.rotation.y = Math.PI
    scene.add(sphere)

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(size, size)

    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { resolution: 0.22, invert: false })
    effect.setSize(size, size)
    effect.domElement.style.color = 'var(--text-h)'
    effect.domElement.style.backgroundColor = 'transparent'
    effect.domElement.style.pointerEvents = 'none'
    effect.domElement.style.touchAction = 'pan-y'
    effect.domElement.style.maxWidth = '100%'
    effect.domElement.style.maxHeight = '100%'
    effect.domElement.style.overflow = 'hidden'
    const table = effect.domElement.querySelector('table')
    if (table) {
      table.style.maxWidth = '100%'
      table.style.maxHeight = '100%'
    }

    container.replaceChildren(effect.domElement)

    let raf: number
    let printing = false
    const animate = () => {
      if (!printing) sphere.rotation.y += 0.0035
      effect.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    // Freeze on the land-heavy orientation it opens on for printing
    // instead of whatever mid-spin frame the rotation landed on.
    const freezeForPrint = () => {
      printing = true
      sphere.rotation.y = Math.PI
      effect.render(scene, camera)
    }
    const resumeAfterPrint = () => {
      printing = false
    }
    window.addEventListener('beforeprint', freezeForPrint)
    window.addEventListener('afterprint', resumeAfterPrint)

    return () => {
      window.removeEventListener('beforeprint', freezeForPrint)
      window.removeEventListener('afterprint', resumeAfterPrint)
      cancelAnimationFrame(raf)
      renderer.dispose()
      texture.dispose()
      container.replaceChildren()
    }
  }, [visitor])

  return (
    <div
      ref={containerRef}
      className="flex aspect-square w-full items-center justify-center overflow-hidden text-[8px] leading-none"
      style={{ touchAction: 'pan-y' }}
    />
  )
}

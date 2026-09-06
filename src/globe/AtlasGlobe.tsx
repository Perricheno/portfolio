import createGlobe from 'globe.gl'
import { useEffect, useRef } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import countries110m from 'world-atlas/countries-110m.json'
import type { VisitorLocation } from './useVisitorLocation'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

const countryFeatures = feature(
  countries110m as unknown as Topology,
  (countries110m as unknown as Topology).objects.countries as GeometryCollection,
).features

export function AtlasGlobe({ visitor }: { visitor: VisitorLocation | null }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    let cleanupGlobe = () => {}

    // Building ~180 country polygon meshes from the topojson data is heavy
    // enough (a few hundred ms) to block the very frame this mounts on,
    // which reads as a jank/"jump" right as the lazy-loaded globe pops in.
    // Deferring past the next paint lets the browser show the (already
    // correctly sized) empty container first, so the heavy work happens
    // off that critical frame instead of stalling it.
    const raf = requestAnimationFrame(() => {
      if (cancelled) return
      cleanupGlobe = mountGlobe(el, visitor)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      cleanupGlobe()
    }
  }, [visitor])

  return (
    <div ref={containerRef} className="relative aspect-square w-full" style={{ touchAction: 'pan-y' }} />
  )
}

function mountGlobe(el: HTMLDivElement, visitor: VisitorLocation | null): () => void {
  const size = el.offsetWidth

  const points = [{ ...ME, label: 'me' }, ...(visitor ? [{ ...visitor, label: 'you' }] : [])]
  const arcs = visitor
    ? [{ startLat: ME.lat, startLng: ME.lng, endLat: visitor.lat, endLng: visitor.lng }]
    : []

  const globe = new createGlobe(el)
    .width(size)
    .height(size)
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(false)
    .polygonsData(countryFeatures)
    .polygonGeoJsonGeometry((d: object) => (d as (typeof countryFeatures)[number]).geometry as never)
    .polygonCapColor(() => '#c9c7bf')
    .polygonSideColor(() => 'rgba(0,0,0,0)')
    .polygonStrokeColor(() => '#8f8d84')
    .polygonAltitude(0.006)
    .pointsData(points)
    .pointLat((d: object) => (d as VisitorLocation).lat)
    .pointLng((d: object) => (d as VisitorLocation).lng)
    .pointColor(() => '#111111')
    .pointAltitude(0.02)
    .pointRadius(0.45)
    .arcsData(arcs)
    .arcColor(() => '#111111')
    .arcAltitude(0.25)
    .arcStroke(0.4)
    .arcDashLength(0.5)
    .arcDashGap(0.3)
    .arcDashAnimateTime(3500)
    .enablePointerInteraction(false)

  const material = globe.globeMaterial() as unknown as { color: { set: (hex: string) => void } }
  material.color.set('#f4f3ee')

  globe.pointOfView({ lat: 45, lng: 55, altitude: 2 }, 0)

  const controls = globe.controls()
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6
  controls.enableZoom = false

  // Printing should freeze the globe on a land-heavy view (Europe/Asia,
  // the same spot it opens on) instead of whatever ocean-facing angle
  // autorotate happened to land on — snap back right before the print
  // dialog renders, resume spinning once it's closed.
  let snapshot: HTMLImageElement | null = null
  const snapshotForPrint = () => {
    const canvas = el.querySelector('canvas')
    if (!canvas) return
    try {
      const dataUrl = canvas.toDataURL('image/png')
      if (!snapshot) {
        snapshot = new Image()
        snapshot.className = 'pointer-events-none absolute inset-0 h-full w-full object-contain'
        el.appendChild(snapshot)
      }
      snapshot.src = dataUrl
      canvas.style.visibility = 'hidden'
    } catch {
      // Canvas unreadable (e.g. a tainted WebGL context) — nothing we can
      // do, the live canvas stays as the fallback.
    }
  }
  const freezeForPrint = () => {
    controls.autoRotate = false
    globe.pointOfView({ lat: 45, lng: 55, altitude: 2 }, 0)
    // globe.gl/three.js paint the reset camera angle on their own next
    // animation-frame tick, and browsers' print pipelines frequently drop
    // live WebGL canvases from the output entirely — swap in a still
    // image instead, once (immediately) and again shortly after to make
    // sure it captures the settled, reset frame rather than a
    // mid-transition one.
    snapshotForPrint()
    setTimeout(snapshotForPrint, 80)
  }
  const resumeAfterPrint = () => {
    controls.autoRotate = true
    const canvas = el.querySelector('canvas')
    if (canvas) canvas.style.visibility = ''
    snapshot?.remove()
    snapshot = null
  }
  window.addEventListener('beforeprint', freezeForPrint)
  window.addEventListener('afterprint', resumeAfterPrint)

  return () => {
    window.removeEventListener('beforeprint', freezeForPrint)
    window.removeEventListener('afterprint', resumeAfterPrint)
    snapshot?.remove()
    el.replaceChildren()
  }
}

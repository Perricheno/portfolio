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

    return () => {
      el.replaceChildren()
    }
  }, [visitor])

  return <div ref={containerRef} className="aspect-square w-full" style={{ touchAction: 'pan-y' }} />
}

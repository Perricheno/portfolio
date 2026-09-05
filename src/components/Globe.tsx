import createGlobe from 'globe.gl'
import { useEffect, useRef, useState } from 'react'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import countries110m from 'world-atlas/countries-110m.json'
import { useLanguage } from '../i18n/LanguageContext'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

const countryFeatures = feature(
  countries110m as unknown as Topology,
  (countries110m as unknown as Topology).objects.countries as GeometryCollection,
).features

interface VisitorLocation {
  lat: number
  lng: number
  city: string
}

async function detectVisitor(): Promise<VisitorLocation | null> {
  const endpoints = ['https://ipwho.is/', 'https://ipapi.co/json/']
  for (const url of endpoints) {
    try {
      const res = await fetch(url)
      if (!res.ok) continue
      const data = await res.json()
      const lat = data.latitude
      const lng = data.longitude
      const city = data.city
      if (typeof lat === 'number' && typeof lng === 'number' && city) {
        return { lat, lng, city }
      }
    } catch {
      // try next endpoint
    }
  }
  return null
}

export function Globe() {
  const { locale } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [visitor, setVisitor] = useState<VisitorLocation | null>(null)
  const [visitorChecked, setVisitorChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    detectVisitor().then((loc) => {
      if (!cancelled) {
        setVisitor(loc)
        setVisitorChecked(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

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

  const meLabel = locale === 'ru' ? 'Я' : 'Me'
  const youLabel = locale === 'ru' ? 'Вы' : 'You'

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="aspect-square w-full" />
      <div className="mt-2 flex flex-col items-center gap-1 text-xs text-[var(--text)]">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-h)]" />
          {meLabel} — {ME.city}
        </span>
        {visitorChecked && visitor && (
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-h)]" />
            {youLabel} — {visitor.city}
          </span>
        )}
      </div>
    </div>
  )
}

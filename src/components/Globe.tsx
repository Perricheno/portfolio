import createGlobe from 'cobe'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
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
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.offsetWidth || 220
    let phi = 0
    let animationFrame: number

    const markers = [{ location: [ME.lat, ME.lng] as [number, number], size: 0.09 }]
    const arcs: { from: [number, number]; to: [number, number] }[] = []
    if (visitor) {
      markers.push({ location: [visitor.lat, visitor.lng], size: 0.09 })
      arcs.push({ from: [ME.lat, ME.lng], to: [visitor.lat, visitor.lng] })
    }

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.82, 0.81, 0.78],
      markerColor: [0.05, 0.05, 0.05],
      glowColor: [0.94, 0.93, 0.9],
      offset: [0, 0],
      markers,
      arcs,
      arcColor: [0.05, 0.05, 0.05],
      arcWidth: 0.4,
      arcHeight: 0.35,
    })

    const animate = () => {
      phi += 0.0035
      globe.update({ phi })
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      globe.destroy()
    }
  }, [visitor])

  const meLabel = locale === 'ru' ? 'Я' : 'Me'
  const youLabel = locale === 'ru' ? 'Вы' : 'You'

  return (
    <div className="flex flex-col items-center">
      <div className="aspect-square w-full">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
        />
      </div>
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

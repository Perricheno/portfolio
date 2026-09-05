import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import type { VisitorLocation } from './useVisitorLocation'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

export function DotsGlobe({ visitor }: { visitor: VisitorLocation | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  return (
    <div className="aspect-square w-full" style={{ touchAction: 'pan-y' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
      />
    </div>
  )
}

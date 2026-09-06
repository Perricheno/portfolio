import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import type { VisitorLocation } from './useVisitorLocation'

const ME = { lat: 51.1801, lng: 71.446, city: 'Астана' }

export function DotsGlobe({ visitor }: { visitor: VisitorLocation | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

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
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 0.95],
      markerColor: [1, 1, 1],
      glowColor: [0.18, 0.18, 0.2],
      offset: [0, 0],
      markers,
      arcs,
      arcColor: [1, 1, 1],
      arcWidth: 0.4,
      arcHeight: 0.35,
    })

    let printing = false

    const animate = () => {
      if (!printing) phi += 0.0035
      globe.update({ phi })
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    // Freeze on the map's default (land-heavy) orientation for printing
    // instead of whatever longitude the continuous rotation landed on.
    // Browsers' print pipelines also frequently drop live WebGL canvases
    // from the output entirely — cobe renders synchronously inside
    // update(), so swap in a still image of the just-drawn frame too.
    let snapshot: HTMLImageElement | null = null
    const snapshotForPrint = () => {
      try {
        const dataUrl = canvas.toDataURL('image/png')
        if (!snapshot) {
          snapshot = new Image()
          snapshot.className = 'pointer-events-none absolute inset-0 h-full w-full object-contain'
          wrap.appendChild(snapshot)
        }
        snapshot.src = dataUrl
        canvas.style.visibility = 'hidden'
      } catch {
        // Canvas unreadable — nothing we can do, live canvas stays as the
        // fallback.
      }
    }
    const freezeForPrint = () => {
      printing = true
      phi = 0
      globe.update({ phi })
      snapshotForPrint()
      setTimeout(snapshotForPrint, 80)
    }
    const resumeAfterPrint = () => {
      printing = false
      canvas.style.visibility = ''
      snapshot?.remove()
      snapshot = null
    }
    window.addEventListener('beforeprint', freezeForPrint)
    window.addEventListener('afterprint', resumeAfterPrint)

    return () => {
      window.removeEventListener('beforeprint', freezeForPrint)
      window.removeEventListener('afterprint', resumeAfterPrint)
      snapshot?.remove()
      cancelAnimationFrame(animationFrame)
      globe.destroy()
    }
  }, [visitor])

  return (
    <div ref={wrapRef} className="relative aspect-square w-full" style={{ touchAction: 'pan-y' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
      />
    </div>
  )
}

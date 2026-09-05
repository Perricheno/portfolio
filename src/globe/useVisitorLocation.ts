import { useEffect, useState } from 'react'

export interface VisitorLocation {
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

export function useVisitorLocation(enabled: boolean) {
  const [visitor, setVisitor] = useState<VisitorLocation | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    detectVisitor().then((loc) => {
      if (!cancelled) {
        setVisitor(loc)
        setChecked(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [enabled])

  return { visitor, checked }
}

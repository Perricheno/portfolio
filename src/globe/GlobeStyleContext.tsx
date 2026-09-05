import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type GlobeStyle = 'atlas' | 'dots' | 'ascii'

const ORDER: GlobeStyle[] = ['atlas', 'dots', 'ascii']

// Change this to set which globe style every new visitor sees by default.
// Visitors who click the globe-style button keep their own choice (saved
// in their browser) regardless of this value.
const DEFAULT_STYLE: GlobeStyle = 'atlas'

interface GlobeStyleContextValue {
  style: GlobeStyle
  cycleStyle: () => void
}

const GlobeStyleContext = createContext<GlobeStyleContextValue | null>(null)

const STORAGE_KEY = 'cv-globe-style'

function getInitialStyle(): GlobeStyle {
  if (typeof window === 'undefined') return DEFAULT_STYLE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'atlas' || stored === 'dots' || stored === 'ascii') return stored
  return DEFAULT_STYLE
}

export function GlobeStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<GlobeStyle>(getInitialStyle)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, style)
  }, [style])

  const value = useMemo<GlobeStyleContextValue>(
    () => ({
      style,
      cycleStyle: () => {
        const next = ORDER[(ORDER.indexOf(style) + 1) % ORDER.length]
        setStyle(next)
      },
    }),
    [style],
  )

  return <GlobeStyleContext.Provider value={value}>{children}</GlobeStyleContext.Provider>
}

export function useGlobeStyle() {
  const ctx = useContext(GlobeStyleContext)
  if (!ctx) throw new Error('useGlobeStyle must be used within GlobeStyleProvider')
  return ctx
}

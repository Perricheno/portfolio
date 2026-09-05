import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'cv-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
    // Keep the phone browser's own chrome (status bar / address bar) in
    // sync with the theme instead of leaving it at its own default color.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#141414' : '#ffffff')
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: (origin) => {
        const next = theme === 'light' ? 'dark' : 'light'
        const root = document.documentElement

        if (origin) {
          root.style.setProperty('--theme-toggle-x', `${origin.x}px`)
          root.style.setProperty('--theme-toggle-y', `${origin.y}px`)
        }

        const canAnimate =
          typeof document.startViewTransition === 'function' &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (canAnimate) {
          document.startViewTransition(() => setTheme(next))
        } else {
          setTheme(next)
        }
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

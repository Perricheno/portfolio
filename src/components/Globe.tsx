import { lazy, Suspense } from 'react'
import { useGlobeStyle } from '../globe/GlobeStyleContext'
import { useVisitorLocation } from '../globe/useVisitorLocation'
import { useLanguage } from '../i18n/LanguageContext'

const ME_CITY = 'Астана'

const AtlasGlobe = lazy(() => import('../globe/AtlasGlobe').then((m) => ({ default: m.AtlasGlobe })))
const DotsGlobe = lazy(() => import('../globe/DotsGlobe').then((m) => ({ default: m.DotsGlobe })))
const AsciiGlobe = lazy(() => import('../globe/AsciiGlobe').then((m) => ({ default: m.AsciiGlobe })))

export function Globe() {
  const { locale } = useLanguage()
  const { style } = useGlobeStyle()
  const { visitor, checked } = useVisitorLocation(style !== 'off')

  if (style === 'off') return null

  const meLabel = locale === 'ru' ? 'Я' : 'Me'
  const youLabel = locale === 'ru' ? 'Вы' : 'You'

  const fallback = <div className="aspect-square w-full rounded-full bg-[var(--surface)]" />

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={fallback}>
        {style === 'atlas' && <AtlasGlobe visitor={visitor} />}
        {style === 'dots' && <DotsGlobe visitor={visitor} />}
        {style === 'ascii' && <AsciiGlobe visitor={visitor} />}
      </Suspense>
      <div className="mt-2 flex flex-col items-center gap-1 text-xs text-[var(--text)] print:mt-1 print:text-[6px]">
        <span className="flex items-center gap-1.5 print:gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-h)] print:h-1 print:w-1" />
          {meLabel} — {ME_CITY}
        </span>
        {checked && visitor && (
          <span className="flex items-center gap-1.5 print:gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-h)] print:h-1 print:w-1" />
            {youLabel} — {visitor.city}
          </span>
        )}
      </div>
    </div>
  )
}

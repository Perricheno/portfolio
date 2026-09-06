import { Globe as GlobeIconData, GlobeOff as GlobeOffData, Moon as MoonData, Sun as SunData } from 'lucide'
import { MorphIcon } from 'morphicons/react'
import { useGlobeStyle } from '../globe/GlobeStyleContext'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'

export function Nav() {
  const { t, locale, toggleLocale } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { style, cycleStyle } = useGlobeStyle()

  const links: [string, string][] = [
    ['#about', t.nav.about],
    ['#experience', t.nav.experience],
    ['#education', t.nav.education],
    ['#skills', t.nav.skills],
    ['#projects', t.nav.projects],
    ['#contact', t.nav.contact],
  ]

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)] print:hidden">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-bold tracking-tight text-[var(--text-h)]">
          Perricheno
        </a>
        <ul className="hidden gap-4 whitespace-nowrap text-sm text-[var(--text)] lg:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-[var(--text-h)]">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleStyle}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-h)]"
            aria-label="Change globe style"
            title={style === 'off' ? 'Globe: off' : `Globe: ${style}`}
          >
            <MorphIcon
              icon={style === 'off' ? GlobeOffData : GlobeIconData}
              size={14}
              spring="snappy"
            />
          </button>
          <button
            type="button"
            onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-h)]"
            aria-label="Toggle theme"
          >
            <MorphIcon icon={theme === 'dark' ? SunData : MoonData} size={14} spring="snappy" />
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-h)]"
            aria-label="Toggle language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>
      </nav>
    </header>
  )
}

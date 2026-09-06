import { Globe as GlobeIcon, GlobeOff, Moon, Sun } from 'lucide-react'
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
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]">
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
            {style === 'off' ? <GlobeOff size={14} /> : <GlobeIcon size={14} />}
          </button>
          <button
            type="button"
            onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-h)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
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

import { useLanguage } from '../i18n/LanguageContext'

export function Nav() {
  const { t, locale, toggleLocale } = useLanguage()

  const links: [string, string][] = [
    ['#about', t.nav.about],
    ['#experience', t.nav.experience],
    ['#education', t.nav.education],
    ['#certificates', t.nav.certificates],
    ['#skills', t.nav.skills],
    ['#projects', t.nav.projects],
    ['#contact', t.nav.contact],
  ]

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="h-5 w-5" />
          <span className="text-sm font-bold tracking-tight text-[var(--text-h)]">
            {t.hero.name}
          </span>
        </a>
        <ul className="hidden gap-5 text-sm text-[var(--text)] lg:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-[var(--text-h)]">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-h)]"
          aria-label="Toggle language"
        >
          {locale === 'ru' ? 'EN' : 'RU'}
        </button>
      </nav>
    </header>
  )
}

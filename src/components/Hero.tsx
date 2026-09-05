import { Globe } from './Globe'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 px-6 pb-10 pt-12 md:grid-cols-[1fr_auto] md:pb-14 md:pt-16"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]">
          {t.hero.greeting}
        </p>
        <h1 className="mt-2 text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-h)] md:text-7xl">
          {t.hero.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-[var(--text)] md:text-2xl">{t.hero.role}</p>
        <p className="mt-4 max-w-xl text-[var(--text)]">{t.hero.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-[var(--text-h)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--bg)] transition-opacity hover:opacity-80"
          >
            {t.hero.cta}
          </a>
          <a
            href="/resume.pdf"
            className="rounded-full border border-[var(--border)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-h)] transition-colors hover:border-[var(--text-h)]"
          >
            {t.hero.resume}
          </a>
        </div>
      </div>
      <div className="w-full max-w-[220px] justify-self-center md:w-[220px] md:justify-self-end">
        <Globe />
      </div>
    </section>
  )
}

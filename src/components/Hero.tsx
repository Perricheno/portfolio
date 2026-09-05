import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]">
        {t.hero.greeting}
      </p>
      <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-h)] md:text-7xl">
        {t.hero.name}
      </h1>
      <p className="mt-4 text-xl font-medium text-[var(--text)] md:text-2xl">{t.hero.role}</p>
      <p className="mt-6 max-w-xl text-[var(--text)]">{t.hero.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
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
    </section>
  )
}

import { User } from 'lucide-react'
import { AboutMarkdown } from './AboutMarkdown'
import { Globe } from './Globe'
import { useGlobeStyle } from '../globe/GlobeStyleContext'
import { resumeLinks } from '../data/resumeLinks.generated'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * Hero (name/role/tagline/CTAs) and About, merged into one component so the
 * globe can be a *single* mounted instance that's simply repositioned by
 * CSS grid-area between two layouts:
 *  - screen: name/role/tagline/buttons in a column, globe to the right —
 *    About renders as its own full-width block underneath (unchanged from
 *    before).
 *  - print: tagline/buttons/screen-slot are hidden; About moves up to sit
 *    directly under the role line, split side-by-side with the globe.
 * Splitting Hero/About into two components and duplicating the globe into
 * both would double its (heavy, WebGL) mount cost just to reposition it —
 * this keeps it to one.
 */
export function Intro() {
  const { t, locale } = useLanguage()
  const { style } = useGlobeStyle()
  const showGlobe = style !== 'off'

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-10 pt-12 md:pb-14 md:pt-16 print:pb-6 print:pt-10">
      <div className="intro-grid" data-globe={showGlobe ? 'on' : 'off'}>
        <div style={{ gridArea: 'name' }}>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-h)] md:text-7xl print:text-2xl">
            {t.hero.name}
          </h1>
        </div>

        <div style={{ gridArea: 'role' }}>
          <p className="text-xl font-medium text-[var(--text)] md:text-2xl print:text-xs">{t.hero.role}</p>
        </div>

        <p
          style={{ gridArea: 'tagline' }}
          className="max-w-xl font-light leading-relaxed text-[var(--text)] print:hidden"
        >
          {t.hero.tagline}
        </p>

        <div style={{ gridArea: 'buttons' }} className="flex flex-wrap gap-3 print:hidden">
          <a
            href="#contact"
            className="rounded-full bg-[var(--text-h)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--bg)] transition-opacity hover:opacity-80"
          >
            {t.hero.cta}
          </a>
          <a
            href={resumeLinks[locale]}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--border)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-h)] transition-colors hover:border-[var(--text-h)]"
          >
            {t.hero.resume}
          </a>
        </div>

        {showGlobe && (
          <div
            style={{ gridArea: 'globe' }}
            className="w-full max-w-[300px] justify-self-center md:w-[300px] md:justify-self-end print:max-w-[150px] print:justify-self-center"
          >
            <Globe />
          </div>
        )}

        <div
          style={{ gridArea: 'aboutHeader' }}
          className="border-t border-[var(--border)] pt-10 md:pt-14 print:border-0 print:pt-0"
        >
          <div className="flex items-center gap-3 print:gap-1.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-h)] print:hidden">
              <User size={18} strokeWidth={2} />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-h)] md:text-3xl print:text-[8px] print:uppercase print:tracking-wide">
              {t.about.title}
            </h2>
          </div>
        </div>

        <div
          style={{ gridArea: 'aboutBody' }}
          className="mt-6 space-y-4 font-light leading-[1.8] text-[var(--text)] pb-10 md:pb-14 print:mt-1 print:space-y-0.5 print:pb-0 print:text-[6px] print:leading-snug"
        >
          <AboutMarkdown markdown={t.about.markdown} />
        </div>
      </div>
    </section>
  )
}

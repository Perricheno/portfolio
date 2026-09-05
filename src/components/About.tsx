import aboutEn from '../content/about.en.md?raw'
import aboutRu from '../content/about.ru.md?raw'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

const ABOUT_MD = { ru: aboutRu, en: aboutEn }

export function About() {
  const { t, locale } = useLanguage()
  const paragraphs = ABOUT_MD[locale]
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <Section id="about" index={t.about.index} title={t.about.title}>
      <div className="space-y-4 font-light leading-[1.8] text-[var(--text)]">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  )
}

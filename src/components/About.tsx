import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function About() {
  const { t } = useLanguage()

  return (
    <Section id="about" index={t.about.index} title={t.about.title}>
      <div className="space-y-4 text-[var(--text)]">
        {t.about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  )
}

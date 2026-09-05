import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Experience() {
  const { t } = useLanguage()

  return (
    <Section id="experience" index={t.experience.index} title={t.experience.title}>
      <ol className="space-y-5">
        {t.experience.items.map((item) => (
          <li key={`${item.company}-${item.period}`} className="grid gap-1 md:grid-cols-[160px_1fr]">
            <span className="font-mono text-sm text-[var(--text)]">{item.period}</span>
            <div>
              <h3 className="font-medium text-[var(--text-h)]">
                {item.role} · {item.company}
              </h3>
              <p className="mt-1 text-[var(--text)]">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

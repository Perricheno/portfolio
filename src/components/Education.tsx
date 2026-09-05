import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Education() {
  const { t } = useLanguage()

  return (
    <Section id="education" index={t.education.index} title={t.education.title}>
      <ol className="space-y-5">
        {t.education.items.map((item) => (
          <li key={`${item.institution}-${item.period}`} className="grid gap-1 md:grid-cols-[160px_1fr]">
            <span className="font-mono text-sm text-[var(--text)]">{item.period}</span>
            <div>
              <h3 className="font-medium text-[var(--text-h)]">
                {item.degree} · {item.institution}
              </h3>
              {item.description && (
                <p className="mt-1 font-light leading-relaxed text-[var(--text)]">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

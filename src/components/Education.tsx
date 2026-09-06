import { GraduationCap } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Education() {
  const { t } = useLanguage()

  return (
    <Section id="education" icon={GraduationCap} title={t.education.title}>
      <ol className="space-y-5 print:space-y-1">
        {t.education.items.map((item) => (
          <li
            key={`${item.institution}-${item.period}`}
            className="grid gap-1 print:break-inside-avoid print:gap-0.5 md:grid-cols-[160px_1fr] print:grid-cols-[70px_1fr]"
          >
            <span className="font-mono text-sm text-[var(--text)] print:text-[7px]">{item.period}</span>
            <div>
              <h3 className="font-medium text-[var(--text-h)]">
                {item.degree} · {item.institution}
              </h3>
              {item.description && (
                <p className="mt-1 font-light leading-relaxed text-[var(--text)] print:mt-0.5">
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

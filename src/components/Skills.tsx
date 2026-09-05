import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <Section id="skills" index={t.skills.index} title={t.skills.title}>
      <div className="grid gap-8 sm:grid-cols-3">
        {t.skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--text-h)]">
              {group.title}
            </h3>
            <ul className="space-y-1.5 text-[var(--text)]">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

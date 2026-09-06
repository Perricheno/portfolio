import { Cpu } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <Section id="skills" icon={Cpu} title={t.skills.title}>
      <div className="space-y-5">
        {t.skills.groups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2 print:break-inside-avoid sm:grid-cols-[220px_1fr] sm:gap-6"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

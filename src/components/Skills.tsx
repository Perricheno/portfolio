import { Cpu } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Skills() {
  const { t } = useLanguage()

  return (
    <Section id="skills" icon={Cpu} title={t.skills.title}>
      <div className="space-y-5 print:space-y-1">
        {t.skills.groups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2 print:break-inside-avoid sm:grid-cols-[220px_1fr] sm:gap-6 print:grid-cols-[90px_1fr] print:gap-1"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] print:text-[7px]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2 print:gap-1">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text)] print:px-1.5 print:py-0 print:text-[6.5px]"
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

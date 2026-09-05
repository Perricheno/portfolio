import { Award } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Certificates() {
  const { t } = useLanguage()

  return (
    <Section id="certificates" index={t.certificates.index} title={t.certificates.title}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {t.certificates.items.map((cert) => (
          <li key={`${cert.title}-${cert.year}`}>
            <a
              href={cert.link ?? '#'}
              className="flex items-start gap-3 rounded-2xl border border-[var(--border)] p-5 transition-colors hover:border-[var(--accent)]"
            >
              <Award size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <div>
                <h3 className="font-medium text-[var(--text-h)]">{cert.title}</h3>
                <p className="mt-1 text-sm text-[var(--text)]">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

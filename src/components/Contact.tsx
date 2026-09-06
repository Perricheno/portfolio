import { Mail } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { socials } from '../data/socials'

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contact" icon={Mail} title={t.contact.title}>
      <p className="max-w-lg font-light leading-relaxed text-[var(--text)]">{t.contact.text}</p>
      <div className="mt-8 flex flex-wrap gap-3 print:mt-1.5 print:gap-1.5">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-h)] transition-colors hover:border-[var(--accent)] print:gap-1 print:px-2 print:py-0.5 print:text-[7px]"
          >
            <Icon size={16} className="print:hidden" />
            {label}
          </a>
        ))}
      </div>
    </Section>
  )
}

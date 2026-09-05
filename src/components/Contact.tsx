import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { socials } from '../data/socials'

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contact" index={t.contact.index} title={t.contact.title}>
      <p className="max-w-lg font-light leading-relaxed text-[var(--text)]">{t.contact.text}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-h)] transition-colors hover:border-[var(--accent)]"
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </div>
    </Section>
  )
}

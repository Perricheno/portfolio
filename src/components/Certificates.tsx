import { Award, ChevronDown, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Certificates() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <Section id="certificates" icon={Award} title={t.certificates.title}>
      <ul className="space-y-3">
        {t.certificates.items.map((cert, i) => {
          const isOpen = open.has(i)
          return (
            <li
              key={`${cert.title}-${cert.year}`}
              className="rounded-2xl border border-[var(--border)] transition-colors hover:border-[var(--accent)]"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 p-5 text-left"
              >
                <Award size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div className="flex-1">
                  <h3 className="font-medium text-[var(--text-h)]">{cert.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text)]">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
                <ChevronDown
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--text)] transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <div
                      className="flex items-center justify-center overflow-hidden rounded-xl bg-[var(--surface)]"
                      style={{ aspectRatio: '1.414 / 1' }}
                    >
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <p className="px-6 text-center text-sm text-[var(--text)]">
                          {t.certificates.noImage}
                        </p>
                      )}
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-h)] underline decoration-[var(--border)] underline-offset-2 hover:decoration-[var(--text-h)]"
                      >
                        {t.certificates.viewOriginal}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

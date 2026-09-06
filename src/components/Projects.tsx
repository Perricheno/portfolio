import { Rocket } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { renderInline } from '../lib/inlineMarkdown'

export function Projects() {
  const { t } = useLanguage()

  return (
    <Section id="projects" icon={Rocket} title={t.projects.title}>
      <ol className="space-y-6">
        {t.projects.items.map((project, i) => (
          <li
            key={`${project.title}-${i}`}
            className="grid gap-1 print:break-inside-avoid md:grid-cols-[160px_1fr]"
          >
            <span className="font-mono text-sm text-[var(--text)]">{project.period}</span>
            <div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[var(--text-h)] underline decoration-[var(--border)] underline-offset-2 hover:decoration-[var(--text-h)]"
                >
                  {project.title}
                </a>
              ) : (
                <h3 className="font-medium text-[var(--text-h)]">{project.title}</h3>
              )}
              {project.subtitle && (
                <p className="text-sm text-[var(--text)]">{project.subtitle}</p>
              )}
              <ul className="mt-2 list-disc space-y-1.5 pl-4 font-light leading-relaxed text-[var(--text)]">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{renderInline(bullet)}</li>
                ))}
              </ul>
              {project.tags && project.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

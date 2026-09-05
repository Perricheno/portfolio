import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { useLanguage } from '../i18n/LanguageContext'

export function Projects() {
  const { t } = useLanguage()

  return (
    <Section id="projects" index={t.projects.index} title={t.projects.title}>
      <div className="grid gap-6 sm:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <a
            key={`${project.title}-${i}`}
            href={project.link ?? '#'}
            className="group rounded-2xl border border-[var(--border)] p-6 transition-colors hover:border-[var(--accent)]"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-[var(--text-h)]">{project.title}</h3>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-[var(--text)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </div>
            <p className="mt-2 text-sm text-[var(--text)]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}

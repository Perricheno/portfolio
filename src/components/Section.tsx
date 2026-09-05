import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-[var(--border)] py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 flex items-baseline gap-4">
          <span className="font-mono text-xs font-semibold text-[var(--text)]">{index}</span>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-h)] md:text-3xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

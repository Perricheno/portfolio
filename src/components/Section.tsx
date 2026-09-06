import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  icon: LucideIcon
  title: string
  children: ReactNode
}

export function Section({ id, icon: Icon, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-[var(--border)] py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-h)]">
            <Icon size={18} strokeWidth={2} />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-h)] md:text-3xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

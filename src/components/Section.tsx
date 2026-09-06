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
    <section id={id} className="border-t border-[var(--border)] py-10 md:py-14 print:py-2">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 flex items-center gap-3 print:mb-1 print:gap-1.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-h)] print:hidden">
            <Icon size={18} strokeWidth={2} />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-h)] md:text-3xl print:text-[10px] print:uppercase print:tracking-wide">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

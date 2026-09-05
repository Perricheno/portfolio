import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-[var(--border)] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-xs font-semibold text-[var(--text)]">{index}</span>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-h)] md:text-3xl">
            {title}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

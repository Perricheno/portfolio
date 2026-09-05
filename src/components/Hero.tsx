import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text)]"
      >
        {t.hero.greeting}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-h)] md:text-7xl"
      >
        {t.hero.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-xl font-medium text-[var(--text)] md:text-2xl"
      >
        {t.hero.role}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 max-w-xl text-[var(--text)]"
      >
        {t.hero.tagline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <a
          href="#contact"
          className="rounded-full bg-[var(--text-h)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--bg)] transition-opacity hover:opacity-80"
        >
          {t.hero.cta}
        </a>
        <a
          href="/resume.pdf"
          className="rounded-full border border-[var(--border)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-h)] transition-colors hover:border-[var(--text-h)]"
        >
          {t.hero.resume}
        </a>
      </motion.div>
    </section>
  )
}

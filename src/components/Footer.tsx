import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-[var(--border)] py-8 print:py-1.5">
      <div className="mx-auto max-w-4xl px-6 text-[11px] font-bold uppercase tracking-widest text-[var(--text)] opacity-60 print:text-[6px]">
        {t.footer.text}
      </div>
    </footer>
  )
}

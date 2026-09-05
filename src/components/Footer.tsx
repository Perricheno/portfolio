import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto max-w-4xl px-6 text-sm text-[var(--text)]">{t.footer.text}</div>
    </footer>
  )
}

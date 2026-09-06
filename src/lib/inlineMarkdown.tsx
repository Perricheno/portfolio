import type { ReactNode } from 'react'

/**
 * Tiny inline-markdown renderer for plain-text fields (experience/project
 * bullets, descriptions) that aren't run through full ReactMarkdown.
 * Supports just `**bold**` and `[text](url)` — enough for résumé bullets
 * without pulling a block-level markdown parser into a single <li>.
 */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-[var(--text-h)]">
          {m[1]}
        </strong>,
      )
    } else {
      nodes.push(
        <a
          key={key++}
          href={m[3]}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[var(--text-h)] underline decoration-[var(--border)] underline-offset-2 hover:decoration-[var(--text-h)]"
        >
          {m[2]}
        </a>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

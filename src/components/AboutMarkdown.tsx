import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * The About section's markdown rendering, shared between the normal
 * on-screen "About" block and the print layout (where it's shrunk way
 * down via print: variants to sit next to the globe — see Intro.tsx).
 */
export function AboutMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h3
            className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] first:mt-0 print:mb-0.5 print:mt-1.5 print:text-[6px] print:tracking-[0.1em]"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h3
            className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-h)] first:mt-0 print:mb-0.5 print:mt-1.5 print:text-[6px] print:tracking-[0.1em]"
            {...props}
          />
        ),
        p: ({ ...props }) => <p {...props} />,
        strong: ({ ...props }) => <strong className="font-semibold text-[var(--text-h)]" {...props} />,
        em: ({ ...props }) => <em {...props} />,
        a: ({ ...props }) => (
          <a
            className="text-[var(--text-h)] underline decoration-[var(--border)] underline-offset-2 hover:decoration-[var(--text-h)]"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            {...props}
          />
        ),
        ul: ({ ...props }) => <ul className="list-disc space-y-1.5 pl-5 print:space-y-0.5 print:pl-3" {...props} />,
        ol: ({ ...props }) => (
          <ol className="list-decimal space-y-1.5 pl-5 print:space-y-0.5 print:pl-3" {...props} />
        ),
        li: ({ ...props }) => <li {...props} />,
        code: ({ ...props }) => (
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-2 border-[var(--border)] pl-4 italic text-[var(--text)]" {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

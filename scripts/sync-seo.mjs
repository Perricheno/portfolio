// Keeps index.html's <title>, OG/Twitter meta, and JSON-LD in sync with
// the actual résumé content (site.ru.md) and social links (socials.ts) —
// runs before every dev/build so the browser tab title and link-share
// preview never go stale again after an edit. Parses the files as plain
// text on purpose: no bundler/JSX runtime available at this stage.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

function extractHero(mdPath) {
  const raw = readFileSync(mdPath, 'utf8')
  const lines = raw.split('\n')
  const h1Index = lines.findIndex((l) => l.trim().startsWith('# '))
  const name = lines[h1Index].trim().slice(2).trim()
  const rest = lines
    .slice(h1Index + 1)
    .map((l) => l.trim())
    .filter(Boolean)
    // stop at the first heading (## ...) — role/tagline are the two
    // paragraphs before it
    .filter((l, i, arr) => arr.slice(0, i).every((prev) => !prev.startsWith('#')) && !l.startsWith('#'))
  return { name, role: rest[0] ?? '', tagline: rest[1] ?? '' }
}

function extractSocialUrls(socialsPath) {
  const raw = readFileSync(socialsPath, 'utf8')
  const matches = [...raw.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])
  return matches.filter((url) => url.startsWith('http'))
}

const { name, role, tagline } = extractHero(join(root, 'src/content/site.ru.md'))
const sameAs = extractSocialUrls(join(root, 'src/data/socials.ts'))
const title = `${name} — Портфолио`

let html = readFileSync(join(root, 'index.html'), 'utf8')

const setTag = (attr, value) =>
  (html = html.replace(
    new RegExp(`(${attr}=")[^"]*(")`),
    (_m, pre, post) => `${pre}${value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}${post}`,
  ))

html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
setTag('name="description" content', tagline)
setTag('property="og:site_name" content', 'Perricheno')
setTag('property="og:title" content', title)
setTag('property="og:description" content', tagline)
setTag('name="twitter:title" content', title)
setTag('name="twitter:description" content', tagline)

html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      url: 'https://cv.perricheno.com/',
      jobTitle: role,
      sameAs,
    },
    null,
    2,
  )}\n    </script>`,
)

writeFileSync(join(root, 'index.html'), html)
console.log(`[sync-seo] index.html <- "${title}" / "${role}"`)

import { toString as mdToString } from 'mdast-util-to-string'
import type { Content as MdContent, Heading, Image, Link, List, Root } from 'mdast'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillGroup,
} from './content'

export interface ParsedSite {
  heroName: string
  heroRole: string
  heroTagline: string
  aboutTitle: string
  aboutNav: string
  aboutMarkdown: string
  experienceTitle: string
  experienceNav: string
  experienceItems: ExperienceItem[]
  educationTitle: string
  educationNav: string
  educationItems: EducationItem[]
  skillsTitle: string
  skillsNav: string
  skillsGroups: SkillGroup[]
  projectsTitle: string
  projectsNav: string
  projectsItems: ProjectItem[]
  certificatesTitle: string
  certificatesNav: string
  certificatesItems: CertificateItem[]
  contactTitle: string
  contactNav: string
  contactText: string
}

function splitHeading(node: Heading): [string, string] {
  const text = mdToString(node)
  const parts = text.split('|').map((s) => s.trim())
  return [parts[0] ?? '', parts[1] ?? parts[0] ?? '']
}

function findLink(node: MdContent): string | undefined {
  let url: string | undefined
  visit(node, 'link', (n: Link) => {
    if (!url) url = n.url
  })
  return url
}

function findImage(node: MdContent): string | undefined {
  let url: string | undefined
  visit(node, 'image', (n: Image) => {
    if (!url) url = n.url
  })
  return url
}

/** Splits a flat node array into runs delimited by headings of the given depth. */
function splitByHeading(nodes: MdContent[], depth: number) {
  const groups: { heading: Heading; body: MdContent[] }[] = []
  for (const node of nodes) {
    if (node.type === 'heading' && node.depth === depth) {
      groups.push({ heading: node, body: [] })
    } else if (groups.length > 0) {
      groups[groups.length - 1].body.push(node)
    }
  }
  return groups
}

export function parseSite(source: string): ParsedSite {
  const tree = unified().use(remarkParse).parse(source) as Root
  const nodes = tree.children as MdContent[]

  const h1Index = nodes.findIndex((n) => n.type === 'heading' && n.depth === 1)
  const heroName = h1Index >= 0 ? mdToString(nodes[h1Index]) : ''
  const heroRole = nodes[h1Index + 1] ? mdToString(nodes[h1Index + 1]) : ''
  const heroTagline = nodes[h1Index + 2] ? mdToString(nodes[h1Index + 2]) : ''

  const afterHero = nodes.slice(h1Index + 3)
  const sections = splitByHeading(afterHero, 2)
  const [about, experience, education, certificates, skills, projects, contact] = sections

  // --- About: keep the raw markdown source so full formatting renders. ---
  const [aboutTitle, aboutNav] = about ? splitHeading(about.heading) : ['', '']
  let aboutMarkdown = ''
  if (about && about.body.length > 0) {
    const first = about.body[0]
    const last = about.body[about.body.length - 1]
    const start = first.position?.start.offset
    const end = last.position?.end.offset
    if (start != null && end != null) aboutMarkdown = source.slice(start, end)
  }

  // --- Experience ---
  const [experienceTitle, experienceNav] = experience ? splitHeading(experience.heading) : ['', '']
  const experienceItems: ExperienceItem[] = experience
    ? splitByHeading(experience.body, 3).map(({ heading, body }) => {
        const parts = mdToString(heading).split('|').map((s) => s.trim())
        const description = body
          .filter((n): n is MdContent & { type: 'paragraph' } => n.type === 'paragraph')
          .map((n) => mdToString(n))
          .join(' ')
        return { role: parts[0] ?? '', company: parts[1] ?? '', period: parts[2] ?? '', description }
      })
    : []

  // --- Education ---
  const [educationTitle, educationNav] = education ? splitHeading(education.heading) : ['', '']
  const educationItems: EducationItem[] = education
    ? splitByHeading(education.body, 3).map(({ heading, body }) => {
        const parts = mdToString(heading).split('|').map((s) => s.trim())
        const descriptionNode = body.find((n) => n.type === 'paragraph')
        return {
          degree: parts[0] ?? '',
          institution: parts[1] ?? '',
          period: parts[2] ?? '',
          description: descriptionNode ? mdToString(descriptionNode) : undefined,
        }
      })
    : []

  // --- Skills ---
  const [skillsTitle, skillsNav] = skills ? splitHeading(skills.heading) : ['', '']
  const skillsGroups: SkillGroup[] = skills
    ? splitByHeading(skills.body, 3).map(({ heading, body }) => {
        const list = body.find((n): n is List => n.type === 'list')
        const items = list ? list.children.map((li) => mdToString(li).trim()) : []
        return { title: mdToString(heading), items }
      })
    : []

  // --- Projects ---
  const [projectsTitle, projectsNav] = projects ? splitHeading(projects.heading) : ['', '']
  const projectsItems: ProjectItem[] = projects
    ? splitByHeading(projects.body, 3).map(({ heading, body }) => {
        const parts = mdToString(heading).split('|').map((s) => s.trim())
        let subtitle: string | undefined
        let tags: string[] | undefined
        let bullets: string[] = []
        let seenList = false
        for (const node of body) {
          if (node.type === 'list') {
            bullets = node.children.map((li) => mdToString(li).trim())
            seenList = true
          } else if (node.type === 'paragraph') {
            const text = mdToString(node)
            if (/^tags:/i.test(text)) {
              tags = text.replace(/^tags:/i, '').split(',').map((s) => s.trim()).filter(Boolean)
            } else if (!seenList && !subtitle) {
              subtitle = text
            }
          }
        }
        return { title: parts[0] ?? '', period: parts[1] ?? '', subtitle, bullets, tags }
      })
    : []

  // --- Certificates ---
  const [certificatesTitle, certificatesNav] = certificates
    ? splitHeading(certificates.heading)
    : ['', '']
  const certificatesItems: CertificateItem[] = certificates
    ? splitByHeading(certificates.body, 3).map(({ heading, body }) => {
        const parts = mdToString(heading).split('|').map((s) => s.trim())
        let image: string | undefined
        let link: string | undefined
        for (const node of body) {
          image ??= findImage(node)
          link ??= findLink(node)
        }
        return { title: parts[0] ?? '', issuer: parts[1] ?? '', year: parts[2] ?? '', image, link }
      })
    : []

  // --- Contact ---
  const [contactTitle, contactNav] = contact ? splitHeading(contact.heading) : ['', '']
  const contactText = contact
    ? contact.body
        .filter((n) => n.type === 'paragraph')
        .map((n) => mdToString(n))
        .join(' ')
    : ''

  return {
    heroName,
    heroRole,
    heroTagline,
    aboutTitle,
    aboutNav,
    aboutMarkdown,
    experienceTitle,
    experienceNav,
    experienceItems,
    educationTitle,
    educationNav,
    educationItems,
    skillsTitle,
    skillsNav,
    skillsGroups,
    projectsTitle,
    projectsNav,
    projectsItems,
    certificatesTitle,
    certificatesNav,
    certificatesItems,
    contactTitle,
    contactNav,
    contactText,
  }
}

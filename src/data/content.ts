import siteEn from '../content/site.en.md?raw'
import siteRu from '../content/site.ru.md?raw'
import { parseSite } from './parseSite'

export type Locale = 'ru' | 'en'

export interface ExperienceItem {
  period: string
  role: string
  company: string
  description?: string
  bullets?: string[]
}

export interface EducationItem {
  period: string
  degree: string
  institution: string
  description?: string
}

export interface CertificateItem {
  title: string
  issuer: string
  year: string
  /** Path to a scan/photo of the certificate, e.g. '/certificates/aws.jpg'. */
  image?: string
  /** Optional external verification URL. */
  link?: string
}

export interface ProjectItem {
  period: string
  title: string
  subtitle?: string
  bullets: string[]
  tags?: string[]
  link?: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Content {
  meta: { title: string; description: string }
  nav: {
    about: string
    experience: string
    education: string
    certificates: string
    skills: string
    projects: string
    contact: string
  }
  hero: { greeting: string; name: string; role: string; tagline: string; cta: string; resume: string }
  about: { title: string; markdown: string }
  experience: { title: string; items: ExperienceItem[] }
  education: { title: string; items: EducationItem[] }
  certificates: {
    title: string
    items: CertificateItem[]
    viewOriginal: string
    noImage: string
  }
  skills: { title: string; groups: SkillGroup[] }
  projects: { title: string; items: ProjectItem[] }
  contact: { title: string; text: string }
  footer: { text: string }
}

// Small UI strings that aren't really "your résumé content" — button labels
// and the like. Edit the actual text (name, experience, skills, projects...)
// in src/content/site.ru.md and site.en.md instead — see TEMPLATE.md there.
const ui = {
  ru: {
    greeting: 'Привет, я',
    cta: 'Связаться',
    resume: 'Скачать резюме',
    viewOriginal: 'Открыть оригинал',
    noImage: 'Скан сертификата ещё не добавлен',
    metaSuffix: 'Портфолио',
    copyright: (name: string) => `© 2026 ${name}. Все права защищены.`,
  },
  en: {
    greeting: "Hi, I'm",
    cta: 'Get in touch',
    resume: 'Download résumé',
    viewOriginal: 'View original',
    noImage: "Certificate scan hasn't been added yet",
    metaSuffix: 'Portfolio',
    copyright: (name: string) => `© 2026 ${name}. All rights reserved.`,
  },
} as const

function buildContent(locale: Locale): Content {
  const site = parseSite(locale === 'ru' ? siteRu : siteEn)
  const u = ui[locale]

  return {
    meta: {
      title: `${site.heroName} — ${u.metaSuffix}`,
      description: site.heroTagline,
    },
    nav: {
      about: site.aboutNav,
      experience: site.experienceNav,
      education: site.educationNav,
      certificates: site.certificatesNav,
      skills: site.skillsNav,
      projects: site.projectsNav,
      contact: site.contactNav,
    },
    hero: {
      greeting: u.greeting,
      name: site.heroName,
      role: site.heroRole,
      tagline: site.heroTagline,
      cta: u.cta,
      resume: u.resume,
    },
    about: { title: site.aboutTitle, markdown: site.aboutMarkdown },
    experience: { title: site.experienceTitle, items: site.experienceItems },
    education: { title: site.educationTitle, items: site.educationItems },
    // Certificates is parsed but not rendered right now (see App.tsx).
    certificates: {
      title: site.certificatesTitle,
      items: site.certificatesItems,
      viewOriginal: u.viewOriginal,
      noImage: u.noImage,
    },
    skills: { title: site.skillsTitle, groups: site.skillsGroups },
    projects: { title: site.projectsTitle, items: site.projectsItems },
    contact: { title: site.contactTitle, text: site.contactText },
    footer: { text: u.copyright(site.heroName) },
  }
}

export const content: Record<Locale, Content> = {
  ru: buildContent('ru'),
  en: buildContent('en'),
}

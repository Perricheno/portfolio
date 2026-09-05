export type Locale = 'ru' | 'en'

export interface ExperienceItem {
  period: string
  role: string
  company: string
  description: string
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
  link?: string
}

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
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
  about: { title: string; index: string; paragraphs: string[] }
  experience: { title: string; index: string; items: ExperienceItem[] }
  education: { title: string; index: string; items: EducationItem[] }
  certificates: { title: string; index: string; items: CertificateItem[] }
  skills: { title: string; index: string; groups: SkillGroup[] }
  projects: { title: string; index: string; items: ProjectItem[] }
  contact: { title: string; index: string; text: string }
  footer: { text: string }
}

export const content: Record<Locale, Content> = {
  ru: {
    meta: {
      title: 'Имя Фамилия — Портфолио',
      description: 'Личный сайт-резюме — обо мне, опыт, образование и проекты.',
    },
    nav: {
      about: 'Обо мне',
      experience: 'Опыт',
      education: 'Образование',
      certificates: 'Сертификаты',
      skills: 'Навыки',
      projects: 'Проекты & Наука',
      contact: 'Контакты',
    },
    hero: {
      greeting: 'Привет, я',
      name: 'Имя Фамилия',
      role: 'Должность / специализация',
      tagline:
        'Коротко о том, чем вы занимаетесь и в чём ваша сильная сторона — одно-два предложения.',
      cta: 'Связаться',
      resume: 'Скачать резюме',
    },
    about: {
      title: 'Обо мне',
      index: '01',
      paragraphs: [
        'Здесь короткий рассказ о вашем профессиональном пути: кто вы, чем занимаетесь и что вас мотивирует.',
        'Второй абзац — про подход к работе, ценности или то, что отличает вас от других специалистов.',
      ],
    },
    experience: {
      title: 'Опыт работы',
      index: '02',
      items: [
        {
          period: '2023 — настоящее время',
          role: 'Должность',
          company: 'Компания XYZ',
          description: 'Краткое описание задач и достижений на этой позиции.',
        },
        {
          period: '2021 — 2023',
          role: 'Должность',
          company: 'Компания',
          description: 'Краткое описание задач и достижений на этой позиции.',
        },
        {
          period: '2019 — 2021',
          role: 'Должность',
          company: 'Компания',
          description: 'Краткое описание задач и достижений на этой позиции.',
        },
      ],
    },
    education: {
      title: 'Образование',
      index: '03',
      items: [
        {
          period: '2019 — 2023',
          degree: 'Степень / направление',
          institution: 'Название университета',
          description: 'Краткое уточнение: специализация, диплом с отличием и т.п.',
        },
      ],
    },
    certificates: {
      title: 'Сертификаты',
      index: '04',
      items: [
        { title: 'Название сертификата', issuer: 'Организация', year: '2024', link: '#' },
        { title: 'Название сертификата', issuer: 'Организация', year: '2023', link: '#' },
      ],
    },
    skills: {
      title: 'Технические навыки',
      index: '05',
      groups: [
        { title: 'Языки программирования', items: ['Python', 'R'] },
        {
          title: 'Базы данных & Аналитика',
          items: ['PostgreSQL', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
        },
        {
          title: 'Backend & Архитектура',
          items: ['Микросервисы', 'Multi-Agent Systems', 'RAG Architectures', 'NLP (spaCy)'],
        },
        {
          title: 'DevOps & Cloud',
          items: [
            'Linux (администрирование серверов Ubuntu/Debian)',
            'Google Cloud Platform (Compute Engine, VPC, VDS)',
            'Docker',
            'CI/CD автоматизация (GitHub Actions)',
            'Cloudflare',
          ],
        },
        {
          title: 'Инструменты & Геоданные',
          items: ['Git / GitHub', 'OpenStreetMap (OSM)', 'LaTeX', 'TikZ', 'Figma'],
        },
      ],
    },
    projects: {
      title: 'Проекты & Научная деятельность',
      index: '06',
      items: [
        {
          title: 'Название проекта',
          description: 'Краткое описание проекта: что это, какую задачу решает.',
          tags: ['React', 'TypeScript'],
          link: '#',
        },
        {
          title: 'Название проекта',
          description: 'Краткое описание проекта: что это, какую задачу решает.',
          tags: ['Node.js', 'PostgreSQL'],
          link: '#',
        },
        {
          title: 'Название проекта',
          description: 'Краткое описание проекта: что это, какую задачу решает.',
          tags: ['Next.js', 'Tailwind'],
          link: '#',
        },
      ],
    },
    contact: {
      title: 'Связаться',
      index: '07',
      text: 'Открыт(а) для новых проектов и предложений. Напишите — отвечу в течение дня.',
    },
    footer: { text: '© 2026 Имя Фамилия. Все права защищены.' },
  },
  en: {
    meta: {
      title: 'First Last — Portfolio',
      description: 'Personal resume site — about, experience, education and projects.',
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      certificates: 'Certificates',
      skills: 'Skills',
      projects: 'Projects & Research',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'First Last',
      role: 'Role / specialization',
      tagline: 'A short line about what you do and what you are great at — one or two sentences.',
      cta: 'Get in touch',
      resume: 'Download résumé',
    },
    about: {
      title: 'About me',
      index: '01',
      paragraphs: [
        'A short story about your professional path: who you are, what you do, and what drives you.',
        'A second paragraph about your approach to work, values, or what sets you apart.',
      ],
    },
    experience: {
      title: 'Experience',
      index: '02',
      items: [
        {
          period: '2023 — present',
          role: 'Role',
          company: 'Company XYZ',
          description: 'Brief description of responsibilities and achievements in this role.',
        },
        {
          period: '2021 — 2023',
          role: 'Role',
          company: 'Company',
          description: 'Brief description of responsibilities and achievements in this role.',
        },
        {
          period: '2019 — 2021',
          role: 'Role',
          company: 'Company',
          description: 'Brief description of responsibilities and achievements in this role.',
        },
      ],
    },
    education: {
      title: 'Education',
      index: '03',
      items: [
        {
          period: '2019 — 2023',
          degree: 'Degree / field of study',
          institution: 'University name',
          description: 'Short note: specialization, honors, etc.',
        },
      ],
    },
    certificates: {
      title: 'Certificates',
      index: '04',
      items: [
        { title: 'Certificate name', issuer: 'Issuer', year: '2024', link: '#' },
        { title: 'Certificate name', issuer: 'Issuer', year: '2023', link: '#' },
      ],
    },
    skills: {
      title: 'Technical Skills',
      index: '05',
      groups: [
        { title: 'Programming Languages', items: ['Python', 'R'] },
        {
          title: 'Databases & Analytics',
          items: ['PostgreSQL', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
        },
        {
          title: 'Backend & Architecture',
          items: ['Microservices', 'Multi-Agent Systems', 'RAG Architectures', 'NLP (spaCy)'],
        },
        {
          title: 'DevOps & Cloud',
          items: [
            'Linux (Ubuntu/Debian server administration)',
            'Google Cloud Platform (Compute Engine, VPC, VDS)',
            'Docker',
            'CI/CD automation (GitHub Actions)',
            'Cloudflare',
          ],
        },
        {
          title: 'Tools & Geodata',
          items: ['Git / GitHub', 'OpenStreetMap (OSM)', 'LaTeX', 'TikZ', 'Figma'],
        },
      ],
    },
    projects: {
      title: 'Projects & Research',
      index: '06',
      items: [
        {
          title: 'Project name',
          description: 'A short description of the project: what it is and what problem it solves.',
          tags: ['React', 'TypeScript'],
          link: '#',
        },
        {
          title: 'Project name',
          description: 'A short description of the project: what it is and what problem it solves.',
          tags: ['Node.js', 'PostgreSQL'],
          link: '#',
        },
        {
          title: 'Project name',
          description: 'A short description of the project: what it is and what problem it solves.',
          tags: ['Next.js', 'Tailwind'],
          link: '#',
        },
      ],
    },
    contact: {
      title: 'Get in touch',
      index: '07',
      text: 'Open to new projects and opportunities. Reach out — I usually reply within a day.',
    },
    footer: { text: '© 2026 First Last. All rights reserved.' },
  },
}

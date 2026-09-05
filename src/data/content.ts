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
          period: '2024 — 2027 (ожидается)',
          degree: 'Бакалавр',
          institution: 'Astana IT University',
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
        {
          title: 'Языки',
          items: ['Русский (C1)', 'Казахский (родной)', 'Английский (B2 — технический)'],
        },
      ],
    },
    projects: {
      title: 'Проекты & Научная деятельность',
      index: '06',
      items: [
        {
          period: 'Янв. 2026 — Февр. 2026',
          title: 'Исследование E-commerce логистики',
          subtitle: 'Соавторство с Dr. Kamal Imran Mohd Sharif',
          bullets: [
            'В соавторстве с профессором Dr. Kamal Imran Mohd Sharif (PhD in Technology, Operation and Logistics, Universiti Utara Malaysia) провёл количественное исследование аналитики последней мили.',
            'Обработал массив из 10 000 000+ транзакций на R с применением бинарной логистической регрессии для оценки компромисса между скоростью и надёжностью доставки.',
          ],
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
          period: '2024 — 2027 (expected)',
          degree: "Bachelor's Degree",
          institution: 'Astana IT University',
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
        {
          title: 'Languages',
          items: ['Russian (C1)', 'Kazakh (native)', 'English (B2 — technical)'],
        },
      ],
    },
    projects: {
      title: 'Projects & Research',
      index: '06',
      items: [
        {
          period: 'Jan 2026 — Feb 2026',
          title: 'E-commerce Logistics Research',
          subtitle: 'Co-authored with Dr. Kamal Imran Mohd Sharif',
          bullets: [
            'Co-authored with Professor Dr. Kamal Imran Mohd Sharif (PhD in Technology, Operation and Logistics, Universiti Utara Malaysia), conducted a quantitative study on last-mile delivery analytics.',
            'Processed a dataset of 10,000,000+ transactions in R using binary logistic regression to evaluate the trade-off between delivery speed and reliability.',
          ],
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

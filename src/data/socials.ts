import { Mail, Send } from 'lucide-react'
import type { ComponentType } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/icons'

export interface SocialLink {
  label: string
  href: string
  icon: ComponentType<{ size?: number; className?: string }>
}

// Add or remove entries here to control which social links show up
// in the Contact section and footer — nothing else needs to change.
export const socials: SocialLink[] = [
  { label: 'Email', href: 'mailto:name@example.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/username', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username', icon: LinkedinIcon },
  { label: 'Telegram', href: 'https://t.me/username', icon: Send },
]

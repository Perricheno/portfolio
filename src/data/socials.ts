import { Mail, Send } from 'lucide-react'
import type { ComponentType } from 'react'
import { LinkedinIcon } from '../components/icons'

export interface SocialLink {
  label: string
  href: string
  icon: ComponentType<{ size?: number; className?: string }>
}

// Add or remove entries here to control which social links show up
// in the Contact section — nothing else needs to change.
// GitHub (github.com/Perricheno) is intentionally left out for now —
// deemed not worth showing; add it back the same way as the others
// (icon: GithubIcon, from '../components/icons') if that changes.
export const socials: SocialLink[] = [
  { label: 'Email', href: 'mailto:amangeldy.toy321@gmail.com', icon: Mail },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shyngyskhan-amangeldy-099b37324/',
    icon: LinkedinIcon,
  },
  { label: 'Telegram', href: 'https://t.me/perricheno', icon: Send },
]

import { motion } from 'motion/react'
import { scrollFadeInUp, cardsAnimation } from '@/motion'
import { Linkedin, Phone, Mail, Github } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ContactItem {
  label: string
  value: string
  icon: LucideIcon
}

const contactInfo: ContactItem[] = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/aldwinsusantio/',
    icon: Linkedin,
  },
  {
    label: 'Phone',
    value: '(+62)87808675123',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'aldald.ald197@gmail.com',
    icon: Mail,
  },
  {
    label: 'Github',
    value: 'github.com/aldwin160',
    icon: Github,
  },
]

// Helper function to generate appropriate href and accessibility label
function getContactLink(label: string, value: string) {
  switch (label.toLowerCase()) {
    case 'email': {
      return { href: `mailto:${value}`, display: value, external: false }
    }
    case 'phone': {
      // Remove parentheses, spaces, and '+' for tel link formatting
      const phoneDigits = value.replace(/[\s()-]/g, '')
      return { href: `tel:${phoneDigits}`, display: value, external: false }
    }
    case 'github': {
      return { href: `https://${value.startsWith('github.com') ? value : `github.com/${value}`}`, display: value, external: true }
    }
    case 'linkedin': {
      return { href: `https://${value.startsWith('linkedin.com') ? value : `linkedin.com/${value}`}`, display: value, external: true }
    }
    default: {
      return { href: value, display: value, external: true }
    }
  }
}

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-5xl">
        <motion.div
          {...scrollFadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Feel free to reach out through any of these channels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contactInfo.map((contact, index) => {
            const { href, external } = getContactLink(contact.label, contact.value)
            const Icon = contact.icon
            return (
              <motion.a
                key={index}
                {...cardsAnimation(index)}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group bg-card rounded-lg p-5 border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-foreground flex items-center gap-2">
                      {contact.label}
                      {external && (
                        <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </h3>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

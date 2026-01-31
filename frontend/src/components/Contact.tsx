import { motion } from 'motion/react'
import { scrollFadeInUp, cardsAnimation } from '@/motion'
import { Linkedin, Phone, Mail, Github } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ContactItem {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

const contactInfo: ContactItem[] = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/aldwinsusantio/',
    icon: Linkedin,
    color: 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30'
  },
  {
    label: 'Phone',
    value: '(+62)87808675123',
    icon: Phone,
    color: 'from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30'
  },
  {
    label: 'Email',
    value: 'aldald.ald197@gmail.com',
    icon: Mail,
    color: 'from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30'
  },
  {
    label: 'Github',
    value: 'github.com/aldwin160',
    icon: Github,
    color: 'from-gray-500/20 to-slate-600/20 hover:from-gray-500/30 hover:to-slate-600/30'
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
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

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
            const { href, display, external } = getContactLink(contact.label, contact.value)
            const Icon = contact.icon
            return (
              <motion.a
                key={index}
                {...cardsAnimation(index)}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative overflow-hidden bg-gradient-to-br ${contact.color} backdrop-blur-sm rounded-2xl p-8 border border-border/50`}
              >
                {/* Icon with animated background */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                      {contact.label}
                      {external && (
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all font-medium">
                      {display}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

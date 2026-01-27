interface ContactItem {
  label: string
  value: string
}

const contactInfo: ContactItem[] = [
  { label: 'LinkedIn', value: 'linkedin.com/in/aldwinsusantio/' },
  { label: 'Phone', value: '(+62)87808675123' },
  { label: 'Email', value: 'aldald.ald197@gmail.com' },
  { label: 'Github', value: 'github.com/aldwin160' },
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
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo.map((contact, index) => {
            const { href, display, external } = getContactLink(contact.label, contact.value)
            return (
              <div
                key={index}
                data-stagger-item
                className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg border border-border hover:border-primary hover:bg-primary/10"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {contact.label}
                </h3>
                <p className="text-muted-foreground">
                  <a
                    href={href}
                    className="text-primary hover:underline break-all"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {display}
                  </a>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'motion/react'
import { scrollFadeInUp, cardsAnimation } from '@/motion'

interface ExperienceItem {
  title: string
  period: string
  company: string
  responsibilities: string[]
  description: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Graphic Designer',
    period: '2022–2023',
    company: 'Honda Jakarta Center',
    responsibilities: [
      'Created brand visuals and merchandise designs.',
      'Developed key visuals for campaigns and international events.',
      'Supported company-wide creative needs.',
    ],
    description: 'Designed impactful visuals for campaigns, merchandise, and major events.',
  },
  {
    title: 'Marketing Event',
    period: '2023–2025',
    company: 'Honda Jakarta Center',
    responsibilities: [
      'Led and managed large-scale automotive exhibitions.',
      'Coordinated international and regional events.',
      'Delivered end-to-end event planning and reporting.',
    ],
    description: 'Led major Honda exhibitions and customer events across Jabodetabek.',
  },
  {
    title: 'Distribution Team',
    period: '2025–Present',
    company: 'Honda Jakarta Center',
    responsibilities: [
      'Managed unit allocation for 40+ dealers.',
      'Controlled warehouse inflow and inventory.',
      'Coordinated monthly dealer orders.',
    ],
    description: 'Handled vehicle distribution and dealer allocation nationwide.',
  },
]

export default function Experience() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <motion.h2
          {...scrollFadeInUp}
          className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Experience
        </motion.h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              {...cardsAnimation(index)}
              className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg border border-border hover:border-primary"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mt-1">{exp.company}</p>
                </div>
                <span className="text-lg text-primary font-medium mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-muted-foreground italic mb-4">{exp.description}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

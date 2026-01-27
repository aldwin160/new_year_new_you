interface ExperienceItem {
  title: string
  period: string
  description?: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Graphic Designer',
    period: '2022 - 2023',
  },
  {
    title: 'Event Team',
    period: '2023 - 2025',
  },
  {
    title: 'Distribution Team',
    period: '2025 - now',
  },
]

export default function Experience() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg border border-border hover:border-primary"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  {exp.title}
                </h3>
                <span className="text-lg text-primary font-medium mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              {exp.description && (
                <p className="text-muted-foreground mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

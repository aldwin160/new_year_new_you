import { motion } from "motion/react";
import {  scrollFadeInUp, cardsAnimation as cardsAnimation } from "../motion";

import { FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiTypescript, SiExpress, SiDrizzle, SiPostgresql } from 'react-icons/si'

const technologies = [
  { name: "React", icon: <FaReact className="text-blue-300" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "Express", icon: <SiExpress className="text-gray-700" /> },
  { name: "Drizzle", icon: <SiDrizzle className="text-green-400" /> },
  { name: "Postgres", icon: <SiPostgresql className="text-blue-400" /> },
];

export default function Stacks() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background"   >
      <div className="w-full max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center"
          {...scrollFadeInUp}
        >
          Technologies I Work With
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg text-center border border-border hover:border-primary hover:bg-primary/10"
              {...cardsAnimation(index)}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl md:text-2xl font-semibold text-card-foreground">
                  {tech.name}
                </span>
                <div className="text-4xl">
                  {tech.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
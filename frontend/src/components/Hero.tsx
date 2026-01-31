import { motion } from "motion/react";
import { scrollFadeInUp } from "../motion";

export default function Hero() {
  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 bg-background"
      {...scrollFadeInUp}
    >
        <div className="text-center max-w-3xl bg-background">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Hello, my name is Aldwin
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          I experienced in graphic design, event marketing, and distribution operations. I am currently transitioning into fullstack development.</p>
        </div>
    </motion.section>
  )
}
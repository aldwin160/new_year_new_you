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
          Hello, I'm a Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          I'm passionate about creating beautiful and functional web applications
          using modern technologies. I love turning ideas into reality through code.
            </p>
        </div>
    </motion.section>
  )
}
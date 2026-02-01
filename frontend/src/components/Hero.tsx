import { motion } from "motion/react";
import { scrollFadeInUp } from "../motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative"
      {...scrollFadeInUp}
    >
        <div className="text-center max-w-3xl bg-background">
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <img
                src="/aldwin.jpg"
                alt="Aldwin Susantio"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-border shadow-lg"
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Hello, my name is <span className="text-primary">Aldwin</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          I experienced in graphic design, event marketing, and distribution operations. I am currently transitioning into fullstack development.</p>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
    </motion.section>
  )
} 
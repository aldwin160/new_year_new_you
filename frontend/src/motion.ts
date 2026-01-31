/* RULE
- initial { y } should not be more than 150px to avoid animation not appearing 
- viewport { amount } should not more than 0.4
*/

// Slow fade-in without movement on scroll into view
export const autoFadeIn = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

// Large upward slide (200px) with fade on scroll into view
export const scrollFadeInUp = {
  initial: { opacity: 0, y: 150 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, amount: 0.4 },
}

// Card slide-up animation with customizable stagger delay
export const cardsAnimation = (index: number = 0) => ({
  initial: { opacity: 0, y: 150 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 1,
    delay: index * 0.1,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
  viewport: { once: true, amount: 0.4 },
})



// Quick scale and fade animation for chat window entrance/exit
export const chatExpand = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 },
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
}

// Quick horizontal slide from left for chat messages
export const messageSlideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
}



export const fadeUp = {
  initial: { opacity: 0, y: 400 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, amount: 0.4 },
}

export const scrollFadeUp = {
  initial: { opacity: 0, y: 400 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, amount: 0.4 },
}

export const scrollFadeIn = {
  initial: { opacity: 0, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  viewport: { once: true, amount: 0.6 },
}

export const chatExpand = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 },
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
}

export const messageSlideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
}
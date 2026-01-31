// MAIN LOGIC

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Message } from '@/types/chat'
import { GeminiService, getGeminiApiKey } from '@/services/gemini'
import { systemPrompt } from '@/prompts'
import ChatButton from './ChatButton'
import ChatWindow from './ChatWindow'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null)

  useEffect(() => {
    const apiKey = getGeminiApiKey()
    if (!apiKey) {
      setError('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env.local file.')
      return
    }
    setGeminiService(new GeminiService(apiKey, systemPrompt))
  }, [])

  const handleSendMessage = async (content: string) => {
    if (!geminiService) {
      setError('Gemini service not initialized')
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await geminiService.sendMessage(content, messages)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response')
    } finally {
      setIsLoading(false)
    }
  }

  const chatExpand = {
    initial: { opacity: 0, scale: 0.2, x: 10, y: 10 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.2, x: 10, y: 10 },
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
    style: {
      originX: 1,
      originY: 1,
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div {...chatExpand} className="fixed bottom-6 right-6 z-50">
            <ChatWindow
              messages={messages}
              onClose={() => setIsOpen(false)}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {error && isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-xs bg-destructive text-destructive-foreground p-3 rounded-lg shadow-lg text-sm">
          {error}
        </div>
      )}
    </>
  )
}

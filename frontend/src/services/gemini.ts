import { type GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import type { Message } from '@/types/chat'

export class GeminiService {
  readonly genAI: GoogleGenerativeAI
  readonly model: GenerativeModel

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  }

  async sendMessage(message: string, history: Message[]): Promise<string> {
    try {
      // Convert message history to Gemini format
      const formattedHistory = history.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))

      // Start chat with history
      const chat = this.model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      })

      // Send the message
      const result = await chat.sendMessage(message)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API Error:', error)
      throw new Error('Failed to get response from Gemini. Please try again.')
    }
  }
}

// Helper to get API key from environment
export function getGeminiApiKey(): string | null {
  return import.meta.env.VITE_GEMINI_API_KEY || null
}

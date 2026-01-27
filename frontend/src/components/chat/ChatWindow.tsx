import { useEffect, useRef } from 'react'
import type { Message } from '@/types/chat'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Loader2 } from 'lucide-react'

interface ChatWindowProps {
  messages: Message[]
  onClose: () => void
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatWindow({
  messages,
  onClose,
  onSendMessage,
  isLoading,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-card border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden">
      <ChatHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Start a conversation with the AI assistant
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex gap-2 px-4 py-3">
            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  )
}

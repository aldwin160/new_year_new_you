// CHAT CONTAINER WITH HEADER, MESSAGES, AND INPUT

import { useEffect, useRef, useState } from 'react'
import type { Message } from '@/types/chat'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import QuickReplies from './QuickReplies'
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
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleQuickReply = (text: string) => {
    setInputValue(text)
    // Automatically send the message
    setTimeout(() => {
      onSendMessage(text)
      setInputValue('')
    }, 100)
  }

  const handleSendMessage = (message: string) => {
    onSendMessage(message)
    setInputValue('')
  }

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-96 h-[600px] max-h-[calc(100vh-2rem)] bg-card border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden">
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

      {messages.length === 0 && (
        <QuickReplies onQuickReply={handleQuickReply} disabled={isLoading} />
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        value={inputValue}
        onChange={setInputValue}
      />
    </div>
  )
}

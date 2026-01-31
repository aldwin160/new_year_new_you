// MESSAGE INPUT BOX

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export default function ChatInput({
  onSendMessage,
  disabled,
  value: externalValue,
  onChange: externalOnChange
}: ChatInputProps) {
  const [internalInput, setInternalInput] = useState('')

  const input = externalValue !== undefined ? externalValue : internalInput
  const setInput = externalOnChange || setInternalInput

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </form>
  )
}

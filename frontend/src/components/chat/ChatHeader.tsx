import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatHeaderProps {
  onClose: () => void
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground">Chat Assistant</h3>
      <Button
        onClick={onClose}
        size="icon-sm"
        variant="ghost"
        aria-label="Close chat"
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}

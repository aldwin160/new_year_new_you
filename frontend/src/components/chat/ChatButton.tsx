// FLOATING CHAT BUTTON ON BOTTOM RIGHT

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
  }

  return (
    <Button
      onClick={handleClick}
      type="button"
      size="icon-lg"
      className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg hover:shadow-xl transition-all"
      aria-label="Open chat"
    >
      <MessageCircle className="size-6" />
    </Button>
  )
}

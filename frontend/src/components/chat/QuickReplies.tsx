// QUICK REPLY BUTTONS FOR CHAT

interface QuickRepliesProps {
  onQuickReply: (text: string) => void
  disabled?: boolean
}

const quickReplies = [
  "Tell me about your experience",
  "What are your skills?",
  "Show me your projects",
  "How can I contact you?",
]

export default function QuickReplies({ onQuickReply, disabled }: QuickRepliesProps) {
  return (
    <div className="px-4 pb-3 pt-1">
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onQuickReply(reply)}
            disabled={disabled}
            className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-full border border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  )
}

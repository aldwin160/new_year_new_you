# Chat System Documentation

## Overview

The chat system is a floating AI assistant interface that provides visitors with interactive information about the portfolio owner. It integrates with Google's Gemini AI API to answer questions about experience, skills, projects, and contact information.

## Architecture

The chat system follows a component-based architecture with clear separation of concerns:

```
src/components/chat/
├── FloatingChat.tsx      # Main orchestrator component
├── ChatButton.tsx        # Floating action button
├── ChatWindow.tsx        # Chat container
├── ChatHeader.tsx        # Window header with close button
├── ChatMessage.tsx       # Individual message bubbles
├── ChatInput.tsx         # Message input field
└── QuickReplies.tsx      # Quick reply buttons
```

## Component Hierarchy

```
FloatingChat (Main Logic)
├── ChatButton (Trigger)
└── ChatWindow (Container)
    ├── ChatHeader (Title & Close)
    ├── ChatMessage[] (Message List)
    │   └── Markdown Renderer
    ├── QuickReplies (Suggested Questions)
    └── ChatInput (User Input)
```

## Component Details

### 1. FloatingChat.tsx
**Purpose:** Main orchestrator that manages state and handles AI integration

**Responsibilities:**
- Manages chat open/close state
- Handles message history
- Integrates with Gemini AI service
- Manages loading and error states
- Initializes AI with system prompt

**Key State:**
```typescript
- isOpen: boolean           // Chat window visibility
- messages: Message[]       // Conversation history
- isLoading: boolean        // AI response loading
- error: string | null      // Error messages
- geminiService: GeminiService | null  // AI service instance
```

**Integration:**
- Uses `GeminiService` from `@/services/gemini`
- Uses `systemPrompt` from `@/prompts`
- Validates API key from environment (`VITE_GEMINI_API_KEY`)

### 2. ChatButton.tsx
**Purpose:** Floating action button that opens the chat

**Features:**
- Fixed position at bottom-right corner
- MessageCircle icon from lucide-react
- Accessible with ARIA labels
- Smooth shadow transitions on hover

**Styling:**
- 56px × 56px circular button
- Elevated with shadow effects
- z-index: 50 to stay on top

### 3. ChatWindow.tsx
**Purpose:** Main chat container that orchestrates all chat UI components

**Responsibilities:**
- Renders message list with auto-scroll
- Manages input state for controlled component pattern
- Handles quick reply auto-send with 100ms delay
- Shows loading indicator during AI response
- Displays empty state prompt

**Features:**
- Auto-scrolls to newest message
- Shows "Thinking..." loader during API calls
- Quick replies appear only when chat is empty
- Responsive sizing (full-width on mobile, 384px on desktop)
- Maximum height with scrollable message area

### 4. ChatHeader.tsx
**Purpose:** Chat window header with title and close button

**Features:**
- Displays "Chat Assistant" title
- Close button with X icon
- Borders and background styling
- Accessible close button

### 5. ChatMessage.tsx
**Purpose:** Individual message bubble with markdown rendering

**Features:**
- Different styling for user vs assistant messages
- Markdown rendering for AI responses using `react-markdown`
- Supports GitHub Flavored Markdown (GFM)
- Custom styled components for code, lists, headings, links
- Syntax highlighting for code blocks
- Auto-links with external target

**Message Types:**
- **User messages:** Right-aligned, primary color background
- **Assistant messages:** Left-aligned, muted background with markdown

**Markdown Components:**
```typescript
- code blocks: Syntax highlighting with background
- inline code: Monospace with background
- paragraphs: Bottom margin for spacing
- lists (ul/ol): Disc/decimal markers with spacing
- headings (h1-h3): Bold with appropriate sizes
- links: Primary color, underline, opens in new tab
```

### 6. ChatInput.tsx
**Purpose:** Message input field with send button

**Features:**
- Controlled/uncontrolled component pattern (supports both)
- Enter key to send (without Shift)
- Auto-clears after sending
- Disabled state during loading
- Send button disabled when input is empty

**Props Pattern:**
```typescript
// Can be used in controlled mode
<ChatInput value={state} onChange={setState} />

// Or uncontrolled mode
<ChatInput onSendMessage={handler} />
```

### 7. QuickReplies.tsx
**Purpose:** Pre-defined question buttons for quick interaction

**Quick Reply Options:**
1. "Tell me about your experience"
2. "What are your skills?"
3. "Show me your projects"
4. "How can I contact you?"

**Features:**
- Auto-fills input when clicked
- Auto-sends message after 100ms delay
- Only shown when message list is empty
- Disabled during loading state
- Pill-shaped buttons with hover effects

## Data Flow

### Opening Chat
```
User clicks ChatButton
→ FloatingChat sets isOpen = true
→ ChatWindow appears with animation
→ QuickReplies shown (if no messages)
```

### Sending Message
```
User types message OR clicks QuickReply
→ ChatInput calls onSendMessage()
→ FloatingChat receives message
→ Message added to state with 'user' role
→ setIsLoading(true)
→ GeminiService.sendMessage() called with history
→ AI response received
→ Message added to state with 'assistant' role
→ setIsLoading(false)
→ ChatWindow auto-scrolls to bottom
```

### Message History
```
messages: Message[] = [
  {
    id: crypto.randomUUID()
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }
]
```

## External Dependencies

### AI Integration
- **Service:** Google Gemini AI (gemini-2.5-flash model)
- **API Key:** Environment variable `VITE_GEMINI_API_KEY`
- **System Prompt:** Defined in `@/prompts` with portfolio context
- **Configuration:**
  - Temperature: 0.9
  - Top-K: 1
  - Top-P: 1
  - Max Output Tokens: 2048

### Libraries
- `react-markdown`: Renders AI responses as formatted markdown
- `remark-gfm`: GitHub Flavored Markdown support
- `lucide-react`: Icons (MessageCircle, Send, X, Loader2)
- `motion/react`: Animation effects (not currently used in chat)

## Type Definitions

```typescript
// src/types/chat.ts
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
```

## Key Features

### 1. Context-Aware AI
The system prompt provides the AI with specific portfolio information:
- Three main roles at Honda Jakarta Center
- Experience periods (2022-Present)
- Skills and achievements
- Professional background

### 2. Auto-Send Quick Replies
Quick reply buttons automatically:
1. Fill the input field with the question
2. Wait 100ms for visual feedback
3. Send the message automatically
4. Clear the input field

### 3. Markdown Rendering
AI responses support rich formatting:
- **Bold** and *italic* text
- Code blocks with syntax highlighting
- Inline `code` snippets
- Bulleted and numbered lists
- Headings (H1-H3)
- External links

### 4. Responsive Design
- Mobile: Full width minus padding
- Desktop: Fixed 384px width
- Maximum height: 600px or viewport height minus padding
- Scrollable message area

### 5. Loading States
- "Thinking..." indicator with spinner during API calls
- Disabled input during loading
- Visual feedback for processing

### 6. Error Handling
- API key validation on initialization
- Error messages displayed at bottom-right
- Only shown when chat is open
- Service initialization check before sending

## Usage Example

```tsx
import FloatingChat from '@/components/chat/FloatingChat'

export default function App() {
  return (
    <div>
      {/* Your portfolio content */}
      <FloatingChat />
    </div>
  )
}
```

## Environment Setup

Create `.env.local` file:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Future Enhancements

Potential improvements:
- Message persistence (localStorage)
- Typing indicators
- Message timestamps display
- Copy message content
- Clear conversation button
- Conversation history export
- Voice input support
- Multi-language support

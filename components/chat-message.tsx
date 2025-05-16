import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  return (
    <div className={cn("flex gap-3 max-w-[80%]", isBot ? "" : "ml-auto flex-row-reverse")}>
      {isBot ? (
        <Avatar className="h-8 w-8 bg-amber-600 flex-shrink-0">
          <span className="text-white text-sm">🍪</span>
        </Avatar>
      ) : (
        <Avatar className="h-8 w-8 bg-blue-600 flex-shrink-0">
          <span className="text-white text-sm">U</span>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-xl p-3 text-sm",
          isBot ? "bg-amber-100 text-amber-900 rounded-tl-none" : "bg-blue-100 text-blue-900 rounded-tr-none",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Cookie, ShoppingBag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat-message"
import { SuggestionButton } from "@/components/suggestion-button"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm Cookie Bot from Sweet Cookie. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const suggestions = [
  { id: "1", text: "What cookies do you have?", icon: <Cookie className="h-4 w-4" /> },
  { id: "2", text: "How can I place an order?", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "3", text: "Store hours & location", icon: <Info className="h-4 w-4" /> },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes("cookie") &&
      (lowerMessage.includes("what") || lowerMessage.includes("menu") || lowerMessage.includes("have"))
    ) {
      return "We have a variety of delicious cookies! Our bestsellers include Chocolate Chip, Double Chocolate, Oatmeal Raisin, Peanut Butter, and our special Cookie of the Month: Salted Caramel Pretzel. Would you like to know more about any specific cookie?"
    } else if (lowerMessage.includes("order") || lowerMessage.includes("buy") || lowerMessage.includes("purchase")) {
      return "You can place an order directly through this chat, on our website, or by visiting our store! For online orders, we need your selection, quantity, delivery address, and payment details. Would you like to start an order now?"
    } else if (
      lowerMessage.includes("hour") ||
      lowerMessage.includes("location") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("open")
    ) {
      return "We're open Monday-Friday from 7am-8pm, and weekends from 8am-9pm. Our store is located at 123 Cookie Lane, Sweet Town. We also offer delivery within a 5-mile radius!"
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("much")) {
      return "Our cookies are $2.50 each, $12 for a half-dozen, or $22 for a dozen. We also offer custom gift boxes starting at $25!"
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello there! Welcome to Sweet Cookie. How can I help you today?"
    } else if (lowerMessage.includes("thank")) {
      return "You're very welcome! Is there anything else I can help you with?"
    } else {
      return "I'm here to help with all your cookie needs! You can ask about our menu, placing orders, store hours, or special offers. What would you like to know?"
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-amber-200">
      <div className="bg-amber-100 p-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-amber-600">
            <span className="text-white text-sm">🍪</span>
          </Avatar>
          <div>
            <h2 className="font-medium text-amber-900">Cookie Bot</h2>
            <p className="text-xs text-amber-700">Sweet Cookie Assistant</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-amber-600 animate-pulse">
              <Avatar className="h-8 w-8 bg-amber-600">
                <span className="text-white text-sm">🍪</span>
              </Avatar>
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                <div className="h-2 w-2 rounded-full bg-amber-600 animation-delay-200"></div>
                <div className="h-2 w-2 rounded-full bg-amber-600 animation-delay-400"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-amber-700 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <SuggestionButton
                key={suggestion.id}
                text={suggestion.text}
                icon={suggestion.icon}
                onClick={() => handleSuggestionClick(suggestion.text)}
              />
            ))}
          </div>
        </div>
      )}

      <div className={cn("p-4 border-t border-amber-200", messages.length === 1 ? "" : "mt-auto")}>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(input)
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-amber-200 focus-visible:ring-amber-500"
          />
          <Button type="submit" size="icon" className="bg-amber-600 hover:bg-amber-700" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

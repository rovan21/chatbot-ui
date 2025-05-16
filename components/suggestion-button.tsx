"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface SuggestionButtonProps {
  text: string
  icon?: ReactNode
  onClick: () => void
}

export function SuggestionButton({ text, icon, onClick }: SuggestionButtonProps) {
  return (
    <Button
      variant="outline"
      className="bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800 flex items-center gap-1.5"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Button>
  )
}
